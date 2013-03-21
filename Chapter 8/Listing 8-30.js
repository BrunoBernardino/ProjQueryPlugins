(function( $, window, document ) {
	$(document).ready(function() {
		$('#posts').timeline({
			listPostProcess: function() {// We need this because of the animations "timelapse"
				window.setTimeout(function() {
					$('#posts').timeline( 'postProcessing', document.getElementById('posts') );
				}, 450 );// 400 is the number of milliseconds it takes to finish the animation, the extra 50 is just to be safe
			}
		});

		// ...
	});

	// ...
})( jQuery, window, document );