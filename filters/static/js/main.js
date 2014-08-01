
$(document).ready(function(){
	$( "#filters" ).accordion({
		collapsible: true, heightStyle: "fill"
	});	

	var canvasHeight = $('#mainImg').css("width");
	$('#cloak').css("height", canvasHeight);
	$('#cloak').css("width", canvasHeight);
	$('#cloak')[0].width = canvasHeight.replace("px", "");
	$('#cloak')[0].height = canvasHeight.replace("px", "");

	$('.fileContainer').hide();

	Filters.loadImage();

	$("#button_reset").click(function(event) {
		Filters.loadImage();
	});

	$('#button_download').click(function(){
		var canvas = $("#cloak")[0];
		var rawImageData = canvas.toDataURL("image/png;base64");
        rawImageData = rawImageData.replace("image/png", "image/octet-stream");
        document.location.href = rawImageData;
	});

	

	$('.thumbnail').click(function(event) {
		var id = $(this).prop('id').replace("f_", "");

		$.get( "filters/"+id, function( data ) {
			$("#controls").html(data);
			applyFilter(parseInt(id));
		});	
	});

});

function applyFilter(id, value){
	var filters = [0,0,
				[Filters.sepia, 1],0,
				[Filters.negative, -255],0,0,
				[Filters.red, 50],0,
				[Filters.brightness, 30],0,0,
				[Filters.grayscale, 1],
				[Filters.posterize, 40]
				];

	if(value != undefined){
		runFilter(id, filters[id][0], value);	
	}else{
		runFilter(id, filters[id][0], filters[id][1]);	
	}
}





