$(function() {   // when document is ready
	loadChats();


});

function loadChats(){
	$.ajax({
			url: "/chats/all",
			type: "get",
			data: {},
			success: function(data) {
				chats = formatChats(data);
				$('#join_chat').html(chats);
			}
		});
}

function formatChats(allChats){
	message = "<div id='title'>Chat Rooms Near You</div>";
	allChats.forEach(function(chat){
		message += "<a href='/chats/" + chat.id + "'><div class='chatroom'>"
		message += "<div id='chat_data'>"
		message += "<div class='chat_title'>" + chat.name + "</div>"
		message += "<div class='chat_time'>" + chat.time + " minutes left</div>"
		message += "</div>"
		message += "<div class='chat_members'>" + chat.users + " users</div>"
		message += "</div></a>"
	})
	return message;
}