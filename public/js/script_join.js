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
	message = "<div></div>";
	allChats.forEach(function(chat){
		message += "<a href='/chats/room/" + chat.id + "'><div class='chatroom'>"
		message += "<div id='chat_data'>"
		message += "<div class='chat_title chat_top'>" + chat.name + "</div>"
		message += "<div class='chat_time chat-bottom'>" + chat.time + " minutes left</div>" + "</div>"
		message += "<div class='chat_members'><div id='user_number' class='chat_top'>" + chat.users + "</div><div id='users' class='chat_bottom'>users</div></div>"
		message += "</div></a>"
	})
	return message;
}