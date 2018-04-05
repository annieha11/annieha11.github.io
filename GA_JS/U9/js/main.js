var map;

var styles = [
	{ stylers: [
		{ hue: '#70888c'},
		{ saturation: -20}]
	},
	{ featureType: 'road',
		elementType: 'geometry',
		stylers: [
		{ lightness: 100},
		{ visibility: 'simplified'} ]
	}
	]

// How to change the MARKER COLOR?

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
center: {lat: 40.8054491, lng: -73.9654415},
zoom: 16,
styles: styles,
scrollwheel: false,
});

var Marker = new google.maps.Marker({
  	position: {lat: 40.8054491, lng: -73.9654415},
    map: map
	});

}