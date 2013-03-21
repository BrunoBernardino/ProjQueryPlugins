// ... both plug-ins

$('.sample-trigger a').lightbox({
	'openOnComplete': function() {
		$('.sample-form').on( 'submit', function( event ) {
			event.preventDefault();
		});

		//$('.sample-form input').inputValidation();
		$('.sample-form input').inputValidation({
			'animation': {
				'type': 'fade',
				'speed': 'fast',
				'easing': 'linear',
				'onComplete': function() {
					$('.inputValidation-error').toolTip({ 'followMouse': false, 'position': 'right' });
				},
				'extra': {
					'margin': 3
				}
			}
		});
	}
});