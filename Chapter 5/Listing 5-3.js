(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				// TODO: We'll need navigation arrow selectors, slide wrapper class, slide class, active class, if the arrow keys should navigate or not, etc.

				// TODO: Thinking about the future, we should also set a default for animation type, speed and a callback when the image loads

				// TODO: Also get settings per slide using a data-* attribute. We may not need that right away, but we know we will in the future
			};

			options = $.extend( defaults, options );

			// TODO: Bind Arrow Keys Navigation

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'slider' );

				if ( ! data ) {
					$this.data( 'slider', {
						target : $this
					});

					// TODO: Bind Arrow Buttons Navigation
				}
			});
		},

		destroy : function() {
			$(window).off( '.slider' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'slider' );

				$this.removeData( 'slider' );
			});
		},

		// TODO: Method to show slide
		showSlide: function( options, slideIndex ) {
		},

		// TODO: Method to navigate to a slide
		navigateTo: function( options, calledIndex ) {
		},

		// TODO: Method to navigate "left"
		navigateLeft: function( options ) {
		},

		// TODO: Method to navigate "right"
		navigateRight: function( options ) {
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