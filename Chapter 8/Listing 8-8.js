(function( $, _, window ) {
	// ...

	var methods = {
		// ...

		// Method to list posts
		list : function( postsList ) {
			// ...

			methods.fixPosition.call( this );

			methods.fixPointer.call( this );
		},

		fixPointer : function() {
			// ...
		},

		fixPosition : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$(this).find( globals.options.postSelector ).each(function() {
				var previousPosition, beforePreviousPosition, prevSide, prevAltSide, newSide;

				prevSide = $(this).prev().data( globals.options.dataSide );

				// The previous post's previous post only interests us when it's for the alternate side
				if ( prevSide === 'left' ) {
					prevAltSide = 'right';
				} else {
					prevAltSide = 'left';
				}

				// We only need to start checking at post #3, as the first and second posts will always start at the same height
				if ( $(this).prev().length === 1 && $(this).prev().prevAll('[data-' + globals.options.dataSide + '="' + prevAltSide + '"]').length > 0 ) {
					previousPosition = $(this).prev().offset().top + $(this).prev().outerHeight();
					beforePreviousPosition = $(this).prev().prevAll('[data-' + globals.options.dataSide + '="' + prevAltSide + '"]').offset().top + $(this).prev().prevAll('[data-' + globals.options.dataSide + '="' + prevAltSide + '"]').outerHeight();

					// If the end point of the previous post is smaller than that post's previous post, we change this post's side to the same as the previous
					if ( previousPosition < beforePreviousPosition ) {
						newSide = $(this).prev().data( globals.options.dataSide );
					} else {
						// We need to enforce the alternating sides because if one change happens, all the following would need to be fixed every time
						if ( prevSide === 'left' ) {
							newSide = 'right';
						} else {
							newSide = 'left';
						}
					}

					$(this).data( globals.options.dataSide, newSide );
					$(this).attr( 'data-' + globals.options.dataSide, newSide );// We need to change the attribute, because of the CSS rule we use
				}
			});
		}

		// TODO: Method to add a post

		// TODO: Method to delete post
	};

	// ...
})( jQuery, _, window );