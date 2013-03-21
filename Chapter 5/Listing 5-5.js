(function( $, window ) {
	var globals = {
		'timeoutID':       null,// This variable will hold the timeout ID
		'timeoutCanceled': false// We'll use this variable to know if the timeout was canceled or not (so we know if we have to reset it or not).
	};

	var methods = {
		init : function( options ) {

			// ...

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'slider' );

				if ( ! data ) {
					$this.data( 'slider', {
						target : $this
					});

					// ...

					// Start automatically if the setting is set to do so
					if ( options.autoStartSlideshow ) {
						methods.navigateTo.call( this, options, 0 );
						globals.timeoutID = window.setTimeout(function() {
							methods.doLoop.call( this, options );
						}, options.slideTimeoutMilliseconds );
					} else {
						globals.timeoutCanceled = true;
					}
				}
			});
		},

		// ...

		// Method to show slide
		showSlide: function( options, slideIndex ) {
			// ...

			switch ( itemOptions.animationType ) {
				case 'fade':
				default:
					// ...

					// Do animation
					$this.fadeIn( itemOptions.animationSpeed, function() {
						// ...

						// Keep sliding automatically if the setting is set to do so
						if ( ! globals.timeoutCanceled ) {
							globals.timeoutID = window.setTimeout(function() {
								methods.doLoop.call( this, options );
							}, options.slideTimeoutMilliseconds);
						}
					});
				break;
			}
		},

		// ...

		// Method to navigate "left"
		navigateLeft: function( options ) {
			// ...

			if ( slides.length > 0 ) {
				// ...

				// If the navigation was triggered, we need to cancel the slideshow timeout
				methods.cancelTimeout.call( this, options );

				methods.navigateTo.call( this, options, newIndex );
			}
		},

		// Method to navigate "right"
		navigateRight: function( options ) {
			// ...

			if ( slides.length > 0 ) {
				// ...

				// If the navigation was triggered, we need to cancel the slideshow timeout
				methods.cancelTimeout.call( this, options );

				methods.navigateTo.call( this, options, newIndex );
			}
		},

		// Add slideshow method (looping)
		doLoop: function( options ) {
			var slides = $(options.slideWrapperSelector).find( '.' + options.slideClass ),
				currentIndex = slides.siblings( '.' + options.activeSlideClass ).index();

			// There's no need to loop if there's only 1 slide
			if ( slides.length > 1 ) {
				var newIndex = ( currentIndex + 1 );

				// If we're already on the last slide, go to the first
				if ( newIndex > (slides.length - 1) ) {
					newIndex = 0;
				}

				methods.navigateTo.call( this, options, newIndex );
			}
		},

		// Cancel the slideshow timeout
		cancelTimeout: function( options ) {
			if ( globals.timeoutID ) {
				window.clearTimeout( globals.timeoutID );
			}

			globals.timeoutCanceled = true;
		}
	};

	// ...

})( jQuery, window );