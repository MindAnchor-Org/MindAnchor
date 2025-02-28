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
chrome.tabs.onActivated.addListener((activeInfo) => {
chrome.tabs.get(activeInfo.tabId, (tab) => {
    console.log("Tab URL:", tab.url);
});
});

// const FLASK_API_URL = "http://127.0.0.1:5001/classify";

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   chrome.storage.local.get(['ActivateClassification'], function(result) {
//     if (chrome.runtime.lastError) {
//       console.error("Error getting value:", chrome.runtime.lastError);
//       return;
//     }

//     const activateState = result.ActivateClassification === 'true'; // Ensure it's a boolean
//     console.log("Value retrieved in background.js:", activateState);

//     if (activateState) { // Ensure we only proceed if activateState is true
//       if (changeInfo.url && changeInfo.url !== "chrome://newtab/") {
//         console.log("Navigated to:", changeInfo.url);

//         // Retrieve blacklist and whitelist from chrome.storage.local
//         chrome.storage.local.get(['BlacklistCategories', 'WhitelistCategories'], function(result) {
//           if (chrome.runtime.lastError) {
//             console.error("Error retrieving categories:", chrome.runtime.lastError);
//             return;
//           }

//           const blacklist = result.BlacklistCategories || [];
//           const whitelist = result.WhitelistCategories || [];

//           // Send URL to Flask server
//           fetch("http://127.0.0.1:5001/classify", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               url: changeInfo.url,
//               blacklist: blacklist,
//               whitelist : whitelist
//               // blacklist: ["Entertainment","Gaming","Social Media","Shopping","Travel/Tourism"],
//               // whitelist: ["Education","Technology","News"]
//             })
//           })
//           .then(response => {
//             console.log("Response status:", response.status);
//             console.log("Response headers:", response.headers);

//             const contentType = response.headers.get("content-type");
//             if (contentType && contentType.includes("application/json")) {
//               return response.json();
//             } else {
//               return response.text().then(text => {
//                 console.error("Invalid response text:", text);
//                 throw new Error(`Invalid response: ${text}`);
//               });
//             }
//           })
//           .then(data => {
//             console.log("Classification Result:", data);
//             let message = `This website (${data.url}) is categorized as "${data.predicted_category}".`;

//             if (data.category_type === "blacklist") {
//               message = `Warning: This website is categorized as "${data.predicted_category}" and is on your blacklist.`;
            
//               // Ensure the tab still exists before executing script
//               chrome.tabs.get(tabId, function(tabInfo) {
//                 if (!chrome.runtime.lastError) {
//                   chrome.scripting.executeScript({
//                     target: { tabId: tabId },
//                     func: injectBanner,
//                     args: [message]
//                   });
//                 }
//               });
//             } else if (data.category_type === "whitelist") {
//               message = `This website (${data.url}) is categorized as "${data.predicted_category}" and is on your whitelist.`;
//             }
//             console.log(message);
//           });
//         });
//       }
//     }
//   });
// });



// function injectBanner(message) {
//   const banner = document.createElement("div");
//   banner.style.position = "fixed";
//   banner.style.top = "0";
//   banner.style.left = "0";
//   banner.style.width = "100%";
//   banner.style.height = "100%";
//   banner.style.backgroundColor = "red";
//   banner.style.color = "white";
//   banner.style.padding = "10px";
//   banner.style.textAlign = "center";
//   banner.style.zIndex = "9999";
//   banner.innerText = message;
//   document.body.prepend(banner);

//   // Optional: Add a close button to remove the banner
//   const closeButton = document.createElement("button");
//   closeButton.innerText = "Close";
//   closeButton.style.marginLeft = "20px";
//   closeButton.style.padding = "5px 10px";
//   closeButton.style.backgroundColor = "white";
//   closeButton.style.color = "red";
//   closeButton.style.border = "none";
//   closeButton.style.cursor = "pointer";

//   closeButton.addEventListener("click", () => {
//     banner.remove();
//     chrome.runtime.sendMessage({ action: "closeTab" });
//   });
//   banner.appendChild(closeButton);
// }
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "closeTab") {
//     // Close the current active tab
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];
//       if (activeTab && activeTab.id) {
//         chrome.tabs.remove(activeTab.id, () => {
//           console.log("Tab closed successfully.");
//         });
//       }
//     });
//   }
// });
// ML integration 
