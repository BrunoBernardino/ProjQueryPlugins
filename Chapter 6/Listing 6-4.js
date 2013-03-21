(function( $, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'animationType': 'fade',// supports 'fade', 'slide', 'horizontal'
				// ...
			};

			// ...
		},

		// ...

		// Method to show slide
		showSlide: function( options, slideIndex ) {
			// ...

			// For easier addition and management of animations, we're putting the common actions after the animation in a function
			var commonActionsAfterAnimation = function() {
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
			};

			switch ( itemOptions.animationType ) {
				case 'horizontal':
					var currentNewCSS = {},// This will hold the current slide's animation CSS
						currentInitialCSS = {},// This will hold the current slide's initial CSS
						nextForceCSS = {},// This will hold the "next" slide's forced CSS
						nextNewCSS = {};// This will hold the "next" slide's animation CSS

					currentInitialCSS = {
						'margin-left': $this.css('margin-left')
					};

					/*
					Figure out if the new slide comes from the left or from the right
					We need window.parseInt() to make sure the margin comes as a number.
					We need the ,10 argument in it to make sure we're getting a 10-base/decimal number
					*/
					if ( currentIndex > slideIndex ) {// New slide comes from the left
						currentNewCSS = {// We calculate margin left + slide width
							'margin-left': window.parseInt( currentSlide.css('margin-left'), 10 ) + currentSlide.outerWidth()
						};
						nextForceCSS = {// We calculate margin left - slide width 
							'margin-left': window.parseInt( $this.css('margin-left'), 10 ) + ( currentSlide.outerWidth() * -1 )
						};
						nextNewCSS = {
							'margin-left': window.parseInt( $this.css('margin-left'), 10 )
						};
					} else {// New slide comes from the right
						currentNewCSS = {// We calculate margin left + slide width
							'margin-left': window.parseInt( currentSlide.css('margin-left'), 10 ) + ( currentSlide.outerWidth() * -1 )
						};
						nextForceCSS = {
							'margin-left': window.parseInt( $this.css('margin-left'), 10 ) + currentSlide.outerWidth()
						};
						nextNewCSS = {
							'margin-left': window.parseInt( $this.css('margin-left'), 10 )
						};
					}

					// Animate previous slide
					currentSlide.animate( currentNewCSS, itemOptions.animationSpeed, function() {
						$(this).removeClass( options.activeSlideClass );
						$(this).hide();
						$(this).css( currentInitialCSS );
					});

					// Do animation
					$this.show().css( nextForceCSS ).animate( nextNewCSS, itemOptions.animationSpeed, function() {
						$(this).addClass( options.activeSlideClass );

						commonActionsAfterAnimation.call( this );
					});
				break;
				case 'slide':
					// ...

					// Do animation
					$this.slideDown( itemOptions.animationSpeed, function() {
						$(this).addClass( options.activeSlideClass );

						commonActionsAfterAnimation.call( this );
					});
				break;
				case 'fade':
				default:
					// ...

					// Do animation
					$this.fadeIn( itemOptions.animationSpeed, function() {
						$(this).addClass( options.activeSlideClass );

						commonActionsAfterAnimation.call( this );
					});
				break;
			}
		},

		// ...
	};

	// ...

})( jQuery, window );