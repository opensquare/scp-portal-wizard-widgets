function Widget_scp_pact_search_results() {

	this.channel = null;

	this.initExtend = function() {
		this.channel = this.$widgetDiv.attr("channel");
		pw.addListenerToChannel(this, this.channel);
	}
	
	this.handleEvent = function(channel, event) {
		this.loadHTMLWithParams("searchValue=" + event.searchValue);
	}
	
}
