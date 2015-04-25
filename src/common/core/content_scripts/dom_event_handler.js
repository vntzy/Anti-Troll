// ==UserScript==
// @name ChristmasTree
// @include http://*
// @include https://*
// @include about:blank
// @require dependencies/jquery-2.1.3.min.js
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for IE

var _dom_event_handler = function(mutations) {
    for(var i = 0; i < mutations.length; i++) {
        var mutationRecord = mutations[i];
        switch(mutationRecord.type) {
            case "characterData":
                kango.console.log("Character Data");
                kango.console.log(mutationRecord.target);
                break;
            case "childList":
                kango.console.log("Child list");
                kango.console.log(mutationRecord.target);
                break;
            default:
                break;
        }
    }
};

var observer = new MutationObserver(_dom_event_handler);

// MutationObserverInit configuration:
var observerInit = {
    attributes: false, childList: true, characterData: true, subtree: true
};

observer.observe(document.body, observerInit);
