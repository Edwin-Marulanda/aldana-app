var numeroDisenio;
var tipoPlantilla="ninguno";

function crearDisenio() {

  switch (numeroDisenio) {
    case '1':
      var rect = new fabric.Rect({
        left: 300,
        top: 20,
        fill: "white",
        stroke: "black",
        width: 230,
        height: 280,
        angle: 0, //grado
        hasControls: true //permite mover la figura
      });

      canvasFabric.add(rect);
      //texto dentro del rectangulo
      var textbox = new fabric.Textbox("Un producto quimico es un cojunto de compuestos quimicos (aunque en ocaciones sea uno solo) destinado a cumplir una misión", {
        left: 305,
        top: 22,
        width: 215,
        fontSize: 12,
        textAlign: "justify"
      });

      this.canvasFabric.add(textbox).renderAll();

      var textbox = new fabric.Textbox("Producto químico ABC", {
        left: 10,
        top: 20,
        width: 270,
        fontSize: 28,
        textAlign: "justify"
      });

      this.canvasFabric.add(textbox).renderAll();

      //agregar imagenes

      fabric.Image.fromURL("resources/img/4.svg", function (img) {
        var oImg = img.set({
          left: 80,
          top: 280,
          angle: -45
        });


        canvasFabric.add(oImg).renderAll();

      });

      fabric.Image.fromURL("resources/img/3.svg", function (img) {
        var oImg = img.set({
          left: 153,
          top: 203,
          angle: -45
        });


        canvasFabric.add(oImg).renderAll();

      });

      fabric.Image.fromURL("resources/img/explos.svg", function (img) {
        var oImg = img.set({
          left: 5,
          top: 203,
          angle: -45
        });
        oImg.scaleToWidth(145, false);

        canvasFabric.add(oImg).renderAll();

      });

      fabric.Image.fromURL("resources/img/skull.svg", function (img) {
        var oImg = img.set({
          left: 78,
          top: 125,
          angle: -45
        });

        oImg.scaleToWidth(145, false);
        canvasFabric.add(oImg).renderAll();

      });
      break;
  }
  this.cerrarDialogPlantilla();
}

function seleccionarDisenio(numDisenio) {
  this.numeroDisenio = numDisenio;
  crearDisenio();
  actualizarCanvas();
  //mostrarBtnFinalizarSeleecion();
}
function cerrarDialogPlantilla(){
  document.querySelector("#modal-dialog-plantilla").close();
}

function mostrarBtnFinalizarSeleecion(){
  document.getElementById('btnfinalizar').style.display = "block";
}