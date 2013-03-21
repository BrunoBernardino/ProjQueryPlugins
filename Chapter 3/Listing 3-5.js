(function( $, window ) {
	// ...

	var methods = {

		// ...

		create: function( options ) {
			var $this = $(this),
				data = $this.data( 'toolTip' ),
				chosenPosition = options.position,
				toolTipContent = '';

			// Get the tool-tip content, and if it doesn't exist, default to the title attribute
			if ( ! $this.data(options.dataToolTip) ) {
				toolTipContent = $this.attr( 'title' );
			} else {
				toolTipContent = $this.data( options.dataToolTip );
			}

			// We now need to empty the title attribute to avoid the default browser behavior and showing it together with the tool-tip
			$this.attr( 'title', '' );

			var generatedID = helpers.generateID.call( this ),
				toolTipID = 'toolTip-' + generatedID,
				toolTipHTML = '<div id="' + toolTipID + '" class="' + options.toolTipClass + '">' + toolTipContent + '</div>';

			// Add the tool-tip inside the body
			$(toolTipHTML).appendTo( 'body' );

			// Store the toolTipID in the calling/parent element
			data.toolTipID = toolTipID;

			// Check if there is a position set in the element
			if ( $this.data(options.dataPosition) ) {
				chosenPosition = $this.data( options.dataPosition );
			}

			// Get the real element's width & height, by creating a dummy clone inline element with the same content and using it as reference
			var dummyElement = $this.clone().css({
				'display': 'inline',
				'visibility': 'hidden'
			}).appendTo( 'body' );

			// Put the tool-tip in the same "starting position", so the positioning is consistent and flexible: in the bottom left of the calling/parent element
			$('#' + toolTipID).css({
				'top': $this.offset().top + dummyElement.outerHeight(),
				'left': $this.offset().left
			});

			// Get the appropriate margin-left so we can position the tool-tip in the center of the element, horizontally
			var marginLeft = ( dummyElement.outerWidth() - $('#' + toolTipID).outerWidth() ) / 2;

			var marginTop = ( (dummyElement.outerHeight() + $('#' + toolTipID).outerHeight() + options.positionMargin) * -1 );

			// Position the tool-tip above or below the element
			switch( chosenPosition ) {
				case 'below':
					marginTop = options.positionMargin;
				break;
				case 'above':
				default:
					// We don't need to do anything here, as the default marginTop is for this 'above' position already
				break;
			}

			$('#' + toolTipID).css({
				'margin-top': marginTop,
				'margin-left': marginLeft
			});

			// Check if the tool-tip element is cropped on the top of the window view
			if ( ($this.offset().top + marginTop) < 0 ) {
				$('#' + toolTipID).css({ 'margin-top': 0 });
			}

			// Check if the tool-tip element is cropped on the bottom of the window view
			if ( ($this.offset().top + marginTop + $('#' + toolTipID).outerHeight()) > $(document).height() ) {
				var heightDifference = $('#' + toolTipID).offset().top + $('#' + toolTipID).outerHeight() - $(document).height();
				$('#' + toolTipID).css({
					'margin-top': ( $('#' + toolTipID).css('margin-top') - heightDifference )
				});
			}

			// Check if the tool-tip element is cropped on the left of the window view
			if ( ($this.offset().left + marginLeft) < 0 ) {
				$('#' + toolTipID).css({ 'margin-left': 0 });
			}

			// Check if the tool-tip element is cropped on the right of the window view
			if ( $this.offset().left + marginLeft + $('#' + toolTipID).outerWidth() > $(document).width() ) {
				var widthDifference = $('#' + toolTipID).offset().left + $('#' + toolTipID).outerWidth() - $(document).width();
				$('#' + toolTipID).css({
					'margin-left': ( $('#' + toolTipID).css('margin-left') - widthDifference )
				});
			}

			// Remove the dummy element
			dummyElement.remove();
		},

		// ...

	};

	// ...

})( jQuery, window );