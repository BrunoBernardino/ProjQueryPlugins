(function( $, _, window ) {
	var globals = {
		'options' : {}
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'getURL' : './api/postsList{page}.json',// File with the API response simulation
				'createURL' : './api/addPost.json',// File with the API response simulation
				// ...
			};

			// ...
		},

		// ...

		// Method to add a post
		addPost : function( postObject ) {
			var $this = $(this),
				that = this;

			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$.ajax({
				url: globals.options.createURL,
				type: 'GET',// NOTE: In a RESTful API, this would be 'POST', but since we're doing a static demo, we need 'GET', otherwise we can get a "Not Allowed" error
				data: {
					post: postObject
				},
				dataType: 'json',
				success: function( response ) {
					if ( response ) {
						var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: [ postObject ] } );

						// We need to prepend
						$this.prepend( postsHTML );

						// Switch side of the second post (previously first)
						$this.find( globals.options.postSelector ).eq(1).data( globals.options.dataSide, 'right' );
						$this.find( globals.options.postSelector ).eq(1).attr( 'data-' + globals.options.dataSide, 'right' );// We need to change the attribute, because of the CSS rule we use

						methods.fixPosition.call( that );

						methods.fixPointer.call( that );

						methods.parseDates.call( that );
					}
				}
			});
		}

		// TODO: Method to delete post
	};

	// ...
})( jQuery, _, window );