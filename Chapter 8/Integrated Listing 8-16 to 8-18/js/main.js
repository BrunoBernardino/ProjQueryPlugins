(function( $, window, document ) {
	$(document).ready(function() {
		$('#posts').timeline();

		$(document).on( 'submit.timeline-demo', '#add-post form', function( event ) {
			event.preventDefault();

			var formElement = event.target;

			if ( $(formElement).find('textarea[name="status-update"]').val().length === 0 ) {
				window.alert( 'You need to write something!' );
			}

			var post = {
				"name": "Bruno Bernardino",// This value is static, but should be obtained by an hidden input or could be filled by the backend app
				"avatar": "https://raw.github.com/BrunoBernardino/ProjQueryPlugins/master/assets/me.png",// This value is static, but should be obtained by an hidden input or could be filled by the backend app
				"date": new Date().toISOString(),
				"content": $(formElement).find('textarea[name="status-update"]').val(),
				"image": $(formElement).find('input[name="media"]').val()
			};

			$('#posts').timeline( 'addPost', post );
		});

		$(window).on( 'scroll.timeline-demo', function( event ) {
			scrollWatch();
		});
	});

	var scrollWatch = function() {
		// We only need to check while the loading is visible, since it's hidden from the plug-in once it reaches the last page
		if ( $('#posts .loading:visible').length === 1 ) {
			if ( $(document).scrollTop() >= ($(document).height() - $(window).height() - 200) ) {
				$('#posts').timeline( 'getNextPage' );
			}
		}
	};
})( jQuery, window, document );