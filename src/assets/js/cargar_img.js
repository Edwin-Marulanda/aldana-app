                  var img = new Image();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fileName = "";
var hexColor = "#ffffff";

$(document).ready(function() {
  $('#normal-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('normal');
      });
      this.render();
    });
  });

  $('#multiply-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('multiply');
      });
      this.render();
    });
  });

  $('#screen-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('screen');
      });
      this.render();
    });
  });

  $('#overlay-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('overlay');
      });
      this.render();
    });
  });

  $('#difference-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('difference');
      });
      this.render();
    });
  });

  $('#addition-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('addition');
      });
      this.render();
    });
  });

  $('#exclusion-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('exclusion');
      });
      this.render();
    });
  });

  $('#softlight-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('softLight');
      });
      this.render();
    });
  });

  $('#lighten-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('lighten');
      });
      this.render();
    });
  });

  $('#darken-btn').on('click', function (e) {
    hexColor = $("#hex-color").val();
    Caman("#canvas", function () {
      this.revert(false);
      this.newLayer(function () {
        this.fillColor(hexColor);
        this.setBlendingMode('darken');
      });
      this.render();
    });
  });

  $("#download-btn").on("click", function(e) {
    var fileExtension = fileName.slice(-4);
    if (fileExtension == ".jpg" || fileExtension == ".png") {
      var actualName = fileName.substring(0, fileName.length - 4);
    }
    download(canvas, actualName + "-edited.jpg");
  });

  $("#upload-file").on("change", function() {
    var file = document.querySelector("#upload-file").files[0];
    var reader = new FileReader();

    if (file) {
      fileName = file.name;
      reader.readAsDataURL(file);
    }

    reader.addEventListener(
      "load",
      function() {
        img = new Image();
        img.src = reader.result;
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          $("#canvas").removeAttr("data-caman-id");
        };
      },
      false
    );
  });
});

function download(canvas, filename) {
  var e;
  var lnk = document.createElement("a");

  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/jpeg", 0.8);

  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}                  


var canvas = this.__canvas = new fabric.Canvas('canvas');
// create a rectangle object
var rect = new fabric.Rect({
	left: 100,
  top: 50,
	fill: '#D81B60',
	width: 100,
	height: 100,
	strokeWidth: 2,
	stroke: "#880E4F",
	rx: 5,
	ry: 5,
	angle: 45,
	hasControls: true
});
canvas.add(rect);


canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

  canvas.item(0).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false
  });
  canvas.setActiveObject(canvas.item(0));
  this.__canvases.push(canvas);
