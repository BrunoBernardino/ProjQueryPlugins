(function( $, window ) {
	$.fn.sampleSlideDownAndAlert = function() {
		return this.each(function() {
			var $this = $(this),
				data = $this.data( 'sampleSlideDownAndAlert' );

			if ( ! data ) {
				$(this).data( 'sampleSlideDownAndAlert', {
					target : $this
				});

				$this.slideDown( 'fast', function() {// Uh-oh. How will the user change this 'fast' without changing the code?
					window.alert( 'Yup! This is happening... An alert()!' );

					$('.show-after-slide-down').show();// What if I want to show something else? Or do something else?
				});
			}
		});
	};
})( jQuery, window );