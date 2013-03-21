(function( $, window, document ) {
	$(document).ready(function() {
		$('#posts').timeline();

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