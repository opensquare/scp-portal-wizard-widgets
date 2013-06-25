// Page Custom JavaScript - (c) Open Square, 2012
// ==============================================
//
// This file should be minified for production use.
//
// By convention, all function names are prefixed by the page name to avoid clashes with other code.
// You should therefore find any functions prefixed with the page name in this file somewhere.
//
// Code here can use the provided pwr jQuery plug-ins - .pwrWidget() and .pwrUtils().

function login_loginEnter(nextWidget){  // Called on submission of login form
	// Should be a built-in pw util function?
	var $loginForm = $("#login-form-enter");
	var loginFormData = $loginForm.serialize();

	$loginForm.parentsUntil('.widget').parent().find('.widget-messages').empty()
	$loginForm.addClass('loading');
	
	$.ajax({
		type: "POST",
		url: "login",
		data: loginFormData,
		dataType: "json",
		
		success: function(data){
			// Forward to next page by url
			//location.pathname = '/' + data.nextWidget;
			window.location = nextWidget;
		},
		
		error: function(XMLHttpRequest, textStatus, errorThrown){
			httpStatus = XMLHttpRequest.status;
			switch (httpStatus) {
				case 401:
					$loginForm.parentsUntil('.widget').parent().first().prepend('<div class="widget-messages"><ul><li>Invalid username or password. Please try again.</li></ul></div>');
					break;
				default:
					$loginForm.parentsUntil('.widget').parent().first().prepend('<div class="widget-messages"><ul><li>Problem while loading ('+httpStatus+')</li></ul></div>');
			}
			//login_logFailedLogin(uid);
		}
	});

	$loginForm.removeClass('loading');
	return false; // stops the form submitting in the normal way
}

function login_loginReset(){  // Called on submission of the password reset form
	// Should be a built-in pw util function?
	var $loginResetForm = $("#login-form-reset");
	var loginResetFormData = $loginResetForm.serialize();

	$loginResetForm.pwrUtils('disableForm').pwrWidget('clearMessages');

	$.ajax({
		type: "POST",
		url: "forgottenPassword",  // TODO - Doesn't seem to exist!
		data: loginResetFormData,
		dataType: "json",
		
		success: function(data){
			login_logForgotPassword();
			$loginResetForm.pwrWidget('addMessage','In a few moments you should receive an email with details of how to reset your password.','info').pwrUtils('enableForm');
			$('#login-form form').toggle();
		},
		
		error: function(XMLHttpRequest, textStatus, errorThrown){
			httpStatus = XMLHttpRequest.status;
			switch (httpStatus) {
				case 400:
					$loginResetForm.pwrWidget('addMessage','Invalid email address. Please check and try again.','info').pwrUtils('enableForm');
					break;
				default:
					$loginResetForm.pwrWidget('addMessage','Problem while loading ('+httpStatus+')','error').pwrUtils('enableForm');
			}
		}
	});
	return false; // stops the form submitting in the normal way
}

function login_logFailedLogin(){  // Log failed login attempts
	// Consider using an analytics based approach instead
	var uid = document.getElementById('username').value;
	var task = 'logFailedLogin';
	login_logSend(task, uid);
}

function login_logForgotPassword(){ // Log "forgot my password" requests
	// Consider using an analytics based approach instead
	var uid = document.getElementById('email').value;
	var task ='logForgotPassword';
	login_logSend(task, uid);
}

function login_logSend(url, task, uid){ // Send by GET to remote location
	// Consider using an analytics based approach instead
	var http = new XMLHttpRequest();
	var url = '';  // Specify remote location
	var params = "task="+task+"&language="+navigator.language+"&product="+navigator.product+"&appVersion="+navigator.appVersion+"&platform="+navigator.platform+"&vendor="+navigator.vendor+"&uid="+uid;

	//http.open("GET", url+"?"+params, true);  // Uncomment these 2 lines to get working
	//http.send(null);
}

