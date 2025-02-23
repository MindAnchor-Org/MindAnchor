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
  