$('.slider').slider({
	'onAnimationComplete': function( options, itemOptions, slideIndex ) {
		$('.slider .slider-bottom-nav span').removeClass( 'active' );
		$('.slider .slider-bottom-nav span:eq(' + slideIndex + ')').addClass( 'active' );
	}
});

$('.slider .slider-bottom-nav span').on( 'click.app', function( event ) {
	event.preventDefault();

	var navIndex = window.parseInt( $(this).data('slide'), 10 );

	$('.slider').slider( 'navigateTo', $('.slider').slider('getOptions'), navIndex );
	$('.slider').slider( 'cancelTimeout' );
});