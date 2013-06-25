function Widget_scp_internal_users() {

	var _this = this;
	var channelGroupAdded = 'scp-group-add';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelGroupAdded);

		_this.$groupSelect = $('.usergroups', _this.$widgetDiv);

		_this.$groupSelect.change(function() {
			handleGroupSelection();
		});

		$('button', _this.$widgetDiv).click(function() {
			var result = confirm('Are you sure you want to delete "' + _this.currentSelectedRole.name + '"?');
			if (result) {
				var url = "proxy/security/role/delete/" + _this.currentSelectedRole.id;
				$.ajax({type:"DELETE",url:url}).done(function() {
					loadGroups();
					loadUsers();
				});
			}
		});

		$('#myonoffswitch', _this.$widgetDiv).change(function() {
			var isGroups = $(this).prop('checked');
			if (isGroups) {
				$('.users-groups').show();
				$('.users-users').hide();
			} else {
				$('.users-groups').hide();
				$('.users-users').show();
			}
		});

		loadGroups();
		loadUsers();
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelGroupAdded) {
			if (event.success) {
				addRoleToInternalList(event.role);
				populateGroups();
				_this.currentSelectedRole = event.role;
			}
			_this.$groupSelect.val(_this.currentSelectedRole.id);
			handleGroupSelection();
		}
	};

	function loadGroups() {
		$.get('proxy/security/role/all/scp').done(function(rolesArray) {
			_this.roles = rolesArray;
			populateGroups()
		});
	}

	function populateGroups() {
		_this.$groupSelect.empty();
		for (var i = 0; i < _this.roles.length; i++) {
			var $option = $('<option></option>').text(_this.roles[i].name).val(_this.roles[i].id);
			_this.$groupSelect.append($option);
		}
		_this.$groupSelect.append('<option class="action">Add new group...</option>');
		handleGroupSelection();
	}

	function addRoleToInternalList(role) {
		_this.roles.push(role);
		_this.roles.sort(function(a,b) {
			return a.name.localeCompare(b.name);
		});
	}

	function handleGroupSelection() {
		var $selectedOption = $('option:selected', _this.$widgetDiv);
		if ($selectedOption.hasClass('action')) {
			$("#modalPopupContent").html("<div class='widget' name='scp-group-add-dialog'></div>");
			pw.mount($("#modalPopupContent .widget:first"));
			$("#modalPopupContainer").show();
		} else {
			var selectedRoleId = $selectedOption.val();
			console.debug('selectedRoleId=' + selectedRoleId);
			var role = getRole(selectedRoleId);
			pw.notifyChannelOfEvent('scp-internal-users.group-selected', {role: role});
			_this.currentSelectedRole = role;
		}
	}

	function loadUsers() {
		$.get('proxy/security/user/all/scp').done(function(usersArray) {
			_this.users = usersArray;
			pw.notifyChannelOfEvent('scp-internal-users.users-loaded', {users:usersArray});
		});
	}

	function getRole(roleId) {
		for (var i = 0; i < _this.roles.length; i++) {
			if (_this.roles[i].id == roleId) {
				return _this.roles[i];
			}
		}
		return null;
	}

}