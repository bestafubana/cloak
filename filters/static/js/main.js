
$(document).ready(function(){
	$( "#filters" ).accordion({
		collapsible: true, heightStyle: "fill"
	});	

	adjustCanvasSize();

	$('.fileContainer').hide();

	Filters.loadImage();

	$("#button_reset").click(function(event) {
		Filters.loadImage();
		filtersUsed = [];
		lastFilter = [];
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


var filtersUsed = [];
var lastFilter = [];
var testFilter = [[12, 1.2], [7, 20], [13, 15]];

function applyFilter(id, value){
	lastFilter[0] = id;

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
		lastFilter[1] = parseFloat(value);
	}else{
		runFilter(id, filters[id][0], filters[id][1]);	
		lastFilter[1] = filters[id][1];
	}
}

function addFilterStep(){
	filtersUsed.push(lastFilter);
	lastFilter = [];
}

function reuseFilter(){
	for(i = 0; i < testFilter.length; i++){
		applyFilter(testFilter[i][0], testFilter[i][1]);
		copyToFinalCanvas();
	}
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





