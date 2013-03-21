// Using jQuery Mousewheel 3.0.6 (https://raw.github.com/brandonaaron/jquery-mousewheel/master/jquery.mousewheel.js) by Brandon Aaron

// Using Twitter Bootstrap's Javascript 2.1.1 (https://github.com/twitter/bootstrap)

// Using Bootbox 2.4.1 (http://bootboxjs.com/)

(function( $, window ) {
	$.fn.sampleSideScroll = function( page ) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data( 'sampleSideScroll' );

			if ( ! data ) {
				$(this).data( 'sampleSideScroll', {
					target : $this
				});

				$(this).on( 'mousewheel', function( event, delta ) {// What if there's no mousewheel?
					var widthChange = window.Math.abs( delta ),
						currentLeftPosition = window.parseInt( $(this).css('left'), 10 );

					if ( delta > 0 ) {// Up/Left
						if ( (currentLeftPosition - widthChange) > -500 ) {// A constant
							$(this).stop().animate({
								'left': ( currentLeftPosition - widthChange )
							}, 100 );// Again, speed is not a variable here
						} else {
							$(this).stop().animate({
								'left': -500// Another constant
							}, 100 );

							$(this).off( 'mousewheel' );

							bootbox.alert( 'No more scrolling to the left. Scrolling is now disabled.' );// What if there's no bootbox?
						}
					} else {// Down/Right
						if ( (currentLeftPosition + widthChange) < 500 ) {
							$(this).stop().animate({
								'left': ( currentLeftPosition + widthChange )
							}, 100 );
						} else {
							$(this).stop().animate({
								'left': 500
							}, 100 );

							$(this).off( 'mousewheel' );

							bootbox.alert( 'No more scrolling to the right. Scrolling is now disabled.' );
						}
					}
				});
			}
		});
	};
})( jQuery, window );