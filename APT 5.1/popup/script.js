//run when popup has loaded
$(document).ready(function () {
    
    //retrieve the user's last saved values from storage to display in the input fields...
    chrome.storage.local.get(["enabled", "timer_duration", "websites"], function (data) {

        var websites = new Array();
        var timer_duration = 0;
        var enabled = "no";

        //for websites variable
        if (data["websites"] && (data["websites"] != "undefined"))
            websites = data["websites"];

        //for timer_duration variable
        if (data["timer_duration"] && (data["timer_duration"] != "undefined"))
            timer_duration = data["timer_duration"];

        //for enabled variable
        if (data["enabled"] && (data["enabled"] != "undefined"))
            enabled = data["enabled"];
        
        //joins the elements from the websites array into a string separated by a new line
        var websites_textarea = websites.join("\n");

        //retrieve data from the input fields and save it into memory
        $("#timer_duration").val(timer_duration);
        $("#websites").val(websites_textarea);

        //retrieves the property of the html element with the id of "enabled"
        if (enabled == "yes") {
            $("#enabled").prop("checked", true);
        }
    });

    // enable/disable checkbox code
    $("#enabled").change(function () {

        var timer_duration = $("#timer_duration").val();
        var websites = $("#websites").val().split("\n");

        var enabled = "no";
        if ($(this).is(":checked")) {
            enabled = "yes";
        }

        // save checkbox status into memory
        chrome.storage.local.set({
            enabled: enabled,
            websites: websites,
            timer_duration: timer_duration
        });
    });

    // save button code
    //adds a listener to the button, executes the function when activated
    $("#save_params").click(function () {

        var timer_duration = $("#timer_duration").val();
        var websites = $("#websites").val().split("\n");
        
        chrome.storage.local.set({
            websites: websites,
            timer_duration: timer_duration
        });

        return false;
    });

});

