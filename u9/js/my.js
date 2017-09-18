$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	if (scroll >= 500) {
	$('header').addClass('fixed');
	} else {
	$('header').removeClass('fixed');
	}
 });
