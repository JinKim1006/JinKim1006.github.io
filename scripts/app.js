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
        let ProductButton = document.getElementById("ProductBtn");
        ProductButton.addEventListener("click", function () {
            //console.log("About Us Button Clicked");
            location.href = "product.html"
        });
        let ServiceButton = document.getElementById("ServiceBtn");
        ServiceButton.addEventListener("click", function () {
            //console.log("About Us Button Clicked");
            location.href = "service.html"
        });
        let ContactUsButton = document.getElementById("ContactUsBtn");
        ContactUsButton.addEventListener("click", function()
        {
            //console.log("About Us Button Clicked");
            location.href = "contact.html"
        });

        // step 3
        let MainContent = document.getElementsByTagName("main")[0];
        // step 4
        let MainParagraph = document.createElement("p");
        // step 5
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the Main Paragraph!";
        // step 6
        MainContent.appendChild(MainParagraph);
        // step 7
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph.`;
        MainParagraph.textContent = SecondString;
        // step 8
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML= ArticleParagraph;
        document.body.appendChild(Article);
    }

    function DisplayProductPage() {

    }
    function DisplayServicePage() {

    }
    function DisplayContactPage() {

    }
    function DisplayAboutPage() {

    }

})();

