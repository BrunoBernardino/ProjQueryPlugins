// 1 slideshow with 3 slides, no more.
// Poor animation that won't even loop.
// Also, CSS in JavaScript like this? tsk tsk...

(function( $, window ) {
	$.fn.sampleSlideshow = function() {
		return this.each(function() {
			var $this = $(this),
				data = $this.data( 'sampleSlideshow' );

			if ( ! data ) {
				$this.data( 'sampleSlideshow', {
					target : $this
				});

				$('#slide-1, #slide-2, #slide-3').css( 'position', 'absolute' );

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
			}
		});
	};
})( jQuery, window );