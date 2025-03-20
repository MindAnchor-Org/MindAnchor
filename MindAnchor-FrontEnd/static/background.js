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

// Listen for tab updates (when a user visits a new URL)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleClassification(tabId, changeInfo.url);
  }
});

// Listen for tab activation (when a user switches tabs)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url) {
      handleClassification(tab.id, tab.url);
    }
  });
});

function handleClassification(tabId, url) {
  chrome.storage.local.get(['ActivateClassification'], function (result) {
    if (chrome.runtime.lastError) {
      console.error("Error getting value:", chrome.runtime.lastError);
      return;
    }

    const activateState = result.ActivateClassification === 'true';
    console.log("Value retrieved in background.js:", activateState);

    if (!activateState) return;

    // Retrieve blacklist and whitelist
    chrome.storage.local.get(['BlacklistCategories', 'WhitelistCategories', 'BlacklistUrls', 'WhitelistUrls'], function (result) {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving categories:", chrome.runtime.lastError);
        return;
      }

      const blacklist = result.BlacklistCategories || [];
      const whitelist = result.WhitelistCategories || [];
      const blacklistUrls = result.BlacklistUrls || [];
      const whitelistUrls = result.WhitelistUrls || [];

      console.log("Blacklist:", blacklist);
      console.log("Whitelist:", whitelist);
      console.log("BlacklistUrls:", blacklistUrls);

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
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Classification Result:", data);
          let message = `This website (${data.url}) is categorized as "${data.predicted_category}".`;

          if (data.category_type === "blacklist") {
            message = `Warning: This website is categorized as "${data.predicted_category}" and is on your blacklist.`;

            chrome.tabs.get(tabId, function (tabInfo) {
              if (!chrome.runtime.lastError) {
                chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  func: injectBanner,
                  args: [message, tabId]
                });
              }
            });
          } else if (data.category_type === "whitelist") {
            message = `This website (${data.url}) is categorized as "${data.predicted_category}" and is on your whitelist.`;
          } else if (data.category_type === "undefined") {
            message = 'Failed to classify this website. What do you want to do?';
            chrome.tabs.get(tabId, function (tabInfo) {
              if (!chrome.runtime.lastError) {
                chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  func:  injectNotification,
                  args: [message, tabId]
                });
              }
            });
          }
          console.log(message);
        })
        .catch(error => console.error("Fetch Error:", error));
    });
  });
}

// Function to inject banner on blacklisted sites
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
  banner.style.fontSize = "24px";
  banner.innerText = message;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.marginTop = "20px";
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
  incorrectButton.style.marginTop = "10px";
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
// Close tab listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "closeTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.remove(tabs[0].id, () => {
          console.log("Tab closed successfully.");
        });
      }
    });
  }
});


function injectNotification(message, tabId) {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.right = "10px";
  notification.style.width = "350px";
  notification.style.background = "#fff";
  notification.style.color = "#333";
  notification.style.padding = "15px";
  notification.style.border = "1px solid #ddd";
  notification.style.borderRadius = "8px";
  notification.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  notification.style.zIndex = "10000";
  notification.style.fontFamily = "Arial, sans-serif";

  // MindAnchor Heading
  const heading = document.createElement("h3");
  heading.innerText = "MindAnchor";
  heading.style.margin = "0 0 10px 0";
  heading.style.fontSize = "18px";
  heading.style.color = "#007bff";

  // Message
  const messageSpan = document.createElement("span");
  messageSpan.innerText = message;
  messageSpan.style.display = "block";
  messageSpan.style.marginBottom = "10px";
  messageSpan.style.fontSize = "14px";

  // Buttons Container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.justifyContent = "space-between";

  // Close Tab Button
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close Tab";
  closeButton.style.background = "#dc3545";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.padding = "8px 12px";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "14px";
  closeButton.style.transition = "0.3s";
  closeButton.onmouseover = () => closeButton.style.background = "#c82333";
  closeButton.onmouseout = () => closeButton.style.background = "#dc3545";
  closeButton.onclick = () => {
    chrome.runtime.sendMessage({ action: "closeTab", tabId: tabId });
  };

  // Continue Browsing Button
  const continueButton = document.createElement("button");
  continueButton.innerText = "Continue Browsing";
  continueButton.style.background = "#28a745";
  continueButton.style.color = "white";
  continueButton.style.border = "none";
  continueButton.style.padding = "8px 12px";
  continueButton.style.borderRadius = "5px";
  continueButton.style.cursor = "pointer";
  continueButton.style.fontSize = "14px";
  continueButton.style.transition = "0.3s";
  continueButton.onmouseover = () => continueButton.style.background = "#218838";
  continueButton.onmouseout = () => continueButton.style.background = "#28a745";
  continueButton.onclick = () => {
    document.body.removeChild(notification);
  };

  // Append elements
  buttonsContainer.appendChild(closeButton);
  buttonsContainer.appendChild(continueButton);
  notification.appendChild(heading);
  notification.appendChild(messageSpan);
  notification.appendChild(buttonsContainer);
  document.body.appendChild(notification);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "closeTab") {
    const tabId = request.tabId || (sender.tab ? sender.tab.id : null);

    if (tabId) {
      chrome.tabs.remove(tabId, () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to close tab:", chrome.runtime.lastError);
        } else {
          console.log(`Tab ${tabId} closed successfully.`);
        }
      });
    }
  }
});

// RAFAN'S CODES
// Listens for tab activation changes (when a user switches to a different tab)
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
      if (tab && tab.url) {
          handleDomainTracking(tab.url); // Calls the function to track the domain
      }
  });
});

// Listens for tab updates (when the URL changes on a tab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
      handleDomainTracking(changeInfo.url); // Calls the function to track the domain
  }
});

// Global variables to store active domain and the start time
let activeDomain = null;
let startTime = null;

// Handles the domain tracking logic (extracts domain and stores time spent)
function handleDomainTracking(url) {
  const domain = extractDomain(url); // Extracts the domain from the URL
  if (!domain) return;

  // If switching domains, update the time spent on the previous one
  if (activeDomain && activeDomain !== domain) {
      updateDuration(activeDomain); // Update the duration of the old domain
  }

  // Set new active domain and start time
  activeDomain = domain;
  startTime = Date.now();

  // Ensure the domain is in the local storage and initialize its duration if not already present
  chrome.storage.local.get({ domainDurations: {} }, data => {
      let domainDurations = data.domainDurations;
      if (!domainDurations[domain]) {
          domainDurations[domain] = 0; // Initialize if not present
          chrome.storage.local.set({ domainDurations });
      }
  });
}

// Updates the duration of the time spent on a particular domain
function updateDuration(domain) {
  if (!domain || !startTime) return;
  let endTime = Date.now();
  let duration = (endTime - startTime) / 1000; // Convert milliseconds to seconds

  // Retrieve stored durations and update the duration for the current domain
  chrome.storage.local.get({ domainDurations: {} }, data => {
      let domainDurations = data.domainDurations;
      domainDurations[domain] = (domainDurations[domain] || 0) + duration; // Add to the existing time spent on the domain
      chrome.storage.local.set({ domainDurations });
  });
}

// Extracts the domain from the given URL
function extractDomain(url) {
  try {
      let hostname = new URL(url).hostname; // Get the hostname from the URL
      return hostname.replace(/^www\./, ''); // Remove "www" prefix if it exists
  } catch (e) {
      return null; // Return null if there's an error in extracting the domain
  }
}

// Listens for changes in the window focus (when the user switches windows)
chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
      updateDuration(activeDomain); // Update the duration when the window is minimized or closed
      activeDomain = null; // Reset active domain
      startTime = null; // Reset start time to prevent incorrect duration calculation
  }
});

// Listens for the removal of a tab (when the user closes a tab)
chrome.tabs.onRemoved.addListener(() => {
  updateDuration(activeDomain); // Update the duration when a tab is closed
  activeDomain = null; // Reset active domain
  startTime = null; // Reset start time
});

