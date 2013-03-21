(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				'slideSpeed':             'fast',
				'onComplete':             $.noop,
				'showAlert':              false,
				'logOnConsole':           true,
				'showElementsOnComplete': true,
				'classToShow':            '.show-after-slide-down',
				'showSpeed':              0,
				'showEasingEffect':       'swing',
				'onShowComplete':         $.noop
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'sampleSlideDownAndAlert' );

				if ( ! data ) {
					$(this).data( 'sampleSlideDownAndAlert', {
						target : $this
					});

					methods.slide.call( this, options );
				}
			});
		},

		destroy : function() {
			$(window).off( '.sampleSlideDownAndAlert' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'sampleSlideDownAndAlert' );

				$this.removeData( 'sampleSlideDownAndAlert' );
			});
		},

		slide : function( options ) {
			$(this).slideDown( options.slideSpeed, function() {
				if ( options.showAlert ) {
					window.alert( 'Yup! This is happening... An alert()!' );
				}

				if ( options.logOnConsole && window.console && window.console.log ) {
					window.console.log( 'Woohoo! Yes! A proper console.log()!' );
				}

				if ( options.showElementsOnComplete ) {
					$(options.classToShow).show( options.showSpeed, options.showEasingEffect, options.onShowComplete );
				}

				if ( $.isFunction(options.onComplete) ) {
					options.onComplete.call( this, options );
				}
			});
		}
	};

	$.fn.sampleSlideDownAndAlert = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.sampleSlideDownAndAlert' );

		}
	};
})( jQuery, window );