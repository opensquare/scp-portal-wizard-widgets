function Widget_scp_claims_show() {
	this.channel = null;

	this.initExtend = function() {
		var uid = this.$widgetDiv.parents('article').attr('pageid').split('/')[2];
		this.$widgetDiv.attr('uid',uid);
		this.$widgetDiv.attr('homeAgreementuid',uid);
	}
	
}
