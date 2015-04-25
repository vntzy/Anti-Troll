
// REMOVE FROM HERE!
function _renderTextFromDomElement(domElement) {
    return domElement.innerText || domElement.textContent;
}

function FacebookContentSelector() {
	
	this.canParse = function(window) {
		return window.location.hostname == "www.facebook.com";
    }
	
    this.selectContentFromDOMElements = function(domElements) {
		
		for (var i = 0; i < domElements.length; i++) {
			result = document.evaluate("//span[@class='UFICommentBody']/span", domElements[i], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			if (result){
				var node = result.iterateNext();
				while(node) {
					console.log(_renderTextFromDomElement(node));
					node = result.iterateNext();
				}
			} else {
				console.log("No elements found.")
			}
		}
        return [];
    };
}

var facebookContentSelector = new FacebookContentSelector();
contentFilter.addContentSelector(facebookContentSelector, 0.1);	