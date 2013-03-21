(function( $, window ) {
	// TODO: Helper to generate IDs
	var methods = {
		init : function( options ) {
			var defaults = {};// TODO: Set the defaults for animation speed, data-* attribute for the tool-tip position, etc.

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'toolTip' );

				if ( ! data ) {
					$this.data( 'toolTip', {
						target : $this
					});

					// TODO: Create the tool-tip

					// TODO: Bind the show on mouse in/hover

					// TODO: Bind the hide on mouse out
				}
			});
		},

		destroy : function() {
			$(window).off( '.toolTip' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'toolTip' );

				$this.removeData( 'toolTip' );
			});
		}
		// TODO: Method to show the tool-tip

		// TODO: Method to hide the tool-tip

		// TODO: Method to hide all the tool-tips
	};

	$.fn.toolTip = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.toolTip' );
		}
	};
})( jQuery, window );