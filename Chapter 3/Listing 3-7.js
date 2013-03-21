(function( $, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'toolTipClass':   'toolTip',
				'position':       'above',// Supports 'above', 'below', 'left' and 'right'
				'positionMargin': 10,
				'animationType':  'fade',// Supports 'fade' and 'slide'
				// ...
			};

			// ...
		},

		// ...

		create: function( options ) {
			// ...

			if ( ! options.followMouse ) {

				// ...

				// Position the tool-tip to the left, right, above, or below the element
				switch( chosenPosition ) {
					case 'left':
						marginTop = ( dummyElement.outerHeight() * -1 );
						marginLeft = ( (dummyElement.outerWidth() + options.positionMargin) * -1 );
					break;
					case 'right':
						marginTop = ( dummyElement.outerHeight() * -1 );
						marginLeft = dummyElement.outerWidth() + options.positionMargin;
					break;
					// ...
				}

				// ...

				// Store these values, as we might need them
				data.marginLeft = $('#' + toolTipID).css( 'margin-left' );
				data.marginTop = $('#' + toolTipID).css( 'margin-top' );

				// Remove the dummy element
				dummyElement.remove();
			}
		},

		show: function( options ) {
			var $this = $(this),
				data = $this.data( 'toolTip' );

			var toolTipElement = $('#' + data.toolTipID);

			// Animate tool-tip showing
			switch( options.animationType ) {
				case 'slide':
					var finalMarginLeft = parseInt( data.marginLeft, 10 );

					toolTipElement.stop().css({
						'opacity': 0,
						'display': 'block',
						'margin-left': ( finalMarginLeft - (options.positionMargin * 2) )
					}).animate({
						'opacity': 1,
						'margin-left': finalMarginLeft
					}, options.animationSpeed, options.animationEasing, options.animationOnComplete );
				break;
				case 'fade':
				default:
					toolTipElement.stop().fadeIn( options.animationSpeed, options.animationEasing, options.animationOnComplete );
				break;
			}
		},

		// ...

	};

	// ...
})( jQuery, window );