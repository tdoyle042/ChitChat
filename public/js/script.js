$(function() {   // when document is ready
	x = 1;
	$('#new_chat_button').click(function(){
		console.log("bother"+x)
		x++;
	})
	$('#new_chat_form').submit(function(event){
		event.preventDefault();
		//freeze from clicking multiple times
		document.getElementById("new_chat_button").disabled = true;
		document.getElementById("new_chat_button").value = "Creating..";
		$('#new_chat_button').css("cursor", "wait");
		//loading screen

		createChat();

	})

});

/* create_chat screen */
function updateTime(time) {
	document.querySelector('#minutes').value = time;
}

function updateRange(range){
	document.querySelector('#miles').value = range;
}

/* Gets the locaiton of the user via HTML5 */
function getLocation(callback) {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(callback);
	} else {
		console.log("Unable to get location")
	}
}

/* Simple test function for getting location information */
function testLocation() {
	var printData = function(location) {
		console.log(location.coords.latitude,location.coords.longitude);
	}
	getLocation(printData);
}


function createChat(){
	var this_location;
	getLocation(function(location){
		// console.log(location.coords.latitude,location.coords.longitude);
		// this_location = {};
		$.ajax({
			url: "/chats/new",
			type: "post",
			data: {
				new_chat_name: $('#new_chat_name').val(),
				new_chat_time: $('#new_chat_time').val(),
				new_chat_location: [location.coords.latitude,location.coords.longitude],
				new_chat_range: $('#new_chat_range').val()
			},
			success: function(data) {
				// console.log("getting data back..");
				// console.log("DATA: ", data);
				data = JSON.parse(data);
				now = new Date();
				future = new Date(data.room_time);
				time_left = Math.round((future-now)/1000/60); //getting minutes
				message = data.message + "<br>";
				message += "Room name: " + data.room_name + "<br>";
				message += "Expires in " + time_left + " minutes <br>";
				message += "Set to a " + data.room_range + " mile radius of where you are right now";
				// message += "Set to " + data.room_location + " to a " + data.room_range + " mile radius";
				$('#feedback').html(message);
				resetForm();	
			}
		});
	})
}

function resetForm(){
	$('#new_chat_name').val("");
	document.getElementById("new_chat_time").value = 35;
	document.querySelector('#minutes').value = 35
	document.getElementById("new_chat_range").value = 3;
	document.querySelector('#miles').value = 3;
	document.getElementById("new_chat_button").disabled = false;
	document.getElementById("new_chat_button").value = "Create Chat Room";
	$('#new_chat_button').css("cursor", "pointer");

}