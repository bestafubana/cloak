
$(document).ready(function(){
	$( "#filters" ).accordion({
		collapsible: true, heightStyle: "fill"
	});	

	var canvasHeight = $('#mainImg').css("width");
	$('#cloak').css("height", canvasHeight);
	$('#cloak').css("width", canvasHeight);

	$('.fileContainer').hide();

});
