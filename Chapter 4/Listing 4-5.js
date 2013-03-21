(function( $, _, window ) {

	// ...

	var globals = {
		galleries:           [],// This array will hold all galeries as objects
		currentGallery:      '',// This will hold the current gallery ID open, if any
		currentGalleryIndex: -1// This wil hold the current gallery index open, if any
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				'lightboxID':                 'lightbox',
				'backgroundClass':            'lightbox-background',
				'wrapperClass':               'lightbox-wrapper',
				'contentClass':               'lightbox-content',
				'closeButtonClass':           'lightbox-close',
				'arrowButtonClass':           'lightbox-arrow',
				'leftArrowButtonAddedClass':  'left',
				'rightArrowButtonAddedClass': 'right',
				'lightboxMainTemplateID':     'templates-lightbox',
				'lightboxImageTemplateID':    'templates-lightbox-image',
				'isModal':                    false,
				'escapeCloses':               true,
				'arrowKeysNavigate':          true,
				'animationType':              'fade',// supports 'fade', 'slide' and 'zoom'
				'animationSpeed':             'fast',
				'openOnComplete':             $.noop,
				'dataLightbox':               'lightboxItemOptions'// data-* property to check for the JSON object with item specific options (gallery, alt)
			};

			options = $.extend( defaults, options );

			// Create the lightbox "holder" if it doesn't exist yet
			methods.create.call( this, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'lightbox' );

				if ( ! data ) {
					var itemDefaults = {
						'gallery': '',// Gallery identification, so that images with this same value belong to the same gallery
						'alt':     ''// Alt attribute for the image in the href
					};

					var itemOptions = $.extend( itemDefaults, $this.data(options.dataLightbox) );

					var imageGalleryIndex = -1;

					// We're going to add this item to the galleries variable if we're supposed to
					if ( itemOptions.gallery.length > 0 ) {
						// Initialize array if it's not set yet
						if ( ! $.isArray(globals.galleries[itemOptions.gallery]) ) {
							globals.galleries[ itemOptions.gallery ] = [];
						}

						// Create the image object
						var imageObject = {
							'src': $this.attr( 'href' ),
							'alt': itemOptions.alt
						};

						// Add the object to the array and get its index
						imageGalleryIndex = globals.galleries[itemOptions.gallery].push( imageObject ) - 1;
					}

					$this.data( 'lightbox', {
						target :      $this,
						options:      itemOptions,
						galleryIndex: imageGalleryIndex
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
			// ...
		},

		// Create the lightbox "holder" if it doesn't exist
		create: function( options ) {
			// Check if the lightbox "holder" exists, if not, create it
			if ( $('#' + options.lightboxID).length > 0 ) {
				return false;
			} else {
				var lightboxHTML = _.template( $('#' + options.lightboxMainTemplateID).html(), {
					'lightboxID':                 options.lightboxID,
					'backgroundClass':            options.backgroundClass,
					'wrapperClass':               options.wrapperClass,
					'closeButtonClass':           options.closeButtonClass,
					'arrowButtonClass':           options.arrowButtonClass,
					'leftArrowButtonAddedClass':  options.leftArrowButtonAddedClass,
					'rightArrowButtonAddedClass': options.rightArrowButtonAddedClass,
					'contentClass':               options.contentClass
				});

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

				if ( options.arrowKeysNavigate ) {
					// Bind Arrow Keys Navigation
					$(document).on( 'keydown.lightbox', function( event ) {
						if ( event.keyCode === 37 ) {// Left
							event.preventDefault();

							methods.navigateLeft.call( this, options );
						} else if ( event.keyCode === 39 ) {// Right
							event.preventDefault();

							methods.navigateRight.call( this, options );
						}
					});
				}

				// Bind Arrow Buttons Navigation
				$('#' + options.lightboxID + ' .' + options.arrowButtonClass).on( 'click.lightbox', function( event ) {
					event.preventDefault();

					if ( $(this).hasClass(options.leftArrowButtonAddedClass) ) {
						methods.navigateLeft.call( this, options );
					} else if ( $(this).hasClass(options.rightArrowButtonAddedClass) ) {
						methods.navigateRight.call( this, options );
					}
				});

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
				data = $this.data( 'lightbox' ),
				itemOptions = data.options,
				itemGalleryIndex = data.galleryIndex;

			// If our plug-in wasn't initialized yet, do nothing
			if ( ! data ) {
				return false;
			}

			// Show the background/overlay
			$('#' + options.lightboxID + '-background').fadeIn( 'fast' );

			// Function to call after the animation is done
			var doAfterAnimationIsDone = function() {
				methods.showImage.call( this, options, itemOptions.gallery, itemGalleryIndex, $this.attr('href'), itemOptions.alt );
			};

			// Open the lightbox
			switch ( options.animationType ) {
				case 'slide':
					var originalMarginTop = $('#' + options.lightboxID).css( 'margin-top' );

					$('#' + options.lightboxID).css({
						'margin-top': ( (($('#' + options.lightboxID).outerHeight() * 2) + parseInt($('#' + options.lightboxID).css('top'), 10)) * -1 ) + 'px',
						'display':    'block',
						'opacity':    0
					}).animate({
						'margin-top': originalMarginTop,
						'opacity':    1
					}, options.animationSpeed, doAfterAnimationIsDone );
				break;
				case 'zoom':
					var originalZoom = $('#' + options.lightboxID).css( 'zoom' );

					$('#' + options.lightboxID).css({
						'zoom':    ( originalZoom / 3 ),
						'display': 'block',
						'opacity': 0
					}).animate({
						'zoom':    originalZoom,
						'opacity': 1
					}, options.animationSpeed, doAfterAnimationIsDone );
				break;
				case 'fade':
				default:
					$('#' + options.lightboxID).fadeIn( options.animationSpeed, doAfterAnimationIsDone );
				break;
			}
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

			// Reset the current gallery and current gallery index
			globals.currentGallery = '';
			globals.currentGalleryIndex = -1;

			// Hide arrows
			$('#' + options.lightboxID + ' .' + options.arrowButtonClass).hide();
		},

		// Method to position the lightbox on the center of the screen
		positionOnCenter: function( options ) {
			// ...
		},

		// Show arrows if there is navigation
		showOrHideArrows: function( options, itemGallery, itemGalleryIndex ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			if ( itemGallery.length > 1 ) {
				if ( itemGalleryIndex >= 0 ) {
					// Show arrows
					$('#' + options.lightboxID + ' .' + options.arrowButtonClass).show();

					// Is it the last image?
					if ( itemGalleryIndex == (globals.galleries[itemGallery].length - 1) ) {
						// Hide right arrow
						$('#' + options.lightboxID + ' .' + options.arrowButtonClass + '.' + options.rightArrowButtonAddedClass).hide();
					}

					// Is it the first image?
					if ( itemGalleryIndex === 0 ) {
						// Hide left arrow
						$('#' + options.lightboxID + ' .' + options.arrowButtonClass + '.' + options.leftArrowButtonAddedClass).hide();
					}
				}
			}
		},

		// Method to show image
		showImage: function( options, itemGallery, itemGalleryIndex, imageSrc, imageAlt ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			// Image preload process
			var objImagePreloader = new Image();
			objImagePreloader.onload = function() {
				// Load the image inside the lightbox
				var generatedID = helpers.generateID.call( this ),
					imageHTML = _.template( $('#' + options.lightboxImageTemplateID).html(), {
						'lightboxID':  options.lightboxID,
						'generatedID': generatedID,
						'imageSrc':    imageSrc,
						'imageAlt':    imageAlt
					});

				$('#' + options.lightboxID + '-content').html( imageHTML );

				// Position the lightbox
				methods.positionOnCenter.call( this, options );

				// Set the current gallery and current gallery index
				globals.currentGallery = itemGallery;
				globals.currentGalleryIndex = itemGalleryIndex;

				// Show arrows if there is navigation
				methods.showOrHideArrows.call( this, options, itemGallery, itemGalleryIndex );

				// clear onLoad, IE behaves irratically with animated gifs otherwise
				objImagePreloader.onload = function() {};

				if ( $.isFunction(options.openOnComplete) ) {
					options.openOnComplete.call( this, options );
				}
			};

			objImagePreloader.src = imageSrc;
		},

		// Method to navigate to an image
		navigateTo: function( options, calledIndex ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			if ( globals.galleries[globals.currentGallery][calledIndex] ) {
				methods.showImage.call( this, options, globals.currentGallery, calledIndex, globals.galleries[globals.currentGallery][calledIndex].src, globals.galleries[globals.currentGallery][calledIndex].alt );
			}
		},

		// Method to navigate "left"
		navigateLeft: function( options ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			if ( globals.currentGallery.length > 0 ) {
				var newIndex = (globals.currentGalleryIndex - 1);

				// If we're already on the first image, do nothing
				if ( newIndex < 0 ) {
					return false;
				}

				methods.navigateTo.call( this, options, newIndex );
			}
		},

		// Method to navigate "right"
		navigateRight: function( options ) {
			// If our plug-in wasn't initialized yet, do nothing
			if ( ! $('#' + options.lightboxID).length ) {
				return false;
			}

			if ( globals.currentGallery.length > 0 ) {
				var newIndex = ( globals.currentGalleryIndex + 1 );

				// If we're already on the last image, do nothing
				if ( newIndex > (globals.galleries[globals.currentGallery].length - 1) ) {
					return false;
				}

				methods.navigateTo.call( this, options, newIndex );
			}
		}
	};

	// ...

})( jQuery, _, window );