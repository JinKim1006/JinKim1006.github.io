"use strict";

//IIFE - Immediately Invoked Function Expression
(function(){

    // register the function in IIFE
    function Start()
    {
        console.log("App Started!");
        //window.addEventListener("click", DisplayHomePage);
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductPage();
                break;
            case "Service":
                DisplayServicePage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
        }
    }

    // when the page is loaded, calling the function called Start
    window.addEventListener("load", Start)

    function DisplayHomePage() {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function () {
            //console.log("About Us Button Clicked");
            location.href = "about.html"
        });
    }
    function DisplayProductPage() {
        let ProductButton = document.getElementById("ProductBtn");
        ProductButton.addEventListener("click", function () {
            //console.log("About Us Button Clicked");
            location.href = "product.html"
        });
    }
    function DisplayServicePage() {
        let ServiceButton = document.getElementById("ServiceBtn");
        ServiceButton.addEventListener("click", function () {
            //console.log("About Us Button Clicked");
            location.href = "service.html"
        });
    }
    function DisplayContactPage() {
        let ContactUsButton = document.getElementById("ContactUsBtn");
        ContactUsButton.addEventListener("click", function()
        {
            //console.log("About Us Button Clicked");
            location.href = "contact.html"
        });
    }
    function DisplayAboutPage() {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function () {
            //console.log("About Us Button Clicked");
            location.href = "about.html"
        });
    }

})();

