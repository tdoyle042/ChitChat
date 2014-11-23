$(function() {   // when document is ready
	$('#new_chat_form').submit(function(event){
		event.preventDefault();
		createChat();

		//put here for now because I can't get the actual function to work
		fakeData = {
			"message" : "Chatroom created!",
			"room_name" : $('#new_chat_name').val(),
			"room_time" : $('#new_chat_time').val(),
			"room_location" : "some location",
			"room_range" : $('#new_chat_range').val()
		};
		message = fakeData.message + "<br>";
		message += "Room name: " + fakeData.room_name + "<br>";
		message += "Expires in " + fakeData.room_time + " minutes <br>";
		message += "Set to " + fakeData.room_location + " to a " + fakeData.room_range + " mile radius";
		$('#feedback').html(message);

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
	$.ajax({
			url: "/chats/new",
			type: "post",
			data: {
				new_chat_name: $('#new_chat_name').val(),
				new_chat_time: $('#new_chat_time').val(),
				new_chat_location: "some location",
				new_chat_range: $('#new_chat_range').val()
			},
			success: function(data) {
				// console.log("getting data back..");
				// fakeData = {
				// 	"message" : "Chatroom created!",
				// 	"room_name" : $('#new_chat_name').val(),
				// 	"room_time" : $('#new_chat_time').val(),
				// 	"room_location" : "some location",
				// 	"room_range" : $('#new_chat_range').val()
				// };
				// message = fakeData.message + "<br>";
				// message += "Room name: " + fakeData.room_name + "<br>";
				// message += "Expires in " + fakeData.room_time + " minutes <br>";
				// message += "Set to " + fakeData.room_location + " to a " + fakeData.room_range + " mile radius";
				// $('#feedback').html(message);
			}
		});
}