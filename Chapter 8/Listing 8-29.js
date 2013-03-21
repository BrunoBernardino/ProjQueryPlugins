(function( $, _, window ) {
	var globals = {
		'getPreProcessor': [],
		'getPostProcessor': [],
		'listPreProcessor': [],
		'listPostProcessor': [],
		'addPreProcessor': [],
		'addPostProcessor': [],
		'deletePreProcessor': [],
		'deletePostProcessor': [],
		'options' : {}
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'getPreProcess' : $.noop,// Callback function(s), for processing before post fetching
				'getPostProcess' : $.noop,// Callback function(s), for processing after post fetching
				'listPreProcess' : $.noop,// Callback function(s), for processing before post listing
				'listPostProcess' : $.noop,// Callback function(s), for processing after post listing
				'addPreProcess' : $.noop,// Callback function(s), for processing before post addition
				'addPostProcess' : $.noop,// Callback function(s), for processing after post addition
				'deletePreProcess' : $.noop,// Callback function(s), for processing before post deletion
				'deletePostProcess' : $.noop// Callback function(s), for processing after post deletion
			};

			options = $.extend( defaults, options );
			globals.options = $.extend( {}, options );// Copy/clone options into globals.options

			// Create Deferred objects
			globals.options.getPreProcessor = [];
			globals.options.getPreProcessor.push(function( that ) {
				globals.options.getPreProcess.call( that );
			});

			globals.options.getPostProcessor = [];
			globals.options.getPostProcessor.push(function( that ) {
				globals.options.getPostProcess.call( that );
			});

			globals.options.listPreProcessor = [];
			globals.options.listPreProcessor.push(function( that ) {
				globals.options.listPreProcess.call( that );
			});

			globals.options.listPostProcessor = [];
			globals.options.listPostProcessor.push(function( that ) {
				globals.options.listPostProcess.call( that );
			});

			globals.options.addPreProcessor = [];
			globals.options.addPreProcessor.push(function( that ) {
				globals.options.addPreProcess.call( that );
			});

			globals.options.addPostProcessor = [];
			globals.options.addPostProcessor.push(function( that ) {
				globals.options.addPostProcess.call( that );
			});

			globals.options.deletePreProcessor = [];
			globals.options.deletePreProcessor.push(function( that ) {
				globals.options.deletePreProcess.call( that );
			});

			globals.options.deletePostProcessor = [];
			globals.options.deletePostProcessor.push(function( that ) {
				globals.options.deletePostProcess.call( that );
			});

			// Add plug-in's default post processors
			globals.options.listPostProcessor.push(function( that ) {
				methods.postProcessing.call( this, that );
			});

			globals.options.addPostProcessor.push(function( that ) {
				methods.postProcessing.call( this, that );
			});

			globals.options.deletePostProcessor.push(function( that ) {
				methods.postProcessing.call( this, that );
			});

			// ...
		},

		// ...

		// Method to get posts, with pagination
		get : function() {
			// ...

			methods.executeCallbackStack.call( this, globals.options.getPreProcessor, this );

			$.ajax({
				// ...
				success: function( response ) {
					if ( response ) {
						// If the number of posts is less than the number of posts per page, we've reached the last page
						if ( response.length < globals.options.postsPerPage ) {
							// ...
						}

						methods.executeCallbackStack.call( this, globals.options.getPostProcessor, that );

						methods.list.call( that, response );
					}
				}
			});
		},

		getNextPage : function() {
			// ...
		},

		// Method to add a post
		addPost : function( postObject ) {
			// ...

			methods.executeCallbackStack.call( this, globals.options.addPreProcessor, this );

			$.ajax({
				// ...
				success: function( response ) {
					if ( response ) {
						postObject.id = new Date().getTime();// Ideally this would be a value obtained from the server response.

						var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: [ postObject ] } );

						// We need to prepend & Add the newPostClass to it
						$this.prepend( postsHTML ).find( '#' + globals.options.postIDPrefix + postObject.id ).addClass( globals.options.newPostClass );

						// Switch side of the second post (previously first)
						$this.find( globals.options.postSelector ).eq(1).data( globals.options.dataSide, 'right' );
						$this.find( globals.options.postSelector ).eq(1).attr( 'data-' + globals.options.dataSide, 'right' );// We need to change the attribute, because of the CSS rule we use

						methods.executeCallbackStack.call( this, globals.options.addPostProcessor, that );
					}
				}
			});
		},

		// Method to delete a post
		deletePost : function( postID ) {
			// ...

			methods.executeCallbackStack.call( this, globals.options.deletePreProcessor, this );

			$.ajax({
				// ...
				success: function( response ) {
					if ( response ) {
						// Remove the post from the listing
						$this.find( '#' + globals.options.postIDPrefix + postID ).remove();

						// Forcefully set sides of the first and second posts
						$this.find( globals.options.postSelector ).eq(0).data( globals.options.dataSide, 'left' );
						$this.find( globals.options.postSelector ).eq(0).attr( 'data-' + globals.options.dataSide, 'left' );// We need to change the attribute, because of the CSS rule we use

						$this.find( globals.options.postSelector ).eq(1).data( globals.options.dataSide, 'right' );
						$this.find( globals.options.postSelector ).eq(1).attr( 'data-' + globals.options.dataSide, 'right' );// We need to change the attribute, because of the CSS rule we use

						methods.executeCallbackStack.call( this, globals.options.deletePostProcessor, that );
					}
				}
			});
		},

		// Method to list posts
		list : function( postsList ) {
			// ...

			methods.executeCallbackStack.call( this, globals.options.listPreProcessor, this );

			var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: postsList } );

			// We need to append, but before the loading, so it remains in the bottom
			$(this).find( globals.options.loadingSelector ).before( postsHTML );

			methods.executeCallbackStack.call( this, globals.options.listPostProcessor, this );
		},

		fixPointer : function() {
			// ...
		},

		fixPosition : function() {
			// ...
		},

		parseDates : function() {
			// ...
		},

		postProcessing : function( postsElement ) {
			methods.fixPosition.call( postsElement );

			methods.fixPointer.call( postsElement );

			methods.parseDates.call( postsElement );
		},

		executeCallbackStack : function ( callbackStack ) {
			var iLimit = callbackStack.length;

			for (var i = 0; i < iLimit; i++) {
				callbackStack[i].apply( this, Array.prototype.slice.call(arguments, 1) );
			}
		}
	};

	// ...
})( jQuery, _, window );