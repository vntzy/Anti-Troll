
var MenuHelper = {
	
	init: function() {
		
		$('#pause').click(function(event) {
			MenuHelper.pauseSet();
			$(this).hide(); $('#resume').show();
			$('#caption').text("Extension is paused");
		});
		
		$('#resume').click(function(event) {
			MenuHelper.pauseRemove();
			 $(this).hide(); $('#pause').show();
			 $('#caption').text("Extension is running");
		});
		
		isPaused = MenuHelper.pauseGet();
	
		if(isPaused) {
			$('#caption').text("Extension is paused");
			$('#resume').show();
			$('#pause').hide();
		} else {
			$('#caption').text("Extension is running");
			$('#pause').hide();
			$('#resume').show();
		}
	},
	
	pauseSet: function() {
        optionStorage.update("is_paused", true);
        kango.browser.tabs.getAll(function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].dispatchMessage("paused", true);
            }
        });
    },
	
	pauseRemove: function() {
        optionStorage.update("is_paused", false);
        kango.browser.tabs.getAll(function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].dispatchMessage("paused", false);
            }
        });
    },
	
	pauseGet: function() {
        return optionStorage.get("is_paused");
    }
}

KangoAPI.onReady(function() {
	
	$("#menu").menu();
	
	MenuHelper.init();
});