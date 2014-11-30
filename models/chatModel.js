/*
	Chat Model
	Database representation of a chat in our application
*/

var chatModel = (function (mongoose) {
	//Define Schema and Create Model
	var chatSchema = mongoose.Schema({
		name : String,
		time_limit : Date,
		location : [Number],
		range : Number
	});
	var Chat = mongoose.model('Chat', chatSchema);

	// Helper Function to determine the distance between
	// two points of format [lat, long]
	var distance = function(l1, l2) {
		var R = 3959; // mi
		var φ1 = lat1.toRadians();
		var φ2 = lat2.toRadians();
		var Δφ = (lat2-lat1).toRadians();
		var Δλ = (lon2-lon1).toRadians();

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		        Math.cos(φ1) * Math.cos(φ2) *
	        	Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;
		return d;
	}

	// Method to perform the database query to find chats
	// that are within range of the user
	Chat.prototype.findChatsInRange = function(location) {
		this.find(function(err, results) {
			if(err) {
				return err
			} else {
				return results.filter(function(element) {
					return distance(location, element.location) < element.range;
				});
			}
		});
	}

	return Chat;
});

module.exports = chatModel;