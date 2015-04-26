function Classifier(savedState, aggressiveness,
    blacklist, whitelist) {
    //TODO: Implement comment cache
    this._blacklist = blacklist || {};
    this._whitelist = whitelist || {};
    //TODO: Warning: savedState may be null!!!!
    this._savedState = savedState;
    this._aggressiveness = aggressiveness;

    this.trollWc = {
        "путка" = 2,
        "майна" = 2
    };

    this.normalWc = {
        'русия' = 2,
        'англия' = 2
    };

    this.tokenize = function(string) {
        return string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toLowerCase();
    };

    this.word_count = function(string) {
        var words = this.tokenize(string),
            wordCount = {}, word, i;

        for(i = 0; i < words.length; i++) {
            word = words[i];
            if (!word_count[word]) {
                wordCount[word] = 1;
            } else {
                wordCount[word] += 1;
            }
        }

        return wordCount;
    }

    this.classify = function(string) {
        var words = this.tokenize(string),
          pTroll = 0, pNormal = 0, i, word,
          trollMentions, normalMentions;

        for(i=0; i < words.length; i++){
            word = words[i];
            trollMentions  = trollWc[word] || 0.0;
            normalMentions = normalWc[word] || 0.0;

            pTroll += Math.log((trollMentions + 1.0) / (trollMentions + normalMentions + 2.0));
            pNormal += Math.log((normalMentions + 1.0) / (trollMentions + normalMentions + 2.0));
        }

        pTroll += Math.log(1 - this._aggressiveness)
        pNormal += Math.log(this._aggressiveness)

        return !( pTroll > pNormal );
    }

	this.isContentAcceptable = function(contentText) {
        // Much machine; such learning!
        if(contentText in this._whitelist) {
            return true;
        } else if(contentText in this._blacklist) {
            return false;
        }
        kango.console.log(contentText);
		return classify(contentText);
	};

    this.markContentAsUnacceptable = function(contentText) {
        //TODO: Update Machine model
        if(contentText in this._whitelist) {
            delete this._whitelist[contentText];
        }
        this._blacklist[contentText] = 1;

        this._saveLists();

        var words = this.tokenize(contentText), word, i;
        for(i = 0; i < words.length; i++) {
            word = words[i];
            if (this.trollWc[word]) {
                this.trollWc[word] += 1;
            } else {
                this.trollWc[word] = 1;
            }
        };

    };

    this.markFalsePositive = function(contentText) {
        if(contentText in this._blacklist) {
            delete this._blacklist[contentText];
        }
        this._whitelist[contentText] = 1;

        this._saveLists();

        var i, word;
        for(i = 0; i < words.length; i++) {
            word = words[i];
            if(this.normalWc[word]){
                this.normalWc[word] += 1;
            } else {
                this.normalWc[word] = 1;
            }
        };
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