(function( $, _, window ) {
	// ...

	var methods = {
		init : function( options ) {
			var defaults = {
				// ...
				'timeSelector' : 'header .info time'// Selector for the post's time
			};

			// ...
		},

		// ...

		// Method to list posts
		list : function( postsList ) {
			// ...

			methods.parseDates.call( this );
		},

		// ...

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
		}

		// TODO: Method to add a post

		// TODO: Method to delete post
	};

	// ...
})( jQuery, _, window );