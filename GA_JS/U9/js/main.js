

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


/////////
//TIME///
////////


var now = new Date(Date.now());
var timeFormatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

var dNow = new Date();
var today = (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
var tomorrow = (dNow.getMonth()+ 1) + '/' + (dNow.getDate()+1) + '/' + dNow.getFullYear();
var dayAfter = (dNow.getMonth()+ 1) + '/' + (dNow.getDate()+2) + '/' + dNow.getFullYear();

var weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()];

if ((weekDay == "Monday") || (now.getHours()<18) && (now.getHours()>=1)) { 
	$('#time-status').text("Now closed!");
	} else { $('#time-status').text("Now open!");
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
// INITIALIZE DATABASE //
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
// create a section for the data in your db
 var reservationsReference = database.ref('reservations');


///////////////////////
// RETRIEVE DATABASE //
//////////////////////

var source = $("#entry-template").html();
var template = Handlebars.compile(source);

// Step 1: Create a function that queries our database for reservations
function getReservations() {
  // Listen for changes in data
  reservationsReference.on('value', function (results) {
    // Get all reservations stored in the results we received back from Firebase    
    var allReservations = results.val();
    // Set an empty array where we can add all reservations
    var reservations = [];
    // iterate (loop) through all reservations from Firebase
    for (var item in allReservations) {
      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[item].name,
        day: allReservations[item].day,
        reservationId: item
      };
	
	var newTableRowHTML = template(context);
	//$('tbody').prepend(newTableRowHTML);
    reservations.push(newTableRowHTML);
    }
    // remove all list items from DOM before appending list items
    $('tbody').empty();
    // append each comment to the list of comments in the DOM
    for (var i in reservations) {
    $('tbody').prepend(reservations[i]);
    }
  });
}
getReservations();



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
		
		if (day == 'Tomorrow') { reservationData.day = tomorrow;
		} else if (day == 'Today') { reservationData.day = today;
		} else if (day == 'The day after next') { reservationData.day = dayAfter;
		}
		
		//reservationData.day = day;
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

		  reservationsReference.push({
		    name: reservationData.name,
		    day: reservationData.day
  			});

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
	var id = $(this).closest('tr').data('id');
	$(this).closest('tr').remove();
    database.ref('reservations/' + id).remove();
});
