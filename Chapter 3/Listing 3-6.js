(function( $, window ) {

	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'followMouse': true
			};

			// ...

			return this.each(function() {
				// ...

				if ( ! data ) {
					// ...

					if ( options.followMouse ) {
						// Bind the chaseCursor in mouse move
						$(this).on( 'mousemove.toolTip', function( event ) {
							methods.chaseCursor.call( this, event, options );
						});
					}
				}
			});
		},

		// ...

		create: function( options ) {
			// ...

			// Check if there is a position set in the element
			if ( $this.data(options.dataPosition) ) {
				chosenPosition = $this.data( options.dataPosition );
			}

			if ( ! options.followMouse ) {

				// Get the real element's width & height, by creating a dummy clone inline element with the same content and using it as reference
				var dummyElement = $this.clone().css({
					'display': 'inline',
					'visibility': 'hidden'
				}).appendTo( 'body' );

				// ...

				// Remove the dummy element
				dummyElement.remove();
			}
		},

		// ...

		chaseCursor: function( event, options ) {
			var $this = $(this),
				data = $this.data( 'toolTip' ),
				chosenPosition = options.position,
				topPosition = 0,
				leftPosition = 0;

			// Check if there is a position set in the element
			if ( $this.data(options.dataPosition) ) {
				chosenPosition = $this.data( options.dataPosition );
			}

			var toolTipElement = $('#' + data.toolTipID);

			leftPosition = event.pageX + options.positionMargin;

			switch( chosenPosition ) {
				case 'below':
					topPosition = event.pageY + options.positionMargin;
				break;
				case 'above':
				default:
					topPosition = event.pageY - options.positionMargin - toolTipElement.outerHeight();
				break;
			}

			toolTipElement.css({
				'top': topPosition,
				'left': leftPosition
			});
		}
	};

	// ...

})( jQuery, window );