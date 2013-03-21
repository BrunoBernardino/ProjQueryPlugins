var deferred = $.Deferred();// We're creating a deferred object

// We're adding a callback here to be executed when the deferred object is resolved
deferred.done(function( value ) {
	window.alert( value );
});