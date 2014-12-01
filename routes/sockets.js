/*
	Sockets.js
	Given an initialized Socket.io object, sets up the
	event handler functions.
*/

module.exports = function(io) {

	var usernames = {};
	var numUsers = 0;

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
		socket.on('typing', function() {
			socket.broadcast.emit('typing', {
				username: socket.username
			});
		})

		// broadcasting 'stop typing'
		socket.on('stop typing', function (){
			socket.broadcast.emit('stop typing', {
				username: socket.username
			});
		});

		// user disconnect function
		socket.on('disconnect', function() {
			if (addedUser) {
				delete usernames[socket.username];
				--numUsers;

				socket.broadcast.emit('user left', {
					username: socket.username,
					numUsers: numUsers
				});
			}
		});
	}); 
}