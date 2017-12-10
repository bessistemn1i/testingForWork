//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/jquery-rcrumbs/dist/jquery.rcrumbs.min.js
//= ../../src/js/partials/jquery.maskedinput.min.js

//= ../../bower_components/jQuery-Feature-Carousel/js/jquery.featureCarousel.js
/* Custom*/
$(document).ready(function(){

	// menu-icon

	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
		$('#menu').fadeToggle('opened-menu');
	});

	// slider 
	$('.slider').slick({
		arrows: false,
		dots: true,
		mobileFirst: true
	});

	// carousel

$("#carousel").waterwheelCarousel({
flankingItems: 3
});
$(window).bind("resize", resizeWindow);
function resizeWindow(e) {
var viewportWidth = $(window).width();
if (viewportWidth <= 480) {
carousel.reload({
flankingItems: 0,
})
}
else if (viewportWidth <= 767) {
carousel.reload({
flankingItems: 1,
})
}
else if (viewportWidth <= 991) {
carousel.reload({
flankingItems: 2,
})
}
else {
carousel.reload({
flankingItems: 3,
})
}
}
});








