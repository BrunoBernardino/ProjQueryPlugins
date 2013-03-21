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
				'dataType':    'type',// data-* property to check for the field/validation type
				'autoCheck':   true,// If true, validate the field when the plugin is initialized
				'fadeSpeed':   'fast',
				'errorClass':  'inputValidation-error',
				'rightMargin': 3// Integer, the number of pixels to be "inside" the input
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'inputValidation' );

				if ( ! data ) {
					$this.data( 'inputValidation', {
						target : $this
					});

					// Trigger field validation, if autoCheck is true
					if ( options.autoCheck ) {
						methods.validate.call( this, options );
					}

					// Bind blur to validate the field
					$(this).on( 'blur.inputValidation', function() {
						methods.validate.call( this, options );
					});

					// Bind focusing on the field making the error go away
					$(this).on( 'focus.inputValidation', function() {
						methods.hideError.call( this, options );
					});
				}
			});
		},

		destroy : function() {
			$(window).off( '.inputValidation' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'inputValidation' );

				$this.removeData( 'inputValidation' );
			});
		},

		validate: function( options ) {
			var $this = $(this),
				validationType = '',
				isRequired = false,
				maxLength = 0,
				fieldValue = $(this).val(),
				validationRegularExpression = null;

			// Check .data(options.dataType) OR .attr('type') for the type of validation to check for
			switch ( $this.attr('type') ) {
				case 'email':
				case 'url':
				case 'number':
					validationType = $this.attr( 'type' );
				break;
				case 'tel':
					validationType = 'alphanumeric-extended';
				break;
				case 'text':
				default:
					switch ( $this.data(options.dataType) ) {
						case 'alphanumeric':
						case 'alphanumeric-extended':
						case 'email':
						case 'url':
						case 'number':
						case 'slug':
							validationType = $this.data( options.dataType );
						break;
					}
				break;
			}

			// Check .prop('required') to see if the field is required
			if ( $this.prop('required') ) {
				isRequired = true;
			}

			// Check .attr('maxlength') for the characters limit
			if ( $this.attr('maxlength') ) {
				maxLength = window.parseInt( $this.attr('maxlength'), 10 );
			}

			// If there's no validation type, the field isn't required, and no maximum length to check for, there's nothing to validate.
			if ( validationType === '' && ! isRequired && maxLength <= 0 ) {
				return true;
			}

			// Make the actual validations for the type
			switch( validationType ) {
				case 'alphanumeric':
					validationRegularExpression = /[^a-z0-9]/gi;

					if ( validationRegularExpression.test(fieldValue) ) {
						methods.showError.call( this, {
							'title': 'Invalid',
							'help': "This field's value isn't alphanumeric. It must consist only of numbers and/or (non-special) letters."
						}, options );

						return false;
					}
				break;
				case 'alphanumeric-extended':
					/*
					This regular expression will only match Basic Latin and Latin-1 Supplement special letters, but you can change it to support any kind of special characters how you wish. Here's a nice website to help you get the range you need: http://kourge.net/projects/regexp-unicode-block
					*/
					validationRegularExpression = /[^\u0000-\u00FFa-z0-9\-\._ ]/gi;

					if ( validationRegularExpression.test(fieldValue) ) {
						methods.showError.call( this, {
							'title': 'Invalid',
							'help': "This field's value isn't alphanumeric. It must consist only of numbers, letters, dots, underscores, dashes and spaces."
						}, options );

						return false;
					}
				break;
				case 'email':
					/*
					No need for a super complicated expression here. Note this is an expression of what it should be, not what it shouldn't.
					*/
					validationRegularExpression = /^\S+@\S+\.\S+$/g;

					if ( fieldValue.length > 0 && ! validationRegularExpression.test(fieldValue) ) {
						methods.showError.call( this, {
							'title': 'Invalid',
							'help': "This field's value isn't an email. It must be a valid email address."
						}, options );

						return false;
					}
				break;
				case 'url':
					validationRegularExpression = /^(http|ftp|https):\/\/\S+\.\S+$/gi;// No need for a super complicated expression here. Note this is an expression of what it should be, not what it shouldn't.

					if ( fieldValue.length > 0 && ! validationRegularExpression.test(fieldValue) ) {
						methods.showError.call( this, {
							'title': 'Invalid',
							'help': "This field's value isn't an URL. It must be a valid URL and start with http://, for example."
						}, options );

						return false;
					}
				break;
				case 'number':
					validationRegularExpression = /[^\d]/g;

					if ( validationRegularExpression.test(fieldValue) ) {
						methods.showError.call( this, {
							'title': 'Invalid',
							'help': "This field's value isn't a number. It must be a valid natural number."
						}, options );

						return false;
					}
				break;
				case 'slug':
					validationRegularExpression = /[^a-z0-9\-_]/g;

					if ( validationRegularExpression.test(fieldValue) ) {
						methods.showError.call( this, {
							'title': 'Invalid',
							'help': "This field's value isn't a valid slug. It must consist only of numbers, lowercase (non-special) letters, underscores and dashes."
						}, options );

						return false;
					}
				break;
			}

			// Check if the field is required and empty
			if ( isRequired && fieldValue.length === 0 ) {
				methods.showError.call( this, {
					'title': 'Required',
					'help': 'This field is required.'
				}, options );

				return false;
			}

			// Check if the field has a maximum length that's being exceeded
			if ( maxLength > 0 && fieldValue.length > maxLength ) {
				methods.showError.call( this, {
					'title': 'Too Big',
					'help': "This field's value is too big. The maximum number of characters for it is " + maxLength + "."
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

			var generatedID = helpers.generateID.call( this ),
				errorID = 'inputValidation-error-' + generatedID,
				errorHTML = '<div id="' + errorID + '" class="' + options.errorClass + '" title="' + errorData.help + '">' + errorData.title + '</div>';

			// Add error inside input, position it inside, on the right, and show it
			$this.after( errorHTML );

			$('#' + errorID)
				.css({
					'margin-left': $this.outerWidth() - $('#' + errorID).outerWidth() - options.rightMargin
				})
				.fadeIn( options.fadeSpeed );

			// Bind clicking on error make the error go away
			$('#' + errorID).on( 'click.inputValidation', function( event ) {
				event.preventDefault();

				methods.hideError.call( $this, options );
			});
		},

		hideError: function( options ) {
			$(this).siblings('.' + options.errorClass).fadeOut( options.fadeSpeed, function() {
				$(this).remove();
			});
		},

		hideAllErrors: function( options ) {
			$('.' + options.errorClass).fadeOut( options.fadeSpeed, function() {
				$(this).remove();
			});
		}
	};

	$.fn.inputValidation = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.inputValidation' );
		}
	};
})( jQuery, window );