$(function() {   // when document is ready

	/* create_chat screen */
	$('#create_chat').click(function(){
		$.ajax({
			url: "create_chat",
			type: "get",
			data: {
				
			},
			success: function(data) {
				
			}
		});
	});

	/* join_chat screen */
	$('#join_chat').click(function(){

	});

});

/* create_chat screen */
function updateTime(time) {
	document.querySelector('#minutes').value = time;
}

function updateRange(range){
	document.querySelector('#miles').value = range;
}
