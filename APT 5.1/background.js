//detect when a new tab has been activated and send information to main.js
chrome.tabs.onActivated.addListener(
        function (info) {
            chrome.tabs.sendMessage(info.tabId, {
                from: "background",
                subject: "tab_changed"
            })
        }
);
