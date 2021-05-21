var importedScript = document.createElement('script');
importScripts.src = '/mainChat.js';
document.body.appendChild(importScripts);

function startChatImported(){
    var snapInObject = {
        firstName:"",
        lastName:"",
        emailAddress:"",
        languageCode:"en",
        seletionType:"",
        channel:"",
        countryCode:"us",
        entryPoint:"dell.com"
    };
    console.log('Inside startChat');
    triggerSnapin(snapInObject);
}