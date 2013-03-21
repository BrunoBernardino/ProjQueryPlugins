 (function( $, bootbox, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				'minLeft':    -500,
				'maxLeft':    500,
				'leftArrowSlideScroll': 50,
				'rightArrowSlideScroll': -50,
				'minDelta': 50,// Minimum delta value
				'slideSpeed': 'fast',
				'onReach':    $.noop,
				'onMinReach': $.noop,
				'onMaxReach': $.noop
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'sampleSideScroll' );

				if ( ! data ) {
					$this.data( 'sampleSideScroll', {
						target : $this,
						options: options
					});

					/*
					This will check for mousewheel, if it's not installed, it'll create an event listener for the left/right arrow keys and throw an error about it.
					*/
					methods.checkForMousewheel.call( this, options );

					$this.on( 'mousewheel.sampleSideScroll', function( event, delta ) {
						if ( delta > 0 ) {// Up/Left
							methods.slideLeft.call( this, event, delta, options );
						} else {
							methods.slideRight.call( this, event, delta, options );
						}
					});
				}
			});
		},

		destroy : function() {
			$(window).off( '.sampleSideScroll' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'sampleSideScroll' );

				$this.removeData( 'sampleSideScroll' );
			});
		},

		error : function( errorMessage ) {
			if ( bootbox ) {
				bootbox.alert( errorMessage );
			} else {
				$.error( errorMessage );
			}
		},

		checkForMousewheel : function( options ) {
			if ( ! $.fn.mousewheel ) {
				$(this).on( 'keydown.sampleSideScroll', function( event ) {
					event.preventDefault();

					if ( event.keyCode === 37 ) {// Left arrow
						$(this).trigger( 'mousewheel.sampleSideScroll', options. leftArrowSlideScroll );
					} else/* if (event.keyCode === 39) {// Right arrow*/ {// Commented because it's really not necessary
						$(this).trigger( 'mousewheel.sampleSideScroll', options. rightArrowSlideScroll );
					}
				});

				methods.error.call( this, 'jQuery Mousewheel was not found! Please install it. Arrow keys will be used instead.' );
			}
		},

		slideLeft : function( event, delta, options ) {
			var widthChange = window.Math.abs( delta ),
				currentLeftPosition = window.parseInt( $(this).css('left'), 10 );

			if ( widthChange < options.minDelta ) {
				widthChange = options.minDelta;
			}

			if ( (currentLeftPosition - widthChange) > options.minLeft ) {
				$(this).stop().animate({
					'left': ( currentLeftPosition - widthChange )
				}, options.slideSpeed );
			} else {
				$(this).stop().animate({
					'left': options.minLeft
				}, options.slideSpeed );

				$(this).off( 'mousewheel.sampleSideScroll' );

				methods.error.call( this, 'No more scrolling to the left. Scrolling is now disabled.' );

				if ( $.isFunction(options.onMinReach) ) {
					options.onMinReach.call( this, options );
				}

				if ( $.isFunction(options.onReach) ) {
					options.onReach.call( this, options );
				}
			}
		},

		slideRight : function( event, delta, options ) {
			var widthChange = window.Math.abs( delta ),
				currentLeftPosition = window.parseInt( $(this).css('left'), 10 );

			if ( widthChange < options.minDelta ) {
				widthChange = options.minDelta;
			}

			if ( (currentLeftPosition + widthChange) < options.maxLeft ) {
				$(this).stop().animate({
					'left': ( currentLeftPosition + widthChange )
				}, options.slideSpeed );
			} else {
				$(this).stop().animate({
					'left': options.maxLeft
				}, options.slideSpeed );

				$(this).off( 'mousewheel.sampleSideScroll' );

				methods.error.call( this, 'No more scrolling to the right. Scrolling is now disabled.' );

				if ( $.isFunction(options.onMaxReach) ) {
					options.onMaxReach.call( this, options );
				}

				if ( $.isFunction(options.onReach) ) {
					options.onReach.call( this, options );
				}
			}
		}
	};

	$.fn.sampleSideScroll = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.sampleSideScroll' );
		}
	};
})( jQuery, bootbox, window );