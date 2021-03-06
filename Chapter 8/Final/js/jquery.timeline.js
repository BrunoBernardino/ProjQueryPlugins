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
				'dataSide' :        'side',// Post's side data-* attribute
				'templateID' :      'template-posts',// Posts Underscore.js template Id
				'loadingSelector' : '.loading',// Selector for the loading element
				'getURL' :          './api/postsList{page}.json',// File with the API response simulation
				'createURL' :       './api/addPost.json',// File with the API response simulation
				'deleteURL' :       './api/deletePost.json',// File with the API response simulation
				'postSelector' :    '.post',// Selector for the post elements
				'postIDPrefix' :    'post-',// Selector prefix for the post elements Id
				'pointerFixClass' : 'too-close',// Class to fix the pointer position
				'pointerFixHeightDistance' : 25,// Number of pixels in height where we'll consider two posts "too close"
				'timeSelector' :    'header .info time',// Selector for the post's time
				'postsPerPage' :    10,
				'reachedLastPage' : false,
				'currentPage' :     1,
				'newPostClass' :    'new-post',
				'getPreProcess' :   $.noop,// Callback function(s), for processing before post fetching
				'getPostProcess' :  $.noop,// Callback function(s), for processing after post fetching
				'listPreProcess' :  $.noop,// Callback function(s), for processing before post listing
				'listPostProcess' : $.noop,// Callback function(s), for processing after post listing
				'addPreProcess' :   $.noop,// Callback function(s), for processing before post addition
				'addPostProcess' :  $.noop,// Callback function(s), for processing after post addition
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

			return this.each(function() {
				var $this = $(this),
					data = $this.data( 'timeline' );

				if ( ! data ) {
					$this.data( 'timeline', {
						target : $this
					});

					// Start Loading
					$this.find( globals.options.loadingSelector ).stop().fadeIn( 'fast' );

					// Do initial fetch
					methods.get.call( this );
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

			methods.executeCallbackStack.call( this, globals.options.getPreProcessor, this );

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

						methods.executeCallbackStack.call( this, globals.options.getPostProcessor, that );

						methods.list.call( that, response );
					}
				}
			});
		},

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
		},

		// Method to add a post
		addPost : function( postObject ) {
			var $this = $(this),
				that = this;

			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			methods.executeCallbackStack.call( this, globals.options.addPreProcessor, this );

			$.ajax({
				url: globals.options.createURL,
				type: 'GET',// NOTE: In a RESTful API, this would be 'POST', but since we're doing a static demo, we need 'GET', otherwise we can get a "Not Allowed" error
				data: {
					post: postObject
				},
				dataType: 'json',
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
			var $this = $(this),
				that = this;

			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			methods.executeCallbackStack.call( this, globals.options.deletePreProcessor, this );

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

						methods.executeCallbackStack.call( this, globals.options.deletePostProcessor, that );
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

			methods.executeCallbackStack.call( this, globals.options.listPreProcessor, this );

			var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: postsList } );

			// We need to append, but before the loading, so it remains in the bottom
			$(this).find( globals.options.loadingSelector ).before( postsHTML );

			methods.executeCallbackStack.call( this, globals.options.listPostProcessor, this );
		},

		fixPointer : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$(this).find( globals.options.postSelector ).each(function() {
				// Remove any previous pointerFixClass
				$(this).removeClass( globals.options.pointerFixClass );

				// We only need to check the posts on the right
				if ( $(this).data( globals.options.dataSide ) === 'right' ) {
					if ( $(this).offset().top - globals.options.pointerFixHeightDistance <= $(this).prev().offset().top ) {
						$(this).addClass( globals.options.pointerFixClass );
					}
				}
			});
		},

		fixPosition : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$(this).find( globals.options.postSelector ).each(function() {
				var previousPosition, beforePreviousPosition, prevSide, prevAltSide, newSide;

				prevSide = $(this).prev().data( globals.options.dataSide );

				// The previous post's previous post only interests us when it's for the alternate side
				if ( prevSide === 'left' ) {
					prevAltSide = 'right';
				} else {
					prevAltSide = 'left';
				}

				// We only need to start checking at post #3, as the first and second posts will always start at the same height
				if ( $(this).prev().length === 1 && $(this).prev().prevAll('[data-' + globals.options.dataSide + '="' + prevAltSide + '"]').length > 0 ) {
					previousPosition = $(this).prev().offset().top + $(this).prev().outerHeight();
					beforePreviousPosition = $(this).prev().prevAll('[data-' + globals.options.dataSide + '="' + prevAltSide + '"]').offset().top + $(this).prev().prevAll('[data-' + globals.options.dataSide + '="' + prevAltSide + '"]').outerHeight();

					// If the end point of the previous post is smaller than that post's previous post, we change this post's side to the same as the previous
					if ( previousPosition < beforePreviousPosition ) {
						newSide = $(this).prev().data( globals.options.dataSide );
					} else {
						// We need to enforce the alternating sides because if one change happens, all the following would need to be fixed every time
						if ( prevSide === 'left' ) {
							newSide = 'right';
						} else {
							newSide = 'left';
						}
					}

					$(this).data( globals.options.dataSide, newSide );
					$(this).attr( 'data-' + globals.options.dataSide, newSide );// We need to change the attribute, because of the CSS rule we use
				}
			});
		},

		parseDates : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$(this).find( globals.options.postSelector ).each(function() {
				var timezoneDate = $(this).find( globals.options.timeSelector ).attr( 'datetime' );

				var dateObject = new Date( timezoneDate );

				// This date format below should be an option, but for simplicity sake, we'll keep it like this
				// Year
				var newDate = dateObject.getFullYear() + '.';

				// Month
				// Don't forget getMonth() starts at 0
				if ( dateObject.getMonth() < 9 ) {
					newDate += '0' + ( dateObject.getMonth() + 1 );
				} else {
					newDate += ( dateObject.getMonth() + 1 );
				}

				newDate += '.';

				// Day
				if ( dateObject.getDate() < 10 ) {
					newDate += '0' + dateObject.getDate();
				} else {
					newDate += dateObject.getDate();
				}

				newDate += ' ';

				// Hours
				if ( dateObject.getHours() < 10 ) {
					newDate += '0' + dateObject.getHours();
				} else {
					newDate += dateObject.getHours();
				}

				newDate += ':';

				// Minutes
				if ( dateObject.getMinutes() < 10 ) {
					newDate += '0' + dateObject.getMinutes();
				} else {
					newDate += dateObject.getMinutes();
				}

				$(this).find( globals.options.timeSelector ).html( newDate );
			});
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