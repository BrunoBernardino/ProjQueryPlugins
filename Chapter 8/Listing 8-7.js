(function( $, _, window ) {
	// ..

	var methods = {
		init : function( options ) {
			var defaults = {
				// ..
				'getURL' : './api/postsList.json',// File with the API response simulation
				'postSelector' : '.post',// Selector for the post elements
				'pointerFixClass' : 'too-close',// Class to fix the pointer position
				'pointerFixHeightDistance' : 25// Number of pixels in height where we'll consider two posts "too close"
			};

			// ...
		},

		// ...

		// Method to list posts
		list : function( postsList ) {
			// ...

			methods.fixPointer.call( this );
		},

		fixPointer : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$(this).find( globals.options.postSelector ).each(function() {
				// We only need to check the posts on the right
				if ( $(this).data( globals.options.dataSide ) === 'right' ) {
					if ( $(this).offset().top - globals.options.pointerFixHeightDistance <= $(this).prev().offset().top ) {
						$(this).addClass( globals.options.pointerFixClass );
					}
				}
			});
		}

		// TODO: Method to add a post

		// TODO: Method to delete post
	};

	// ...
})( jQuery, _, window );