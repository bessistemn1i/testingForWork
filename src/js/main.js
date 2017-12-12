//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/slick-carousel/slick/slick.js
//= ../../bower_components/jQuery-Waterwheel-Carousel-master/js/jquery.waterwheelCarousel.js
//= ../../bower_components/jQuery-Waterwheel-Carousel-master/js/TweenMax.min.js
/* Custom*/
$(document).ready(function(){
	// menu-icon

	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
		$('#menu').fadeToggle('opened-menu');
	});
	// carousel

$("#carousel").waterwheelCarousel({

	});

	// slider 
	$('.slider').slick({
		arrows: false,
		dots: true,
		mobileFirst: true
	});

});








