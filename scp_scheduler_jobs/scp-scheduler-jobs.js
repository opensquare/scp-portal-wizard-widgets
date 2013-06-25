function Widget_scp_scheduler_jobs() {
	this.onReadyExtend = function(){
		$(".actions .title", this.$widgetDiv).click(function(){
			$(this).siblings(".box").slideToggle();
		})
		$("[action='jobResults']", this.$widgetDiv).click(function() {
			var jobName = $(this).attr("jobName")
			$(".resultDiv."+jobName).show();
			pw.notifyChannelOfEvent("schedulerResults", {
				jobName: $(this).attr("jobName")
			});
			return false;
		});
	}
	
}