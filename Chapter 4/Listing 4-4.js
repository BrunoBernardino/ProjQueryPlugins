(function( $, window ) {
	var helpers = {
		// Helper function to generate a unique id, GUID-style. Idea from http://guid.us/GUID/JavaScript
		generateID : function() {
			S4 = function() {
				return ( ((1 + window.Math.random()) * 0x10000) | 0 ).toString( 16 ).substring( 1 );
			};

			return ( S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4() ).toLowerCase();
		}
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				'lightboxID':       'lightbox',
				'backgroundClass':  'lightbox-background',
				'wrapperClass':     'lightbox-wrapper',
				'contentClass':     'lightbox-content',
				'closeButtonClass': 'lightbox-close',
				'isModal':          false,
				'escapeCloses':     true
			};

			options = $.extend( defaults, options );

			// Create the lightbox "holder" if it doesn't exist yet
			methods.create.call( this, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'lightbox' );

				if ( ! data ) {
					$this.data( 'lightbox', {
						target : $this
					});

					// Bind click to open the lightbox
					$(this).on( 'click.lightbox', function( event ) {
						event.preventDefault();

						methods.open.call( this, options );
					});
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

		// Create the lightbox "holder" if it doesn't exist
		create: function( options ) {
			// Check if the lightbox "holder" exists, if not, create it
			if ( $('#' + options.lightboxID).length > 0 ) {
				return false;
			} else {
				var lightboxHTML = '<div id="' + options.lightboxID + '-background" class="' + options.backgroundClass + '"></div>' +
					'<div id="' + options.lightboxID + '" class="' + options.wrapperClass + '">' +
					'<span class="' + options.closeButtonClass + '">×</span>' +
					'<div id="' + options.lightboxID + '-content" class="' + options.contentClass + '">' +
					'</div>' +
					'</div>';

				// Append the lightbox to the <body> tag.
				$('body').append( lightboxHTML );

				if ( options.escapeCloses ) {
					// Bind Escape Key to close the lightbox
					$(document).on( 'keydown.lightbox', function( event ) {
						if ( event.keyCode === 27 ) {
							event.preventDefault();

							methods.close.call( this, options );
						}
					});
				}

				// If it's not modal, make sure you can close it clicking outside of it
				if ( ! options.isModal ) {
					$('#' + options.lightboxID + '-background').on( 'click.lightbox', function( event ) {
						methods.close.call( this, options );
					});
				}

				// Bind close button to close the lightbox
				$('#' + options.lightboxID + ' .' + options.closeButtonClass).on( 'click.lightbox', function( event ) {
					event.preventDefault();

					methods.close.call( this, options );
				});

				// Bind window resize to position the lightbox on the center of the window
				$(window).on( 'resize.lightbox', function( event ) {
					methods.positionOnCenter.call( this, options );
				});
			}
		},

		// Method to open the lightbox
		open: function( options ) {
			var $this = $(this),
				data = $this.data( 'lightbox' );

			// If our plug-in wasn't initialized yet, do nothing
			if ( ! data ) {
				return false;
			}

			// Show the background/overlay
			$('#' + options.lightboxID + '-background').fadeIn( 'fast' );

			// Open the lightbox
			$('#' + options.lightboxID).fadeIn( 'fast', function() {
				// Image preload process
				var objImagePreloader = new Image();
				objImagePreloader.onload = function() {
					// Load the image inside the lightbox
					var generatedID = helpers.generateID.call( this ),
						imageHTML = '<img id="' + options.lightboxID + '-img-' + generatedID + '" src="' + $this.attr('href') + '" alt="">';

					$('#' + options.lightboxID + '-content').html( imageHTML );

					// Position the lightbox
					methods.positionOnCenter.call( this, options );

					// clear onLoad, IE behaves irratically with animated gifs otherwise
					objImagePreloader.onload = function() {};
				};

				objImagePreloader.src = $this.attr( 'href' );
			});
		},

		// Method to close the lightbox
		close: function( options ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			// Close the lightbox
			$('#' + options.lightboxID).fadeOut( 'fast', function() {
				// Remove content inside
				$('#' + options.lightboxID + '-content').empty();
			});

			// Hide the background/overlay
			$('#' + options.lightboxID + '-background').fadeOut( 'fast' );
		},

		// Method to position the lightbox on the center of the screen
		positionOnCenter: function( options ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			if ( $('#' + options.lightboxID).length > 0 ) {
				var lightboxWidth = 0,
					lightboxHeight = 0,
					previousLightboxWidth = -5,
					previousLightboxHeight = -5;

				/*
				Since we can "catch" the lightbox changing dimensions, we need to make sure we keep aligning it until it's "still".
				We don't care about variations of 1 pixel, though.
				*/
				while ( window.Math.abs(lightboxWidth - previousLightboxWidth) > 1 || window.Math.abs(lightboxHeight - previousLightboxHeight) > 1 ) {
					previousLightboxWidth = lightboxWidth;
					previousLightboxHeight = lightboxHeight;

					lightboxWidth = $('#' + options.lightboxID).outerWidth();
					lightboxHeight = $('#' + options.lightboxID).outerHeight();

					$('#' + options.lightboxID).css({
						'margin-left': (lightboxWidth / 2 * -1) + 'px',
						'margin-top':  (lightboxHeight / 2 * -1) + 'px'
					});
				}
			}
		}
	};

	// ...

})( jQuery, window );