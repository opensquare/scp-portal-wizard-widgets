function Widget_scp_policy_show() {

	this.channel = null;

	//this.initExtend = function() {
	//	var url = document.URL;
    //    var uid = url.substring(url.lastIndexOf("/") + 1);
    //    this.loadHTMLWithParams("uid=" + uid);
	//}

	this.initExtend = function() {
		var uid = this.$widgetDiv.parents('article').attr('pageid').split('/')[2];
		this.$widgetDiv.attr('uid',uid);
		this.$widgetDiv.attr('homeAgreementuid',uid);
	}
	
}
