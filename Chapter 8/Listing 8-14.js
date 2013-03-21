(function( $, _, window ) {
	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'getURL' : './api/postsList{page}.json',// File with the API response simulation
				// ...
				'postsPerPage' : 10,
				'reachedLastPage' : false,
				'currentPage' : 1
			};

			// ...

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'timeline' );

				if ( ! data ) {
					// ...

					// Start Loading
					$this.find( globals.options.loadingSelector ).stop().fadeIn( 'fast' );

					// Do initial fetch
					methods.get.call( this );
				}
			});
		},

		destroy : function() {
			// ...
		},

		// Method to get posts, with pagination
		get : function() {
			var $this = $(this),
				that = this;

			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			// If we've already reached the last page, we don't need to make more requests
			if ( globals.options.reachedLastPage ) {
				return false;
			}

			$.ajax({
				url: globals.options.getURL.replace( '{page}', globals.options.currentPage ),
				type: 'GET',
				data: {},
				dataType: 'json',
				success: function( response ) {
					if ( response ) {
						// If the number of posts is less than the number of posts per page, we've reached the last page
						if ( response.length < globals.options.postsPerPage ) {
							globals.options.reachedLastPage = true;

							// Stop Loading
							$this.find( globals.options.loadingSelector ).stop().fadeOut( 'fast' );
						}

						methods.list.call( that, response );
					}
				}
			});
		},

		// Method to list posts
		list : function( postsList ) {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			// If we've reached the last page, there's nothing to list
			if ( globals.options.reachedLastPage ) {
				return false;
			}

			var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: postsList } );

			// We need to append, but before the loading, so it remains in the bottom
			$(this).find( globals.options.loadingSelector ).before( postsHTML );

			methods.fixPosition.call( this );

			methods.fixPointer.call( this );

			methods.parseDates.call( this );
		},

		// ...

		getNextPage : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			// If we've reached the last page, there's nothing to do
			if ( globals.options.reachedLastPage ) {
				return false;
			}

			++globals.options.currentPage;

			methods.get.call( this );
		}

		// TODO: Method to add a post

		// TODO: Method to delete post
	};

	// ...
})( jQuery, _, window );