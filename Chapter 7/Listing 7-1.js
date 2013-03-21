var deferred = $.Deferred();// We're creating a deferred object

// We'll get into .done() afterwards, but we're adding a callback here
deferred.done(function( value ) {
	window.alert( value );
});

// This will trigger the window.alert() from the code above, with value = 'Success!'
deferred.resolve( 'Success!' );