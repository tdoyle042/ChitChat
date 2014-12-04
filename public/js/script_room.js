$(function() {
	console.log("room id: ", window.location.pathname.split("/")[3])
var socket = io()
var roomId = window.location.pathname.split("/")[3]
var userId

getRoomData(roomId);

//new person joined room, send room id to get userId
// socket.emit('join', {roomId: roomId})

socket.on('joined room', function(data){
	console.log("data.userId: ", data.userId)
	userId = data.userId
})

socket.on('user joined', function(data){
	console.log("a user has joined");
})

// socket.on('test', function(data){
// 	console.log("test")
// 	$('#test').html("aoiweja");
// })

// socket.emit('test', {message:"hellooooo"})



}) //closing doc ready

//getting room data by querying db for roomId
function getRoomData(roomId){
	console.log("calling to get room data on ", roomId)
	$.ajax({
		url: "/chats/getRoomInfo",
		type: "get",
		data: {roomId: roomId},
		success: function(data) {
			console.log("room data: ", data)
			name = data.name;
			time_limit = data.time_limit;
			loadRoomData(name, time_limit);
		}
	});
}

function loadRoomData(name, time_limit){
	$('#title').html(name);

	var timer=setInterval(function(){updateTimer(time_limit)},1000);
}

function updateTimer(time_limit){
	now = new Date();
	future = new Date(time_limit)
	diff_sec = Math.round((future-now)/1000)
	// console.log("now: ", now, "time_limit: ", future, "diff_sec: ", diff_sec, "diff_min: ", diff_min)
	console.log(time_limit-now)
	minutes = Math.floor(diff_sec / 60)
	seconds = diff_sec % 60
	if (seconds < 10){
		seconds = "0"+seconds
	}
	$('#time').html(minutes+":"+seconds)
}