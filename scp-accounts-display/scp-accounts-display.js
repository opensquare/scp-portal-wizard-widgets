function Widget_scp_accounts_display() {

	this.channel = null;
	
	this.initExtend = function() {
		this.channel = this.$widgetDiv.attr("channel");
		pw.addListenerToChannel(this, this.channel);
	}
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		
		$("li a", this.$widgetDiv).click(function() {
			widgetObject.selectAccount($(this).attr("uid"));
			return false;
		});
	}
	
	this.handleEvent = function(channel, event) {
		this.loadHTMLWithParams("accountUid=" + event.uid);
//		 + "&effectiveStartTime=" + startTime + "&physicalStartTime=" + startTime + "&effectiveTime=" + endTime);
	}
	
}

