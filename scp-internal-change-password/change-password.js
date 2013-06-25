function Widget_scp_internal_change_password(){
	
	this.initExtend = function(){
		var argsString = this.$widgetDiv.attr("page.args");
        args = argsString.split("&");
        argMap = {}
        for(i in args){
            arg = args[i];
            tokens = arg.split("=");
            aName = tokens[0];
            aValue = tokens[1];
            argMap[aName] = aValue;
        }
		this.setParameters({userId: argMap.id});
	}
}