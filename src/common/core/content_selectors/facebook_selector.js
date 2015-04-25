function FacebookContentSelector() {
    this.selectContentFromDOMElements = function(domElements) {
		alert("test");
        //TODO: Find (e.g.) all profanities
        return [];
    };
}

var facebookContentSelector = new FacebookContentSelector();
contentFilter.addContentSelector(facebookContentSelector, 0.1);