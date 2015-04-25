function Extension() {
    var self = this;
    kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
        self._onCommand();
    });
}

Extension.prototype = {

    _onCommand: function() {
        kango.browser.tabs.create({url: 'https://github.com/vntzy/Anti-Troll'});
    }
};

var extension = new Extension();