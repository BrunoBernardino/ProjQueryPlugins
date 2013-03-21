(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				'dataType':  'type',// data-* property to check for the field/validation type
				'autoCheck': true,// If true, validate the field when the plugin is initialized
				'fadeSpeed': 'fast'
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'inputValidation' );

				if ( ! data ) {
					$this.data( 'inputValidation', {
						target : $this
					});

					// TODO: Trigger field validation, if autoCheck is true

					// TODO: Bind blur to validate the field

					// TODO: Bind focusing on the field making the error go away
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
			// TODO: Check .data(options.dataType) OR .attr('type') for the type of validation to check for

			// TODO: Check .prop('required') to see if the field is required

			// TODO: Check .attr('maxlength') for the characters limit

			// TODO: Implement required, alphanumeric, alphanumeric-extended, email, url, number, and slug validations
		},

		showError: function( options ) {
			// TODO: Implement showing errors inside the input

			// TODO: Bind clicking on error making the error go away
		},

		hideError: function( options ) {
			// TODO: Implement hiding an error
		},

		hideAllErrors: function( options ) {
			// TODO: Implement hiding all errors
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