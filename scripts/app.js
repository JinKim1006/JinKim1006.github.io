"use strict";

//IIFE - Immediately Invoked Function Expression
(function(){

    /**
     * Instantiate and contact to localStorage
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }


    function DisplayHomePage() {
        console.log("Display Home Page Called!");

        // JavaScript version - AboutUsButton Click Event
        // let AboutUsButton = document.getElementById("AboutUsBtn");
        // AboutUsButton.addEventListener("click", function () {
        //     location.href = "about.html";
        // });

        // jQuery version - AboutUsButton Click Event
        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });


        $("#ProductBtn").on("click", () => {
            location.href = "product.html";

        });
        $("#ServiceBtn").on("click", () => {
            location.href = "service.html";

        });
        $("#ContactUsBtn").on("click", () => {
            location.href = "contact.html";
        });


        // JavaScript version - Create and append <p>tag to main, set its attributes, and add text
        // let MainContent = document.getElementsByTagName("main")[0];
        // let MainParagraph = document.createElement("p");
        // MainParagraph.setAttribute("id", "MainParagraph");
        // MainParagraph.setAttribute("class", "mt-3");
        // MainParagraph.textContent = "This is the Main Paragraph!";
        // MainContent.appendChild(MainParagraph);

        // jQuery version - Create and append <p>tag to main, set its attributes, and add text
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`);


        // JavaScript version - Create <article> and <p> tags, append them to body
        // let Article = document.createElement("article");
        // let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        // Article.setAttribute("class", "container");
        // Article.innerHTML= ArticleParagraph;
        // document.body.appendChild(Article);

        // jQuery version - Create <article> and <p> tags, append them to body
        $("body").append(`<article class="container">
                            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
    }

    function DisplayProductPage() {
        console.log("Display Contact Us Page Called!");

    }

    function DisplayServicePage() {
        console.log("Display Service Page Called!");

    }

    function DisplayContactPage() {
        console.log("Display Contact Us Page Called!");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")

                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayAboutPage() {
        console.log("Display About Us Page Called!");

    }

    function DisplayContactListPage() {
        console.log("Display Contact List Page Called!");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";  // add deserialize data from localStorage

            let keys = Object.keys(localStorage);  // return a string array of keys

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                        
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                    <i class="fas fa-edit fa-sm"></i> Edit</button>
                         </td>
                         
                         <td class="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm danger delete">
                                    <i class="fas fa-trash-alt fa-sm"></i> Delete</button>
                         </td>

                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            // add button's event
            $("#addButton").on("click", () => {
                location.href = "edit.html#add";
            });

            // delete button's event
            // there is many delete buttons so not binding by id
            $("button.delete").on("click", function() {

                if(confirm("Delete contact, please confirm")){
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });

            // edit button's event
            $("button.edit").on("click", function() {
                location.href = "edit.html#" + $(this).val();
            });

        }
    }

    function DisplayEditPage() {
        console.log("Display Edit Contact Page Called!");

        let page = location.hash.substring(1);

        switch (page){
            case "add":
                // overwrite the h1 text in main
                $("main>h1").text("Add Contact");
                // overwrite the editButton's icon and text
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);


                $("#editButton").on("click", (event) => {
                    // ignore the default event
                    event.preventDefault();

                    // add contact
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });



                $("#cancelButton").on("click", () => {
                   location.href = "contact-list.html";
                });


                break;
            default: {
                // edit
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                $("#editButton").on("click", (event) => {
                    // ignore the default event
                    event.preventDefault();

                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());

                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
            }
        }
    }

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
            case "Edit Contact":
                DisplayEditPage();
                break;
        }
    }

    // when the page is loaded, calling the function called Start
    window.addEventListener("load", Start)

})();

