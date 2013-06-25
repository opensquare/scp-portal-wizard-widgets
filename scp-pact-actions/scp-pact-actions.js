function Widget_scp_pact_actions(){

	this.actorName = null;
	this.channel = null;

	this.initExtend = function() {
		this.actorName = this.$widgetDiv.parents("[actorName]").attr("actorName");
		this.channel = this.$widgetDiv.attr("channel");
		this.formChannelPostfix = this.$widgetDiv.attr("formChannelPostfix");
		if (this.channel == null) {
			this.channel = this.$widgetDiv.parents("[formChannel]").attr("formChannel");
			if (this.formChannelPostfix != null) {
				this.channel += this.formChannelPostfix;
			}
		}
		if (this.parameterMap.agreementUid == undefined) {
			this.parameterMap.agreementUid = this.$widgetDiv.parents("[homeAgreementUid]").attr("homeAgreementUid");
		}

		this.$widgetDiv.click(function() {
			$(this).toggleClass('on');
		});
	}

    this.onReadyExtend = function(){
		var widgetObject = this;
		var selector = this.$widgetDiv.selector;
		$("a[action='displayForm']", this.$widgetDiv).click(function() {
			var params = $(this).attr("params");
			params += "&actorName=" + widgetObject.actorName;
			var formType = $(this).attr("formType");
			var formsLayout = $(this).attr("formsLayout");
			widgetObject.displayForm($(this).attr("formTitle"), params, formType, formsLayout);
			return false;
		});
    }
	
	this.displayForm = function(formTitle, params, formType, formsLayout) {
		var event = new Object();
		event.formTitle = formTitle;
		event.params = params;
		event.formsLayout = formsLayout;
		if (defined(this.channel)) {
			if (formType == "bf") {
				notifyChannelOfEvent(this.channel + "bf", event); // Load BF forms
			} else {
				notifyChannelOfEvent(this.channel, event); // Load Chiba forms
			}
		}
	}
}