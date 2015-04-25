/* Content selectors are expected to implement the following interface: */
/*
function ExampleSelector() {
    function canParse(domDocument) {
        return true;
    }
    
    function selectContentFromDOMElements(domElements) {
        return domElements;
    }
}
*/
/* NOTE: Fallback selectors are expected to be able to parse everything,
    so canParse can be skipped */


function ContentFilter() {
    this._contentSelectors = [];
    this.addContentSelector = function(selector, priority) {
        _append(this._contentSelectors, {"handler": selector, "priority": priority});
        this._contentSelectors.sort(_prioritySortFunction);
    }
    
    this._fallbackSelectors = [];
    this.addFallbackSelector = function(selector, priority) {
        _append(this._fallbackSelectors, {"handler": selector, "priority": priority});
        this._fallbackSelectors.sort(_prioritySortFunction);
    }
    
    this.findAllContentOnDOMElements = function(domElements, domDocument) {
        var arrayLength = this._contentSelectors.length, hasFoundSelector = false;
        var result = [];
        for (var i = 0; i < arrayLength; i++) {
            var selector = this._contentSelectors[i];
            if(selector.canParse(domDocument)) {
                hasFoundSelector = true
                result.concat(selector.selectContentFromDOMElements(domElements));
            }
        }
        
        if(hasFoundSelector) {
            return result;
        }
        
        arrayLength = this._fallbackSelectors.length;
        result = [];
        for (var i = 0; i < arrayLength; i++) {
            var selector = this._fallbackSelectors[i];
            result.concat(selector.selectContentFromDOMElements(domElements));
        }
        
        return result;
    }
}

contentFilter = new ContentFilter();