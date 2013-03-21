(function( $ ) {
	$.fn.sampleLoadPage = function( page ) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data( 'sampleLoadPage' );

			if ( ! data ) {
				$(this).data( 'sampleLoadPage', {
					target : $this,
					page: page
				});

				$.get( '/getPage', { page: page }, function( data, textStatus, jqXHR ){// Uh-oh. What if the user has the page script at some other URL?
					$('#new-page-content').html( data.htmlContent ).fadeIn( 'fast' );// And what if the element has another ID?
				});// Guessing the dataType, are we?
			}
		});
	};
})( jQuery );