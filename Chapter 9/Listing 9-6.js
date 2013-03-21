$.extend( $.expr[':'], {
	'data': function( element, idx, matches ) {
		var parametersRegEx = /^([^=]+)(?:=)?(\"|\')?(.+?)?(?:\"|\')?$/;// This is the regular expression that will separate our property=value with the variations including quotes, single quotes, and no quotes.

		var parameters = matches[3].match( parametersRegEx );

		if ( ! parameters || ! parameters[1] ) {
			$.error( 'The filter expression is invalid. Please use :data(property), :data(property=BooleanORInteger) OR :data(property="value")' );
			return false;
		}

		var queryProperty = parameters[1];

		if ( ! parameters[3] ) {
			// We're just trying to see if the data property exists or not
			return ( $(element).data(queryProperty) !== undefined );
		} else {
			// We're looking for a specific value
			if ( ! parameters[2] ) {
				// We're looking at a boolean or integer
				if ( /^(true|false)$/.test(parameters[3]) ) {
					// We're looking for a boolean
					if ( parameters[3] === 'true' ) {
						return ( $(element).data(queryProperty) === true );
					} else {
						return ( $(element).data(queryProperty) === false );
					}
				} else {
					// We're looking for an integer
					var queryInteger = window.parseInt( parameters[3], 10 );

					if ( window.isNaN(queryInteger) ) {
						$.error( 'The filter expression is invalid. Format used is :data(property=BooleanORInteger), but the value is not a valid boolean nor integer' );
						return false;
					}

					return ( $(element).data(queryProperty) === queryInteger );
				}
			} else {
				// We're looking for a string
				return ( $(element).data(queryProperty) === parameters[3] );
			}
		}
	}
});