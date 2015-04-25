var OptionsStorage = {

    init: function() {
        $('#storage-get').click(function(event) {
            OptionsStorage.testGet();
        });

        $('#storage-set').click(function(event) {
            OptionsStorage.testSet();
        });

        $('#storage-remove').click(function(event) {
            OptionsStorage.testRemove();
        });

        $('#storage-keys').click(function(event) {
            OptionsStorage.testKeys();
        });
    },

    testGet: function() {
        kango.invokeAsync('kango.storage.getItem', $('#storage-key').val(), function(value) {
            $('#storage-value').val(value || 'null');
        });
    },

    testSet: function() {
        kango.invokeAsync('kango.storage.setItem', $('#storage-key').val(), $('#storage-value').val());
    },

    testRemove: function() {
        kango.invokeAsync('kango.storage.removeItem', $('#storage-key').val(), function() {
            $('#storage-value').val('null');
        });
    },

    testKeys: function() {
        kango.invokeAsync('kango.storage.getKeys', function(keys) {
            $('#storage-value').val(keys.toString());
        });
    }
};

KangoAPI.onReady(function() {
	// Assures that jquery is loaded into options page
	$( "#slider" ).slider();
	
    $('#ready').show();
    $('#not-ready').hide();

    $('#close').click(function(event) {
        KangoAPI.closeWindow()
    });

    OptionsStorage.init();
});