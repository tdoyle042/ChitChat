var assert = require('assert');
var http = require('http');

describe('Chatroom API', function() {
		it('should return the room that we create', function(done) {
			var name = "TestRoom";
			var location = [100,100];
			var range = 10;
			var time = 1;

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
				assert.equal(res.statusCode, 200);
				res.on('data', function(chunk) {
					var data = JSON.parse(chunk);

					var roomName = data["room_name"];
					var roomTime = data["room_time"];
					var roomLocation = data["room_location"];
					var roomRange = data["room_range"];
					assert.equal(name, roomName);
					assert.equal(location[0], roomLocation[0]);
					assert.equal(location[1], roomLocation[1]);
					assert.equal(range, roomRange);
					// assert.equal(time, roomTime);
					done();
				});
				
			});

			req.on('error', function(e) {
				done(e);
			});

			req.write(message);
			req.end();

			
		});
});