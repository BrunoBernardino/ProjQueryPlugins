(function( $, window ) {
	var helpers = {
		// Helper function to generate a unique id, GUID-style. Idea from http://guid.us/GUID/JavaScript
		generateID : function() {
			S4 = function() {
				return ( ((1 + window.Math.random()) * 0x10000) | 0 ).toString( 16 ).substring( 1 );
			};

			return ( S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4() ).toLowerCase();
		}
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				'dataToolTip':         'tooltip',// data-* property to check for the tool-tip's content
				'dataPosition':        'tooltipPosition',// data-* property to check for the tool-tip's position
				'toolTipClass':        'toolTip',
				'position':            'above',// Supports 'above' and 'below'
				'positionMargin':      10,
				'animationSpeed':      'fast',
				'animationEasing':     'swing',
				'animationOnComplete': $.noop
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'toolTip' );

				if ( ! data ) {
					$this.data( 'toolTip', {
						target : $this
					});

					// Create the tool-tip
					methods.create.call( this, options );

					// Bind the show on mouse in/hover
					$(this).on( 'mouseenter.toolTip', function() {
						methods.show.call( this, options );
					});

					// Bind the hide on mouse out
					$(this).on( 'mouseleave.toolTip', function() {
						methods.hide.call( this, options );
					});
				}
			});
		},

		destroy : function() {
			// ...
		},

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

			// Add the tool-tip inside the element
			$(toolTipHTML).appendTo( $this );

			// Store the toolTipID in the calling/parent element
			data.toolTipID = toolTipID;

			// Check if there is a position set in the element
			if ( $this.data(options.dataPosition) ) {
				chosenPosition = $this.data( options.dataPosition );
			}

			// Get the appropriate margin-left so we can position the tool-tip in the center of the element, horizontally
			var marginLeft = ( $this.outerWidth() - $('#' + toolTipID).outerWidth() ) / 2;

			// Position the tool-tip above or below the element
			switch( chosenPosition ) {
				case 'below':
					$('#' + toolTipID).css({
						'margin-top': options.positionMargin,
						'margin-left': marginLeft
					});
				break;
				case 'above':
				default:
					$('#' + toolTipID).css({
						'margin-top': ( ($this.outerHeight() + $('#' + toolTipID).outerHeight() + options.positionMargin) * -1 ),
						'margin-left': marginLeft
					});
				break;
			}
		},

		show: function( options ) {
			var $this = $(this),
				data = $this.data( 'toolTip' );

			// Animate tool-tip showing
			$('#' + data.toolTipID).stop().fadeIn( options.animationSpeed, options.animationEasing, options.animationOnComplete );
		},

		hide: function( options ) {
			var $this = $(this),
				data = $this.data( 'toolTip' );

			$('#' + data.toolTipID).stop().hide();
		},

		hideAllToolTips: function( options ) {
			$('.' + options.toolTipClass).stop().hide();
		}
	};

	// ...
})( jQuery, window );