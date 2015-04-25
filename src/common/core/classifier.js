function Classifier(savedState, aggressiveness) {
	this.isContentAcceptable = function(contentText) {
        // Much machine; such learning!
		return true;
	};
    
    this.markContentAsUnacceptable = function(contentText) {
        return;
    };
    
    this.markFalsePositive = function(contentText) {
        return
    };
}

// TODO: Extract aggressiveness and saved state
globalClassifier  = new Classifier(null, 0);
