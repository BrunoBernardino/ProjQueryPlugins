(function( $, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'animationType': 'fade',// supports 'fade', 'slide'
				// ...
			};

			// ...
		},

		// ...

		// Method to show slide
		showSlide: function( options, slideIndex ) {
			// ...

			switch ( itemOptions.animationType ) {
				case 'slide':
					// Hide previous slide
					currentSlide.slideUp( itemOptions.animationSpeed, function() {
						$(this).removeClass( options.activeSlideClass );
					});

					// Do animation
					$this.slideDown( itemOptions.animationSpeed, function() {
						$(this).addClass( options.activeSlideClass );

						// Trigger onAnimationComplete
						if ( $.isFunction(options.onAnimationComplete) ) {
							options.onAnimationComplete.call( this, options, itemOptions, slideIndex );
						}

						// Show arrows if there is navigation
						methods.showOrHideArrows.call( this, options );

						// Keep sliding automatically if the setting is set to do so
						if ( ! globals.timeoutCanceled ) {
							globals.timeoutID = window.setTimeout(function() {
								methods.doLoop.call( this, options );
							}, options.slideTimeoutMilliseconds );
						}
					});
				break;
				case 'fade':
				default:
					// ...
				break;
			}
		},

		// ...
	};

	// ...

})( jQuery, window );