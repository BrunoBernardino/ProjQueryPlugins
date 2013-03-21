$.extend( $.expr[':'], {
	'match': function( element, idx, matches ) {
		var parametersRegEx = /^([^=]+)(?:=)(?:\"|\')?\/(.*)\/([^\"\']+)?(?:\"|\')?$/;// This is the regular expression that will separate our attr=/regexp/ with the variations including quotes, single quotes, and no quotes.

		var parameters = matches[3].match( parametersRegEx );

		if ( ! parameters || ! parameters[1] || ! parameters[2] ) {
			$.error( 'The filter expression is invalid. Please use :match(attr="/RegExp/")' );
			return false;
		}

		var queryAttribute = parameters[1];
		var queryRegExModifiers = parameters[3] ? parameters[3] : '';
		/*
		We need a way to get forward slashes in the RegExp, but it would be too complicated to implement it in the parametersRegEx, so we make it possible for the user to use [FS] in the RegExp, that will then be replaced with the forward slashes.
		*/
		var queryRegEx = new RegExp( parameters[2].replace( /(\[FS\])/g, '\/' ), queryRegExModifiers );

		return queryRegEx.test( $(element).attr(queryAttribute) );
	}
});