function Widget_scp_associated_agreements() {
	this.initExtend = function() {
		var url = document.URL;
     	var uid = url.substring(url.lastIndexOf("/") + 1);
        this.loadHTMLWithParams("uid=" + uid);
	}
}
