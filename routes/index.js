var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = router;

// Chatroom

var usernames = {};
var numUsers = 0;

// new message

io.on('connection', function (socket) {
	var addedUser = false;

	socket.on('new message', function (data) {
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

// add user
 socket.on('add user', function(username) {
 	socket.username = username;
 	usernames[username] = username;
 	++numUsers;
 	addedUser = true;
 	socket.emit('login', {
 		numUsers: numUsers
 	});

 // user connecting 
 	socket.broadcast.emit('user joined', {
 		username: socket.username,
 		numUsers: numUsers
 	});
 });

 // broadcasting typing
 	socket.on('typing', function() {}
 		socket.broadcast.emit('typing', {
 			username: socket.username
 		}))
}) 
