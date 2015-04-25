function Extension() {
    var self = this;
	
	self._loadOptions();
	
    kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
        self._onCommand();
    });
}

Extension.prototype = {
	
	_defaultOptions: {
		"aggressiveness" = 50,
	},
	
	_loadOptions: function() {
		
		// aggressiveness threshold
		aggressiveness = kango.storage.getItem("aggressiveness");
		if(aggressiveness == null) {
			kango.storage.setItem("aggressiveness", this._defaultOptions["aggressiveness"]);
		}
	},
	
    _onCommand: function() {
        kango.browser.tabs.create({url: 'https://github.com/vntzy/Anti-Troll'});
    }
};

var extension = new Extension();