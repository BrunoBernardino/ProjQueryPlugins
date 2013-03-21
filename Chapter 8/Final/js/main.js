(function( $, window, document ) {
	$(document).ready(function() {
		$('#posts').timeline({
			listPostProcess: function() {// We need this because of the animations "timelapse"
				window.setTimeout(function() {
					$('#posts').timeline( 'postProcessing', document.getElementById('posts') );
				}, 450 );// 400 is the number of milliseconds it takes to finish the animation, the extra 50 is just to be safe
			},
			addPostProcess: function() {
				$('#add-post .loading').stop().fadeOut( 'fast' );
			}
		});

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

			$('#add-post .loading').stop().fadeIn( 'fast' );

			// We don't need the following timeout, but since our demo is static, this will happen so fast that we wouldn't get to see the loading
			window.setTimeout(function() {
				$('#posts').timeline( 'addPost', post );
			}, 500 );
		});

		$(document).on( 'click.timeline-demo', '#posts .post .actions .delete', function( event ) {
			event.preventDefault();

			var anchorElement = event.target;
			var postElement = $(anchorElement).closest( '.post' );

			var goOn = window.confirm( 'Are you sure you want to delete this post?' );

			if ( goOn ) {
				$('#posts').timeline( 'deletePost', postElement.data('id') );
			}
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