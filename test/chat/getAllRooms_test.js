var assert = require('assert');
var http = require('http');
var chatUtil = require('../../util/chats_util');

module.exports = function(done) {
	var name = 'TestRoom';
	var location = [100,100];
	var range = 10;
	var time = 1;

	chatUtil.newChat(name, location, range, time, function(err, data) {
		if(err !== null) {
			return done(err);
		} else {
			var search_location = [100.1,100.1];

			chatUtil.getRooms(search_location, function(err,data) {
				if(err !== null) {
					return err;
				} else {
					for (var index in data["rooms"]) {
						var room = data["rooms"][index];
						if(room.name === name && room.location[0] === location[0] &&
							room.location[1] === location[1] && room.range === range) {
							return done();
						}
					}
					var resultErr = Error("Room Created Was Not Found in GetAllRooms");
					return done(resultErr);
				}
			});
		}
	});
}