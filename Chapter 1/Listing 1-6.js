var logDiv = $('#log');

for ( var i = 0; i < 5; i++ ) {
	$('button').eq(i).on( 'click', { value: i }, function( event ) {
		var msgs = [
			'button = ' + $(this).index(),
			'event.data.value = ' + event.data.value,
			'i = ' + i
		];

		logDiv.append( msgs.join(', ') + '<br>' );
	});
}