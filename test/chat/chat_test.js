var assert = require('assert');
var http = require('http');

var createNewRoomTest = require('./createNewRoom_test');
var getNearRoomTest = require('./getAllRooms_test');

describe('Chatroom API', function() {
	it('should return the room that we create', createNewRoomTest);
	// it('should return a room created at our location when querying all', getNearRoomTest);
});