$.extend( $.expr[':'], {
	'inline': function( a ) {
		return $(a).css( 'display' ) === 'inline';
	}
});