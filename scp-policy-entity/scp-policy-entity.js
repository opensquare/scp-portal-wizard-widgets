function Widget_scp_policy_entity() {

	this.channel = null;

	this.initExtend = function() {
		var url = document.URL;
        var uid = url.substring(url.lastIndexOf("/") + 1);
        this.loadHTMLWithParams("uid=" + uid);
	}
	
}
