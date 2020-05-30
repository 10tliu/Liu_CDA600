//listens for the message sent from background.js
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    
    //run when a message is received from background.js
    if ((msg.from === "background") && (msg.subject === "tab_changed")) {

        var websites = new Array();
        var timer_duration = 0;
        var enabled = "no";
        //retrieve values from storage for use in the script
        chrome.storage.local.get(["websites", "timer_duration", "enabled"], function (data) {
            if (data["websites"] && (data["websites"] != "undefined"))
                websites = data["websites"];

            if (data["timer_duration"] && (data["timer_duration"] != "undefined"))
                timer_duration = data["timer_duration"];

            if (data["enabled"] && (data["enabled"] != "undefined"))
                enabled = data["enabled"];

            //converts the user's input (seconds) into milliseconds
            var timer_duration_ms = timer_duration * 1000;

            //checks if the extension has been enabled, if there are values entered
            if ((enabled == "yes") && websites && timer_duration_ms) {
                //finds the URL from the current tab
                var current_url = window.location.href;
                for (var i = 0; i < websites.length; i++) {
                    var website = websites[i];
                    //checks if the user's block list contains the current URL
                    if (current_url.includes(website)) {
                        displayPopup();
                    }
                }
            }
            //defines the function to display the "start timer" popup
            function displayPopup() {
                            var dc = confirm("Start Timer?");
                            if (dc == true) {
                                setTimeout(function timeout() {
                                    //show alert popup
                                    var dc2 = confirm("You have spent " + timer_duration + " seconds on the current page:\n\n" + current_url + "\n\nPlease remember to stay on task!");
                                    if (dc2 == true) {
                                        displayPopup();
                                    }
                                }
                                , timer_duration_ms);
                            }
            }
        });
    }
});
