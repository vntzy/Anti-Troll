// ==UserScript==
// @name ChristmasTree
// @include http://*
// @include https://*
// @include about:blank
// @require dependencies/jquery-2.1.3.min.js
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for IE

var _dom_event_handler = function(mutations) {
    kango.console.log("Group: " + mutations.length);
};

var observer = new MutationObserver(_dom_event_handler);

// MutationObserverInit configuration:
var observerInit = {
    attributes: false, childList: true, characterData: true, subtree: true
};

observer.observe(document.body, observerInit);
