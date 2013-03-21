(function( $, window ) {

	// TODO: Helper to generate IDs

	var methods = {
		init : function( options ) {
			var defaults = {
				'lightboxID':   'lightbox',
				'isModal':      false,
				'escapeCloses': true
			};

			options = $.extend( defaults, options );

			// Create the lightbox "holder" if it doesn't exist yet
			methods.create.call( this, options );

			if ( options.escapeCloses ) {
				// TODO: Bind Escape Key to close the lightbox
			}

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'lightbox' );

				if ( ! data ) {
					$this.data( 'lightbox', {
						target : $this
					});

					// TODO: Bind click to open the lightbox
				}
			});
		},

		destroy : function() {
			$(window).off( '.lightbox' );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'lightbox' );

				$this.removeData( 'lightbox' );
			});
		},

		// TODO: Create the lightbox "holder" if it doesn't exist
		create: function( options ) {
			// TODO: Check if the lightbox "holder" exists, if not, create it

			// TODO: Append the lightbox to the <body> tag.
		}

		// TODO: Method to open the lightbox

		// TODO: Method to close the lightbox

		// TODO: Method to position the lightbox on the center of the screen
	};

	$.fn.lightbox = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.lightbox' );
		}
	};
})( jQuery, window );