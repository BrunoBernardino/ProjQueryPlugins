(function( $, window ) {

	// ...

	$('#slide-1').fadeIn( 'fast', function() {
		window.setTimeout(function() {
			$('#slide-1').fadeOut( 'fast' );
			$('#slide-2').fadeIn( 'fast', function() {
				window.setTimeout(function() {
					$('#slide-2').fadeOut( 'fast' );
					$('#slide-3').fadeIn( 'fast' );
				}, 2000 );
			});
		}, 2000 );
	});

	// ...

})( jQuery, window );