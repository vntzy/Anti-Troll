// @require core/utils.js

function VestiContentSelector() {
    this.canParse = function(window) {
        var result = /vesti.bg$/.test(window.location.hostname);
        return result;
    };

    this.selectContentFromDOMElements = function(domElements) {
        var result = _getElementsByXpath("//div[@class='comments-item']/div[@class='text']/p");
        return result;
    };
}

var vestiContentSelector = new VestiContentSelector();
contentFilter.addContentSelector(vestiContentSelector, 0.7);