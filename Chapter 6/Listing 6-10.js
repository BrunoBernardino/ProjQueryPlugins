(function( $, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'animationType': 'fade',// supports 'fade', 'slide', 'horizontal', 'vertical', 'random'
				// ...
			};

			// ...
		},

		// ...

		// Method to show slide
		showSlide: function( options, slideIndex ) {
			// ...

			var animationType = null;

			// If the itemOptions.animationType is random, get a random animation
			if ( itemOptions.animationType == 'random' ) {
				var animationsList = [ 'fade', 'slide', 'horizontal', 'vertical' ],
				randomIndex = window.Math.floor( window.Math.random() * animationsList.length );

				animationType = animationsList[ randomIndex ];
			} else {
				animationType = itemOptions.animationType;
			}

			switch ( animationType ) {
				// ...
			}
		},

		// ...
	};

	// ...

})( jQuery, window );