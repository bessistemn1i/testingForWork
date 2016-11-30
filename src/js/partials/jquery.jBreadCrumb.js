/**
 * @author Jason Roy for CompareNetworks Inc.
 * @author Steven Maglio (jquery-ui integration, http://stevenmaglio.blogspot.com/)
 * Thanks to mikejbond for suggested updates
 *
 * Version 0.3.0, improvements to be made.
 * Copyright (c) 2009 CompareNetworks Inc.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * requires jquery-ui:
 *	jquery.ui.core.js: uses the widget factory
 *	jquery.effects.core.js: uses easing
 */
(function($) {

$.widget('ui.jBreadCrumb', {

	_init: function() {
		var	self	= this,
			o		= self.options,
			element	= self.element,
			bcElems;

		if (o.enableUiTheme) {
			self._enableUiThemeing(element);
		}

		bcElems = self._setBreadCrumbElements(self);
		element.addClass(o.cssClass);

		self._fixList(self);
		self._tryCompressBreadCrumb(self);
	},


	/*
	 * public functions
	 */

	add: function(args) {
		var	self	= this,
			bcElems	= self.element.data('breadCrumbElements');

		if( !args.text ) {
			throw new Error("jBreadCrumb's add function requires an options object which contains the property 'text'.");
		}

		args.url	= args.url || '#';
		args.index	= args.index || bcElems.length;
		args.index	= args.index > bcElems.length ? bcElems.length : args.index;
		args.index	= args.index < 1 ? 1 : args.index;

		self._addElement(self, args);

		return this;
	},

	remove: function(args) {
		var	self	= this,
			bcElems	= self.element.data('breadCrumbElements');

		args		= args || { index: bcElems.length - 1 };
		args.index	= args.index || ( bcElems.length - 1 );

		// the home element is not considered part of the index count
		args.index++;

		if( args.index <= 1 )	return;

		var elementsOnPage	= $('ul',self.element);

		elementsOnPage.find('li:nth-child(' + args.index + ')').remove();
		if( bcElems.length === args.index ) {
			elementsOnPage.find('li:last').addClass('last');
		}

		self._setBreadCrumbElements(self);
		self._tryCompressBreadCrumb(self);
	},

	clear: function() {
		var	self	= this;
		self.element.html('');
		self._setBreadCrumbElements(self);
	},


	/*
	 * private/internal functions for creating the breadcrumbs
	 */

	_setBreadCrumbElements: function(self) {
		var	element	= self.element;

		if( element.children('div').length )
			element	= element.children('div');

		var bcElems	= element.children('ul').children('li');
		self.element.data('breadCrumbElements', bcElems);
		return bcElems;
	},

	_fixList: function(self) {
		var	element		= self.element;

		// Keep it from overflowing in ie6 & 7
		element.children('ul')
			.wrap(
				'<div style="overflow:hidden; position:relative; width:' +
				element.css('width') +
				';" />'
			);
		// Set an arbitrary wide width to avoid float drop on the animation
		element.children('ul').width(5000);
	},

	_tryCompressBreadCrumb: function(self) {
		if( !self )	self	= this;

		var	element		= self.element,
			bcElems		= element.data('breadCrumbElements'),
			o			= self.options;

		// If the breadcrumbs contain no elements, don't do anything
		if (bcElems.length > 0) {
			$(bcElems[bcElems.length - 1]).addClass('last');
			$(bcElems[0]).addClass('first');

			if( o.isAnimated ) {
				self._compressBreadCrumb(self);
			}
		};
	},

	_compressBreadCrumb: function(self) {
		var	element				= self.element,
			bcElems				= element.data('breadCrumbElements'),
			o					= self.options,
			finalElement 		= $(bcElems[bcElems.length - 1]),
			finalElementWidth	= finalElement.width();

		var	beginingElementsToLeaveOpen	= o.beginingElementsToLeaveOpen,
			endElementsToLeaveOpen		= o.endElementsToLeaveOpen;

		// TODO: make this more dynamic. By calculating what can fit on the display.
		// If the final element is really long, compress more elements
		if (finalElementWidth > o.maxFinalElementLength) {
			if (beginingElementsToLeaveOpen > 0) {
				beginingElementsToLeaveOpen--;
			}
			if (endElementsToLeaveOpen > 0) {
				endElementsToLeaveOpen--;
			}
		}
		// If the final element is within the short and long range, compress
		// to the default end elements and 1 less beginning elements
		if (	finalElementWidth < o.maxFinalElementLength
			&&	finalElementWidth > o.minFinalElementLength
		) {
			if (beginingElementsToLeaveOpen > 0) {
				beginingElementsToLeaveOpen--;
			}
		}

		var itemsToRemove = bcElems.length - 1 - endElementsToLeaveOpen;
		bcElems.each(function(i, element) {
			self._addAnimation(i, element, self, itemsToRemove, beginingElementsToLeaveOpen);
		});
	},

	_addAnimation: function(i, element, self, itemsToRemove, beginingElementsToLeaveOpen) {
		var o			= self.options,
			listElement	= $(element);

		if (i > beginingElementsToLeaveOpen && i < itemsToRemove) {

			var span;

			if( listElement.data('events') ) {
				span	= listElement.children('span');

				listElement.unbind('mouseover mouseout');
			} else {
				var	anchor		= $('a',listElement),
					overlayDiv;

				span		= anchor.wrap('<span/>').parent(),
				overlayDiv	= $('<div class="' + o.overlayClass + '" />').css({display: 'block'});

				span.after(overlayDiv);
				anchor.width(anchor.width() + o.breadCrumbPadding);

				if (self._isIE6OrLess()) {
					self._fixPNG($('.' + o.overlayClass,listElement).css({
						width: '20px',
						right: '-1px'
					}));
				}
			}

			var	options	= { id: i, self: self };
			listElement
				.bind('mouseover', options, self._expandBreadCrumb)
				.bind('mouseout', options, self._shrinkBreadCrumb);

			listElement.autoInterval = setInterval(function(){
					clearInterval(listElement.autoInterval);
					span.animate({
							width: o.previewWidth
						},
						o.timeInitialCollapse,
						o.easing
					);
				},
				(150 * (i - 2))
			);
		} else {
			if( i > 0 ) {
				var	span	= listElement.children('span'),
					anchor	= (span.length && span.children('a')) || listElement.children('a'),
					width	= span.length ? anchor.width() - o.breadCrumbPadding : anchor.width();

				anchor.width( width );
				span.width( width );

				if( span.length ) {
					listElement.unbind('mouseover mouseout');
					listElement.html(anchor);
				}
			}
		}


	},

	_expandBreadCrumb: function(e) {
		var	element			= e.data.self.element,
			bcElems			= element.data('breadCrumbElements'),
			li				= $(bcElems[e.data.id]),
			span			= li.children('span'),
			originalWidth	= span.children('a').width(),
			o				= e.data.self.options;

		span.stop();
		span.animate({
			width: originalWidth
		},
		{
			duration: o.timeExpansionAnimation,
			easing: o.easing,
			queue: false
		});
		return false;
	},

	_shrinkBreadCrumb: function(e) {
		var element			= e.data.self.element,
			bcElems			= element.data('breadCrumbElements'),
			li				= $(bcElems[e.data.id]),
			span			= li.children('span'),
			o				= e.data.self.options;

		span.stop();
		span.animate({
			width: o.previewWidth
		},
		{
			duration: o.timeCompressionAnimation,
			easing: o.easing,
			queue: false
		});
		return false;
	},

	_isIE6OrLess: function() {
		return $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent);
	},

	_fixPNG: function(element) {
		var image;
		if ($(element).is('img')) {
			image = $(element).attr('src');
		}
		else {
			image = $(element).css('backgroundImage');
			image.match(/^url\(["']?(.*\.png)["']?\)$/i);
			image = RegExp.$1;
		}
		$(element).css({
			'backgroundImage': 'none',
			'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='" + image + "')"
		});
	},

	_enableUiThemeing: function(element) {
		element.wrap('<div class="ui-widget" />');
		element.addClass('ui-widget-content ui-state-default ui-corner-all');
	},

	_addElement: function(self, args) {
		var	newElement		= self._createNewElement(args),
			bcElems			= self.element.data('breadCrumbElements');

		if( !bcElems.length ) {
			var	homeElement	= self._createNewElement({text:'Home',url:'#'}).addClass('first last'),
				list		= homeElement.wrap('<ul />').parent();

			self.element.html(list);
			self._fixList(self);
			bcElems	= self._setBreadCrumbElements(self);
		}

		var	isLast			= bcElems.length === args.index,
			prevElement		= $(bcElems[args.index - 1]);

		prevElement.after(newElement);
		prevElement.removeClass('last');
		if( isLast ) {
			newElement.addClass('last');
		}

		self._setBreadCrumbElements(self);
		self._tryCompressBreadCrumb(self);
	},

	_createNewElement: function(args) {
		var	newAnchor	= $('<a />').text(args.text).attr({href:args.url});
		return newAnchor.wrap( $('<li />') ).parent();
	}

});

$.extend($.ui.jBreadCrumb, {
	version: '@VERSION',
	defaults: {
		isAnimated: true,
		maxFinalElementLength: 400,
		minFinalElementLength: 200,
		minimumCompressionElements: 4,
		endElementsToLeaveOpen: 1,
		beginingElementsToLeaveOpen: 1,
		timeExpansionAnimation: 800,
		timeCompressionAnimation: 500,
		timeInitialCollapse: 600,
		easing: 'easeOutQuad',
		overlayClass: 'chevronOverlay',
		previewWidth: 5,
		enableUiTheme: true,
		cssClass: 'breadCrumb',
		breadCrumbPadding: 10
	}
});


})(jQuery);
