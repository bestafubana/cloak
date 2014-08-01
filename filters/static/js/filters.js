Filters = {};
Filters.loadImage = function() {
	var img = $("#mainImg")[0];
	var c = this.getCanvas();
	var ctx = c.getContext('2d');
	ctx.drawImage(img,0,0);
};

Filters.getPixels = function() {
	var c = this.getCanvas();
	var ctx = c.getContext('2d');
	return ctx.getImageData(0,0,c.width,c.height);
};

Filters.getCanvas = function() {
	return $("#cloak")[0];
};

Filters.filterImage = function(filter, var_args) {
	var args = [this.getPixels()];
	for (var i=1; i<arguments.length; i++) {
		args.push(arguments[i]);
	}
	return filter.apply(null, args);
};

Filters.grayscale = function(pixels, factor) {
	var d = pixels.data;

	for (var i=0; i<d.length; i+=4) {
		var r = d[i];
		var g = d[i+1];
		var b = d[i+2];
	
		var v = 0.2126*r*factor + 0.7152*g*factor + 0.0722*b*factor;
		d[i] = d[i+1] = d[i+2] = v;
	}
	return pixels;
};

Filters.test1 = function(pixels, factor) {
	var d = pixels.data;

	for (var i=0; i<d.length; i+=4) {
		var r = d[i];
		var g = d[i+1];
		var b = d[i+2];
	
		var v = 0.2126*r*factor + 0.7152*g*factor + 0.0722*b*factor;
		d[i] += 0.2126*r*factor;
		d[i+1] += 0.7152*g*factor;
		d[i+2] += 0.0722*b*factor;
	}
	return pixels;
};

Filters.test2 = function(pixels, factor) {
	var d = pixels.data;

	for (var i=0; i<d.length; i+=4) {
		var r = d[i];
		var g = d[i+1];
		var b = d[i+2];
	
		d[i] += Math.floor(d[i]/factor)*factor;
		d[i+1] += Math.floor(d[i+1]/factor)*factor;
		d[i+2] += Math.floor(d[i+2]/factor)*factor;
	}
	return pixels;
};

Filters.blackRadial = function(pixels, factor) {
	// var d = pixels.data;

	var img = $("#mainImg")[0];
	var c = Filters.getCanvas();
	var ctx = c.getContext('2d');

	var grd=ctx.createRadialGradient(222,222,10,222,222,500);
	grd.addColorStop(0,"rgba(0,0,0,0)");
	grd.addColorStop(1,"rgba(0,0,0,1)");

	// Fill with gradient
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,444,444);
};

Filters.whiteRadial = function(pixels, factor) {
	// var d = pixels.data;

	var img = $("#mainImg")[0];
	var c = Filters.getCanvas();
	var ctx = c.getContext('2d');

	var grd=ctx.createRadialGradient(222,222,10,222,222,400);
	grd.addColorStop(0,"rgba(255,255,255,0)");
	grd.addColorStop(0.9,"rgba(255,255,255,0.95)");
	grd.addColorStop(1,"rgba(255,255,255,1)");

	// Fill with gradient
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,444,444);
};

Filters.red = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
  }
  return pixels;
};

Filters.green = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i+1] += adjustment;
  }
  return pixels;
};

Filters.blue = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i+2] += adjustment;
  }
  return pixels;
};

Filters.sepia = function(pixels, args) {
	var d = pixels.data;

	for (var i=0; i<d.length; i+=4) {
		var v = 0.2126*d[i] + 0.7152*d[i+1] + 0.0722*d[i+2];
		d[i] = v*1.8*0.6;
		d[i+1] = v*1.8*0.45;
		d[i+2] = v*1.8*0.2;
	}
	return pixels;
};


Filters.posterize = function(pixels, factor) {
	var d = pixels.data;

	for (var i=0; i<d.length; i+=4) {
		var r = d[i];
		var g = d[i+1];
		var b = d[i+2];
	
		d[i] = Math.floor(d[i]/factor)*factor;
		d[i+1] = Math.floor(d[i+1]/factor)*factor;
		d[i+2] = Math.floor(d[i+2]/factor)*factor;
	}
	return pixels;
};


Filters.brightness = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
};

Filters.threshold = function(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

Filters.fadeOut = function(pixels, args) {
	var d = pixels.data;
	var currentOpacity  = 255;
	var currentLine = 0;
	var shades = 255/pixels.height;
    var realWidth = pixels.width * 4;

    alert(realWidth);

	for (var i=0; i<d.length; i+=4) {
		if(currentLine < Math.floor(i/realWidth)){ //check if changed line
    		currentOpacity =  255 - Math.floor(i/realWidth)*shades;
    		currentLine++;
    	}

    	d[i+3] = currentOpacity;
 	}
  	return pixels;
};

Filters.negative = function(pixels, value) {
  return Filters.addRGBA(pixels, value,value,value);
};

/**
	Function used to modify the copied image buy adding or subtracting value;
*/
Filters.addRGBA = function(pixels, r, g, b){
	var d = pixels.data;
	for (var i=0; i<d.length; i+=4) {
		d[i] = Math.abs((d[i] + r)%256); //Red
		d[i+1] = Math.abs((d[i+1] + g)%256); //Green
		d[i+2] = Math.abs((d[i+2] + b)%256); // Blue
	}
	return pixels;
}

function runFilter(id, filter, arg1, arg2, arg3) {
    var c = Filters.getCanvas();
	var idata = Filters.filterImage(filter, arg1, arg2, arg3);
	c.width = idata.width;
	c.height = idata.height;
	var ctx = c.getContext('2d');
	ctx.putImageData(idata, 0, 0);
}

