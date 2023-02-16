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


    function AjaxRequest(method, url, callback){
        // STEP 1
        let xhr = new XMLHttpRequest();

        // STEP 2
        xhr.addEventListener("readystatechange", () => {

            if(xhr.readyState === 4 && xhr.status === 200){
                if(typeof callback === "function"){     // check the callback's type is function
                    callback(xhr.responseText);
                }else{
                    console.error("Error: Please provide a valid function for callback.");
                }
            }
        });

        // STEP 3
        xhr.open(method, url);
        // STEP 4
        xhr.send();

    }

    function LoadHeader(data){
        //console.log(xhr.responseType);
        $("header").html(data);
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
    }


    function DisplayHomePage() {
        console.log("Display Home Page Called!");

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


        // jQuery version - Create and append <p>tag to main, set its attributes, and add text
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`);


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

    function ContactFormValidation(){

        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid firstname and lastname (ex. Mr. Harry Potter)");

        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact phone number (ex. 416-836-9876)");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address (ex. username@isp.com)");
    }


    function ValidateField(input_field_id, regular_expression, error_message) {

        let messageArea = $("#messageArea");

        $(input_field_id).on("blur", function () {
            //this means the element fullName
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                // fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                // pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }



    function DisplayContactPage() {
        console.log("Display Contact Us Page Called!");

        ContactFormValidation();

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
        console.log("Display Edit Page Called!");

        ContactFormValidation();

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


    function DisplayRegisterPage(){
        console.log("Display Register Page Called!");
    }


    function DisplayLoginPage(){
        console.log("Display Login Page Called!");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function() {

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function (data) {

                for(const user of data.users){

                    //check if the username and password
                    if(username.value === user.Username && password.valueOf === user.Password)
                    {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();

                    // redirect user to secure area of the site.
                    location.href = "contact-list.html";
                }else{
                    // they do not match
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                }
            });
        });

        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href = "index.html";
        });

    }

    function CheckLogin(){
        if(sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);
        }

        $("#logout").on("click", function() {
            sessionStorage.clear();
            location.href = "index.html";
        });


    }

    function Start()
    {
        console.log("App Started!");

        AjaxRequest("GET", "header.html", LoadHeader);

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
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
        }
    }

    // when the page is loaded, calling the function called Start
    window.addEventListener("load", Start)

})();

