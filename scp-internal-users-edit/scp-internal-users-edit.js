function Widget_scp_internal_users_edit() {

	var _this = this;
	var channelUsersLoaded = 'scp-internal-users.users-loaded';
	var channelUserSelected = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		_this.$usernameField = $('.username-field', _this.$widgetDiv);
		_this.$displayNameField = $('.display-name-field', _this.$widgetDiv);
		_this.$okButton = $('.ok-button', _this.$widgetDiv);

		pw.addListenerToChannelReplayLast(_this, channelUsersLoaded);
		pw.addListenerToChannelReplayLast(_this, channelUserSelected);

		_this.$usernameField.keyup(function() {
			validateFields();
		});

		_this.$displayNameField.keyup(function() {
			validateFields();
		});

		$('.cancel-button', _this.$widgetDiv).click(function() {
			$('#modalPopupContainer').hide();
		});

		_this.$okButton.click(function() {
			var username = _this.$usernameField.val();
			var displayName = _this.$displayNameField.val();
			_this.user.username = username;
			_this.user.displayName = displayName;
			$.ajax({
				type:"POST",
				url:"proxy/security/user/update",
				data:JSON.stringify(_this.user),
				contentType:"application/json"}).done(function(user) {
					$('#modalPopupContainer').hide();
					for (var i = 0; i < _this.users.length; i++) {
						if (_this.users[i].id == _this.user.id) {
							_this.users[i].username = username;
							_this.users[i].displayName = displayName;
						}
					}
					pw.notifyChannelOfEvent(channelUsersLoaded, {users:_this.users});
					//pw.notifyChannelOfEvent(channelUserSelected, {user: _this.user});
				});
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUsersLoaded) {
			_this.users = event.users;
		} else if (channel === channelUserSelected) {
			_this.user = event.user;
			_this.$usernameField.val(_this.user.username);
			_this.$displayNameField.val(_this.user.displayName);
		}
	};

	function validateFields() {
		var isValid = true;
		var username = _this.$usernameField.val();
		var displayName = _this.$displayNameField.val();

		if (username.length === 0) {
			isValid = false;
			_this.$usernameField.addClass("error");
		} else {
			_this.$usernameField.removeClass("error");
			for (var i = 0; i < _this.users.length; i++) {
				if (_this.users[i].id != _this.user.id && _this.users[i].username === username) { // username already taken
					isValid = false;
					_this.$usernameField.addClass("error");
				}
			}
		}

		if (displayName.length === 0) {
			isValid = false;
			_this.$displayNameField.addClass("error");
		} else {
			_this.$displayNameField.removeClass("error");
		}

		if (isValid) {
			_this.$okButton.removeAttr("disabled");
		} else {
			_this.$okButton.attr("disabled", "disabled")
		}
	}
}