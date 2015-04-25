function Classifier(savedState, aggressiveness) {
	this.isContentAcceptable = function(contentText) {
		return true;
	};
    
    this.markContentAsUnacceptable = function(contentText) {
        return;
    };
    
    this.markFalsePositive = function(contentText) {
        return
    };
}