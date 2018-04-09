

////////////////////
// GOOGLE MAP API //
///////////////////

var map;

var styles = [
	{ stylers: [
		{ hue: '#071443'},
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

//////////////////////
// FORM SUBMISSION //
////////////////////


var reservationData = { };
var day;
// add a click event to each of your reservation options, ‘.reservation-day a. 
$('.dropdown-content a').on('click', function selectDay(e) {
		e.preventDefault(); 
		day = $(this).text();
		$('.dropdown-content').removeClass('show');
		reservationData.day = day;
		$('.dropbtn').text(day);
//		console.log(reservationData.day);
	});


$('form').on('submit', function submitForm(e) { 
	e.preventDefault();
	if (($('input').val() == "") || (!reservationData.day)) {
		alert("Please insert a valid name and day.");
		} else {
		reservationData.name = $('input').val();
		console.log(reservationData);
		// clear the user's inputs
		  $('input').val('');
		  $('.dropbtn').text('Select a day');
		  // create a section for the data in your db
		  var reservationsReference = database.ref('reservations');
		  // use the set method to save data to the comments
		  reservationsReference.push({
		    name: reservationData.name,
		    day: reservationData.day
  			});

		var source = $("#entry-template").html();
		var template = Handlebars.compile(source);
		var newTableRowHTML = template(reservationData);
		$('tbody').append(newTableRowHTML);
		reservationData = { };


	}
});

/*
CHECK FORM FUNCTION AND ERROR STYLE
function checkEmailInput() {
  var emailInputField = document.querySelector('input');
    // Check to see whether the user has entered a value to the email field.
    if (emailInputField.value.length === 0) {
      // If the email field is blank, display a message to the user.
      document.getElementById('message').innerText = 'Please enter an email address.'
      // Add an error class to the input field that will give it a red border.
      emailInputField.className = 'error';
    } else {
      // Otherwise, clear out the error message.
      document.getElementById('message').innerText = '';
      // Remove the error class from the input field
      emailInputField.className = '';
    }
}*/


/////////////////////////
// DELETE RESERVATION //
////////////////////////

$('tbody').on('click', '.delete', function(e){ 
	$(this).closest('tr').remove();


});



