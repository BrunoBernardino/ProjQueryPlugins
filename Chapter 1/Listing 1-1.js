(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'helloWorld' );

				// If the plugin hasn't been initialized yet
				if ( ! data ) {
					$this.data( 'helloWorld', {
						target : $this
					});
					methods.print.apply( this );
				}
			});
		},

		destroy : function() {
			$(window).off( '.helloWorld' );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'helloWorld' );

					$this.removeData( 'helloWorld' );
			});
		},

		print : function() {
			var $this = $(this);
			$this.text( 'Hello World!' );
		}
	};

	$.fn.helloWorld = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.helloWorld' );
		}
	};
})( jQuery, window );