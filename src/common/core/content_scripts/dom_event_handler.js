// ==UserScript==
// @name ChristmasTree
// @include http://*
// @include https://*
// @include about:blank
// @require dependencies/jquery-2.1.3.min.js
// @require core/utils.js
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for IE

var _reportFalsePositive = function(domElement) {
    //TODO: Work
};

var _reportFalseNegative = function(domElement) {
    //TODO: Work
};

var _domEventHandler = function(mutations) {
    var targetDomElements = [];
    for(var i = 0; i < mutations.length; i++) {
        var mutationRecord = mutations[i];
        switch(mutationRecord.type) {
            case "bodyInit":
            case "characterData":
            case "childList":
                //kango.console.log("Character Data");
                //kango.console.log(mutationRecord.target);
                _append(targetDomElements, mutationRecord.target);
                break;
            default:
                break;
        }
    }
    kango.console.log(targetDomElements);
    var contentElements =
        contentFilter.findAllContentOnDOMElements(targetDomElements, document);
    //TODO: Work for real
    kango.console.log(contentElements);
    return;
    for (var i = 0; i < contentElements.length; i++) {
        var domElement = contentElements[i];
        var plaintextValue = _renderTextFromDomElement(domElement);
        kango.invokeAsync("globalClassifier.isContentAcceptable",
            plaintextValue, function(isToxic) {
                kango.console.log(plaintextValue + "|" + isToxic);
                contentMarker.mark(domElement, isToxic);
            });
    }
};

var observer = new MutationObserver(_domEventHandler);

// MutationObserverInit configuration:
var observerInit = {
    attributes: false, childList: true, characterData: true, subtree: true
};

var contentMarker =
    new ContentMarker(_reportFalsePositive, _reportFalseNegative);

$(document).ready(function() {
    _domEventHandler(
        [{
            type: "bodyInit",
            target: document.body
        }]
    );
});

observer.observe(document.body, observerInit);

kango.console.log("Observing...");
