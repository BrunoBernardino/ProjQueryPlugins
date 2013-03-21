(function( $, window, document ) {
	$(document).ready(function() {
		$('#posts').timeline({
			listPostProcess: function() {// We need this because of the animations "timelapse"
				// ...
			},
			addPostProcess: function() {
				$('#add-post .loading').stop().fadeOut( 'fast' );
			}
		});

		// ...
	});

	// ...
})( jQuery, window, document );