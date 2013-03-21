(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				'leftArrowSelector':    '.slider-nav.left',
				'rightArrowSelector':   '.slider-nav.right',
				'slideWrapperSelector': '.slide-wrapper',
				'slideClass':           'slide',
				'activeSlideClass':     'active',
				'arrowKeysNavigate':    true,
				'animationType':        'fade',// supports 'fade' for now
				'animationSpeed':       'fast',
				'onAnimationComplete':  $.noop,
				'autoStartSlideshow':   true,
				'slideTimeoutMilliseconds': 10000,
				'dataSlide':            'slide'// data-* property to check for the JSON object with slice specific options (animationType, animationSpeed)
			};

			options = $.extend( defaults, options );

			// Bind Arrow Keys Navigation
			if ( options.arrowKeysNavigate ) {
				$(document).on( 'keydown.slider', function( event ) {
					if ( event.keyCode === 37 ) {// Left
						event.preventDefault();

						methods.navigateLeft.call( this, options );
					} else if ( event.keyCode === 39 ) {// Right
						event.preventDefault();

						methods.navigateRight.call( this, options );
					}
				});
			}

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'slider' );

				if ( ! data ) {
					$this.data( 'slider', {
						target : $this
					});

					// Bind Arrow Buttons Navigation
					$this.find( options.leftArrowSelector ).on( 'click.slider', function( event ) {
						event.preventDefault();

						methods.navigateLeft.call( this, options );
					});

					$this.find( options.rightArrowSelector ).on( 'click.slider', function( event ) {
						event.preventDefault();

						methods.navigateRight.call( this, options );
					});
				}
			});
		},

		destroy : function() {
			// ...
		},

		// Method to show slide
		showSlide: function( options, slideIndex ) {
			var slides = $(options.slideWrapperSelector).find( '.' + options.slideClass ),
				currentSlide = slides.siblings( '.' + options.activeSlideClass ),
				currentIndex = currentSlide.index(),
				$this = $( options.slideWrapperSelector ).find( '.' + options.slideClass + ':eq(' + slideIndex + ')' );

			var itemDefaults = {
				'animationType':  options.animationType,
				'animationSpeed': options.animationSpeed
			};

			// Extend the default item options using data-* attribute
			var itemOptions = $.extend(itemDefaults, $this.data( options.dataSlide ));

			switch ( itemOptions.animationType ) {
				case 'fade':
				default:
					// Hide previous slide
					currentSlide.fadeOut( itemOptions.animationSpeed, function() {
						$(this).removeClass( options.activeSlideClass );
					});

					// Do animation
					$this.fadeIn( itemOptions.animationSpeed, function() {
						$(this).addClass( options.activeSlideClass );

						// Trigger onAnimationComplete
						if ( $.isFunction(options.onAnimationComplete) ) {
							options.onAnimationComplete.call( this, options, itemOptions, slideIndex );
						}

						// Show arrows if there is navigation
						methods.showOrHideArrows.call( this, options );
					});
				break;
			}
		},

		// Show arrows if there is navigation
		showOrHideArrows: function( options ) {
			var slides = $(options.slideWrapperSelector).find( '.' + options.slideClass ),
				currentIndex = slides.siblings( '.' + options.activeSlideClass ).index();
			if ( slides.length > 1 ) {
				if ( currentIndex >= 0 ) {
					// Show arrows
					$( options.slideWrapperSelector ).siblings( options.leftArrowSelector + ', ' + options.rightArrowSelector ).show();

					// Is it the last slide?
					if ( currentIndex == (slides.length - 1) ) {
						// Hide right arrow
						$( options.slideWrapperSelector ).siblings( options.rightArrowSelector ).hide();
					}

					// Is it the first slide?
					if ( currentIndex === 0 ) {
						// Hide left arrow
						$( options.slideWrapperSelector ).siblings( options.leftArrowSelector ).hide();
					}
				}
			}
		},

		// Method to navigate to a slide
		navigateTo: function( options, calledIndex ) {
			var slides = $(options.slideWrapperSelector).find( '.' + options.slideClass ),
				currentIndex = slides.siblings( '.' + options.activeSlideClass ).index();
			if ( calledIndex != currentIndex ) {
				methods.showSlide.call( this, options, calledIndex );
			}
		},

		// Method to navigate "left"
		navigateLeft: function( options ) {
			var slides = $(options.slideWrapperSelector).find( '.' + options.slideClass ),
				currentIndex = slides.siblings( '.' + options.activeSlideClass ).index();

			if ( slides.length > 0 ) {
				var newIndex = ( currentIndex - 1 );

				// If we're already on the first slide, do nothing
				if ( newIndex < 0 ) {
					return false;
				}

				methods.navigateTo.call( this, options, newIndex );
			}
		},

		// Method to navigate "right"
		navigateRight: function( options ) {
			var slides = $(options.slideWrapperSelector).find( '.' + options.slideClass ),
				currentIndex = slides.siblings( '.' + options.activeSlideClass ).index();

			if ( slides.length > 0 ) {
				var newIndex = ( currentIndex + 1 );

				// If we're already on the last slide, do nothing
				if ( newIndex > (slides.length - 1) ) {
					return false;
				}

				methods.navigateTo.call( this, options, newIndex );
			}
		}
	};

	$.fn.slider = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.slider' );
		}
	};
})( jQuery, window );