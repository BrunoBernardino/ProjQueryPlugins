(function( $, _, window ) {
	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'createURL' : './api/addPost.json',// File with the API response simulation
				'deleteURL' : './api/deletePost.json',// File with the API response simulation
				'postSelector' : '.post',// Selector for the post elements
				'postIDPrefix' : 'post-',// Selector prefix for the post elements Id
				// ...
			};

			// ...
		},

		// ...

		fixPointer : function() {
			// ...

			$(this).find( globals.options.postSelector ).each(function() {
				// Remove any previous pointerFixClass
				$(this).removeClass( globals.options.pointerFixClass );

				// ...
			});
		},

		fixPosition : function() {
			// ...
		},

		parseDates : function() {
			// ...
		},

		getNextPage : function() {
			// ...
		},

		// Method to add a post
		addPost : function( postObject ) {
			// ...

			$.ajax({
				// ...
				dataType: 'json',
				success: function( response ) {
					if ( response ) {
						postObject.id = new Date().getTime();// Ideally this would be a value obtained from the server response.

						// ...
					}
				}
			});
		},

		// Method to delete a post
		deletePost : function( postID ) {
			var $this = $(this),
				that = this;

			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$.ajax({
				url: globals.options.deleteURL,
				type: 'GET',// NOTE: In a RESTful API, this would be 'DELETE', but since we're doing a static demo, we need 'GET', otherwise we can get a "Not Allowed" error
				data: {
					postID: postID
				},
				dataType: 'json',
				success: function( response ) {
					if ( response ) {
						// Remove the post from the listing
						$this.find( '#' + globals.options.postIDPrefix + postID ).remove();

						// Forcefully set sides of the first and second posts
						$this.find( globals.options.postSelector ).eq(0).data( globals.options.dataSide, 'left' );
						$this.find( globals.options.postSelector ).eq(0).attr( 'data-' + globals.options.dataSide, 'left' );// We need to change the attribute, because of the CSS rule we use

						$this.find( globals.options.postSelector ).eq(1).data( globals.options.dataSide, 'right' );
						$this.find( globals.options.postSelector ).eq(1).attr( 'data-' + globals.options.dataSide, 'right' );// We need to change the attribute, because of the CSS rule we use

						methods.fixPosition.call( that );

						methods.fixPointer.call( that );

						methods.parseDates.call( that );
					}
				}
			});
		}
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