function Widget_scp_form_confirm(thisWidget) {
    
	this.initExtend = function() {
		var argsString = this.$widgetDiv.attr("page.args");
        this.initialData = "";
        args = argsString.split("&");
        for(i in args){
            arg = args[i];
            tokens = arg.split("=");
            aName = tokens[0];
            aValue = tokens[1];
            this.initialData = this.initialData + "<" + aName + ">" + aValue + "</" + aName + ">";
        }
        this.initialData = "<root>" + this.initialData + "</root>";
        this.loadHTMLWithParams(argsString);
	}
    
    this.onReadyExtend = function(){
        rf.loadFlow('widgets/scp-form-confirm/scp-form-confirm-flow.js', $('.rhinoforms-formContainer'), this.initialData);
    }
	
}
