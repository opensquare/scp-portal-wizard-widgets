function Widget_scp_account_show(thisWidget) {
	
	this.initExtend = function() {
		var url = this.$widgetDiv.attr("page.id");
        var uid = url.substring(url.lastIndexOf("/") + 1);
        this.loadHTMLWithParams("accountUid=" + uid);
	}
	
}
