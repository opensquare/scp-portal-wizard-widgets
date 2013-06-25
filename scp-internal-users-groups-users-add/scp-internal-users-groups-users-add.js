function Widget_scp_internal_users_groups_users_add() {

	var _this = this;
	var channelGroupSelected = 'scp-internal-users.group-selected';
	var channelUsersLoaded = 'scp-internal-users.users-loaded';

	this.onReadyExtend = function() {
		_this.$usersList = $('ul', _this.$widgetDiv);
		pw.addListenerToChannelReplayLast(_this, channelGroupSelected);
		pw.addListenerToChannelReplayLast(_this, channelUsersLoaded);
		showAddibleUsers();

		$('button.cancel', _this.$widgetDiv).click(function() {
			$("#popupContainer").hide();
		});

		$('button.ok', _this.$widgetDiv).click(function() {
			$('input[type=checkbox]:checked', _this.$widgetDiv).each(function() {
				var userId = $(this).closest('li').data('user-id');
				var user = getUser(userId);
				if (typeof user.roles !== undefined) {
					user.roles.push(_this.role);
				} else {
					user.roles = [_this.role];
				}
				$.ajax({
					type:"POST",
					url:"proxy/security/user/update",
					data:JSON.stringify(user),
					dataType:"json",
					contentType:"application/json"}).done(function() {
						pw.notifyChannelOfEvent('scp-internal-users.users-loaded', {users:_this.users});
					});
			});
			$("#popupContainer").hide();
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel == channelGroupSelected) {
			_this.role = event.role;
		} else if (channel == channelUsersLoaded) {
			_this.users = event.users;
		}
	};

	function showAddibleUsers() {
		for (var i = 0; i < _this.users.length; i++) {
			var user = _this.users[i];
			if (!doesUserHaveRole(user, _this.role)) {
				var $li = $('<li><input type="checkbox">' + user.displayName + ' (' + user.username + ')' + '</li>');
				$li.data('user-id', user.id);
				_this.$usersList.append($li);
			}
		}
	}

	function doesUserHaveRole(user, role) {
		if (typeof user.roles !== undefined) {
			for (var i = 0; i < user.roles.length; i++) {
				if (user.roles[i].id == role.id) {
					return true;
				}
			}
		}
		return false;
	}

	function getUser(userId) {
		for (var i = 0; i < _this.users.length; i++) {
			if (_this.users[i].id == userId) {
				return _this.users[i];
			}
		}
		return null;
	}
}