var assert = require('assert');
var http = require('http');
var chatUtil = require('../../util/chats_util');

module.exports = function(done) {
		var name = "TestRoom";
		var location = [100,100];
		var range = 10;
		var time = 1;

		chatUtil.newChat(name, location, range, time, function(err, data) {
			if(err !== null) {
				done(err);
			} else  {
				assert(data["room_name"], name);
				assert(data["room_location"], location);
				assert(data["room_range"], range);
				assert(data["room_time"], time);
				done();
			}
		});
}