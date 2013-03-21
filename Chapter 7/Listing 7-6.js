var deferred = $.Deferred();// We're creating a deferred object
var promise = deferred.promise();// We're getting this deferred object's promise

// We're adding a callback here to be executed when the deferred object is either rejected or resolved
deferred.always(function( value ) {
	window.alert( value );
});

// We're adding a callback here through the promise, to be executed when the object is resolved
promise.done(function( value ) {
	window.alert( 'Success! ' + value );
});

try {
	promise.resolve( 'Yes!' );// This code won't work
} catch ( errorCaught ) {
	deferred.resolve( 'Yes!' );// This code will work, and the callback added with promise.done() above will be executed
}