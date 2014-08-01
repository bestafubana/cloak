
$(document).ready(function(){
	$( "#filters" ).accordion({
		collapsible: true, heightStyle: "fill"
	});	

	adjustCanvasSize();

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

	// alert("id: " + id + " value: " + value);

	var filters = [0,0,
				[Filters.sepia, 1],0,
				[Filters.negative, -255],0,0,
				[Filters.red, 50],0,
				[Filters.brightness, 30],0,0,
				[Filters.grayscale, 1],
				[Filters.posterize, 40]
				];

	if(value != undefined){
		runFilter(id, filters[id][0], parseFloat(value));	
	}else{
		runFilter(id, filters[id][0], filters[id][1]);	
	}

	value = parseFloat(value);

	// switch(id){
	// 	case 2:
	// 		runFilter(id, Filters.sepia, value);
	// 	break;
	// 	case 4:
	// 		runFilter(id, Filters.negative, value);
	// 	break;
	// 	case 7:
	// 		runFilter(id, Filters.red, value);
	// 	break;
	// 	case 9:
	// 		runFilter(id, Filters.brightness, value);
	// 	break;
	// 	case 12:
	// 		runFilter(id, Filters.grayscale, value);
	// 	break;
	// 	case 13:
	// 		runFilter(id, Filters.posterize, value);
	// 	break;
	// }
}

function adjustCanvasSize(){
	var canvasHeight = $('#mainImg').css("width");
	$('#cloak').css("height", canvasHeight);
	$('#cloak').css("width", canvasHeight);
	$('#cloak')[0].width = canvasHeight.replace("px", "");
	$('#cloak')[0].height = canvasHeight.replace("px", "");

	$('#copy').css("height", canvasHeight);
	$('#copy').css("width", canvasHeight);
	$('#copy')[0].width = canvasHeight.replace("px", "");
	$('#copy')[0].height = canvasHeight.replace("px", "");
}





