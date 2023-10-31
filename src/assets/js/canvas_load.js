// grid 
$( document ).ready(function() {
  
	var c = new fabric.Canvas(canvas,{
		selection: false,
		c: fabric.height,
		c: fabric.width,
	   })
	
	   function resizeCanvas() {
		 canvas.setHeight(window.innerHeight);
		 canvas.setWidth(window.innerWidth);
		 canvas.renderAll();
	   }
	  options = {
		  distance: 15,
		  width: c.width,
		  height: c.height,
		  param: {
			stroke: '#ebebeb',
			strokeWidth: 1,
			selectable: false
			
		  }
	   },
		  gridLen = options.width / options.distance;
	
	  for (var i = 0; i < gridLen; i++) {
		var distance   = i * options.distance,
			horizontal = new fabric.Line([ distance, 0, distance, options.width], options.param),
			vertical   = new fabric.Line([ 0, distance, options.width, distance], options.param);
		c.add(horizontal);
		c.add(vertical);
		if(i%5 === 0){
		  horizontal.set({stroke: '#cccccc'});
		  vertical.set({stroke: '#cccccc'});
		};
	  };
  });
  

  
  // cierre grid



