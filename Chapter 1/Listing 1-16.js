(function( $, window ) {

	// ...

	$('.slide:eq(0)').fadeIn( 'fast', function() {
		window.setTimeout(function() {
			$('.slide:eq(0)').fadeOut( 'fast' );
			$('.slide:eq(1)').fadeIn( 'fast', function() {
				window.setTimeout(function() {
					$('.slide:eq(1)').fadeOut( 'fast' );
					$('.slide:eq(2)').fadeIn( 'fast' );
				}, 2000 );
			});
		}, 2000 );
	});

	// ...

})( jQuery, window );