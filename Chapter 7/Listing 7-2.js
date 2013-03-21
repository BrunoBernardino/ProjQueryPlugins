var deferred = $.Deferred();// We're creating a deferred object

// We'll get into .fail() afterwards, but we're adding a callback here
deferred.fail(function( value ) {
	window.alert( value );
});

// This will trigger the window.alert() from the code above, with value = 'This failed!'
deferred.reject( 'This failed!' );