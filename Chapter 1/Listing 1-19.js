(function( $ ) {

	// ...

	var generatedID = new Date().getTime();

	var html = '<input type="text" class="search" id="search-' + generatedID + '" name="search" value="" placeholder="Search">';

	$('.search-wrapper').append( html );

	// ...

})( jQuery );