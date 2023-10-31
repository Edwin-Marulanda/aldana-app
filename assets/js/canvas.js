window.addEventListener("load", () => {
    var canvas = document.getElementById ("canvas");
                                           var context = canvas.getContext("2d");

                                           var mouseX = 0;
                                           var mouseY = 0;
                                           var startingX = 0;

                                           var recentWords = [];

                                           var undoList = [];

                                           function saveState() {
                                               undoList.push(canvas.toDataURL())


                                           }

                                           saveState();

                                           function undo () {
                                               undoList.pop();

                                               var imgData = undoList[undoList.length - 1];
                                               var image = new Image();

                                               image.src = imgData;
                                               image.onload = function () {
                                                   context.clearRect (0, 0, canvas.width, canvas.height);
                                                   context.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, 
                                                   canvas.width, canvas.height)
                                               }
                                           }

                                           canvas.addEventListener("click", function (e) {

                                            mouseX = e.pageX - canvas.offsetLeft;
                                            mouseY = e.pageY - canvas.offsetTop;
                                            startingX = mouseX;

                                            recentWords = [];
                            

                                               return false;
                                           }, false);
                                           

                                           document.addEventListener("keydown", function(e){
                                               context.font = "30px Arial";

                                               if(e.keyCode === 8){
                                                   undo();
                                                   
                                                   var recentWord = recentWords[recentWords.length - 1];

                                                   mouseX -= context.measureText(recentWord).width;

                                                   recentWords.pop();
                                               } else if (e.keyCode === 13) {
                                                   mouseX = startingX;
                                                   mouseY += 20;

                                               } else {

                                                context.fillText(e.key, mouseX, mouseY);

                                                mouseX += context.measureText(e.key).width;

                                                saveState();
                                                recentWords.push()
                                                }

                                           }, false)
})