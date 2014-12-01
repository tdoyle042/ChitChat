/*
	Chat Model
	Database representation of a chat in our application
*/

var chatModel = (function (mongoose) {
	//Define Schema and Create Model
	var chatSchema = mongoose.Schema({
		name : String,
		time : Date,
		location : [Number],
		range : Number
	});
	var Chat = mongoose.model('Chat', chatSchema);

	// Helper Function to determine the distance between
	// two points of format [lat, long]
	var distance = function(p1, p2) {
		var toRad = Math.PI*2 / 360;
		var lat1 = p1[0] * toRad;
		var lon1 = p1[1] * toRad;
		var lat2 = p2[0] * toRad;
		var lon2 = p2[1] * toRad;

		var R = 3959; // mi

		var dlon = lon1 - lon2;
		var dlat = lat1 - lat2;
		var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;
		return d;
	}

	// Method to perform the database query to find chats
	// that are within range of the user
	Chat.findChatsInRange = function(location, done) {
		Chat.find({}, function(err, results) {
			if(err) {
				return err
			} else {
				var filteredResults = results.filter(function(element) {
					return distance(location, element.location) <= element.range;
				});
				return done(filteredResults);
			}
		});
	}

	return Chat;
});

module.exports = chatModel;