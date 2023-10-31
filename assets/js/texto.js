
//grouping and ungrouping - https://somethingaboutcode.wordpress.com/2013/07/24/ungroup-objects-grouped-programatically-with-fabric-js/
// Clone object - http://jsfiddle.net/tornado1979/0fbefh52/4/

//Source: http://stackoverflow.com/questions/28301286/scale-fabric-js-canvas-objects    
//Scale Canvas

//var XLSX = require('xlsx');

var canvasFabric = new fabric.Canvas('canvas');

var cheight = canvasFabric.setHeight(395);
var cwidth = canvasFabric.setWidth(545);
var activeItalic = false;
//variables para grid
var gridActivado = false;
var gridVerticalArray = [];
var gridHorizontalArray = [];

var arrayObjetosCanvas = [];
var tamPlantillaRow = 0;
var tamPlantillaCol = 0;
let tbl = document.createElement('table');

//datos secuencia

var vInicial = 0;
var vFinal = 0;
var vIncremento = 0;
var prefijo;
var sufijo;

var tipoPlantilla ="ninguno";

var diseniosUsuario = [];

function zoomIt(factor) {
  var factor = 2;
  canvas.setHeight(canvas.getHeight() * factor);
  canvas.setWidth(canvas.getWidth() * factor);
  if (canvas.backgroundImage) {
    // Need to scale background images as well
    var bi = canvas.backgroundImage;
    bi.width = bi.width * factor; bi.height = bi.height * factor;
  }
  var objects = canvas.getObjects();
  for (var i in objects) {
    var scaleX = objects[i].scaleX;
    var scaleY = objects[i].scaleY;
    var left = objects[i].left;
    var top = objects[i].top;

    var tempScaleX = scaleX * factor;
    var tempScaleY = scaleY * factor;
    var tempLeft = left * factor;
    var tempTop = top * factor;

    objects[i].scaleX = tempScaleX;
    objects[i].scaleY = tempScaleY;
    objects[i].left = tempLeft;
    objects[i].top = tempTop;

    objects[i].setCoords();
  }
  canvas.renderAll();
  canvas.calcOffset();
}
//zoomIt();


//Scale Canvas
function unzoomIt(factor) {
  var factor = .5;
  canvas.setHeight(canvas.getHeight() * factor);
  canvas.setWidth(canvas.getWidth() * factor);
  if (canvas.backgroundImage) {
    // Need to scale background images as well
    var bi = canvas.backgroundImage;
    bi.width = bi.width * factor; bi.height = bi.height * factor;
  }
  var objects = canvas.getObjects();
  for (var i in objects) {
    var scaleX = objects[i].scaleX;
    var scaleY = objects[i].scaleY;
    var left = objects[i].left;
    var top = objects[i].top;

    var tempScaleX = scaleX * factor;
    var tempScaleY = scaleY * factor;
    var tempLeft = left * factor;
    var tempTop = top * factor;

    objects[i].scaleX = tempScaleX;
    objects[i].scaleY = tempScaleY;
    objects[i].left = tempLeft;
    objects[i].top = tempTop;

    objects[i].setCoords();
  }
  canvas.renderAll();
  canvas.calcOffset();
}

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;

/*span = document.getElementById("zoomP");
txt = document.createTextNode(canvasFabric.getZoom() * 100 + "%");
span.appendChild(txt);
console.log(span)
*/
$("#canvas2png").click(function () {
  canvas.isDrawingMode = false;
  //enlarge image
  zoomIt();

  if (!window.localStorage) { alert("This function is not supported by your browser."); return; }
  // to PNG
  window.open(canvas.toDataURL('png'));
  //revert back to original size
  unzoomIt();
});

//Source: http://stackoverflow.com/questions/35053171/editor-text-fabricjs-itext-format-letters-and-simultaneous-selection-textdecor


var $ = function (id) { return document.getElementById(id) };


//canvas.backgroundColor = 'red';



var text = new fabric.IText("Bharat\nasdsa\nasdasda\nnn\nklssd", {
  fontFamily: 'Courier New',
  left: 0,
  top: 0,
  fontSize: 16,
  fill: '#000000'
});

var rect = new fabric.Rect({
  height: 100,
  width: 100,
  fill: '#ffcc12',
  opacity: 1
});


fabric.util.addListener(document.getElementById('align'), 'click', function () {
  var align = text.getTextAlign();
  if (align === 'right') {

    text.set({
      textAlign: 'left',
      originX: 'left',
      left: rect.left
    });

    text.set({
      textAlign: 'center',
      originX: 'center',
      left: rect.center
    });


  } else {
    text.set({
      textAlign: 'right',
      originX: 'right',
      left: rect.left + rect.width
      //left: rect.right
    });
  }
  text.setCoords();
  canvas.renderAll();
});

/*

function addcenteredtext() { 
  //var text = new fabric.IText("Bharat\nasdsa\nasdasda\nnn\nklssd", {
   var text = new fabric.IText("A", {
    fontFamily: 'Verdana',
    left: 0,
    top: 0,
    fontSize: 200, // this size cannot be larger than the canvas 
    fill: '#000000'
});

var newrectwidth = canvas.getWidth();
var newrectheight = canvas.getHeight();
//alert(newrectwidth + newrectheight)

var rect = new fabric.Rect({
    //height: newrectheight,
    //width: newrectwidth,
    height: 300,
    width: 200,
    fill: 'red',
    opacity: 1
});


var group = new fabric.Group([rect, text]);
canvas.add(group);
canvas.centerObject(group);
group.setCoords();
var align = text.getTextAlign();
  text.set({
            textAlign: 'center',
            originX: 'center',
            left: rect.center
        });
  
    text.setCoords();
    canvas.renderAll();
*/
/*
var items = group._objects;
group._restoreObjectsState();
canvas.remove(group);
for(var i = 0; i < items.length; i++) {
  canvas.add(items[i]);
}
 */
//}


function agregarTexto() {

  let textoEntrada = document.getElementById("textoEntrada").value;
  let colorTexto = document.getElementById("colorText").value;
  let fuenteTexto = document.getElementById("select-fuentes").value;
  let tamTexto = document.getElementById("tam-text").value;

  if (textoEntrada == "") {
    document.getElementById("textoEntrada").classList.add("is-invalid");
  } else {
    document.getElementById("textoEntrada").classList.remove("is-invalid");
    if (colorTexto == "") {
      colorTexto = "#000000";
    }
    if (fuenteTexto == "") {
      fuenteTexto = "Verdana";
    }
    var textbox = new fabric.Textbox(textoEntrada, {
      left: 50,
      top: 50,
      width: 150,
      fontSize: tamTexto,
      fill: colorTexto,
      fontFamily: fuenteTexto
    });

    this.canvasFabric.add(textbox).renderAll();
    ocultarMenus();
    document.getElementById("textoEntrada").value = "";
    this.arrayObjetosCanvas.push(textbox);
    addRow('Texto');
  }
}

function eliminarSeleccion() {
  canvasFabric.remove(canvasFabric.getActiveObject());
  canvasFabric.renderAll();
}

function rotarSeleccion(direccion) {
  var activeObject = canvasFabric.getActiveObject();
  if (activeObject) {
    if (direccion == 'I') {
      activeObject.angle = activeObject.angle - 90;
      canvasFabric.renderAll();
    } else if (direccion == 'D') {
      activeObject.angle = activeObject.angle + 90;
      canvasFabric.renderAll();
    }
  }
}









/*
//Scale Canvas
function zoomIt(factor) {
  var factor = 2;
canvas.setHeight(canvas.getHeight() * factor);
canvas.setWidth(canvas.getWidth() * factor);
if (canvas.backgroundImage) {
    // Need to scale background images as well
    var bi = canvas.backgroundImage;
    bi.width = bi.width * factor; bi.height = bi.height * factor;
}
var objects = canvas.getObjects();
for (var i in objects) {
    var scaleX = objects[i].scaleX;
    var scaleY = objects[i].scaleY;
    var left = objects[i].left;
    var top = objects[i].top;

    var tempScaleX = scaleX * factor;
    var tempScaleY = scaleY * factor;
    var tempLeft = left * factor;
    var tempTop = top * factor;

    objects[i].scaleX = tempScaleX;
    objects[i].scaleY = tempScaleY;
    objects[i].left = tempLeft;
    objects[i].top = tempTop;

    objects[i].setCoords();
}
canvas.renderAll();
canvas.calcOffset();
}
zoomIt();

*/


document.getElementById('select-fuentes').onchange = function () {
  let fuente = this.value;
  if (canvasFabric.getActiveObject()) {
    canvasFabric.getActiveObject().set("fontFamily", fuente);
    canvasFabric.requestRenderAll();

  }
};



document.getElementById('tam-text').onchange = function () {
  console.log("valor seleccionado " + this.value);
  if (canvasFabric.getActiveObject() != undefined) {

    canvasFabric.getActiveObject().set("fontSize", this.value);
    canvasFabric.renderAll();
  }
}

document.getElementById('colorText').onchange = function () {
  console.log("valor seleccionado " + this.value);
  if (canvasFabric.getActiveObject() != undefined) {

    canvasFabric.getActiveObject().set("fill", this.value);
    canvasFabric.renderAll();
  }

}

document.getElementById('colorFondo').onchange = function () {

  canvasFabric.backgroundColor = this.value;
  canvasFabric.renderAll();

}


function cambiarEstiloTexto(estilo) {
  console.log("estilo seleccionado " + estilo);
  console.log(canvasFabric.getActiveObject());
  if (canvasFabric.getActiveObject() != undefined) {
    switch (estilo) {
      case "alinearizq":
        canvasFabric.getActiveObject().set("textAlign", "left");
        break;
      case "centrar":
        canvasFabric.getActiveObject().set("textAlign", "center");
        break;

      case "alinearder":
        canvasFabric.getActiveObject().set("textAlign", "right");
        break;
      case "justificar":
        canvasFabric.getActiveObject().set("textAlign", "justify");
        break;

      case 'bold':
        if (canvasFabric.getActiveObject().fontWeight != "bold") {
          canvasFabric.getActiveObject().set("fontWeight", estilo);

        } else {
          canvasFabric.getActiveObject().set("fontWeight", null);

        }
        break;
      case 'italic':
        if (canvasFabric.getActiveObject().fontStyle == 'normal') {
          canvasFabric.getActiveObject().set("fontStyle", estilo);
        } else {
          canvasFabric.getActiveObject().set("fontStyle", "normal");
        }
        break;
      case 'subrayado':

        if (canvasFabric.getActiveObject().underline == false) {
          canvasFabric.getActiveObject().set("underline", true);

        } else {
          canvasFabric.getActiveObject().set("underline", false);

        }
        break;
      case 'tachado':
        if (canvasFabric.getActiveObject().linethrough == false) {
          canvasFabric.getActiveObject().set("linethrough", true);
        } else {
          canvasFabric.getActiveObject().set("linethrough", false);
        }
    }

    canvasFabric.renderAll();
  }



}


function Copy() {
  canvasFabric.getActiveObject().clone(function (cloned) {
    _clipboard = cloned;
    console.log(_clipboard)
  });
}


function Paste() {
  // clone again, so you can do multiple copies.
  _clipboard.clone(function (clonedObj) {
    canvasFabric.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    console.log(clonedObj.type)
    if (clonedObj.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvasFabric;
      clonedObj.forEachObject(function (obj) {
        canvasFabric.add(obj);
      });
      // this should solve the unselectability
      clonedObj.setCoords();
    } else {
      canvasFabric.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvasFabric.setActiveObject(clonedObj);
    canvasFabric.requestRenderAll();
  });
}

function agregarFigura() {
  var checkBordeFigura = document.getElementById('checkbordefigura').checked;
  var checkRellenoFigura = document.getElementById('checkrellenofigura').checked;
  var colorBordeFigura;
  var colorRellenoFigura;
  var grosorFigura = document.getElementById('grosor-figura').value;
  var redondezFigura = document.getElementById('redondez-figura').value;

  console.log(grosorFigura);
  console.log(redondezFigura);
  //console.log(checkBordeFigura);

  if (checkBordeFigura) {
    colorBordeFigura = document.getElementById('colorbordefigura').value;
  } else {
    colorBordeFigura = null;
  }

  if (checkRellenoFigura) {
    colorRellenoFigura = document.getElementById('colorrellenofigura').value;
  } else {
    colorRellenoFigura = null;
  }

  var rect = new fabric.Rect({
    left: 100,
    top: 50,
    fill: colorRellenoFigura,
    stroke: colorBordeFigura,
    width: 100,
    height: 100,
    strokeWidth: parseInt(grosorFigura),//ancho del borde
    rx: parseInt(redondezFigura),//redondeado
    ry: parseInt(redondezFigura),//redondeado
    angle: 0, //grado
    hasControls: true //permite mover la figura
  });

  var circle1 = new fabric.Circle({
    radius: 65,
    fill: colorRellenoFigura,
    stroke: colorBordeFigura,
    left: 0
  });

  var ellipse = new fabric.Ellipse({
    rx: 80,
    ry: 40,
    fill: '',
    stroke: 'green',
    strokeWidth: 3
  });

  canvasFabric.add(rect);
  canvasFabric.add(circle1);
  canvasFabric.add(ellipse);
  /**
   * 
 * Ejercicios con Canvas y JavaScript: dibujo de figuras geométricas
 * 
 * https://parzibyte.me/blog
   const ALTURA_CANVAS = 200,
   ANCHURA_CANVAS = 400;
   
   // Obtener el elemento del DOM
   const canvas = document.querySelector("#canvas");
   canvas.width = ANCHURA_CANVAS;
   canvas.height = ALTURA_CANVAS;
   // Del canvas, obtener el contexto para poder dibujar
   const contexto = canvas.getContext("2d");
// Estilo de dibujo
// Grosor de línea
contexto.lineWidth = 5;
// Color de línea
contexto.strokeStyle = "#212121";
// Color de relleno
contexto.fillStyle = "#673AB7";
// Comenzamos la ruta de dibujo, o path
contexto.beginPath();
// Mover a la esquina superior izquierda
contexto.moveTo(25, 5);
// Dibujar la línea hacia la derecha
contexto.lineTo(125, 5);
// Ahora la que va hacia abajo
contexto.lineTo(105, 80); // A 80 porque esa es la altura
// La que va hacia la izquierda
contexto.lineTo(5, 80);
// Y dejamos que la última línea la dibuje JS
contexto.closePath();
// Hacemos que se dibuje
contexto.stroke();
// Lo rellenamos
contexto.fill();
*/
}
/**
 *  canvasFabric.getActiveObject().set("underline", true); para subrallado
 * canvasFabric.getActiveObject().set("overline", true); para linea de texto arriba
 canvasFabric.getActiveObject().set("overline", true); para linea de texto tachado 
 * 
 */

var figurasBasicas = document.getElementById("figurasBasicas").children;
for (var a = 0; a < figurasBasicas.length; a++) {
  figurasBasicas[a].addEventListener('click', function () {
    dibujarFigura(this.dataset.action);

  });
}
var disenioplantillas = document.getElementById("disenioplantillas").children;

for (var a = 0; a < disenioplantillas.length; a++) {
  disenioplantillas[a].addEventListener('click', function () {
    seleccionarPlantilla(this.dataset.action);

  });
}
function seleccionarPlantilla(plantilla) {
  console.log(plantilla);
}


function dibujarFigura(figura) {

  var checkBordeFigura = document.getElementById('checkbordefigura').checked;
  var checkRellenoFigura = document.getElementById('checkrellenofigura').checked;
  var colorBordeFigura;
  var colorRellenoFigura;
  var grosorFigura = document.getElementById('grosor-figura').value;
  var redondezFigura = document.getElementById('redondez-figura').value;

  if (checkBordeFigura) {
    colorBordeFigura = document.getElementById('colorbordefigura').value;

  } else {
    colorBordeFigura = null;
  }

  if (checkRellenoFigura) {
    colorRellenoFigura = document.getElementById('colorrellenofigura').value;
  } else {
    colorRellenoFigura = null;
  }

  switch (figura) {
    case 'linea':
      var linea = new fabric.Line([100, 100, 100, 200], {
        stroke: 'black',
        strokeWidth: parseInt(grosorFigura),//ancho del borde

      });
      canvasFabric.add(linea);

      break;
    case 'rectangulo':

      var rect = new fabric.Rect({
        left: 100,
        top: 50,
        fill: colorRellenoFigura,
        stroke: colorBordeFigura,
        width: 150,
        height: 80,
        strokeWidth: parseInt(grosorFigura),//ancho del borde
        rx: parseInt(redondezFigura),//redondeado
        ry: parseInt(redondezFigura),//redondeado
        angle: 0, //grado
        hasControls: true //permite mover la figura
      });

      canvasFabric.add(rect);
      break;
    case 'circulo':


      var circulo = new fabric.Circle({
        radius: 65,
        fill: colorRellenoFigura,
        stroke: colorBordeFigura,
        strokeWidth: parseInt(grosorFigura),//ancho del borde
        rx: parseInt(redondezFigura),//redondeado
        ry: parseInt(redondezFigura),//redondeado
        left: 0
      });

      canvasFabric.add(circulo);
      break;
    case 'elipse':
      var elipse = new fabric.Ellipse({
        rx: 80,
        ry: 40,
        fill: colorRellenoFigura,
        stroke: colorBordeFigura,
        strokeWidth: parseInt(grosorFigura) //ancho del borde

      });

      canvasFabric.add(elipse);
      break;
    case 'triangulo':
      var triangulo = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: colorRellenoFigura,
        stroke: colorBordeFigura,
        strokeWidth: parseInt(grosorFigura)//ancho del borde

      });
      canvasFabric.add(triangulo);
      break;
    case 'basic2':
      var prueba = new fabric.Path('M 10 0 L 0 90 h 55 l 10 -90 z',
        {
          fill: colorRellenoFigura,
          stroke: colorBordeFigura,
          strokeWidth: parseInt(grosorFigura)//ancho del borde
        });

      canvasFabric.add(prueba);
      break;
    case 'rombo':
      var rombo = new fabric.Polygon([
        { x: 60, y: 20 },
        { x: 100, y: 40 },
        { x: 100, y: 80 },
        { x: 60, y: 100 },
        { x: 20, y: 80 },
        { x: 20, y: 40 }

      ], {
        fill: colorRellenoFigura,
        stroke: colorBordeFigura,
        strokeWidth: parseInt(grosorFigura),//ancho del borde
        rx: parseInt(redondezFigura),//redondeado
        ry: parseInt(redondezFigura)//redondeado
      });
      canvasFabric.add(rombo);
      break;
    case 'prom':
      var figPromo = new fabric.Path('M69.70949302788804,0 L78.86292455975153,22.55514097371324 L98.24779428127928,5.071095373670141 L95.58165281511098,28.777663857069513 L121.81956486123083,19.35762276737217 L107.86322866648592,40.119425424605545 L136.4496552171011,40.41630917274758 L113.53720120910809,54.654693255940096 L139.5104241205,64.63640630158203 L111.64106449851177,69.87600326203534 L130.51099353975093,87.7853147715794 L102.48763296664836,83.13948530741013 L110.98174792655327,105.90725923587368 L87.65541636244058,92.13426048760668 L84.33477085403565,115.79669760303898 L69.75761832511105,95.32776675140532 L55.18527832590888,115.79669760303898 L51.859820287781815,92.13426048760667 L28.54311378311379,105.90725923587368 L37.03241621329636,83.13948530741013 L9.00424311047142,87.78531477157937 L27.878984681432847,69.87600326203534 L0,64.63640630158203 L25.978035441114184,54.6546932559401 L3.065581433121472,40.41630917274758 L31.65200798373619,40.11942542460555 L17.69567178899168,19.35762276737217 L43.93358383511145,28.777663857069513 L41.26744236894298,5.067083431127676 L60.65231209047096,22.551129031170767 L69.70949302788804,0 Z',
        {

          fill: colorRellenoFigura,
          stroke: colorBordeFigura,
          strokeWidth: parseInt(grosorFigura)//ancho del borde
        });

      canvasFabric.add(figPromo);
      break;


  }
}

const STEP = 10;
var Direction = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3
};


fabric.util.addListener(document.body, 'keydown', function (options) {

  if (canvasFabric.getActiveObject()) {

    if (options.repeat) {
      return;
    }
    var key = options.which || options.keyCode; // key detection

    if (key === 37) { // handle Left key
      moveSelected(Direction.LEFT);
    } else if (key === 38) { // handle Up key
      moveSelected(Direction.UP);
    } else if (key === 39) { // handle Right key
      moveSelected(Direction.RIGHT);
    } else if (key === 40) { // handle Down key
      moveSelected(Direction.DOWN);
    } if (key === 46) {
      canvasFabric.remove(canvasFabric.getActiveObject());
    }
  }
});

function moveSelected(direction) {
  var activeObject = canvasFabric.getActiveObject();
  var activeGroup = canvasFabric.getActiveObjects();
  console.log(activeObject);
  if (activeObject) {
    switch (direction) {
      case Direction.LEFT:
        activeObject.left = (activeObject.left - STEP);
        break;
      case Direction.UP:
        activeObject.top = (activeObject.top - STEP);
        break;
      case Direction.RIGHT:
        activeObject.left = (activeObject.left + STEP);
        break;
      case Direction.DOWN:
        activeObject.top = (activeObject.top + STEP);
        break;
    }
    activeObject.setCoords();
    canvasFabric.renderAll();
    console.log('selected objects was moved');
  } else if (activeGroup) {
    switch (direction) {
      case Direction.LEFT:
        activeGroup.setLeft(activeGroup.getLeft() - STEP);
        break;
      case Direction.UP:
        activeGroup.setTop(activeGroup.getTop() - STEP);
        break;
      case Direction.RIGHT:
        activeGroup.setLeft(activeGroup.getLeft() + STEP);
        break;
      case Direction.DOWN:
        activeGroup.setTop(activeGroup.getTop() + STEP);
        break;
    }
    activeGroup.setCoords();
    canvasFabric.renderAll();
    console.log('selected group was moved');
  } else {
    console.log('no object selected');
  }
}


document.getElementById('image_upload').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({
        left: 0,
        top: 0,
        angle: 0
      });

      oImg.scaleToWidth(200, false);
      canvasFabric.add(oImg).renderAll();
      var a = canvasFabric.setActiveObject(oImg);
      var dataURL = canvasFabric.toDataURL({ format: 'png', quality: 0.8 });
    });
  };
  reader.readAsDataURL(file);
});


function activarGrid() {

  var gridsize = 5;

  if (!gridActivado) {
    for (var x = 1; x < (canvasFabric.width / gridsize); x++) {
      var gridVertical = new fabric.Line([50 * x, 0, 50 * x, 600],
        {
          stroke: "#babdc0",
          strokeWidth: 1,
          selectable: false,
          strokeDashArray: [5, 5]
        });
      var gridHorizontal = new fabric.Line([0, 50 * x, 600, 50 * x],
        {
          stroke: "#babdc0",
          strokeWidth: 1,
          selectable: false,
          strokeDashArray: [5, 5]
        });

      canvasFabric.add(gridVertical);
      canvasFabric.sendToBack(gridVertical);

      canvasFabric.add(gridHorizontal);
      canvasFabric.sendToBack(gridHorizontal);

      gridVerticalArray.push(gridVertical);
      gridHorizontalArray.push(gridHorizontal);

    }
    gridActivado = true;
  } else {
    for (var x = 0; x < gridVerticalArray.length; x++) {
      canvasFabric.remove(gridVerticalArray[x]);
      canvasFabric.remove(gridHorizontalArray[x]);
    }
    gridActivado = false;
  }

}

function generarCodigoBarrasQR() {
  var textoGenararCodigo = document.getElementById("textogencodigo").value;
  var simbologia = document.getElementById("simbologia").value;
  var mostrarCodigo = document.getElementById("chkmostrartxtcodigo").checked;
  var colocacionCodigo = document.getElementById("colocacion").value;
  var alineacionCodigo = document.getElementById("alineacion").value;
  var tamCodigo = document.getElementById("tamcodigo").value;

  var anchoCodigo = document.getElementById("anchocodigo").value;
  var largoCodigo = document.getElementById("largocodigo").value;

  if (simbologia == "Code 128") {
    JsBarcode("#codigo", textoGenararCodigo, {
      displayValue: mostrarCodigo,
      width: largoCodigo,
      height: anchoCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0

    });

    fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (myImg) {
      var img1 = myImg.set({ left: 0, top: 0 });
      canvasFabric.add(img1);

    });


  } else if (simbologia == "Pharmacode") {
    JsBarcode("#codigo", textoGenararCodigo, {
      format: "pharmacode",
      width: largoCodigo,
      height: anchoCodigo,
      displayValue: mostrarCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0

    });
    fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (imagenBarrasUPC) {
      var imgUPC = imagenBarrasUPC.set({ left: 0, top: 0 });
      canvasFabric.add(imgUPC);

    });


  } else if (simbologia == "UPC") {
    JsBarcode("#codigo", textoGenararCodigo, {
      format: "UPC",
      displayValue: mostrarCodigo,
      width: largoCodigo,
      height: anchoCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0
    });

    fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (imagenBarrasUPC) {
      var imgUPC = imagenBarrasUPC.set({ left: 0, top: 0 });
      imgUPC.set({ top: 0, left: canvasFabric.width / 2 - imgUPC.width / 2 });
      imgUPC.setCoords();
      canvasFabric.add(imgUPC);
    });


  } else if (simbologia == "EAN-13") {
    JsBarcode("#codigo", textoGenararCodigo, {
      format: "ean13",
      displayValue: mostrarCodigo,
      width: largoCodigo,
      height: anchoCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0
    });
    if (textoGenararCodigo.length == 13) {
      fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (imagenBarrasEAN13) {
        var imgEAN13 = imagenBarrasEAN13.set({ left: 0, top: 0 });
        imgEAN13.set({ top: 0, left: canvasFabric.width / 2 - imgEAN13.width / 2 });
        imgEAN13.setCoords();
        canvasFabric.add(imgEAN13);


      });
    }
  } else if (simbologia == "CODE-39") {
    JsBarcode("#codigo", textoGenararCodigo, {
      format: "CODE39",
      displayValue: mostrarCodigo,
      width: largoCodigo,
      height: anchoCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0
    });

    fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (imagenBarrasCODE39) {
      var imgCODE39 = imagenBarrasCODE39.set({ left: 0, top: 0 });
      imgCODE39.set({ top: 0, left: canvasFabric.width / 2 - imgCODE39.width / 2 });
      imgCODE39.setCoords();
      canvasFabric.add(imgCODE39);


    });

  } else if (simbologia == "EAN-8") {
    JsBarcode("#codigo", textoGenararCodigo, {
      format: "EAN8",
      displayValue: mostrarCodigo,
      width: largoCodigo,
      height: anchoCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0
    });
    fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (imagenBarrasEAN8) {
      var imgEAN8 = imagenBarrasEAN8.set({ left: 0, top: 0 });
      imgEAN8.set({ top: 0, left: canvasFabric.width / 2 - imgEAN8.width / 2 });
      imgEAN8.setCoords();
      canvasFabric.add(imgEAN8);


    });

  } else if (simbologia == "ITF-14") {
    JsBarcode("#codigo", textoGenararCodigo, {
      format: "ITF14",
      displayValue: mostrarCodigo,
      width: largoCodigo,
      height: anchoCodigo,
      textAlign: alineacionCodigo,
      textPosition: colocacionCodigo,
      fontSize: tamCodigo,
      margin: 0
    });
    if (textoGenararCodigo.length == 14) {
      fabric.Image.fromURL(document.getElementById('codigo').getAttribute('src'), function (imagenBarrasITF14) {
        var imgITF14 = imagenBarrasITF14.set({ left: 0, top: 0 });
        imgITF14.set({ top: 0, left: canvasFabric.width / 2 - imgITF14.width / 2 });
        imgITF14.setCoords();
        canvasFabric.add(imgITF14);


      });
    }
  } else if (simbologia == "QR") {
    document.getElementById("codigoQR").innerHTML = "";
    var qrcode = new QRCode(document.getElementById("codigoQR"), {
      text: textoGenararCodigo,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    fabric.Image.fromURL(document.getElementById('codigoQR').children[0].toDataURL("image/png"), function (imageQR) {
      var imgQR = imageQR.set({ left: 0, top: 0 });
      imgQR.set({ top: 0, left: canvasFabric.width / 2 - imgQR.width / 2 });
      imgQR.setCoords();
      canvasFabric.add(imgQR);
    });

  }
  addRow('Código');

}

window.addEventListener('keydown', handleKeys);

function handleKeys(evt) {
  if (evt.ctrlKey && evt.key === 'z') {
    // console.log('undo');
    //canvasFabric.undo();

  }
}


/*const editor = grapesjs.init({
  container: '#addrule',
height: '100%',
fromElement: true,
storageManager: false,
plugins: ['grapesjs-rulers'],
});*/


function mostrarMenu(opcion) {
  switch (opcion) {
    case 'texto':
      var mostrarDivTexto = document.getElementById('menu-texto').style.display;
      //oculta los demas menus
      ocultarMenus();

      if (mostrarDivTexto == "none") {
        document.getElementById('menu-texto').style.display = "";
      } else {
        document.getElementById('menu-texto').style.display = "none";
      }

      break;
    case 'codigos':
      var mostrarDivCodigos = document.getElementById('menu-codigos').style.display;
      ocultarMenus()

      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-codigos').style.display = "";
      } else {
        document.getElementById('menu-codigos').style.display = "none";
      }

      break;
    case 'formas':
      var mostrarDivCodigos = document.getElementById('menu-formas').style.display;
      ocultarMenus()
      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-formas').style.display = "";
      } else {
        document.getElementById('menu-formas').style.display = "none";
      }

      break;
    case 'plantillas':
      var mostrarDivCodigos = document.getElementById('menu-plantillas').style.display;
      ocultarMenus()

      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-plantillas').style.display = "";
      } else {
        document.getElementById('menu-plantillas').style.display = "none";
      }

      break;
    case 'imagenes':
      var mostrarDivCodigos = document.getElementById('menu-imagenes').style.display;
      ocultarMenus()

      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-imagenes').style.display = "";
      } else {
        document.getElementById('menu-imagenes').style.display = "none";
      }

      break;
    case 'secuenciadatos':
      var mostrarDivCodigos = document.getElementById('menu-secuenciadatos').style.display;
      ocultarMenus()

      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-secuenciadatos').style.display = "";
      } else {
        document.getElementById('menu-secuenciadatos').style.display = "none";
      }

      break;
    case 'importar':
      var mostrarDivCodigos = document.getElementById('menu-importar').style.display;
      ocultarMenus()

      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-importar').style.display = "";
      } else {
        document.getElementById('menu-importar').style.display = "none";
      }

      break;
    case 'misdisenios':
      var mostrarDivCodigos = document.getElementById('menu-misdisenio').style.display;
      ocultarMenus()
      
      obtenerDisenios();
      this.tableCreateMisDisenios(2, 3);
      if (mostrarDivCodigos == "none") {
        document.getElementById('menu-misdisenio').style.display = "";
      } else {
        document.getElementById('menu-misdisenio').style.display = "none";
      }

      break;
  }
}

function ocultarMenus() {
  document.getElementById('menu-texto').style.display = "none";
  document.getElementById('menu-codigos').style.display = "none";
  document.getElementById('menu-formas').style.display = "none";
  document.getElementById('menu-plantillas').style.display = "none";

  document.getElementById('menu-imagenes').style.display = "none";
  document.getElementById('menu-secuenciadatos').style.display = "none";
  document.getElementById('menu-importar').style.display = "none";
  document.getElementById('menu-misdisenio').style.display = "none";
  actualizarCanvas();
}


function actualizarCanvas() {

  for (let i = 0; i < this.tamPlantillaRow; i++) {
    for (let j = 0; j < this.tamPlantillaCol; j++) {
      let canvas2 = document.getElementById('CursorLayer' + i + "" + j);
      canvas2.src = this.canvasFabric.toDataURL();
      canvas2.style.width = "20px";
      canvas2.style.height = "10px";
    }

  }
  /*let canvas2 = document.getElementById('CursorLayer00');
  canvas2.src = this.canvasFabric.toDataURL();
  canvas2.style.width = "20px";
  canvas2.style.height = "10px";
 
  canvas2 = document.getElementById('CursorLayer01');
  canvas2.src = this.canvasFabric.toDataURL();
  canvas2.style.width = "20px";
  canvas2.style.height = "10px";
 
  canvas2 = document.getElementById('CursorLayer02');
  canvas2.src = this.canvasFabric.toDataURL();
  canvas2.style.width = "20px";
  canvas2.style.height = "10px";
 
  canvas2 = document.getElementById('CursorLayer03');
  canvas2.src = this.canvasFabric.toDataURL();
  canvas2.style.width = "20px";
  canvas2.style.height = "10px";
 
 
  canvas2 = document.getElementById('CursorLayer04');
  canvas2.src = this.canvasFabric.toDataURL();
  canvas2.style.width = "20px";
  canvas2.style.height = "10px";
*/

}

function agregarSecuencia() {

}


ZOOM_PERCENT = 1.5;
actual = 0;
function zoomDisenio() {
  var valorZoom = document.getElementById('zoom').value / 100;
  canvasFabric.setZoom(1);

  console.log(canvasFabric.getZoom());

  console.log(valorZoom / ZOOM_PERCENT)
  console.log(valorZoom * ZOOM_PERCENT)

  if (valorZoom < actual) {
    console.log("entra a reducir")
    actual = valorZoom
    canvasFabric.zoomToPoint(new fabric.Point(canvasFabric.width / 2, canvasFabric.height / 2), valorZoom / ZOOM_PERCENT);
  } else {
    console.log("entra a aumentar")
    actual = valorZoom
    canvasFabric.zoomToPoint(new fabric.Point(canvasFabric.width / 2, canvasFabric.height / 2), valorZoom * ZOOM_PERCENT);
  }

}


/*canvasFabric.on(
  'mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvasFabric.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvasFabric.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = this.viewportTransform;
    if (zoom < 400 / 1000) {
      vpt[4] = 200 - 1000 * zoom / 2;
      vpt[5] = 200 - 1000 * zoom / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < canvasFabric.getWidth() - 1000 * zoom) {
        vpt[4] = canvasFabric.getWidth() - 1000 * zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < canvasFabric.getHeight() - 1000 * zoom) {
        vpt[5] = canvasFabric.getHeight() - 1000 * zoom;
      }
    }
    document.getElementById('zoomP').innerHTML = Math.trunc(canvasFabric.getZoom()*100)+"%";
  }
 
 
);
*/
canvasFabric.on('mouse:wheel', function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvasFabric.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvasFabric.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  document.getElementById('zoomP').innerHTML = Math.trunc(canvasFabric.getZoom() * 100) + "%";
});



function addRow(objeto) {

  var table = document.getElementById("demoA");

  var row = table.insertRow();

  var cell = row.insertCell();
  cell.innerHTML = objeto;
  cell.style.width = "155px";
  cell = row.insertCell();
  cell.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";

}


function abrirImprimir() {
  document.querySelector("#modal-dialog-impresion").showModal();
  //cargarDisenio();
  printCanvas2();
}

function cerrarImprimir() {
  document.querySelector("#modal-dialog-impresion").close();

}

function descargarPdf() {
  if (gridActivado) {
    activarGrid();
  }
  download();
  cerrarImprimir();
}

function printCanvas2() {
  /*let dataUrlCanvas = document.getElementById('canvas').toDataURL(); //attempt to save base64 string to server using this var  
  let windowContent = '<!DOCTYPE html>';
  windowContent += '<html>';
  windowContent += '<head><title>Print canvas</title></head>';
  windowContent += '<body>';
 
  windowContent += '<div class="row">';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
 
  windowContent += '</div>'
  windowContent += '<div class="row">';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
 
  windowContent += '</div>'
  windowContent += '<div class="row">';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
 
  windowContent += '</div>'
  windowContent += '<div class="row">';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
 
  windowContent += '</div>'
  windowContent += '<div class="row">';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
  windowContent += '<div class="col-2"><img src="' + dataUrlCanvas + '" style="width:50px; height:50px"> </div>';
 
  windowContent += '</div>'
  windowContent += '</body>';
  windowContent += '</html>';
*/
  let tbl = document.createElement('table');
  tbl.id = "tablaPrint";

  for (let i = 0; i < tamPlantillaRow; i++) {
    let tr = tbl.insertRow();
    for (let j = 0; j < tamPlantillaCol; j++) {
      let td = tr.insertCell();
      var image = document.createElement('img');
      image.id = "CursorLayer" + i + "" + j;
      image.style.width = "59px";
      image.style.height = "44px";
      image.src = this.canvasFabric.toDataURL();

      td.appendChild(image);
      td.style.width = "15px";
      td.style.height = "10px";
      td.style.border = '1px solid #ffffff';
    }
  }

  var div4 = document.getElementById("vprevia");
  div4.appendChild(tbl);

  //document.getElementById('vprevia').innerHTML = windowContent;

}

function printCanvas() {
  /* let dataUrlCanvas = document.getElementById('canvas').toDataURL(); //attempt to save base64 string to server using this var  
   //console.log(dataUrlCanvas);
   let windowContent = '<!DOCTYPE html>';
   windowContent += '<html>'
   windowContent += '<head><title>Print canvas</title></head>';
   windowContent += '<body>'
   windowContent += '<img src="' + dataUrlCanvas + '">';
   windowContent += '</body>';
   windowContent += '</html>';
 
   console.log(windowContent);
   let printWin = window.open('','','width=340,height=260');
   printWin.document.open();
   printWin.document.write(windowContent);
   printWin.document.close();
   printWin.focus();
   printWin.print();
   printWin.close();*/
  let dataUrlCanvas = document.getElementById('canvas').toDataURL(); //attempt to save base64 string to server using this var  
  let windowContent = '<!DOCTYPE html>';
  windowContent += '<html>';
  windowContent += '<head><title>Print canvas</title></head>';
  windowContent += '<body>';


  windowContent += '<img src="' + dataUrlCanvas + '" style="width:200px">';
  windowContent += '<img src="' + dataUrlCanvas + '" style="width:200px">';
  windowContent += '<img src="' + dataUrlCanvas + '" style="width:200px">';
  windowContent += '<img src="' + dataUrlCanvas + '" style="width:200px">';
  windowContent += '<img src="' + dataUrlCanvas + '" style="width:200px">';
  windowContent += '<img src="' + dataUrlCanvas + '" style="width:200px">';

  windowContent += '</body>';
  windowContent += '</html>';

  const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
  printWin.document.open();
  printWin.document.write(windowContent);

  printWin.document.addEventListener('load', function () {
    printWin.focus();
    printWin.document.close();
    printWin.print();
  }, true);
}

function abrirRegistro() {

  window.location.href = "/register";

}

function guardarDisenio() {
  var json = canvasFabric.toJSON();

  var http = new XMLHttpRequest();

  var url = "/registrodisenio";
  let params = "disenio=" + JSON.stringify(canvasFabric.toJSON());

  http.open("POST", url, true);
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


  http.onreadystatechange = function () {//Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
    }
  }
  console.log(params)
  http.send(params);

}

function cargarDisenio() {
  var json = '{"version":"5.2.1","objects":[{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":150,"height":150,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"","crossOrigin":null,"filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":199.93,"top":137.79,"width":180,"height":100,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABkCAYAAAAv8xodAAAAAXNSR0IArs4c6QAABWVJREFUeF7t3dF22kAQA9Dk/z86PcGmxRuvJUwKPNy+9CTG4AxajUYza39+fHx8fdz8+/pafvz8/Lz8f/35+pLr72/PaV43vu94/vXn2evS78frS3/H+Pmzv2u8rtnnpM+fxWuMc3sd6XsYj6f4z+L1v6+n/R7a6/tGLUDfLOC00AB6G6F7F8qMIFrCTAQA0GskWyYCaIDeSJcWOG3KnEkikmORjEnKzY4n5j37vhh6jQANvQQiAS3FqdXe6XMAeig2k1bF0PsRSkADaEXhBTmtFKKhaegqVaYUlphnBrSZ/TjyH0Dv27VtXFopQ0PT0A8Vd4koFIVrw2VkuNSASdovBR5DKwpvpeEMD3zodSW1qZWGpqFp6B3Dom3lzjLhWc3anvdoRm0zblvLtPHC0Bh6l3AAevWZx5ScVmrLQDQ0DU1DH0wNtqluZjOlacTEcG0KbRd8Io53vZ72e2jjRXKQHCTHTo0T56YTQ5xlGMNJneuQ4t8y4G9nDAw9+OAADdC3ESA5SA6Sg+TIW9TeNcXzoYMdl1yApI1bTca2Y9ux7dh2f/niXTOGolBReMFAKx3aDMnlGJaWabslIGlX8gxgiUHPAvPsec+6HgyNoTH0wd5Kth3bjm3HtmPbnZUyM1fs+vu2NjDgP9iPrXZLtmTbqUz25LM066OASX9He3yMG0CvEWgBNQtgCiRAb29Y0wI2MThAT+7rAdBbiKUGFIbWKdwUTSOjtwsqMRvJsbU9z8aLy8Hl4HJwObgcSSOn4zQ0Db3LpCk1J2DNjj9LArVuU9uaJzlIDpKD5CA5zjL/zAZN9imGDs+KaVMdH5oPfcFAe3/nRzVga5tprGzvLpriTkO70cxmISdAtCk0Aa89/q7X02bKNl6KQkWholBRqChUFHrGyoYH2hTaSooEMJLDk2R3ATjaS21RmoCZAJcAm46n93/VAqOhbcHadZEAeomAolBRqChUFCoKU0ZIxw0nGU7aZdKkzROwZseT5j77vuN5NDQNTUO7jcG/Z2TvyaVLMTF5XN2MUdzBf4lMYvK0JQxDY2gMjaEx9L1Mml5PQ+sUbrLrqxoZdn3b9b3RildU0tA09KH2SymsLS5md/80D20e+pCZZv7nyGAJqI/6qO0sBUADNEDfrLa0cGZS5N0067tdD9uObce2Y9ux7ZIN9yrXBUNjaAyNoTE0hrZjZbcRwofeioR7F8psNmbmjs1cstnnGvBfI2Y4aWvrJaC2dmzbPwDoNQLJTpt19NpiZMYoOoU6hTqFO752+1zD32JEPrRZjsMGU5shUkf0WSkeoAEaoMfVeJBp0sJVFA5aeXYTyNR6NsthlsMsh1mOemtaK2UwNIbe9cPPAqg971mavnWb2tY8H5oPvcnEz3ZdANosx6H9mRoZGJrLweXgcngkRdKgrSZsbbDUeHnX6yE5SA6Sw/io8VEMbXx01y6bNXBSYydJhwS4JCnS8fT+r5JAJAfJQXKQHCQHhiY5SI477sra+tta31rfWt87EsMWrKFB1BYjM0axY2WJzL1SBkNjaAyNoX8yh3lo89CHMwwzX3X0Y5M/mvzZdH67BQqgARqgb1ZbWjgaK9+TyD//pem/tpZpGz/modeIui+H+3JUPm2SDCTHwmzJLWjjmBix9YufdT0YWuv7goEWmGcXAkCHjQCPBigxT9KwikJFoaJQUWjXN9uu08Rt1d7WGElapAz5quuhoWloGtr4qPFRDG18tLIlU8OldSMS4JKkSMfT+5Mcg/iZfbEp0K1G5HIskboXmG38ARqgD12ge4GXXn8WmGfPe9b1KAoVhYpCRaGiMDEuyUFykBy/oOlJDpKD5DhYSH8AerqFpXMsgXwAAAAASUVORK5CYII=","crossOrigin":null,"filters":[]}]}';

  canvasFabric.loadFromJSON(json, function () {
    canvasFabric.renderAll();
  });
}

function cargarDisenioGuardado(json) {

  json = transformarDataDisenio(json);
  canvasFabric.loadFromJSON(json, function () {
    canvasFabric.renderAll();
  });
}

function SeleccionPlantilla() {
  document.querySelector("#modal-dialog-plantilla").showModal();

}

function plantillaSelect(tamanio) {
  switch (tamanio) {
    case 'p3625':
      this.tamPlantillaCol = 5;
      this.tamPlantillaRow = 9;
      tableCreate(9, 5);
      break;
    case 'p10535':
      this.tamPlantillaCol = 2;
      this.tamPlantillaRow = 8;
      tableCreate(8, 2);
      break;
    case 'p10574':
      this.tamPlantillaCol = 2;
      this.tamPlantillaRow = 4;
      tableCreate(4, 2);
      break;
  }
}

function tableCreate(row, col) {
  let body = document.body;
  let tbl = document.createElement('table');
  tbl.style.border = '1px solid #ffffff';
  var div4 = document.getElementById("navega");
  div4.innerHTML = "";
  for (let i = 0; i < row; i++) {
    let tr = tbl.insertRow();
    for (let j = 0; j < col; j++) {
      let td = tr.insertCell();
      var image = document.createElement('img');
      image.id = "CursorLayer" + i + "" + j;
      if (tamPlantillaCol == 2 && tamPlantillaRow == 8) {
        image.style.width = "50px";
        image.style.height = "10px";
      } else if (tamPlantillaCol == 2 && tamPlantillaRow == 4) {
        image.style.width = "50px";
        image.style.height = "30px";
      }
      else {
        image.style.width = "20px";
        image.style.height = "10px";
      }

console.log("Datos canvas: "+canvasFabric);
      image.src = canvasFabric.toDataURL();

      td.appendChild(image);
      td.style.width = "15px";
      td.style.height = "10px";
      td.style.border = '1px solid #ffffff';
    }
  }


  div4.appendChild(tbl);
  //body.appendChild(tbl);
}

function tableCreateMisDisenios(row, col) {
  let body = document.body;
  tbl = document.createElement('table');
  tbl.style.border = '1px solid #ffffff';
  var div4 = document.getElementById("misdisenios");
  div4.innerHTML = "";
  var contador= 0;
  for (let i = 0; i < row; i++) {
    let tr = tbl.insertRow();
    for (let j = 0; j < col; j++) {
      let td = tr.insertCell();
      var image = document.createElement('img');
      image.id = "tabMisDisenios" + i + "" + j;
      if (tamPlantillaCol == 2 && tamPlantillaRow == 8) {
        image.style.width = "80px";
        image.style.height = "30px";
      } else if (tamPlantillaCol == 2 && tamPlantillaRow == 4) {
        image.style.width = "80px";
        image.style.height = "30px";
      }
      else {
        image.style.width = "50px";
        image.style.height = "20px";
      }
      
      let canvasInf = document.getElementById('tabMisDisenios' + i + "" + j);
      console.log("Diseño: "+diseniosUsuario[contador].info_disenio);
      canvasInf.loadFromJSON(this.diseniosUsuario[contador].info_disenio, function () {
        canvasFabric.renderAll();
      });
      image.src = canvasInf.toDataURL();;

      td.appendChild(image);
      td.style.width = "15px";
      td.style.height = "10px";
      td.style.border = '1px solid #ffffff';
    }
    contador++;
  }


  div4.appendChild(tbl);
  //body.appendChild(tbl);
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function download() {
  //let pdf = new jsPDF('l', 'pt', [1920, 640]);
  let doc = new jsPDF();
  let imgData = canvasFabric.toDataURL();
  let posX = 5;
  let posY = 5;

  for (let i = 0; i < tamPlantillaRow; i++) {
    for (let j = 0; j < tamPlantillaCol; j++) {
      doc.addImage(imgData, 'JPEG', posX, posY, 35, 25);
      posX = posX + 40;
    }
    posY = posY + 31;
    posX = 5;
  }
  /*
    doc.addImage(imgData, 'JPEG', 45, 5, 35, 25);
    doc.addImage(imgData, 'JPEG', 85, 5, 35, 25);
    doc.addImage(imgData, 'JPEG', 125, 5, 35, 25);
    doc.addImage(imgData, 'JPEG', 165, 5, 35, 25);
    */
  doc.save('test.pdf');

}

function ordenarContenido(opcion) {

  var activeObject = canvasFabric.getActiveObject();
  if (activeObject) {

    switch (opcion) {
      case 'fondo':
        canvasFabric.sendToBack(activeObject);
        break;
      case 'frente':
        canvasFabric.bringToFront(activeObject);
        break;
      case 'adelante':
        canvasFabric.bringForward(activeObject);
        break;
      case 'atras':
        canvasFabric.sendBackwards(activeObject)
        break;

    }
  }
}
//llamado para obtener los diseños guardados en base de datos
function obtenerDisenios() {
  var url = "/obtenerdisenios"
  fetch(url).
    then((response) => response.json())
    .then((data) => {
      diseniosUsuario = data
      console.log(data);
      actualizarMisDisenios();
    }
    );


}

function actualizarMisDisenios(){
var contador = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j <2 ; j++) {
      let canvas2 = document.getElementById('CursorLayer' + i + "" + j);
      canvas2.src = this.canvasFabric.toDataURL();
      canvas2.style.width = "20px";
      canvas2.style.height = "10px";
    }
  }
}
function transformarDataDisenio(json) {
  var jsonReturn = JSON.parse(json);

  for (let i = 0; i < jsonReturn.objects.length; i++) {
    if (jsonReturn.objects[i].src != undefined) {
      var nuevoValor = jsonReturn.objects[i].src.replace(/ /g, "+");
      jsonReturn.objects[i].src = nuevoValor;
    }
  }

  console.log(jsonReturn);
  return jsonReturn;
}

function abrirImportarInfo() {
  document.querySelector("#modal-dialog-importar").showModal();
}


////texto

document.getElementById('secprefijo').onkeyup = function () {
  prefijo = document.getElementById('secprefijo').value;

  if (sufijo != null || sufijo != undefined) {
    document.getElementById('numejemplo').innerHTML = prefijo + "" + vInicial + "" + sufijo;
  } else {
    document.getElementById('numejemplo').innerHTML = prefijo + "" + vInicial;
  }
}

document.getElementById('secsufijo').onkeyup = function () {
  sufijo = document.getElementById('secsufijo').value;
  if (prefijo != null || prefijo != undefined) {
    document.getElementById('numejemplo').innerHTML = prefijo + "" + vInicial + "" + sufijo;
  } else {
    document.getElementById('numejemplo').innerHTML = vInicial + "" + sufijo;
  }
}

function leerDocExcel(){
  var url= document.getElementById("docexcel").value;
  console.log(url);
 const workbook = this.XLSX.readFile('C:Users\ROED26\Downloads\Evaluacion.xlsx');
 const file = this.XLSX.readFile('./test.xlsx')
 const workbooksheets = workbook.SheetNames;
 const sheet = workbooksheets[0];
 const datos = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

 console.log(datos);


}