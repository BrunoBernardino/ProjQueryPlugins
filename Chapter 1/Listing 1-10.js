(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				'loadPageURL':      '/getPage',
				'page':             false,
				'responseDataType': 'json',
				'onComplete':       $.noop,
				'onError':          $.noop,
				'onSuccess':        $.noop,
				'pageWrapper':      '#new-page-content',
				'fadeSpeed':        'fast',
				'fadeEasingEffect': 'swing'
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'sampleLoadPage' );

				if ( ! data ) {
					$(this).data( 'sampleLoadPage', {
						target : $this,
						options: options
					});

					methods.loadPage.call( this, options );
				}
			});
		},

		destroy : function() {
			$(window).off( '.sampleLoadPage' );

			return this.each(function(){
				var $this = $(this),
					data = $this.data( 'sampleLoadPage' );

				$this.removeData( 'sampleLoadPage' );
			});
		},

		loadPage : function( options ) {
			$.get( options.loadPageURL, { page: options.page }, function( data, textStatus, jqXHR ) {
				if ( data.htmlContent ) {
					$(options.pageWrapper).html( data.htmlContent ).fadeIn( options.fadeSpeed, options.fadeEasingEffect, function() {
						if ( $.isFunction(options.onSuccess) ) {
							options.onSuccess.call( this, data );
						}
					});
				} else if ( $.isFunction(options.onError) ) {
					options.onError.call( this, options );
				}
			}, options.responseDataType ).error(function() {
				if ( $.isFunction(options.onError) ) {
					options.onError.call( this, options );
				}
			}).complete(function() {
				if ( $.isFunction(options.onComplete) ) {
					options.onComplete.call( this, options );
				}
			});
		}
	};

	$.fn.sampleLoadPage = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.sampleLoadPage' );
		}
	};
})( jQuery, window );