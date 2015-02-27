(function($) {

	$.extend(_99d, {

		init: function() {
			$('a.login').click(_99d.login);
			$('a.register').click(_99d.register);
			$('form.login').submit(_99d.login);
			$('#colorbox').on('click', 'a.loginWithFB', _99d.loginWithFB);
			$('#colorbox').on('submit', 'form.ajax', _99d.sendAjax);
		},

		login: function() {
			if (!_99d.settings.logged_in) {
				_99d.loginSource = $(this);
				$.colorbox({
					"html": $("#login_window").html()
				});
				return false;
			}
		},

		loginWithFB: function() {
			if (!_99d.settings.facebook.logged_in) {
				FB.login(function(response) {
					if (response.authResponse) {
						_99d.isLoggedIn();
					}
				});
			} else {
				_99d.isLoggedIn();
			}
			return false;
		},

		isLoggedIn: function() {
			_99d.settings.logged_in = true;
			FB.api('/me', function(response) {
				$(document).bind('cbox_closed', function() {
					_99d.llamar();
					$(document).unbind('cbox_closed');
				});
				$.colorbox.close();
			});
		},

		register: function() {
			$.colorbox({
				"html": $("#register_window").html(),
				"onComplete": function () {
					$("#colorbox .registerLocation").select2(searchSetup);
				}
			});

			return false;
		},

		sendAjax: function() {
			var localTarget = $(this).data('local-target');
			var remoteTarget = $(this).data('remote-target');
			$(localTarget).load($(this).attr('action') + ' ' + remoteTarget, $(this).serialize(), $.colorbox.resize);
			return false;
		},

		llamar: function() {
			var e = _99d.loginSource;
			$('.login').removeClass('login');
			if (e.is('a')) {
				if (e.hasClass('ajax')) {
					e.unbind('click', _99d.login);
				} else {
					window.location.href = e.attr('href');
				}
				return;
			}
			if (e.is('form')) {
				e.submit();
				return;
			}
			_99d.loginSource = null;
		}

	});

})(jQuery);