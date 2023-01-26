"use strict";

//IIFE - Immediately Invoked Function Expression
(function(){

    // register the function in IIFE
    function Start()
    {
        console.log("App Started!");
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
            case "Contact List":
                DisplayContactListPage();
                break;
        }
    }

    // when the page is loaded, calling the function called Start
    window.addEventListener("load", Start)

    function DisplayHomePage() {
        console.log("Display Home Page");
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
        console.log("Display Contact Us Page");

    }

    function DisplayServicePage() {
        console.log("Display Service Page");

    }

    function DisplayContactPage() {
        console.log("Display Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            //event.preventDefault();
            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")

                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayAboutPage() {
        console.log("Display About Us Page");

    }

    function DisplayContactListPage() {
        console.log("Display Contact List Page");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";  // add deserialize data from localStorage

            let keys = Object.keys(localStorage);  // return a string array of keys

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td></td>
                         <td></td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
    }

})();

