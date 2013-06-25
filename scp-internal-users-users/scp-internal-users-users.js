function Widget_scp_internal_users_users() {

	var _this = this;
	var channelUsersLoaded = 'scp-internal-users.users-loaded';
	var channelGroupSelected = 'scp-internal-users.group-selected';

	this.onReadyExtend = function() {
		_this.$ul = $('ul', _this.$widgetDiv);
		pw.addListenerToChannel(this, channelUsersLoaded);
		pw.addListenerToChannel(this, channelGroupSelected);

		$(_this.$ul).on('click','button.scp-group-remove-user',function() {
			var userId = $(this).closest('li').data('user-id');
			var user = getUser(userId);
			removeRoleFromUser(user, _this.role);
			if (confirm('Are you sure you want to remove "' + user.displayName + '" from the ' + _this.role.name + ' group?')) {
				$.ajax({
					type:"POST",
					url:"proxy/security/user/update",
					data:JSON.stringify(user),
					dataType:"json",
					contentType:"application/json"}).done(function() {
						pw.notifyChannelOfEvent('scp-internal-users.users-loaded', {users:_this.users});
					});
			}
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUsersLoaded) {
			_this.users = event.users;
			refreshDisplayedUsers();
		} else if (channel == channelGroupSelected) {
			_this.role = event.role;
			refreshDisplayedUsers();
		}
	};

	function refreshDisplayedUsers() {
		if (typeof _this.role !== 'undefined' && typeof _this.users !== 'undefined') {
			_this.$ul.empty();
			for (var i = 0; i < _this.users.length; i++) {
				var user = _this.users[i];
				if (doesUserHaveRole(user, _this.role)) {
					var $li = $('<li>' + user.displayName + '<button class="scp-group-remove-user">Remove</button></li>');
					$li.data('user-id', user.id);
					_this.$ul.append($li);
				}
			}
		}
	}

	function doesUserHaveRole(user, role) {
		for (var i = 0; i < user.roles.length; i++) {
			if (user.roles[i].id == role.id) {
				return true;
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

	function removeRoleFromUser(user, roleToRemove) {
		var roleToRemoveIndex = 0;
		for (var i = 0; i < user.roles.length; i++) {
			if (user.roles[i].id == roleToRemove.id) {
				roleToRemoveIndex = i;
				break;
			}
		}
		user.roles.splice(roleToRemoveIndex, 1);
	}
}