
var AggressivenessSlider = {
	_value: 50, // Default value
	_minValue: 1,
	_maxValue: 100,
	_labelScale: [
		"low",
		"moderate",
		"high"
	],
	
	_updateLabel: function() {
		var scaleStep = Math.ceil(this._maxValue / this._labelScale.length);
		$("#aggressiveness").val(this._labelScale[Math.floor(this._value/scaleStep)]);
	},
	
	init: function() {
		// Get value from user saved data
		this._value = optionStorage.get("aggressiveness");
		
		$("#slider").slider({
			range: "min",
			value: this._value,
			min: this._minValue,
			max: this._maxValue,
			slide: function(event, ui) {
				AggressivenessSlider._value = ui.value;
				AggressivenessSlider._updateLabel();
				optionStorage.update("aggressiveness", AggressivenessSlider._value);
			}
		});
		
		this._updateLabel();
	}
}

KangoAPI.onReady(function() {
    $('#close').click(function(event) {
        KangoAPI.closeWindow()
    });
	
	// Initializing slider for user aggressiveness threshold
	AggressivenessSlider.init();
});