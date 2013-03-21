(function( $, _, window ) {
	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'currentPage' : 1,
				'newPostClass' : 'new-post'
			};

			// ...
		},

		// ...

		// Method to add a post
		addPost : function( postObject ) {
			// ...

			$.ajax({
				// ...
				dataType: 'json',
				success: function( response ) {
					if ( response ) {
						postObject.id = new Date().getTime();// Ideally this would be a value obtained from the server response.

						var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: [ postObject ] } );

						// We need to prepend & Add the newPostClass to it
						$this.prepend( postsHTML ).find( '#' + globals.options.postIDPrefix + postObject.id ).addClass( globals.options.newPostClass );

						// ...
					}
				}
			});
		},

		// Method to delete a post
		deletePost : function( postID ) {
			// ...
		}
	};

	// ...
})( jQuery, _, window );