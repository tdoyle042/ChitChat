var express = require('express');
var router = express.Router();
var appExports = require('../app');

////////// JOINING EXISTING CHAT //////////

// showing join_chat page.
router.get('/', function(req, res){
	res.sendFile("/index.html", {root:'./public/html'});
});

router.post('/all', function(req, res) {
	var app = appExports.app;
	console.log("req.body: ", req.body);
	var location = req.body["location[]"];
	app.chatRoomsInRange(location, function(results) {
		console.log("sending rooms...")
		res.send({"rooms" : results});
	});
});

//fake chatroom route for testing front-end
router.get('/room/:id', function(req, res){
	res.sendFile("/chatroom1.html", {root:'./public/html'});
})

////////// CHAT ROOM //////////

router.get('/getRoomInfo', function(req, res){
	var app = appExports.app;
	console.log("----get room info on data: ", req.query)
	roomId = req.query.roomId;
	app.findChatRoom(roomId, function(results){
		res.send(results)
	})
})



////////// CREATING NEW CHAT //////////

router.get('/new', function(req, res){
	res.sendFile("/create_chat.html", {root:'./public/html'});
});

// Create a new chat room
router.post('/new', function(req,res) {
	console.log("New Chat");
	/* form attributes:
		new_chat_name :String
		new_chat_time :Number in minutes
		new_chat_location :Array of numbers that represented [lat, long]
		new_chat_range :Number in miles
	*/
	var app = appExports.app;
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
				"room_id": room.id,
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
});

module.exports = router;