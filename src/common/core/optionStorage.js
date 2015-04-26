OptionStorage = function() {
	
	this._storageKeyPrefix = "option_";
	
	this._applyPrefix = function(key) {
		return this._storageKeyPrefix.concat(key);
	};
	
	this.update = function(key, value) {
		kango.invokeAsync('kango.storage.setItem', this._applyPrefix(key), value);
	};
	
	this.get = function(key) {
		return kango.storage.getItem(this._applyPrefix(key));
	};
};

//Singleton
optionStorage = new OptionStorage();