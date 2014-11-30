var http = require('http');

module.exports.newChat = function(name, location, range, time, done) {
	var body = {
		'new_chat_name' : name,
		'new_chat_location' : location,
		'new_chat_range' : range,
		'new_chat_time' : time
	}

	var message = JSON.stringify(body);

	var options = {
		'hostname' : 'localhost',
		'port' : 3000,
		'path' : '/chats/new',
		'method' : 'POST',
		 headers: {
	        'Content-Type': 'application/json',
	        'Content-Length': message.length
		}
	}

	var req = http.request(options, function(res) {
		if(res.statusCode !== 200) {
			var err = Error('Response Code was ' + res.statusCode);
			done(err, null);
		}

		res.on('data', function(chunk) {
			var data = JSON.parse(chunk);
			done(null, data);
		});
	});

	req.write(message);
	req.end();
}

module.exports.getRooms = function(location, done) {
	var body = {
		'location' : location
	}

	var message = JSON.stringify(body);

	var options = {
		'hostname' : 'localhost',
		'port' : 3000,
		'path' : '/chats/all',
		'method' : 'POST',
		 headers: {
	        'Content-Type': 'application/json',
	        'Content-Length': message.length
		}
	}

	var req = http.request(options, function(res) {
		if(res.statusCode !== 200) {
			var err = Error('Status Code was ' + res.statusCode);
			done(err, null);
		} else {
			res.on('data', function(chunk) {
				var data = JSON.parse(chunk);
				done(null, data);
			});
		}
	});

	req.write(message);
	req.end();
}