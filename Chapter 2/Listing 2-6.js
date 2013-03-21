(function( $, window ) {
	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				'dataType':            'type',// data-* property to check for the field/validation type
				'dataErrorTitle':      'errorTitle',// data-* property to check for the error title
				'dataErrorHelp':       'errorHelp',// data-* property to check for the error help
				'errorRequiredTitle':  'Required',
				'errorRequiredHelp':   'This field is required.',
				'errorMaxLengthTitle': 'Too Big',
				'errorMaxLengthHelp':  "This field's value is too big. The maximum number of characters for it is {maxLength}.",
				'autoCheck':           true,// If true, validate the field when the plugin is initialized
				'errorClass':          'inputValidation-error',
				'position':            'inside',// Supports 'inside' and 'outside'
				'animation': {
					'type':       'fade',// Supports 'fade' and 'slide'
					'speed':      'fast',
					'easing':     'swing',
					'onComplete': $.noop,
					'extra': {
						'margin': 3// Integer, the number of pixels to be "inside" or "outside" the input
					}
				}
			};

			// ...
		},

		// ...

		validate: function( options ) {

			// ...

			// Check if the field is required and empty
			if ( isRequired && fieldValue.length === 0 ) {
				methods.showError.call( this, {
					'title': options.errorRequiredTitle,
					'help': options.errorRequiredHelp
				}, options );

				return false;
			}

			// Check if the field has a maximum length that's being exceeded
			if ( maxLength > 0 && fieldValue.length > maxLength ) {
				methods.showError.call( this, {
					'title': options.errorMaxLengthTitle,
					'help': options.errorMaxLengthHelp.replace( '{maxLength}', maxLength )
				}, options );

				return false;
			}

			return true;
		},

		showError: function( errorData, options ) {
			var $this = $(this);

			// Check if an error already exists for the element, if so, do nothing
			if ( $this.siblings('.' + options.errorClass).length ) {
				return true;
			}

			// Check if the input has a user-defined error title and help (and we're not checking for the global required and maxlength errors)
			if ( $this.data(options.dataErrorTitle) && errorData.title != options.errorRequiredTitle && errorData.title != options.errorMaxLengthTitle ) {
				errorData.title = $this.data( options.dataErrorTitle );
			}

			if ( $this.data(options.dataErrorHelp) && errorData.help != options.errorRequiredHelp && errorData.help != options.errorMaxLengthHelp ) {
				errorData.help = $this.data( options.dataErrorHelp );
			}

			var generatedID = helpers.generateID.call( this ),
				errorID = 'inputValidation-error-' + generatedID,
				errorHTML = '<div id="' + errorID + '" class="' + options.errorClass + '" title="' + errorData.help + '">' + errorData.title + '</div>';

			// Add error inside input
			$this.after( errorHTML );

			// Position error inside or outside
			switch( options.position ) {
				case 'outside':
					$('#' + errorID).css({
						'margin-left': $this.outerWidth() + options.animation.extra.margin
					});
				break;
				case 'inside':
				default:
					$('#' + errorID).css({
						'margin-left': $this.outerWidth() - $('#' + errorID).outerWidth() - options.animation.extra.margin
					});
				break;
			}

			// Animate Error Showing
			switch( options.animation.type ) {
				case 'slide':
					$('#' + errorID).slideDown( options.animation.speed, options.animation.easing, options.animation.onComplete );
				break;
				case 'fade':
				default:
					$('#' + errorID).fadeIn( options.animation.speed, options.animation.easing, options.animation.onComplete );
				break;
			}

			// Bind clicking on error make the error go away
			$('#' + errorID).on( 'click.inputValidation', function( event ) {
				event.preventDefault();

				methods.hideError.call( $this, options );
			});
		},

		hideError: function( options ) {
			// Animate Error Hiding
			switch( options.animation.type ) {
				case 'slide':
					$(this).siblings('.' + options.errorClass).slideUp( options.animation.speed, options.animation.easing, function() {
						$(this).remove();
					});
				break;
				case 'fade':
				default:
					$(this).siblings('.' + options.errorClass).fadeOut( options.animation.speed, options.animation.easing, function() {
						$(this).remove();
					});
				break;
			}

		},

		hideAllErrors: function( options ) {
			// Animate Error Hiding
			switch( options.animation.type ) {
				case 'slide':
					$('.' + options.errorClass).slideUp( options.animation.speed, options.animation.easing, function() {
						$(this).remove();
					});
				break;
				case 'fade':
				default:
					$('.' + options.errorClass).fadeOut( options.animation.speed, options.animation.easing, function() {
						$(this).remove();
					});
				break;
			}
		}
	};

	// ...

})( jQuery, window );