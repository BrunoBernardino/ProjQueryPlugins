$('.sample-form input').inputValidation({
	'animation': {
		'type': 'fade',
		'speed': 'fast',
		'easing': 'swing',
		'onComplete': function() {
			$('.inputValidation-error').toolTip({ 'followMouse': false, 'position': 'right' });
		},
		'extra': {
			'margin': 3
		}
	}
});