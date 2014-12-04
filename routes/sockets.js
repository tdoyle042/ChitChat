/*
	Sockets.js
	Given an initialized Socket.io object, sets up the
	event handler functions.
*/

module.exports = function(io) {

	io.on('connection', function (socket) {
		var addedUser = false;

		/*
			User sends a new message
			Sends the message to all other connected sockets
		*/
		socket.on('new message', function (data) {
			socket.broadcast.emit('new message', {
				username: socket.id,
				roomId : data.roomId,
				message: data.message
			});
		});

		/*
			User requests to join a chat
			@room - Room the user wishes to join
			Return - return the userId (from socket.id) to the user
		*/
		socket.on('join', function(msg) {
			roomId = msg.roomId;

			// send back to one user what their userId is
			socket.emit('joined room', {
				userId: socket.id
			});

			// let everyone know that a user has joined
			socket.broadcast.emit('user joined', {
				userId: socket.id
			});
		});

		/*
			User leaves a chat
			Decrement number of people in a chat
		*/
		socket.on('leave', function() {

			if (addedUser) {

				socket.broadcast.emit('user left', {
					username: socket.id
				});
			}
		});
	}); 
}