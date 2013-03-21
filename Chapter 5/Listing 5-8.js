(function( $, window ) {
	var globals = {
		// ...
		'options': {}
	};

	var methods = {
		init : function( options ) {
			// ...

			options = $.extend( defaults, options );

			globals.options = options;

			// ...
		},

		destroy : function() {
			// ...
		},

		getOptions : function() {
			return globals.options;
		},

		// ...
	};

	// ...

})( jQuery, window );