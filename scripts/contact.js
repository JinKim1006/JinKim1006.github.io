"use strict";


class Contact {
    constructor(fullName, contactNumber, emailAddress) {
        this.FullName = fullName;
        this.ContactNumber = contactNumber;
        this.EmailAddress = emailAddress;
    }

    // setter and getter for fullName
    set FullName(fullName){
        this.m_fullname = fullName;
    }
    get FullName(){
        return this.m_fullname;
    }

    // setter and getter for contactNumber
    set ContactNumber(contactNumber){
        this.m_contactnumber = contactNumber;
    }
    get ContactNumber(){
        return this.m_contactnumber;
    }

    // setter and getter for emailAddress
    set EmailAddress(emailAddress){
        this.m_emailaddress = emailAddress;
    }
    get EmailAddress(){
        return this.m_emailaddress;
    }

    toString(){
        return `Full Name: ${this.FullName}\n Contact Number: ${this.ContactNumber}\n Email Address: ${this.EmailAddress}`;
    }

    serialize(){
        if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== ""){
            return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
        }
        console.error("One or more of the properties of the Contact object are missing or invalid");
        return null;
    }

    deserialize(data){
        let propertyArray = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }

}