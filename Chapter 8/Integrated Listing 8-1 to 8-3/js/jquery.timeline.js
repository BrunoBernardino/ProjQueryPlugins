(function( $, window ) {
	var methods = {
		init : function( options ) {
			var defaults = {
				/*
				NOTE: Usually we'd set a RESTful API base URL here, but since we're simulating and thus not following standard conventions for its URL naming, we'll have one URL per action (add, get, and delete)
				*/

				// TODO: URLs, Post's class, Post's side data-* attribute
			};

			options = $.extend( defaults, options );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'timeline' );

				if ( ! data ) {
					$this.data( 'timeline', {
						target : $this
					});
				}
			});
		},

		destroy : function() {
			$(window).off( '.timeline' );

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'timeline' );

				$this.removeData( 'timeline' );
			});
		}

		// TODO: Method to get posts

		// TODO: Method to list posts

		// TODO: Method to add a post

		// TODO: Method to delete post
	};

	$.fn.timeline = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.timeline' );
		}
	};
})( jQuery, window );