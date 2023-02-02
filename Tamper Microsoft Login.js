// ==UserScript==
// @name         Auto Login (MS)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://login.microsoftonline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoftonline.com
// @grant        none
// ==/UserScript==

const email = "email@example.com";
const password = "password";

(function() {
    'use strict';

    login();
})();

function login(){
    if (document.title === "Sign in to your account" || document.title === "Sign in to Microsoft Azure") {
        console.log("title");
        setTimeout(function() {
            console.log("loaded");
            let isEnterEmail = document.evaluate("//div[@role='heading'][contains(text(), 'Sign in')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            let isEnterPassword = document.evaluate("//div[@role='heading'][contains(text(), 'Enter password')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            let isSwitchToPassword = document.evaluate("//div[@role='heading'][contains(text(), 'Approve sign in')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            if (isEnterEmail) {
                let emailInput = document.querySelector("input[name='loginfmt']");
                console.log("email");
                emailInput.value = email;
                setTimeout(function() {
                    console.log("enter");
                    let nextButton = document.querySelector("input[id='idSIButton9']");
                    if (nextButton) {
                        setTimeout(function() {
                            console.log("next focus");
                            nextButton.focus();
                            setTimeout(function() {
                                console.log("next click");
                                nextButton.click();
                                login();
                            }, 500);
                        }, 500);
                    }
                }, 500);
            } else if (isEnterPassword) {
                let passwordInput = document.querySelector("input[name='passwd']");
                console.log("password");
                passwordInput.focus();
                passwordInput.value = password;
                passwordInput.dispatchEvent(new Event("input"));
                // Loop through the characters in the password
                setTimeout(function() {
                    console.log("enter");
                    let nextButton = document.querySelector("input[id='idSIButton9']");
                    if (nextButton) {
                        setTimeout(function() {
                            console.log("next focus");
                            nextButton.focus();
                            setTimeout(function() {
                                console.log("next click");
                                nextButton.click();
                                login();
                            }, 500);
                        }, 500);
                    }
                }, 500);
            } else if (isSwitchToPassword) {
                let switchToPasswordLink = document.querySelector("a[id='idA_PWD_SwitchToPassword']");
                console.log("switch to password");
                setTimeout(function() {
                    console.log("switch to password click");
                    switchToPasswordLink.click();
                    login();
                }, 500);
            }
        }, 1000);
    }
}