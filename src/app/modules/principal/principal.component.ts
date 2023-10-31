import { Component, NgZone, OnInit, Inject } from '@angular/core';
import { fabric } from 'fabric';
import { DOCUMENT } from '@angular/common';
import * as JsBarcode from 'jsbarcode';
import * as QRCode from 'qrcode';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StringIdGenerator } from 'src/app/clases/StringIdGenerator';
import { DisenioService } from 'src/app/services/disenio/disenio.service';
import { Disenio } from 'src/app/models/disenio.model';




@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css',
    '../../../../src/assets/estilos_aldana/barra_izq.css',
    '../../../../src/assets/estilos_aldana/grid.css',
    '../../../../src/assets/estilos_aldana/ruler.min.css']
})
export class PrincipalComponent implements OnInit {

  public canvasFabric: any;
  private propiedadesSeleccion = {
    "datos": {
      transparentCorners: false,
      borderColor: '#FF5733',
      cornerColor: '#FFF',
      borderScaleFactor: 2.5,
      cornerStyle: 'circle',
      cornerStrokeColor: '#0E98FC',
      borderOpacityWhenMoving: 1,
    }
  }
  mostrarMenuTexto = false;
  mostrarMenuCodigo = false;
  mostrarMenuFormas = false;
  mostrarMenuPlantillas = false;
  mostrarMenuImagenes = false;
  mostrarMenuImportar = false;
  mostrarMenuMisDisenios = false;
  mostrarMenuSecuenciaDatos = false;
  formFiguras: FormGroup;
  formSecuenciaDatos: FormGroup;
  formTexto: FormGroup;

  _positionTop = 100;
  _positionlef = 370;


  arraySecuenciaDatos = new Array();
  fuentes = ["Arial", "Verdana", "Blackadder ITC", "Inconsolata"];
  tamFuente = [10, 12, 14, 18, 20, 24, 36, 72, 100];
  arrayGrosorFigura = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arrayRedondezFigura = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arraySimbologia = ["Code 128", "EAN-8", "EAN-13", "ITF-14", "CODE-39", "Pharmacode", "UPC", "QR"];
  arrayTiposPlantilla = ["Etiqueta GHS", "Etiqueta nutricional", "Otras"];

  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder, private disenioService: DisenioService) {

    this.formFiguras = this.fb.group({
      contorno: ["#000000"],
      relleno: ["#3499CB"],
      grosor: [1],
      redondez: [0],
      checkBordeFigura: [true],
      checkrellenofigura: [false]
    });

    this.formSecuenciaDatos = this.fb.group({
      tipoSecuencia: ["N"],
      inicial: [],
      final: [],
      incremento: [],
      prefijo: [],
      sufijo: [],
      numEjemplo: []
    });

    this.formTexto = this.fb.group({
      colorTexto: ['#000000']
    });
  }

  ngOnInit() {
    this.canvasFabric = new fabric.Canvas('canvas');


  }


  //texto

  public agregarTexto() {

    let textoEntrada = this.document.getElementById("textoEntrada") as HTMLInputElement;
    let colorTexto = this.document.getElementById("colorText") as HTMLInputElement;
    let fuenteTexto = this.document.getElementById("select-fuentes") as HTMLInputElement;
    let tamTexto = this.document.getElementById("tam-text") as HTMLInputElement;


    if (colorTexto.value == "") {
      colorTexto.value = "#000000";
    }
    if (fuenteTexto.value == "") {
      fuenteTexto.value = "Verdana";
    }

    const textbox = new fabric.Textbox(textoEntrada.value, {
      left: this._positionlef,
      top: this._positionTop,
      width: 150,
      fontSize: Number(tamTexto.value),
      fill: colorTexto.value,
      fontFamily: fuenteTexto.value,
      transparentCorners: false,
      borderColor: '#FF5733',
      cornerColor: '#FFF',
      borderScaleFactor: 2.5,
      cornerStyle: 'circle',
      cornerStrokeColor: '#0E98FC',
      borderOpacityWhenMoving: 1,
    });

    this.canvasFabric.add(textbox).renderAll();
    /*ocultarMenus();
    document.getElementById("textoEntrada").value = "";
    this.arrayObjetosCanvas.push(textbox);
    addRow('Texto');*/

  }

  public cambiarFuenteTexto(valor: any) {
    if (this.canvasFabric.getActiveObject() != undefined) {
      this.canvasFabric.getActiveObject().set("fontFamily", valor.value);
      this.canvasFabric.renderAll();
    }
  }

  public cambiarTamTexto(valor: any) {
    if (this.canvasFabric.getActiveObject() != undefined) {
      this.canvasFabric.getActiveObject().set("fontSize", Number(valor.value));
      this.canvasFabric.renderAll();
    }
  }
  public cambiarColorTexto(event: any) {
    console.log(event.value)
    console.log(this.formTexto?.get('colorTexto')?.value);
    if (this.canvasFabric.getActiveObject() != undefined) {
      this.canvasFabric.getActiveObject().set("fill", this.formTexto?.get('colorTexto')?.value);
      this.canvasFabric.renderAll();
    }

  }
  public cambiarEstiloTexto(estilo: string) {
    if (this.canvasFabric.getActiveObject() != undefined) {
      switch (estilo) {
        case "alinearizq":
          this.canvasFabric.getActiveObject().set("textAlign", "left");
          break;
        case "centrar":
          this.canvasFabric.getActiveObject().set("textAlign", "center");
          break;

        case "alinearder":
          this.canvasFabric.getActiveObject().set("textAlign", "right");
          break;
        case "justificar":
          this.canvasFabric.getActiveObject().set("textAlign", "justify");
          break;

        case 'bold':
          if (this.canvasFabric.getActiveObject().fontWeight != "bold") {
            this.canvasFabric.getActiveObject().set("fontWeight", estilo);

          } else {
            this.canvasFabric.getActiveObject().set("fontWeight", null);

          }
          break;
        case 'italic':
          if (this.canvasFabric.getActiveObject().fontStyle == 'normal') {
            this.canvasFabric.getActiveObject().set("fontStyle", estilo);
          } else {
            this.canvasFabric.getActiveObject().set("fontStyle", "normal");
          }
          break;
        case 'subrayado':

          if (this.canvasFabric.getActiveObject().underline == false) {
            this.canvasFabric.getActiveObject().set("underline", true);

          } else {
            this.canvasFabric.getActiveObject().set("underline", false);

          }
          break;
        case 'tachado':
          if (this.canvasFabric.getActiveObject().linethrough == false) {
            this.canvasFabric.getActiveObject().set("linethrough", true);
          } else {
            this.canvasFabric.getActiveObject().set("linethrough", false);
          }
      }

      this.canvasFabric.renderAll();
    }
  }
  public mostrarMenu(opcion: string) {

    switch (opcion) {
      case 'texto':
        this.mostrarMenuCodigo = false;
        this.mostrarMenuFormas = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuMisDisenios = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuTexto) {
          this.mostrarMenuTexto = false;
        } else {
          this.mostrarMenuTexto = true;
        }

        break;
      case 'codigos':
        this.mostrarMenuTexto = false;

        this.mostrarMenuFormas = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuMisDisenios = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuCodigo) {
          this.mostrarMenuCodigo = false;
        } else {
          this.mostrarMenuCodigo = true;
        }

        break;
      case 'formas':
        this.mostrarMenuTexto = false;
        this.mostrarMenuCodigo = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuMisDisenios = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuFormas) {
          this.mostrarMenuFormas = false;
        } else {
          this.mostrarMenuFormas = true;
        }

        break;
      case 'plantillas':
        this.mostrarMenuTexto = false;
        this.mostrarMenuCodigo = false;
        this.mostrarMenuFormas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuMisDisenios = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuPlantillas) {
          this.mostrarMenuPlantillas = false;
        } else {
          this.mostrarMenuPlantillas = true;
        }

        break;
      case 'imagenes':
        this.mostrarMenuTexto = false;
        this.mostrarMenuCodigo = false;
        this.mostrarMenuFormas = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuMisDisenios = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuImagenes) {
          this.mostrarMenuImagenes = false;
        } else {
          this.mostrarMenuImagenes = true;
        }

        break;
      case 'secuenciadatos':
        this.mostrarMenuTexto = false;
        this.mostrarMenuCodigo = false;
        this.mostrarMenuFormas = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuMisDisenios = false;

        if (this.mostrarMenuSecuenciaDatos) {
          this.mostrarMenuSecuenciaDatos = false;
        } else {
          this.mostrarMenuSecuenciaDatos = true;
        }

        break;
      case 'importar':
        this.mostrarMenuTexto = false;
        this.mostrarMenuCodigo = false;
        this.mostrarMenuFormas = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuMisDisenios = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuImportar) {
          this.mostrarMenuImportar = false;
        } else {
          this.mostrarMenuImportar = true;
        }

        break;
      case 'misdisenios':
        this.mostrarMenuTexto = false;
        this.mostrarMenuCodigo = false;
        this.mostrarMenuFormas = false;
        this.mostrarMenuPlantillas = false;
        this.mostrarMenuImagenes = false;
        this.mostrarMenuImportar = false;
        this.mostrarMenuSecuenciaDatos = false;

        if (this.mostrarMenuMisDisenios) {
          this.mostrarMenuMisDisenios = false;
        } else {
          this.mostrarMenuMisDisenios = true;
        }

        break;
    }

  }
  public ocultarMenus() {
    if (this.canvasFabric.getActiveObject() == undefined) {
      this.mostrarMenuTexto = false;
      this.mostrarMenuCodigo = false;
      this.mostrarMenuFormas = false;
      this.mostrarMenuPlantillas = false;
      this.mostrarMenuImagenes = false;
      this.mostrarMenuImportar = false;
      this.mostrarMenuMisDisenios = false;
      this.mostrarMenuSecuenciaDatos = false;
    } else {
      let opcion = this.canvasFabric.getActiveObject().get('type');
      switch (opcion) {
        case 'textbox':
          this.mostrarMenuTexto = true;
          break;
        case 'image':
          //   this.mostrarMenuImagenes = false;
          break;
        case 'rect':
        case 'cicle':
        case 'path':
        case 'line':
        case 'triangle':
        case 'ellipse':
          this.mostrarMenuFormas = true;
          break;
      }
    }


  }

  public generarCodigoBarrasQR() {
    var textoGenararCodigo = document.getElementById("textogencodigo") as HTMLInputElement;
    var simbologia = document.getElementById("simbologia") as HTMLInputElement;
    var mostrarCodigo = document.getElementById("chkmostrartxtcodigo") as HTMLInputElement;
    var colocacionCodigo = document.getElementById("colocacion") as HTMLInputElement;
    var alineacionCodigo = document.getElementById("alineacion") as HTMLInputElement;
    var tamCodigo = document.getElementById("tamcodigo") as HTMLInputElement;

    var anchoCodigo = document.getElementById("anchocodigo") as HTMLInputElement;
    var largoCodigo = document.getElementById("largocodigo") as HTMLInputElement;

    let ubicacionCode = this.document.getElementById('codigo') as HTMLDivElement;

    console.log(textoGenararCodigo.value)
    if (simbologia.value == "Code 128") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        displayValue: mostrarCodigo.checked,
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0,

      });


      fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (myImg) => {
        var img1 = myImg.set({
          left: this._positionlef, top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });
        this.canvasFabric.add(img1);

      });


    } else if (simbologia.value == "Pharmacode") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        format: "pharmacode",
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        displayValue: mostrarCodigo.checked,
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0

      });

      fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (imagenBarrasUPC) => {
        var imgUPC = imagenBarrasUPC.set({
          left: this._positionlef, top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });
        this.canvasFabric.add(imgUPC);

      });


    } else if (simbologia.value == "UPC") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        format: "UPC",
        displayValue: mostrarCodigo.checked,
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0
      });

      fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (imagenBarrasUPC) => {
        var imgUPC = imagenBarrasUPC.set({
          left: this._positionlef, top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });

        this.canvasFabric.add(imgUPC);
      });


    } else if (simbologia.value == "EAN-13") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        format: "ean13",
        displayValue: mostrarCodigo.checked,
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0
      });
      if (textoGenararCodigo.value.length == 13) {
        fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (imagenBarrasEAN13) => {
          var imgEAN13 = imagenBarrasEAN13.set({
            left: this._positionlef, top: this._positionTop,
            transparentCorners: false,
            borderColor: '#FF5733',
            cornerColor: '#FFF',
            borderScaleFactor: 2.5,
            cornerStyle: 'circle',
            cornerStrokeColor: '#0E98FC',
            borderOpacityWhenMoving: 1,
          });
          this.canvasFabric.add(imgEAN13);


        });
      }
    } else if (simbologia.value == "CODE-39") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        format: "CODE39",
        displayValue: mostrarCodigo.checked,
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0
      });

      fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (imagenBarrasCODE39) => {
        var imgCODE39 = imagenBarrasCODE39.set({
          left: this._positionlef, top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });

        this.canvasFabric.add(imgCODE39);


      });

    } else if (simbologia.value == "EAN-8") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        format: "EAN8",
        displayValue: mostrarCodigo.checked,
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0
      });
      fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (imagenBarrasEAN8) => {
        var imgEAN8 = imagenBarrasEAN8.set({
          left: this._positionlef, top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });
        this.canvasFabric.add(imgEAN8);


      });

    } else if (simbologia.value == "ITF-14") {
      JsBarcode("#codigo", textoGenararCodigo.value, {
        format: "ITF14",
        displayValue: mostrarCodigo.checked,
        width: Number(largoCodigo.value),
        height: Number(anchoCodigo.value),
        textAlign: alineacionCodigo.value,
        textPosition: colocacionCodigo.value,
        fontSize: Number(tamCodigo.value),
        margin: 0
      });
      if (textoGenararCodigo.value.length == 14) {
        fabric.Image.fromURL(String(ubicacionCode.getAttribute('src')), (imagenBarrasITF14) => {
          var imgITF14 = imagenBarrasITF14.set({
            left: this._positionlef, top: this._positionTop,
            transparentCorners: false,
            borderColor: '#FF5733',
            cornerColor: '#FFF',
            borderScaleFactor: 2.5,
            cornerStyle: 'circle',
            cornerStrokeColor: '#0E98FC',
            borderOpacityWhenMoving: 1,
          });
          this.canvasFabric.add(imgITF14);


        });
      }
    } else if (simbologia.value == "QR") {
      let dataQR = this.document.getElementById("codigoQR") as HTMLCanvasElement;
      dataQR.innerHTML = ""

      QRCode.toCanvas(document.querySelector('#qrcode'), textoGenararCodigo.value);

      console.log(dataQR);


    }
    //addRow('Código');


  }


  public dibujarFigura(figura: string) {

    let checkBordeFigura = this.formFiguras.controls['checkBordeFigura'].value;
    let checkRellenoFigura = this.formFiguras.controls['checkrellenofigura'].value;
    let colorBordeFigura;
    let colorRellenoFigura;
    var grosorFigura = this.formFiguras.controls['grosor'].value;
    var redondezFigura = this.formFiguras.controls['redondez'].value;

    if (checkBordeFigura) {
      console.log("entra a borde> " + this.formFiguras.controls['contorno'].value)
      colorBordeFigura = this.formFiguras.controls['contorno'].value;;

    } else {
      colorBordeFigura = null;
    }

    if (checkRellenoFigura) {
      console.log("entra a relleno> " + this.formFiguras.controls['relleno'].value)

      colorRellenoFigura = this.formFiguras.controls['relleno'].value;;
    } else {
      colorRellenoFigura = null;
    }


    switch (figura) {
      case 'linea':
        var linea = new fabric.Line([100, 100, 100, 200], {
          stroke: 'black',
          strokeWidth: parseInt(grosorFigura),//ancho del borde
          left: this._positionlef,
          top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });
        this.canvasFabric.add(linea);

        break;
      case 'rectangulo':

        var rect = new fabric.Rect({
          left: this._positionlef,
          top: this._positionTop,
          fill: colorRellenoFigura,
          stroke: colorBordeFigura,
          width: 150,
          height: 80,
          strokeWidth: parseInt(grosorFigura),//ancho del borde
          rx: parseInt(redondezFigura),//redondeado
          ry: parseInt(redondezFigura),//redondeado
          angle: 0, //grado
          hasControls: true,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,//permite mover la figura

        });

        this.canvasFabric.add(rect);
        break;
      case 'circulo':


        var circulo = new fabric.Circle({
          radius: 65,
          fill: colorRellenoFigura,
          stroke: colorBordeFigura,
          strokeWidth: parseInt(grosorFigura),//ancho del borde
          left: this._positionlef,
          top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });

        this.canvasFabric.add(circulo);
        break;
      case 'elipse':
        var elipse = new fabric.Ellipse({
          rx: 80,
          ry: 40,
          fill: colorRellenoFigura,
          stroke: colorBordeFigura,
          strokeWidth: parseInt(grosorFigura), //ancho del borde
          left: this._positionlef,
          top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1
        });

        this.canvasFabric.add(elipse);
        break;
      case 'triangulo':
        var triangulo = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: colorRellenoFigura,
          stroke: colorBordeFigura,
          strokeWidth: parseInt(grosorFigura),//ancho del borde
          left: this._positionlef,
          top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
        });
        this.canvasFabric.add(triangulo);
        break;
      case 'basic2':
        var prueba = new fabric.Path('M 10 0 L 0 90 h 55 l 10 -90 z',
          {
            fill: colorRellenoFigura,
            stroke: colorBordeFigura,
            left: this._positionlef,
            top: this._positionTop,
            transparentCorners: false,
            borderColor: '#FF5733',
            cornerColor: '#FFF',
            borderScaleFactor: 2.5,
            cornerStyle: 'circle',
            cornerStrokeColor: '#0E98FC',
            borderOpacityWhenMoving: 1,
            strokeWidth: parseInt(grosorFigura)//ancho del borde
          });

        this.canvasFabric.add(prueba);
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
          left: this._positionlef,
          top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
          strokeWidth: parseInt(grosorFigura),//ancho del borde

        });
        this.canvasFabric.add(rombo);
        break;
      case 'prom':
        var figPromo = new fabric.Path('M69.70949302788804,0 L78.86292455975153,22.55514097371324 L98.24779428127928,5.071095373670141 L95.58165281511098,28.777663857069513 L121.81956486123083,19.35762276737217 L107.86322866648592,40.119425424605545 L136.4496552171011,40.41630917274758 L113.53720120910809,54.654693255940096 L139.5104241205,64.63640630158203 L111.64106449851177,69.87600326203534 L130.51099353975093,87.7853147715794 L102.48763296664836,83.13948530741013 L110.98174792655327,105.90725923587368 L87.65541636244058,92.13426048760668 L84.33477085403565,115.79669760303898 L69.75761832511105,95.32776675140532 L55.18527832590888,115.79669760303898 L51.859820287781815,92.13426048760667 L28.54311378311379,105.90725923587368 L37.03241621329636,83.13948530741013 L9.00424311047142,87.78531477157937 L27.878984681432847,69.87600326203534 L0,64.63640630158203 L25.978035441114184,54.6546932559401 L3.065581433121472,40.41630917274758 L31.65200798373619,40.11942542460555 L17.69567178899168,19.35762276737217 L43.93358383511145,28.777663857069513 L41.26744236894298,5.067083431127676 L60.65231209047096,22.551129031170767 L69.70949302788804,0 Z',
          {
            left: this._positionlef,
            top: this._positionTop,
            fill: colorRellenoFigura,
            stroke: colorBordeFigura,
            transparentCorners: false,
            borderColor: '#FF5733',
            cornerColor: '#FFF',
            borderScaleFactor: 2.5,
            cornerStyle: 'circle',
            cornerStrokeColor: '#0E98FC',
            borderOpacityWhenMoving: 1,
            strokeWidth: parseInt(grosorFigura)//ancho del borde
          });

        this.canvasFabric.add(figPromo);
        break;


    }
  }

  public cargarImagen(event: any) {
    var file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (f) => {
      const valueF = f.target;
      let data;
      if (valueF != null) {
        data = valueF.result;
      }

      fabric.Image.fromURL(String(data), (img) => {
        var oImg = img.set({
          left: this._positionlef,
          top: this._positionTop,
          transparentCorners: false,
          borderColor: '#FF5733',
          cornerColor: '#FFF',
          borderScaleFactor: 2.5,
          cornerStyle: 'circle',
          cornerStrokeColor: '#0E98FC',
          borderOpacityWhenMoving: 1,
          angle: 0
        });

        oImg.scaleToWidth(250, false);
        this.canvasFabric.add(oImg).renderAll();
        var a = this.canvasFabric.setActiveObject(oImg);
        var dataURL = this.canvasFabric.toDataURL({ format: 'png', quality: 0.8 });
      });
    }




    reader.readAsDataURL(file);
  }

  agregarSecuencia() {
    const prefijo = this.formSecuenciaDatos.controls['prefijo'].value;
    const sufijo = this.formSecuenciaDatos.controls['sufijo'].value;
    let valorSecuencia = this.formSecuenciaDatos.controls['inicial'].value;
    let incremento = this.formSecuenciaDatos.controls['incremento'].value;
    let valorSecuenciaFinal = this.formSecuenciaDatos.controls['final'].value;


    let hasta = (valorSecuenciaFinal - valorSecuencia) / incremento;

    console.log("hasta: " + hasta)
    if (this.formSecuenciaDatos.controls['tipoSecuencia'].value == 'N') {
      console.log(prefijo + " - " + sufijo + " - " + valorSecuencia);

      let valoSecuencioNum = Number(valorSecuencia);

      for (let i = 0; i < hasta; i++) {

        let secuencia = prefijo + valoSecuencioNum + sufijo;
        this.arraySecuenciaDatos.push(secuencia);

        valoSecuencioNum = valoSecuencioNum + Number(incremento);
      }

      console.log(this.arraySecuenciaDatos);

    } else {
      const ids = new StringIdGenerator();


      let valoSecuencioLet = valorSecuencia;

      while (valoSecuencioLet != this.formSecuenciaDatos.controls['final'].value) {
        let secuencia = prefijo + valoSecuencioLet + sufijo;
        this.arraySecuenciaDatos.push(secuencia);
        valoSecuencioLet = ids.next();
      }


      console.log(this.arraySecuenciaDatos);

    }


  }

  guardarDisenio() {

    var json = this.canvasFabric.toJSON();
    console.log(json);

    let disenio = new Disenio()
    disenio.diseno = json;
    console.log(disenio.diseno)

    this.disenioService.registrarDisenio(json).
      subscribe({
        next: response => {
          console.log(response)

        }, error: error => (
          console.log(error)
        )


      });


    /*var http = new XMLHttpRequest();
  
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
    http.send(params);*/
  }

}
