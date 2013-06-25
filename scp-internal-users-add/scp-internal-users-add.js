function Widget_scp_internal_users_add() {

	var _this = this;
	var channelUsersLoaded = 'scp-internal-users.users-loaded';
	var channelUserSelected = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		_this.$usernameField = $('.username-field', _this.$widgetDiv);
		_this.$displayNameField = $('.display-name-field', _this.$widgetDiv);
		_this.$passwordField = $('.password-field', _this.$widgetDiv);
		_this.$passwordConfirmField = $('.confirm-password-field', _this.$widgetDiv);
		_this.$okButton = $('.ok-button', _this.$widgetDiv);

		pw.addListenerToChannelReplayLast(_this, channelUsersLoaded);

		_this.$usernameField.keyup(function() {
			validateFields();
		});

		_this.$displayNameField.keyup(function() {
			validateFields();
		});

		_this.$passwordField.keyup(function() {
			validateFields();
		});

		_this.$passwordConfirmField.keyup(function() {
			validateFields();
		});

		$('.cancel-button', _this.$widgetDiv).click(function() {
			$('#modalPopupContainer').hide();
		});

		_this.$okButton.click(function() {
			var username = _this.$usernameField.val();
			var displayName = _this.$displayNameField.val();
			var password = _this.$passwordConfirmField.val();
			var data = {"username":username, "displayName":displayName, "password":password};
			$.ajax({
				type:"POST",
				url:"proxy/security/user/add",
				data:JSON.stringify(data),
				contentType:"application/json"}).done(function(user) {
					$('#modalPopupContainer').hide();
					_this.users.push(user);
					_this.users.sort(function(a,b) {
						var textA = a.displayName.toLowerCase();
						var textB = b.displayName.toLowerCase();
						return textA<textB ? -1 : textA>textB ? 1 : 0;
					});
					pw.notifyChannelOfEvent(channelUsersLoaded, {users:_this.users});
					pw.notifyChannelOfEvent(channelUserSelected, {user: user});
				});
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUsersLoaded) {
			_this.users = event.users;
		}
	};

	function validateFields() {
		var isValid = true;
		var username = _this.$usernameField.val();
		var displayName = _this.$displayNameField.val();
		var newPassword = _this.$passwordField.val();
		var newPasswordConfirmation = _this.$passwordConfirmField.val();

		if (username.length === 0) {
			isValid = false;
			_this.$usernameField.addClass("error");
		} else {
			_this.$usernameField.removeClass("error");
			for (var i = 0; i < _this.users.length; i++) {
				if (_this.users[i].username === username) { // username already taken
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

		if (newPassword.length === 0) {
			isValid = false;
			_this.$passwordField.addClass("error");
		} else {
			_this.$passwordField.removeClass("error");
		}

		if (newPasswordConfirmation.length > 0 && newPassword === newPasswordConfirmation) {
			_this.$passwordConfirmField.removeClass("error");
		} else {
			isValid = false;
			_this.$passwordConfirmField.addClass("error");
		}
		if (isValid) {
			_this.$okButton.removeAttr("disabled");
		} else {
			_this.$okButton.attr("disabled", "disabled")
		}
	}
}