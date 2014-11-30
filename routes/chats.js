var express = require('express');
var router = express.Router();
<<<<<<< HEAD
=======
var appExports = require('../app');

////////// JOINING EXISTING CHAT //////////

// showing join_chat page.
router.get('/', function(req, res){
	res.sendFile("/index.html", {root:'./public/html'});
})
>>>>>>> e5952a8dd688141c8aa2f44f89d8dbae745b2a11

// Return all chat rooms available to you
router.get('/', function(req,res) {
	console.log("Get Chats");
<<<<<<< HEAD
	res.send();
=======
	fake_data = [
		{
			id: 1,
			name: "Starbucks",
			time: 5,
			users: 24
		},
		{
			id: 2,
			name: "Social Web",
			time: 32,
			users: 35
		},
		{
			id: 3,
			name: "HCII Lounge",
			time: 7,
			users: 6
		},
		{
			id: 4,
			name: "Bagel Factory",
			time: 8,
			users: 9
		},
		{
			id: 5,
			name: "Orient Express",
			time: 26,
			users: 13
		},
		{
			id: 6,
			name: "300 Craig Street",
			time: 18,
			users: 4
		},
		{
			id: 7,
			name: "Little Asia",
			time: 8,
			users: 9
		},
		{
			id: 8,
			name: "Sabrina's House",
			time: 26,
			users: 13
		},
		{
			id: 9,
			name: "Razzy Fresh",
			time: 18,
			users: 4
		}
	]
	res.send(fake_data);
>>>>>>> e5952a8dd688141c8aa2f44f89d8dbae745b2a11
});

// Create a new chat room
router.post('/new', function(req,res) {
	console.log("New Chat");
<<<<<<< HEAD
	res.send();
=======
	/* form attributes:
		new_chat_name :String
		new_chat_time :Number in minutes
		new_chat_location :Array of numbers that represented [lat, long]
		new_chat_range :Number in miles
	*/
	var app = appExports.app;
	console.log("req.body: ",req.body);
	var name = req.body["new_chat_name"];
	var time = req.body["new_chat_time"];
	var location = req.body["new_chat_location[]"];
	var range = req.body["new_chat_range"];

	app.newChatRoom(name,time,location,range, function(err, room) {
		if(err) {
			res.status(400);
			res.send({
				"message" : "Error Creating Chat Room",
				"error" : err
			});
		} else {
			res.status(200);
			console.log("room.time_limit: ",room.time_limit)
			time_limit = room.time_limit//.toDateString();
			var response_body = {
				"message" : "Chatroom created!",
				"room_name" : room.name,
				"room_time" : time_limit,
				"room_location" : room.location,
				"room_range" : room.range
			};
			var response_string = JSON.stringify(response_body);
			console.log("RESPOND: ", response_string);
			res.send(response_string);
		}
	});
>>>>>>> e5952a8dd688141c8aa2f44f89d8dbae745b2a11
});

module.exports = router;