(function( $, window ) {
	// ..

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'autoStartSlideshow': true,
				'usejQueryMobile':    true,
				// ...
			};

			// ...

			// Check if jQuery Mobile is available
			if ( options.usejQueryMobile && $.mobile ) {
				// Bind swipe left
				$(document).on( 'swipeleft.slider', function( event ) {
					event.preventDefault();

					methods.navigateLeft.call( this, options );
				});

				// Bind swipe right
				$(document).on('swiperight.slider', function( event ) {
					event.preventDefault();

					methods.navigateRight.call( this, options );
				});
			}

			return this.each(function() {

				// ...

			});
		},

		// ...
	};

	// ...

})( jQuery, window );