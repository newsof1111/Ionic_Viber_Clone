

(function () {

	'use strict';
	var nla = angular.module('sof.viber.letterAvatar', []);



	nla.directive('viberLetterAvatar', [ function () {
				return {
					restrict : 'AE',
					replace : true,
					link : function (scope, element, attrs) 
					{
						var word = attrs.data;
						var c = word.substr(0, 1).toUpperCase();
						var cobj = angular.element('<text text-anchor="middle"></text>')
										.attr({
											'y' : '50%',
											'x' : '50%',
											'dy' : '0.35em',
											'pointer-events' : 'auto',
											'fill' : '#7359c7',
											'font-family' : 'Arial'
										})
										.html(c)
										.css({
											'font-weight' : '600',
											'font-size' : '55 px',
										});

						var svg = 
						angular.element('<svg></svg>')
									.attr({
										'xmlns' : 'http://www.w3.org/2000/svg',
										'pointer-events' : 'none',
										'width' : '50 px',
										'height' : '50 px'
										})
									.css({
										'background-color' : '#cecece',
										'width' :'40 px',
										'height' :  '40 px'
										});
										
						svg.append(cobj);
						var lvcomponent = angular.element('<div>').append(svg.clone()).html();
						var svgHtml = window.btoa(unescape(encodeURIComponent(lvcomponent)));					
						var round_style = 'border-radius:14px;';
						var component = "<img src=data:image/svg+xml;base64," + svgHtml + " style='" + round_style + "' />";	
						element.replaceWith(component);
					}
				};
			}
		]);



	function getCharacterObject(character) {
		var textTag = angular.element('<text text-anchor="middle"></text>')
			.attr({
				'y' : '50%',
				'x' : '50%',
				'dy' : '0.35em',
				'pointer-events' : 'auto',
				'fill' : '#7359c7',
				'font-family' : 'Arial'
			})
			.html(character)
			.css({
				'font-weight' : '600',
				'font-size' : '55 px',
			});

		return textTag;
	
	}

})();