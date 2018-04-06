

////////////////////
// GOOGLE MAP API //
///////////////////

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

// How to change the THE MARKER color ?

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
////////////////
// INPUT FORM //
///////////////

// How to change the text size in the input form?
// How to prevent the default focus  to highlight in light-blue?
// How to change the color of the placeholder text?

$('input').on('focus blur', function borderFocus(e) {
	e.preventDefault();
	$(this).toggleClass('input-focus');
});

$('.dropdown button').on('click', function showMenu(e) {
	e.preventDefault();
	$('.dropdown-content').toggleClass('show');

});


//////////////////////////
// RESERVATION DATABASE //
/////////////////////////

//Can you make a database write on a google sheet or a user-friendly doc?

 // Initialize and connect Firebase (remember to update the rules if needed)
 var config = {
   apiKey: "AIzaSyArw2K_Js09RtxqaxEYAjdZt_KknHpyxHg",
   authDomain: "reservation-site-d0577.firebaseapp.com",
   databaseURL: "https://reservation-site-d0577.firebaseio.com",
   projectId: "reservation-site-d0577",
   storageBucket: "reservation-site-d0577.appspot.com",
   messagingSenderId: "138304556817"
 };

 firebase.initializeApp(config);
 var database = firebase.database();

 // Store Reservations

var reservationData = { };

// add a click event to each of your reservation options, ‘.reservation-day a. 

$('.dropdown-content a').on('click', function selectDay(e) {
		e.preventDefault(); 
		var day = $(this).text();
		$('.dropdown-content').removeClass('show');
		//console.log(day);
	});







