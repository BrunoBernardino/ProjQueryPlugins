(function( $, window ) {
	// ...

			// Check if the field is required and empty
			if ( isRequired && fieldValue.length === 0 ) {
				methods.showError.call( this, {
					'title': $.i18n._( options.errorRequiredTitle ),
					'help': $.i18n._( options.errorRequiredHelp )
				}, options );

				return false;
			}

			// Check if the field has a maximum length that's being exceeded
			if ( maxLength > 0 && fieldValue.length > maxLength ) {
				methods.showError.call( this, {
					'title': $.i18n._( options.errorMaxLengthTitle ),
					'help': $.i18n._( options.errorMaxLengthHelp, [maxLength] )
				}, options );

				return false;
			}

	// ...

			var generatedID = helpers.generateID.call( this ),
				errorID = 'inputValidation-error-' + generatedID,
				errorHTML = '<div id="' + errorID + '" class="' + options.errorClass + '" title="' + $.i18n._(errorData.help) + '">' + $.i18n._(errorData.title) + '</div>';

	// ...

})( jQuery, window );