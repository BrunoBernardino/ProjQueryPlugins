(function( $, _, window ) {
	var globals = {
		'options' : {}
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				'templateID' : 'template-posts'// Posts Underscore.js template Id
			};

			options = $.extend( defaults, options );
			globals.options = $.extend( {}, options );// Copy/clone options into globals.options

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
		},

		// TODO: Method to get posts

		// Method to list posts
		list : function( postsList ) {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: postsList } );

			$(this).append( postsHTML );
		}

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
})( jQuery, _, window );