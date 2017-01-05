$(function() {

	var $canvas = $("#canvas"),
    	stage = new createjs.Stage($canvas.get(0)),
    	originX = $canvas.width() / 2,
    	originY = $canvas.height() / 2,    	
    	majorRadius = 100,
    	minorRadius = 15,
    	majorMinorDifference = majorRadius - minorRadius,
    	majorCircle,
    	minorCircle,
        lastNormalizedMouseX = 0,
        lastNormalizedMouseY = 0,
        lastDelta = 0,
        startWith = 0,
        plotter = new GraphicsPlotter(stage);

	majorCircle = new Circle(originX, originY, majorRadius);
    majorCircle.addToStage(stage);

    minorCircle = new Circle(originX + majorMinorDifference, originY, minorRadius);
    minorCircle.addToStage(stage);    

    stage.update();

    $canvas.on('mousemove', function(e){
    	var canvasOffset = $canvas.offset(),
	    	normalizedX = originX + canvasOffset.left,
	    	normalizedY = originY + canvasOffset.top,
            normalizedMouseX = e.clientX - normalizedX,
            normalizedMouseY = e.clientY - normalizedY,
	    	delta = trigonometry.pointToDegrees(normalizedMouseX, normalizedMouseY),
	    	minorCirclePosition = trigonometry.degreesToPoint(delta, majorMinorDifference),
	    	arcLengthToCover,
	    	angleForCoverLength,
            mouseDirection,
	    	penPosition;

    	minorCircle.setX(originX + minorCirclePosition.x);
    	minorCircle.setY(originY + minorCirclePosition.y);

        mouseDirection = getMouseDirection(normalizedMouseX, normalizedMouseY);
        lastNormalizedMouseX = normalizedMouseX;
        lastNormalizedMouseY = normalizedMouseY;

        if((lastDelta > delta) && (lastDelta > 350) && (mouseDirection.y != -1)){ //y no retroceso de X.
            startWith = minorCircle.getRotation();
        }

        lastDelta = delta;

        arcLengthToCover = majorCircle.getArcLength(delta);        
        angleForCoverLength = trigonometry.getDegreesToCoverLength(arcLengthToCover, minorRadius);
		minorCircle.setRotation(startWith + angleForCoverLength);

		penPosition = minorCircle.getDotPosition();

		plotter.drawTo(penPosition.x, penPosition.y);
        console.log("Delta: " + delta);
        console.log("Mouse direction: (x: " + mouseDirection.x + ", y: " + mouseDirection.y + ")");

    	stage.update();
    });

    function getMouseDirection(currentX, currentY){
        var directionX, directionY;

        if(currentX >= lastNormalizedMouseX){
            directionX = +1;
        }else{
            directionX = -1;
        }

        if(currentY >= lastNormalizedMouseY){
            directionY = +1;
        }else{
            directionY = -1;
        }

        return {x: directionX, y: directionY};
    }

});