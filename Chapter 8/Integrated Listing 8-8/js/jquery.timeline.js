(function( $, _, window ) {
	var globals = {
		'options' : {}
	};

	var methods = {
		init : function( options ) {
			var defaults = {
				'dataSide' : 'side',// Post's side data-* attribute
				'templateID' : 'template-posts',// Posts Underscore.js template Id
				'loadingSelector' : '.loading',// Selector for the loading element
				'getURL' : './api/postsList.json',// File with the API response simulation
				'postSelector' : '.post',// Selector for the post elements
				'pointerFixClass' : 'too-close',// Class to fix the pointer position
				'pointerFixHeightDistance' : 25// Number of pixels in height where we'll consider two posts "too close"
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

		// Method to get posts
		get : function() {
			var $this = $(this),
				that = this;

			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			// Start Loading
			$this.find( globals.options.loadingSelector ).stop().fadeIn( 'fast' );

			$.ajax({
				url: globals.options.getURL,
				type: 'GET',
				data: {},
				dataType: 'json',
				success: function( response ) {
					if ( response ) {
						methods.list.call( that, response );
					}
				}
			})
			.always(function() {
				// Stop Loading
				$this.find( globals.options.loadingSelector ).stop().fadeOut( 'fast' );
			});
		},

		// Method to list posts
		list : function( postsList ) {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			var postsHTML = _.template( $('#' + globals.options.templateID).html(), { posts: postsList } );

			$(this).append( postsHTML );

			methods.fixPosition.call( this );

			methods.fixPointer.call( this );
		},

		fixPointer : function() {
			// If the plug-in hasn't been initialized yet, don't do anything
			if ( globals.options.length === 0 ) {
				return false;
			}

			$(this).find( globals.options.postSelector ).each(function() {
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