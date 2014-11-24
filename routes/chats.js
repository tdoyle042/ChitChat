var express = require('express');
var router = express.Router();

// Return all chat rooms available to you
router.get('/', function(req,res) {
	console.log("Get Chats");
	res.send();
});

// Create a new chat room
router.put('/new', function(req,res) {
	console.log("New Chat");
	res.send();
});

module.exports = router;