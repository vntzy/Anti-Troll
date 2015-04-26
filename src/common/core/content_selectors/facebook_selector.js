// @require core/utils.js

function FacebookContentSelector() {
	
	this.canParse = function(window) {
		return window.location.hostname == "www.facebook.com";
    }
	
    this.selectContentFromDOMElements = function(domElements) {
		
		var result = _getElementsByXpath("//li[contains(@class, 'UFIComment')]");
        return result;
    };
}

var facebookContentSelector = new FacebookContentSelector();
contentFilter.addContentSelector(facebookContentSelector, 0.1);	