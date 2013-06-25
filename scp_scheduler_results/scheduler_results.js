function Widget_scp_scheduler_results() {
	
	var currentJob;
	
	this.initExtend = function() {
		this.logLimitedUrl = this.$widgetDiv.attr("logLimitedUrl");
		this.logFileUrl = this.$widgetDiv.attr("logFileUrl");
		this.outputLimitedUrl = this.$widgetDiv.attr("outputLimitedUrl");
		this.outputFileUrl = this.$widgetDiv.attr("outputFileUrl");
		pw.addListenerToChannel(this, "schedulerResults");
	}
	
	this.handleEvent = function(channel, event) {
		currentJob = event.jobName
		this.parameterMap.query =  "job_name='" + event.jobName + "'"
		this.parameterMap.offset = 0;
		this.parameterMap.limit = 10;
		this.loadHTML();
	}
	
	this.onReadyExtend = function(){
		var widgetObject = this
		$(".urlDecode", this.$widgetObject).each(function() {
			$this = $(this);
			$this.html(widgetObject._utf8_decode(unescape($this.html().replace(/\+/g, " "))));
		})
		
		// move widget contents to job entry
		var content = this.$widgetDiv.find(".widget-content").html();
		var $outputDiv = $(".resultDiv." + currentJob, ".widget.scp_scheduler_jobs");
		$outputDiv.html(content);
		this.$widgetDiv.find(".widget-content").hide().empty();
		
		// assign click events to moved content
		$(".close a", $outputDiv).click(function(){
			$outputDiv.hide().empty();
			return false;
		});
		$("[action='changePage']", $outputDiv).click(function() {
			widgetObject.parameterMap.offset = $(this).attr("page");
			widgetObject.loadHTML();
			return false;
		});
		$("a[action='viewLog']", $outputDiv).each(function() {
			var $viewLogLink = $(this);
			var href = widgetObject.getLogUrl({
				jobName: $viewLogLink.attr("jobName"), 
				fireTime: $viewLogLink.attr("fireTime"), 
				fireTimeNice: $viewLogLink.attr("fireTimeNice"),
				type: $viewLogLink.attr("type")
				});
			$viewLogLink.attr("href",href);
		});
	}
	
	this.getLogUrl = function(params) {
		var limitedUrl;
		var fileUrl;
		var title;
		if (params.type == "output") {
			limitedUrl = this.outputLimitedUrl;
			fileUrl = this.outputFileUrl;
			title = "Output"
		} else {
			limitedUrl = this.logLimitedUrl;
			fileUrl = this.logFileUrl;
			title = "Report"
		}
		limitedUrl = this.replaceUrl(limitedUrl, params);
		fileUrl = this.replaceUrl(fileUrl, params);
		
		return fileUrl;
		
	}
	
	this.replaceUrl = function(url, event) {
		return url.replace("{jobName}", event.jobName).replace("{fireTime}", event.fireTime)
	}
	
	this._utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
}