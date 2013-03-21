// This will disable cache on images so we can see the load action being triggered, otherwise it would be too fast (and IE is known to behave erratically firing the load event for cached images)
$('img').each( function() {
	$(this).attr( 'src', $(this).attr('src') + '?' + new Date().getTime() );
});

// We're adding the data property "loaded" with the value of "true" when the images finish loading
$('img').on( 'load', function() {
	$(this).data( 'loaded', true );
});

// This timeout is just to mimic other code running before we got to our images loaded verification
window.setTimeout(function() {
	$('img:data(loaded)').each(function() {
		// Do whatever you want here
	});
}, 1000 );