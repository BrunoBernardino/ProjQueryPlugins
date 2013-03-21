(function( $, window ) {
	var methods = {

		init : function( options ) {
			var defaults = {
				// default properties go here
			};

			options = $.extend(defaults, options);

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'pluginSkeleton' );

				// If the plugin hasn't been initialized yet
				if ( ! data ) {
					$(this).data( 'pluginSkeleton', {
						target : $this
						// Add some more data
					});
				}
			});
		},

		destroy : function() {
			$(window).off( '.pluginSkeleton' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'pluginSkeleton' );

				// That's right, namespaced events!
				$this.removeData( 'pluginSkeleton' );
			});
		}

		// Add more methods here
	};

	$.fn.pluginSkeleton = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.pluginSkeleton' );
		}
	};
})( jQuery, window );