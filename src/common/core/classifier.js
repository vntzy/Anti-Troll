function Classifier(savedState, aggressiveness,
    blacklist, whitelist) {
    //TODO: Implement comment cache
    this._blacklist = blacklist;
    this._whitelist = whitelist;
    //TODO: Warning: savedState may be null!!!!
    this._savedState = savedState;
    this._aggressiveness = aggressiveness;
    
	this.isContentAcceptable = function(contentText) {
        // Much machine; such learning!
        if(contentText in this._whitelist) {
            return true;
        } else if(contentText in this._blacklist) {
            return false;
        }
        kango.console.log(contentText);
		return true;
	};
    
    this.markContentAsUnacceptable = function(contentText) {
        //TODO: Update Machine model
        if(contentText in this._whitelist) {
            delete this._whitelist[contentText];
        }
        this._blacklist[contentText] = 1;
        
        this._saveLists();
    };
    
    this.markFalsePositive = function(contentText) {
        //TODO: Update Machine model
        if(contentText in this._blacklist) {
            delete this._blacklist[contentText];
        }
        this._whitelist[contentText] = 1;
        
        this._saveLists();
    };
    
    this._saveLists = function() {
        var counter = 0;
        counter++;
        if(counter % 5 == 0) {
            optionStorage.update("whitelist", this._whitelist);
            optionStorage.update("blacklist", this._blacklist);
        }
    }
    
    this._saveState = function() {
        var counter = 0;
        counter++;
        if(counter % 5 == 0) {
            optionStorage.update("savedState", this._savedState);
        }
    }
}

var aggressiveness = optionStorage.get("aggressiveness");
var savedState = optionStorage.get("savedState");
globalClassifier  = new Classifier(savedState, aggressiveness);