function Widget_scp_accounts_list() {

	this.channel = null;
	
	this.initExtend = function() {
		this.channel = this.$widgetDiv.attr("channel");
	}
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		$("select", this.$widgetDiv).change(function() {
			//$("li a", this.$widgetDiv).removeClass("active");
			widgetObject.selectAccount($(this).val());
			//$(this).addClass("active");
			return false;
		});
	}
	
	this.selectAccount = function(uid) {
		pw.notifyChannelOfEvent(this.channel, {
			uid: uid
		});
	}
	
}
