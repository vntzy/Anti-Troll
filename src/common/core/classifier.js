var bayes = require('bayes');

function Classifier(savedState, aggressiveness,
    blacklist, whitelist) {
    //TODO: Implement comment cache
    this._blacklist = blacklist || {};
    this._whitelist = whitelist || {};
    if(savedState) {
        kango.console.log("Loading already saved state");
        this._savedState = savedState;
    } else {
        kango.console.log("Loading defaults");
        this._savedState = classifierInitState;
    }
    this._realClassifier = bayes.fromJson(this._savedState);
    this._aggressiveness = aggressiveness;
    
	this.isContentAcceptable = function(contentText) {
        // Much machine; such learning!
        if(contentText in this._whitelist) {
            kango.console.log(contentText);
            kango.console.log("Is in whitelist");
            return true;
        } else if(contentText in this._blacklist) {
            kango.console.log(contentText);
            kango.console.log("Is in blacklist");
            return false;
        }
        //kango.console.log(contentText);
        var classifierAnswer = this._realClassifier.categorize(contentText);
        // Aggressiveness is between 1 and 100
        // TODO: Convert 0/1/2 into yes/no
		return true;
	};
    
    this.markContentAsUnacceptable = function(contentText) {
        //TODO: Update Machine model
        kango.console.log("Blacklisting: ");
        kango.console.log(contentText);
        if(contentText in this._whitelist) {
            delete this._whitelist[contentText];
        }
        this._blacklist[contentText] = 1;
        this._realClassifier.learn(contentText, "2");
        this._saveLists();
        this._saveState();
    };
    
    this.markFalsePositive = function(contentText) {
        //TODO: Update Machine model
        if(contentText in this._blacklist) {
            delete this._blacklist[contentText];
        }
        this._whitelist[contentText] = 1;
        this._realClassifier.learn(contentText, "0");
        this._saveLists();
        this._saveState();
    };
    
    this._saveFrequency = 1;
    
    this._saveLists = function() {
        var counter = -1;
        counter++;
        if(counter % this._saveFrequency == 0) {
            optionStorage.update("whitelist", this._whitelist);
            optionStorage.update("blacklist", this._blacklist);
        }
    }
    
    this._saveState = function() {
        this._savedState = this._realClassifier.toJson();
        var counter = -1;
        counter++;
        if(counter % this._saveFrequency == 0) {
            optionStorage.update("savedState", this._savedState);
        }
    }
}

kango.console.log("OptionStorage:");
kango.console.log(optionStorage);
var aggressiveness = optionStorage.get("aggressiveness");
var savedState = optionStorage.get("savedState");
globalClassifier  = new Classifier(savedState, aggressiveness);