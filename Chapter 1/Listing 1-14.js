// The absolute positioning (or whatever the user wants/needs) goes in an external CSS file.
(function( $, window ) {
	var flags = {
		'slideTimeout': null// This will be used to have the timeout "globally", so it can be cancelled.
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				'fadeSpeed':     'fast',
				'slideSelector': '.slide',
				'slideTime':     2000,
				'activeClass':   'active',
				'loop':          true,// If true, when the end or start is reached, it'll continue looping, otherwise it'll just stop there.
				'autoShowNext':  true// If true, show next element on load and so on.
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'sampleSlideshow' );

				if ( ! data ) {
					$this.data( 'sampleSlideshow', {
						target : $this,
						options: options
					});

					/*
					When an element is clicked, the slideshow will stop. This should actually be another option so a different element could be set as the "stopper", but if we do it like that this example will get too big to prove its point :)
					*/

					$this.find(options.slideSelector).on( 'click.sampleSlideshow', function( event ) {
						window.clearTimeout( flags.slideTimeout );
					});

					// Show first slide
					methods.goToSlide.call( this, 0, options );
				}
			});
		},

		destroy : function() {
			$(window).off( '.sampleSlideshow' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'sampleSlideshow' );

				$this.removeData( 'sampleSlideshow' );
			});
		},

		// 0-based index
		goToSlide : function( slideIndex, options ) {
			var $this = $(this),
				slideCount = $this.find( options.slideSelector ).length,
				activeSlide = $this.find( options.slideSelector + '.' + options.activeClass ),
				activeSlideIndex = $this.find( options.slideSelector).index(activeSlide );

			if ( slideIndex < 0 || slideIndex > (slideCount - 1) || slideIndex === activeSlideIndex ) {
				if ( ! options.loop || slideIndex === activeSlideIndex ) {
					$.error( 'Invalid slideIndex Requested' );
					return false;
				} else if ( slideIndex < 0 ) {
					slideIndex = slideCount - 1;
				} else if ( slideIndex > (slideCount - 1) ) {
					slideIndex = 0;
				}
			}

			// We could have callbacks here for the fadeOut and fadeIn also
			$this.find( options.slideSelector )
				.removeClass( options.activeClass )
				.fadeOut( options.fadeSpeed )
				.eq( slideIndex )
				.addClass( options.activeClass )
				.fadeIn( options.fadeSpeed );

			// Set a Timeout to show the next slide
			if ( options.autoShowNext ) {
				flags.slideTimeout = window.setTimeout(function() {
					methods.nextSlide.call( $this, options );
				}, options.slideTime );
			}
		},

		prevSlide : function( options ) {
			var activeSlide = $(this).find( options.slideSelector + '.' + options.activeClass ),
				activeSlideIndex = $(this).find(options.slideSelector).index( activeSlide );

			methods.goToSlide.call( this, activeSlideIndex - 1, options );
		},

		nextSlide : function( options ) {
			var activeSlide = $(this).find( options.slideSelector + '.' + options.activeClass ),
				activeSlideIndex = $(this).find(options.slideSelector).index( activeSlide );

			methods.goToSlide.call( this, activeSlideIndex + 1, options );
		}
	};

	$.fn.sampleSlideshow = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.sampleSlideshow' );
		}
	};
})( jQuery, window );