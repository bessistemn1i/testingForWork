//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/progressbar.js/dist/progressbar.min.js
//= ../../bower_components/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js
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

	// Progressbar 

	$('.education-wrapper').viewportChecker({
			callbackFunction: function(elem, action){
		var read = new ProgressBar.Circle('#read', {
			strokeWidth: 6,
			color: '#fff',
			duration: 1400,
			trailWidth: 6,
			trailColor: '#1b6a9e'
		});
		read.animate(.1);
		var seen = new ProgressBar.Circle('#seen', {
			strokeWidth: 6,
			color: '#fff',
			duration: 1400,
			trailWidth: 6,
			trailColor: '#1b6a9e'
		});
		seen.animate(.4);
		var feel = new ProgressBar.Circle('#feel', {
			strokeWidth: 6,
			color: '#fff',
			duration: 1400,
			trailWidth: 6,
			trailColor: '#1b6a9e'
		});
		feel.animate(.7)
	}
});
});







