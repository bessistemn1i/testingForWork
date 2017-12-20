//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/slick-carousel/slick/slick.js
//= ../../bower_components/swiper/dist/js/swiper.js
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

	// swiper

var swiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  pagination: {
  	el: '.swiper-pagination',
  	type: 'bullets',
  	clickable: true
  }
});
});








