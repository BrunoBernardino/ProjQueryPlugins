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

			// ...
		},

		destroy : function() {
			// ...
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

	// ...
})( jQuery, _, window );