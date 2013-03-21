(function( $, window, document ) {
	$(document).ready(function() {
		$('#posts').timeline();

		$(document).on( 'submit.timeline-demo', '#add-post form', function( event ) {
			// ...
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

	// ...
})( jQuery, window, document );