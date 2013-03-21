(function( $, _, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'lightboxImageTemplateID':  'templates-lightbox-image',
				'lightboxIFrameTemplateID': 'templates-lightbox-iframe',
				'lightboxHTMLTemplateID':   'templates-lightbox-html',
				'htmlClass':                'html',
				// ...
				'dataLightbox':             'lightboxItemOptions'// data-* property to check for the JSON object with item specific options (gallery, alt, type)
			};

			// ...

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'lightbox' );

				if ( ! data ) {
					var itemDefaults = {
						'gallery': '',// Gallery identification, so that images with this same value belong to the same gallery
						'alt':     '',// Alt attribute for the image in the href
						'type':    'image'// Item type, can be 'image', 'iframe', or 'html'
					};

					// ...
				}
			});
		},

		// ...

		// Method to open the lightbox
		open: function( options ) {
			// ...

			// Function to call after the animation is done
			var doAfterAnimationIsDone = function() {
				// get itemOptions.type and show image, iframe or HTML
				switch ( itemOptions.type ) {
					case 'iframe':
						methods.showIFrame.call( this, options, $this.attr('href') );
					break;
					case 'html':
						methods.showHTML.call( this, options, $this.attr('href') );
					break;
					case 'image':
					default:
						methods.showImage.call( this, options, itemOptions.gallery, itemGalleryIndex, $this.attr('href'), itemOptions.alt );
					break;
				}
			};

			// Open the lightbox
			// ...
		},

		// ...

		// Method to show iframe
		showIFrame: function( options, iframeURL ) {
			// Load the iframe inside the lightbox
			var generatedID = helpers.generateID.call( this ),
				iframeHTML = _.template( $('#' + options.lightboxIFrameTemplateID).html(), {
					'lightboxID':  options.lightboxID,
					'generatedID': generatedID,
					'iframeURL':   iframeURL
				});

			$('#' + options.lightboxID + '-content').html( iframeHTML );

			// Position the lightbox
			methods.positionOnCenter.call( this, options );

			if ( $.isFunction(options.openOnComplete) ) {
				options.openOnComplete.call( this, options );
			}
		},

		// Method to show HTML
		showHTML: function( options, elementSelector ) {
			// Load the div inside the lightbox
			var generatedID = helpers.generateID.call( this ),
				contentHTML = _.template( $('#' + options.lightboxHTMLTemplateID).html(), {
					'lightboxID':  options.lightboxID,
					'generatedID': generatedID,
					'htmlClass':   options.htmlClass,
					'htmlContent': $( elementSelector ).html()
				});

			$('#' + options.lightboxID + '-content').html( contentHTML );

			// Position the lightbox
			methods.positionOnCenter.call( this, options );

			if ( $.isFunction(options.openOnComplete) ) {
				options.openOnComplete.call( this, options );
			}
		}
	};

	// ...

})( jQuery, _, window );