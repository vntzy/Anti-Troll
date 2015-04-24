function ContentFilter() {
	this.contentSelectors = [];
	this.addContentSelector(selector, priority) {
		this.contentSelectors[this.contentSelectors.length] = {"handler": selector, "priority": priority};
		this.contentSelectors.sort(function(a, b) {return b.priority - a.priority;});
	}
}