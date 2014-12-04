$(function() {
	console.log("room id: ", window.location.pathname.split("/")[3])
$('#text_bar').focus();
var socket = io()
var shapes = ['circle-teal', 'square-pink', 'triangle-teal','hexagon-purple', 'pentagon-white', 'star-white', 'square-red', 'pentagon-blue', 'circle-red', 'hexagon-pink', 'pentagon-pink', 'triangle-red', 'hexagon-red', 'star-green', 'square-blue', 'hexagon-white','circle-blue', 'square-white', 'circle-white', 'triangle-white',   'star-blue', 'hexagon-teal', 'pentagon-teal', 'star-teal', 'square-purple', 'circle-purple', 'square-pink', 'circle-teal', 'triangle-pink',  'star-pink', 'square-green', 'pentagon-red', 'star-red', 'hexagon-green', 'pentagon-green', 'triangle-blue', 'hexagon-blue', 'triangle-purple', 'circle-green', 'triangle-green', 'pentagon-purple', 'star-purple']
var roomId = window.location.pathname.split("/")[3]
var userId
var others = [""]

getRoomData(roomId);
document.getElementById('chat_room').scrollTop = document.getElementById('chat_room').scrollHeight

//new person joined room, send room id to get userId
socket.emit('join', {roomId: roomId})

socket.on('joined room', function(data){
	console.log("data.userId: ", data.userId)
	userId = data.userId
})

socket.on('user joined', function(data){
	console.log("a user has joined");
	others.push(data.userId);
	new_shape = shapes[others.indexOf(data.userId)];
	msg = '<div class="join_msg">A new user has joined disguised as a '+new_shape.split('-')[1]+' '+new_shape.split('-')[0]+'!</div>'
	$('#chat_room').append(msg)
})

//user left
socket.on('user left', function(data){
	msg = '<div class="join_msg">The '+new_shape.split('-')[1]+' '+new_shape.split('-')[0]+' has left the chat.</div>'
	$('#chat_room').append(msg)
})

//getting messages from server
socket.on('display message', function(data){
	console.log("getting new message");
	if (data.roomId == roomId){ // only display messages for this room
		if (data.userId == userId){
			//display as own message
			msg = '<div class="bubble"><img src="../../images/user_img/img_'+shapes[0]+'.png" class="img_right"><div class="message message_me">'+data.message+'</div></div>'
		} else {
			//display as other's message
			if (others.indexOf(data.userId)==-1){
				//new other user to this user
				//add to others array to keep track of that user's shape
				others.push(data.userId)
			}
			i = others.indexOf(data.userId); // to correspond with shape array
			console.log("i: ", i)
			console.log("others: ", others)
			msg = '<div class="bubble"><img src="../../images/user_img/img_'+shapes[i]+'.png"><div class="message message_them">'+data.message+'</div></div>'
		}
		$('#chat_room').append(msg)
		document.getElementById('chat_room').scrollTop = document.getElementById('chat_room').scrollHeight
	}
})

//sending a message to the server
$('#chat_input').submit(function(e){
	if ($('#text_bar').val() != ""){
		console.log("sending message: ", $('#text_bar').val())

		socket.emit('new message', {roomId: roomId, message: $('#text_bar').val()})
		$('#text_bar').val("")
		$('#text_bar').focus()
	}
	e.preventDefault();
})


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
	minutes = Math.floor(diff_sec / 60)
	if (minutes < 2){
		seconds = diff_sec % 60
		if (seconds < 10){
			seconds = "0"+seconds
		}
		
		$('#time').html(minutes+":"+seconds)
	} else {
		$('#time').html(minutes+" min")
	}
}