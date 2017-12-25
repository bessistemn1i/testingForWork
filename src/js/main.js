//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/progressbar.js/dist/progressbar.min.js
//= ../../bower_components/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js
//= ../../bower_components/slick-carousel/slick/slick.js
//= ../../bower_components/swiper/dist/js/swiper.js
//= ../../bower_components/videojs/video.js
//= ../../bower_components/readmore-js/readmore.js
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
			trailColor: '#1b6a9e',
			from: {color: '#fff', width: 6},
			to: {color: '#fff', width: 6},
			step: function(state, circle){
				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				var value = Math.round(circle.value() * 100);
				if(value === 0){
					circle.setText('');
				} else{
					circle.setText(value);
				}
			},
			text: {
	            style: {
	                color: null,
	                position: 'absolute',
	                left: '50%',
	                top: '50%',
	                padding: 0,
	                transform: {
	                    prefix: true,
	                    value: 'translate(-50%, -50%)'
	                }
	            },
	            autoStyleContainer: true,
	            alignToBottom: true,
	            value: null,
	            className: 'progressbar-text'
	        },
		});
		read.animate(.1);
		var seen = new ProgressBar.Circle('#seen', {
			strokeWidth: 6,
			color: '#fff',
			duration: 1400,
			trailWidth: 6,
			trailColor: '#1b6a9e',
			from: {color: '#fff', width: 6},
			to: {color: '#fff', width: 6},
			step: function(state, circle){
				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				var value = Math.round(circle.value() * 100);
				if(value === 0){
					circle.setText('');
				} else{
					circle.setText(value);
				}
			},
        	text: {
            	style: {
            	    color: null,
            	    position: 'absolute',
            	    left: '50%',
            	    top: '50%',
            	    padding: 0,
            	    transform: {
            	        prefix: true,
            	        value: 'translate(-50%, -50%)'
            	    }
            	},
            	autoStyleContainer: true,
            	alignToBottom: true,
            	value: null,
            	className: 'progressbar-text'
       		 },
		});
		seen.animate(.3);
		var feel = new ProgressBar.Circle('#feel', {
			strokeWidth: 6,
			color: '#fff',
			duration: 1400,
			trailWidth: 6,
			trailColor: '#1b6a9e',
			from: {color: '#fff', width: 6},
			to: {color: '#fff', width: 6},
			step: function(state, circle){
				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				var value = Math.round(circle.value() * 100);
				if(value === 0){
					circle.setText('');
				} else{
					circle.setText(value);
				}
			},
			text: {
	            style: {
	                color: null,
	                position: 'absolute',
	                left: '50%',
	                top: '50%',
	                padding: 0,
	                transform: {
	                    prefix: true,
	                    value: 'translate(-50%, -50%)'
	                }
	            },
	            autoStyleContainer: true,
	            alignToBottom: true,
	            value: null,
	            className: 'progressbar-text'
	        },
		});
		feel.animate(.9)
	}
});

	// Portfolio
	var items = $('.item'),
		per = 3,
		i = 1,
		total = 0;
	$('.load-more').on('click', function(){
	total = per * (i++);
	items.slice(0, total).show();
    $(this)[total >= items.length ? 'hide' : 'show']();
}).click();


	// Read more block

	$('.descr').readmore({
		speed: 500,
		collapsedHeight: 50,
		moreLink: '<a class="read-more" href="#">Read more</a>',
		lessLink: '<a class="read-more" href="#">Read more</a>'
	});

	// VideoJS

	var videos = document.getElementsByTagName('video');
	for (i = 0; i < videos.length; i++){
		var video = videos[i];
		if(video.className.indexOf('video-js') > - 1){
			videojs(video.id,{
				controls: true,
				autoplay: false,
				preload: 'auto',
				flued: true,
				height: 200
			});
		$('.descr').readmore({
			speed: 500,
			collapsedHeight: 25,
			moreLink: '<a class="read-more" href="#">Read more</a>',
			lessLink: '<a class="read-more" href="#">Read more</a>'
		});
		}
	}
});







