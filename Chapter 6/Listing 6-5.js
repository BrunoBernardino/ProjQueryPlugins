(function( $, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'animationType': 'fade',// supports 'fade', 'slide', 'horizontal', 'vertical'
				// ...
			};

			// ...
		},

		// ...

		// Method to show slide
		showSlide: function( options, slideIndex ) {

			// ...

			switch ( itemOptions.animationType ) {
				case 'vertical':
					var currentNewCSS = {},// This will hold the current slide's animation CSS
						currentInitialCSS = {},// This will hold the current slide's initial CSS
						nextForceCSS = {},// This will hold the "next" slide's forced CSS
						nextNewCSS = {};// This will hold the "next" slide's animation CSS

					currentInitialCSS = {
						'margin-top': $this.css( 'margin-top' )
					};

					// Figure out if the new slide comes from the top or from the bottom
					if ( currentIndex > slideIndex ) {// New slide comes from the top
						currentNewCSS = {
							'margin-top': window.parseInt( currentSlide.css('margin-top'), 10 ) + currentSlide.outerHeight()
						};
						nextForceCSS = {
							'margin-top': window.parseInt( $this.css('margin-top'), 10 ) + ( currentSlide.outerHeight() * -1 )
						};
						nextNewCSS = {
							'margin-top': window.parseInt( $this.css('margin-top'), 10 )
						};
					} else {// New slide comes from the bottom
						currentNewCSS = {
							'margin-top': window.parseInt( currentSlide.css('margin-top'), 10 ) + ( currentSlide.outerHeight() * -1 )
						};
						nextForceCSS = {
							'margin-top': window.parseInt( $this.css('margin-top'), 10 ) + currentSlide.outerHeight()
						};
						nextNewCSS = {
							'margin-top': window.parseInt( $this.css('margin-top'), 10 )
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

				// ...
			}
		},

		// ...
	};

	// ...

})( jQuery, window );