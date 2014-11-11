var express = require('express');
var router = express.Router();

////////// JOINING EXISTING CHAT //////////

// showing join_chat page.
router.get('/', function(req, res){
	res.sendFile("/join_chat.html", {root:'./public/html'});
})

// Return all chat rooms available to you
router.get('/all', function(req,res) {
	console.log("Get Chats");
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
		}
	]
	res.send(fake_data);
});

//fake chatroom route for testing front-end
router.get('/1', function(req, res){
	res.sendFile("/chatroom1.html", {root:'./public/html'});
})


////////// CREATING NEW CHAT //////////

router.get('/new', function(req, res){
	res.sendFile("/create_chat.html", {root:'./public/html'});
})

// Create a new chat room
router.put('/new', function(req,res) {
	console.log("New Chat");
	/* form attributes:
		new_chat_name :String
		new_chat_time :Number in minutes
		new_chat_range :Number in miles
	*/
	res.send();
});

module.exports = router;