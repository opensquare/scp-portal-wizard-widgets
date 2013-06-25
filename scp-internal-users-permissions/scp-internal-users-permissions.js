function Widget_scp_internal_users_permissions() {

	var _this = this;
	var channelGroupSelected = 'scp-internal-users.group-selected';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelGroupSelected);
		$('.save-button', _this.$widgetDiv).click(function() {
			saveRole();
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelGroupSelected) {
			_this.role = event.role;
			populatePermissions(event.role.id);
		}
	};

	function populatePermissions(groupId) {
		$.get('proxy/security/permission/all/scp').done(function(permissionArray) {
			var $permissionsList = $('ul', _this.$widgetDiv);
			$permissionsList.empty();
			for (var i = 0; i < permissionArray.length; i++) {
				var permissionId = permissionArray[i].id;
				var $listItem = $('<li>' + permissionArray[i].name + '<input type="checkbox"' + (hasPermissionFromRole(permissionId) ? ' checked="checked"' : '')  + '"></li>');
				$listItem.data('id', permissionId);
				$permissionsList.append($listItem);
			}
		});
	}

	function hasPermissionFromRole(permissionId) {
		for (var i = 0; i < _this.role.permissions.length; i++) {
			var permission = _this.role.permissions[i];
			if (permission.id == permissionId) {
				return true;
			}
		}
		return false;
	}

	function saveRole() {
		_this.role.permissions = [];
		$('li', _this.$widgetDiv).each(function() {
			var $li = $(this);
			if ($li.find('input').attr('checked') == 'checked') {
				_this.role.permissions.push({"id":$li.data('id')});
			}
		});
		$.ajax({
			type:"POST",
			url:"proxy/security/role/update",
			data:JSON.stringify(_this.role),
			dataType:"json",
			contentType:"application/json"}).done(function() {
				alert("Permissions saved.");
		});
	}
}