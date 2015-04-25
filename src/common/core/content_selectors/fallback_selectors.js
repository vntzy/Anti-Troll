function ExampleFallbackSelector() {
    this.selectContentFromDOMElements = function(domElements) {
        //TODO: Find (e.g.) all profanities
        return [];
    };
}

var exampleFallbackSelector = new ExampleFallbackSelector();
contentFilter.addFallbackSelector(exampleFallbackSelector, 0.1);

var otherFallbackSelector = null;
contentFilter.addFallbackSelector(otherFallbackSelector, 1.0);