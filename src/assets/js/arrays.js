var fuentes = ["Arial", "Verdana", "Blackadder ITC", "Inconsolata"];
var tamFuente = [10, 12, 14, 18,20, 24, 36, 72,100];
var arrayGrosorFigura = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arrayRedondezFigura = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arraySimbologia=["Code 128","EAN-8","EAN-13","ITF-14","CODE-39","Pharmacode","UPC","QR"];
var arrayTiposPlantilla = ["Etiqueta GHS","Etiqueta nutricional","Otras"];

var selectTam = document.getElementById("tam-text");
var selectGroso = document.getElementById("grosor-figura");
var selectRedondez = document.getElementById("redondez-figura");
var selectSimbologia = document.getElementById("simbologia");
var selectTiposPlatilla = document.getElementById("tipo-plantilla");

tamFuente.forEach(function (tamTexto) {
    var option = document.createElement('option');
    option.innerHTML = tamTexto;
    option.value = tamTexto;
    selectTam.appendChild(option);
});

arrayGrosorFigura.forEach(function (grosorFigura){
    var option = document.createElement('option');
    option.innerHTML = grosorFigura;
    option.value = grosorFigura;
    selectGroso.appendChild(option);
});

arrayRedondezFigura.forEach(function (redondezFigura){
    var option = document.createElement('option');
    option.innerHTML = redondezFigura;
    option.value = redondezFigura;
    selectRedondez.appendChild(option);
});

arraySimbologia.forEach(function (simbologia){
    var option = document.createElement('option');
    option.innerHTML = simbologia;
    option.value = simbologia;
    selectSimbologia.appendChild(option);
});

arrayTiposPlantilla.forEach(function (tipoPlantilla){
    var option = document.createElement('option');
    option.innerHTML = tipoPlantilla;
    option.value = tipoPlantilla.replace(/\s+/g, '').toLowerCase();
    selectTiposPlatilla.appendChild(option);
});

