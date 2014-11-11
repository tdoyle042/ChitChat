/*
	Chat Model
	Database representation of a chat in our application
*/

var chatModel = (function (mongoose) {
	var chatSchema = mongoose.Schema({
		name : String,
		expiration : Date,
		location : [Number],
		radius : Number
	});
	var ChatModel = mongoose.model('Chat', chatSchema);
});

module.exports = chatModel;