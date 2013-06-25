function Widget_scp_group_add_dialog() {

	var _this = this;
	var channelGroupAdded = 'scp-group-add';

	this.onReadyExtend = function() {

		$('.cancel-button', _this.$widgetDiv).click(function() {
			$('#modalPopupContainer').hide();
			pw.notifyChannelOfEvent(channelGroupAdded, {success:false});
		});

		$('.ok-button', _this.$widgetDiv).click(function() {
			var roleName = $('input.addGroup', _this.$widgetDiv).val();
			var roleNameWithPrefix = 'scp.' + roleName;
			var role = {"name":roleNameWithPrefix};
			$.ajax({
				type:"POST",
				url:"proxy/security/role/add",
				data:JSON.stringify(role),
				dataType:"json",
				contentType:"application/json"}).done(function(savedRole) {
					savedRole.name = roleName; // don't want the prefix for display.
					$('#modalPopupContainer').hide();
					pw.notifyChannelOfEvent(channelGroupAdded, {"success":true, "role":savedRole});
				});
		});
	};
}