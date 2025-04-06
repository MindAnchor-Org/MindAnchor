(function () {
  // Check if the script has already run
  // @ts-ignore
  if (window.hasBionicScript) return;
  // @ts-ignore
  window.hasBionicScript = true;

  // Function to get all text nodes in an element
  // @ts-ignore
  function getTextNodes(element) {
    const textNodes = [];
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        !/^(script|style|noscript)$/i.test(node.parentNode?.nodeName || "") && node.textContent?.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    });

    let node;
    while ((node = walk.nextNode())) textNodes.push(node);
    return textNodes;
  }

  // Function to apply the Bionic Reading effect to text
  // @ts-ignore
  function applyBionicReading(text) {
    return text
      .split(/(\s+)/)
      // @ts-ignore
      .map((word) => {
        if (/^\s+$/.test(word)) return word;
        const halfLength = Math.floor(word.length / 2);
        return word
          .split("")
          // @ts-ignore
          .map((char, i) => (i < halfLength ? `<span class='bionic-primary'>${char}</span>` : char))
          .join("");
      })
      .join("");
  }

  // Function to inject CSS for the Bionic Reading effect
  function injectCSS() {
    if (document.getElementById("bionic-style")) return;
    const style = document.createElement("style");
    style.id = "bionic-style";
    style.innerHTML = ".bionic-primary { font-weight: bold; }";
    document.head.appendChild(style);
  }

  // Function to activate Bionic Reading
  // @ts-ignore
  window.bionifyText = function () {
    console.log("Bionify Text Activated");
    localStorage.setItem("bionicEnabled", "true");
    injectCSS();
    const textNodes = getTextNodes(document.body);
    textNodes.forEach((node) => {
      const span = document.createElement("span");
      span.innerHTML = applyBionicReading(node.nodeValue || "");
      span.dataset.originalText = node.nodeValue || "";
      node.parentNode?.replaceChild(span, node);
    });
  };

  // Function to deactivate Bionic Reading
  // @ts-ignore
  window.unbionifyText = function () {
    console.log("Deactivated Bionic Reading");
    localStorage.setItem("bionicEnabled", "false");
    document.querySelectorAll("span[data-original-text]").forEach((span) => {
      const textNode = document.createTextNode(span.getAttribute("data-original-text") || "");
      span.parentNode?.replaceChild(textNode, span);
    });
  };

  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "activateBionicReading") {
      // @ts-ignore
      window.bionifyText();
    } else if (request.action === "deactivateBionicReading") {
      // @ts-ignore
      window.unbionifyText();
    }
  });

  // Apply Bionic Reading if it was previously enabled
  if (localStorage.getItem("bionicEnabled") === "true") {
    // @ts-ignore
    window.bionifyText();
  }
})();

// Automatically classify the current page
fetch('https://web-production-fc27.up.railway.app/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: window.location.href,     // get the current page URL
    blacklist: [],                 // you can customize these
    whitelist: []
  })
})
.then(response => response.json())
.then(data => console.log('Classification result:', data))
.catch(error => console.error('Error:', error));

