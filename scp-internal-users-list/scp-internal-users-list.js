function Widget_scp_internal_users_list() {

	var _this = this;
	var channelUsersLoaded = 'scp-internal-users.users-loaded';
	var channelUserSelected = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelUsersLoaded);
		pw.addListenerToChannel(this, channelUserSelected);
		_this.$ul = $('ul', _this.$widgetDiv);

		$('.usersList', _this.$widgetDiv).on('change', 'input[type=radio]', function() {
			var userId = $(this).closest('li').data('user-id');
			var selectedUser = getUser(userId);
			pw.notifyChannelOfEvent(channelUserSelected, {user: selectedUser});
		});

		$('.add-user-button', _this.$widgetDiv).click(function() {
			$("#modalPopupContent").html("<div class='widget' name='scp-internal-users-add'></div>");
			pw.mount($("#modalPopupContent .widget:first"));
			$("#modalPopupContainer").show();
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUsersLoaded) {
			_this.users = event.users;
			displayUsers(event.users);
		} else if (channel === channelUserSelected) {
			$('li', _this.$widgetDiv).each(function() {
				var $this = $(this);
				if ($this.data('user-id') == event.user.id) {
					$this.find('input[type=radio]').click();
				}
			});
		}
	};

	function displayUsers(users) {
		_this.$ul.empty();
		for (var i = 0; i < users.length; i++) {
			$li = $('<li><input type="radio" name="user">' + users[i].displayName + '</li>');
			$li.data('user-id', users[i].id);
			_this.$ul.append($li);
		}
		$('input:radio:first', _this.$widgetDiv).click();
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