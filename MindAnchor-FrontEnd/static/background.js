chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "activateBionicReading") {
    chrome.storage.local.set({ bionicEnabled: true });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        }, () => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "activateBionicReading" });
        });
      }
    });
  } else if (request.action === "deactivateBionicReading") {
    chrome.storage.local.set({ bionicEnabled: false });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "deactivateBionicReading" });
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
console.log("MindAnchor Extension is installed!");
});
// Listener for when a tab is activated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {  // Ensure the URL is available
    handleClassification(tabId, changeInfo.url);
  }
});
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url) {  // Ensure the tab has a URL
      handleClassification(tab.id, tab.url);
    }
  });
});

function handleClassification(tabId, url) {
  chrome.storage.local.get(['ActivateClassification'], function(result) {
    if (chrome.runtime.lastError) {
      console.error("Error getting value:", chrome.runtime.lastError);
      return;
    }

    const activateState = result.ActivateClassification === 'true'; // Ensure boolean
    console.log("Value retrieved in background.js:", activateState);

    if (!activateState) return;

    // Retrieve blacklist and whitelist
    chrome.storage.local.get(['BlacklistCategories', 'WhitelistCategories','BlacklistUrls','WhitelistUrls'], function(result) {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving categories:", chrome.runtime.lastError);
        return;
      }

      const blacklist = result.BlacklistCategories || [];
      const whitelist = result.WhitelistCategories || [];
      const blacklistUrls =  result.BlacklistUrls || [];
      const whitelistUrls = result.WhitelistUrls || [];

      console.log("Blacklist:", blacklist);
      console.log("Whitelist:", whitelist);
      console.log("BlacklistUrls", blacklistUrls)

      // Send URL to Flask API
      fetch("http://127.0.0.1:5001/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          blacklist: blacklist,
          whitelist: whitelist,
          blacklistUrls: blacklistUrls,
          whitelistUrls: whitelistUrls 
          // blacklist: ["Entertainment", "Gaming", "Social Media", "Shopping", "Travel/Tourism"],
          // whitelist: ["Education", "Technology", "News"]
        })
      })
      .then(response => {
        // if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log("Classification Result:", data);
        let message = `This website (${data.url}) is categorized as "${data.predicted_category}".`;

        if (data.category_type === "blacklist") {
          message = `Warning: This website is categorized as "${data.predicted_category}" and is on your blacklist.`;
        
          // Check if tab still exists before injecting script
          chrome.tabs.get(tabId, function(tabInfo) {
            if (!chrome.runtime.lastError) {
              chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: injectBanner,
                args: [message]
              });
            }
          });
        } else if (data.category_type === "whitelist") {
          message = `This website (${data.url}) is categorized as "${data.predicted_category}" and is on your whitelist.`;
        }
        console.log(message);
      })
      // .catch(error => console.error("Fetch Error:", error));
    });
  });
}



function injectBanner(message, tabId) {
  const banner = document.createElement("div");
  banner.style.position = "fixed";
  banner.style.top = "0";
  banner.style.left = "0";
  banner.style.width = "100%";
  banner.style.height = "100%";
  banner.style.backgroundColor = "red";
  banner.style.color = "white";
  banner.style.padding = "10px";
  banner.style.textAlign = "center";
  banner.style.zIndex = "9999";
  banner.style.display = "flex";
  banner.style.flexDirection = "column";
  banner.style.justifyContent = "center";
  banner.style.alignItems = "center";
  banner.style.fontSize = "24px"; // Increase text size
  banner.innerText = message;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.marginTop = "20px"; // Add space between text and button
  closeButton.style.padding = "10px 20px";
  closeButton.style.backgroundColor = "white";
  closeButton.style.color = "red";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "18px";

  closeButton.addEventListener("click", () => {
    banner.remove();
    chrome.runtime.sendMessage({ action: "closeTab" });
  });

  // Create incorrect classification button
  const incorrectButton = document.createElement("button");
  incorrectButton.innerText = "Incorrect Classification";
  incorrectButton.style.marginTop = "10px"; // Add space between buttons
  incorrectButton.style.padding = "10px 20px";
  incorrectButton.style.backgroundColor = "yellow";
  incorrectButton.style.color = "black";
  incorrectButton.style.border = "none";
  incorrectButton.style.cursor = "pointer";
  incorrectButton.style.fontSize = "18px";

  incorrectButton.addEventListener("click", () => {
    banner.remove();
    chrome.runtime.sendMessage({ action: "reportIncorrect", tabId: tabId });
  });

  banner.appendChild(closeButton);
  banner.appendChild(incorrectButton);
  document.body.prepend(banner);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "closeTab") {
    // Close the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.remove(activeTab.id, () => {
          console.log("Tab closed successfully.");
        });
      }
    });
  }
});
