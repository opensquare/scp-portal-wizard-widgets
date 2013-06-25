function Widget_scp_internal_users_profile() {

	var _this = this;
	var channelUsersLoaded = 'scp-internal-users.users-loaded';
	var channelUserSelected = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelUserSelected);
		pw.addListenerToChannel(this, channelUsersLoaded);

		$('.change-password-button', _this.$widgetDiv).click(function() {
			$("#modalPopupContent").html("<div class='widget' name='scp-internal-users-password-change'></div>");
			pw.mount($("#modalPopupContent .widget:first"));
			$("#modalPopupContainer").show();
		});

		$('.edit-button', _this.$widgetDiv).click(function() {
			$("#modalPopupContent").html("<div class='widget' name='scp-internal-users-edit'></div>");
			pw.mount($("#modalPopupContent .widget:first"));
			$("#modalPopupContainer").show();
		});

		$('.delete-button', _this.$widgetDiv).click(function() {
			if (confirm('Are you sure you want to delete user "' + _this.user.displayName + '"?')) {
				$.ajax({
					type:"DELETE",
					url:"proxy/security/user/delete/" + _this.user.id
				}).done(function() {
						for (var i = 0; i < _this.users.length; i++) {
							if (_this.users[i].id == _this.user.id) {
								_this.users.splice(i, 1);
								break;
							}
						}
						pw.notifyChannelOfEvent(channelUsersLoaded, {users: _this.users});
					});
			}
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUserSelected) {
			_this.user = event.user;
			displayUser(event.user);
		} else if (channel === channelUsersLoaded) {
			_this.users = event.users;
		}
	};

	function displayUser(user) {
		$('.username', _this.$widgetDiv).html(user.username);
		$('.displayName', _this.$widgetDiv).html(user.displayName);
		var groups = "";
		for (var i = 0; i < user.roles.length; i++) {
			if (groups.length > 0) {
				groups += ", ";
			}
			groups += user.roles[i].name;
		}
		if (groups.length === 0) {
			groups = "-";
		}
		$('.groups', _this.$widgetDiv).html(groups);
	}
}