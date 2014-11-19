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

/* Gets the locaiton of the user via HTML5 */
function getLocation(callback) {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(callback);
	} else {
		console.log("Unable to get location")
	}
}

/* Simple test function for getting location information */
function testLocation() {
	var printData = function(location) {
		console.log(location.coords.latitude,location.coords.longitude);
	}
	getLocation(printData);
}