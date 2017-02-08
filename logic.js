//FORMULAS
//The argument to this function is angle in Radians. The formula for degrees to radians is:
//Radians = (Math.PI / 180) * degrees


function init() {
  //CAMBIAR NOMBRE DE VARIABLES
  var canvas = document.querySelector('#canvas');
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  const date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

	function degreesToRadians(degrees) {
		return (Math.PI / 180) * degrees
	}

  drawCanvas();
	secondsDraw = lines(0, 0, 0, -45, "#2C82C9",2,seconds);
	minutesDraw = lines(0, 0, 0, -45, "#00B5B5",2,minutes);
	hoursDraw = lines(0, 0, 0, -45, "#D8335B",4,hours);


	//porque tiene que ir en una funcion?
  function drawCanvas() {
    //circulo grande
    ctx.beginPath();
    ctx.fillStyle = "#E7E7E7";
    //ctx.arc( X , Y, size, 0, Math.PI * 2, true);
    ctx.arc(100, 125, 100, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();

    //circulo del medio
    ctx.beginPath();
    ctx.fillStyle = "#FCB410";
    ctx.arc(100, 123, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();

    //llenarlo de numeros
    let ang;
    let num;
    //tamaño de los nnumeros
    ctx.font = 188 * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#25373D";

    //Creación de los numeros, se empieza con 1, ya que es del 1 al 12 y asi no se dibuja el 0 en vez del 12
    for (num = 1; num < 13; num++) {
      //ang -> dividido entre el numero que al mitad de igual que el for 6 -> 12.
      ang = num * Math.PI / 6;
      //console.log('ang: ', ang);
      ctx.rotate(ang);
      //posicionar la posicion ( ? ,x * que tan grande); DE LOS NUMEROS INDIVIDUALES
      //este esta en el lado izquierdo.
      ctx.translate(0, -123 * 0.70);
      ctx.rotate(-ang);
      //(x , y) del circulo DE NUMEROS.
      ctx.fillText(num.toString(), 100, 123); //agarra todo el circulo de los numeros
      //lado derecha.
      ctx.rotate(ang);
      ctx.translate(0, 123 * 0.70);
      ctx.rotate(-ang);
    }

  }
  function lines(xStart,yEnd ,xPosition, yPosition, lineColor,widthLine,timeLapse) {
		ctx.save();
		//transform muevo el contexto
		ctx.translate(100,123);
		ctx.rotate(degreesToRadians(timeLapse * 6));
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = widthLine;
    //poisicion de donde empieza
    ctx.moveTo(xStart, yEnd);
    //dimension
    ctx.lineTo(xPosition, yPosition);
    ctx.stroke();
    ctx.closePath();
		ctx.resetTransform();
    return true;
  }


  var timeOut = setInterval(getRealTime, 1000);

  function getRealTime() {
    console.log('segundos ', seconds);
    seconds++;
    if (seconds > 59) {
      seconds = 0;
			minutes ++;
    }
		if (minutes > 59) {
			hours ++;
		}
    drawCanvas();
		secondsDraw = lines(0, 0, 0, -60, "#2C82C9",2,seconds);
		minutesDraw = lines(0, 0, 0, -45, "#00B5B5",2,minutes);
		hoursDraw = lines(0, 0, 0, -45, "#D8335B",4,hours);
		console.log('hora', hours);

  }



};

window.addEventListener('load', init, false);
