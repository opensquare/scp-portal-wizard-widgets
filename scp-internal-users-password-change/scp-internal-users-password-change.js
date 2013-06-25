function Widget_scp_internal_users_password_change() {

	var _this = this;
	var userSelectedChannel = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		_this.$passwordField = $('.change-password', _this.$widgetDiv);
		_this.$passwordConfirmField = $('.change-password-confirm', _this.$widgetDiv);
		_this.$okButton = $('.ok-button', _this.$widgetDiv);

		var passwordRegexAttr = _this.$widgetDiv.attr('passwordregex');
		_this.passwordRegex = passwordRegexAttr === "{passwordRegex}" ? ".*" : passwordRegexAttr;

		pw.addListenerToChannelReplayLast(_this, userSelectedChannel);

		_this.$passwordField.keyup(function() {
			if (checkPasswordFormat()) {
				checkPasswordFieldsMatch();
			}
		});

		_this.$passwordConfirmField.keyup(function() {
			checkPasswordFieldsMatch();
		});

		$('.cancel-button', _this.$widgetDiv).click(function() {
			$('#modalPopupContainer').hide();
		});

		_this.$okButton.click(function() {
			var newPassword = _this.$passwordConfirmField.val();
			var data = {"id":_this.user.id, "password":newPassword};
			$.ajax({
				type:"POST",
				url:"proxy/security/user/changePassword",
				data:JSON.stringify(data),
				contentType:"application/json"}).done(function() {
					$('#modalPopupContainer').hide();
				});
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === userSelectedChannel) {
			_this.user = event.user;
		}
	};

	function checkPasswordFieldsMatch() {
		var newPassword = _this.$passwordField.val();
		var newPasswordConfirmation = _this.$passwordConfirmField.val();
		if (newPassword === newPasswordConfirmation) {
			_this.$passwordConfirmField.removeClass("error");
			_this.$okButton.removeAttr("disabled");
		} else {
			_this.$passwordConfirmField.addClass("error");
			_this.$okButton.attr("disabled", "disabled")
		}
	}

	function checkPasswordFormat() {
		var password = _this.$passwordField.val();
		var pattern = new RegExp(_this.passwordRegex,"g");
		if (pattern.test(password)) {
			console.log("regex match");
			_this.$passwordField.removeClass("error");
			_this.$okButton.removeAttr("disabled");
			return true;
		} else {
			console.log("regex miss");
			_this.$passwordField.addClass("error");
			_this.$okButton.attr("disabled", "disabled")
			return false;
		}
	}
}