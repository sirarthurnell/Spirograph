$(function() {

	var $canvas = $("#canvas"),
    	stage = new createjs.Stage($canvas.get(0)),
    	originX = $canvas.width() / 2,
    	originY = $canvas.height() / 2,
        majorRadius = 100,
        minorRadius = 15,
        minorPositionRadius = majorRadius - minorRadius,
    	majorCircle,
    	minorCircle,
        minorOriginX,
        lastDelta = 0,
        plotter = new GraphicsPlotter(stage);

    createCircles();

    $canvas.on('mousemove', function(e){
        var mouse = normalizeMouse(e),
            delta = trigonometry.pointToDegrees(mouse.x, mouse.y),
            minorPosition = trigonometry.degreesToPoint(delta, minorPositionRadius),
            deltaIncrement,
            direction,
            minorDeltaIncrement;

        if( (lastDelta >= delta) && trigonometry.isInFirstQuadrant(delta) && trigonometry.isInFourthQuadrant(lastDelta) ){            

            deltaIncrement = (360 - lastDelta) + delta;
            direction = 1;

        }else if( (delta >= lastDelta) && trigonometry.isInFirstQuadrant(lastDelta) && trigonometry.isInFourthQuadrant(delta) ){

            deltaIncrement = (360 - delta) + lastDelta;
            direction = -1;

        }else{

            deltaIncrement = delta - lastDelta;
            direction = delta > lastDelta ? 1 : -1;

        }

        minorDeltaIncrement = trigonometry.translateArc(deltaIncrement, majorRadius, minorRadius),
        lastDelta = delta;

        minorCircle.setRotation(minorCircle.getRotation() + minorDeltaIncrement * direction);
        minorCircle.setX(originX + minorPosition.x);
        minorCircle.setY(originY + minorPosition.y);

        draw();
    });

    function normalizeMouse(e){
        var canvasOffset = $canvas.offset(),
            normalizedX = originX + canvasOffset.left,
            normalizedY = originY + canvasOffset.top,
            normalizedMouseX = e.clientX - normalizedX,
            normalizedMouseY = e.clientY - normalizedY;

        return {x: normalizedMouseX, y: normalizedMouseY};
    }

    function createCircles(){
        var minorOriginX = (majorRadius - minorRadius) + originX;

        majorCircle = new Circle(originX, originY, majorRadius);
        majorCircle.addToStage(stage);

        minorCircle = new Circle(minorOriginX, originY, minorRadius);
        minorCircle.addToStage(stage);

        stage.update();
    }

    function draw(){
        var penPosition = minorCircle.getDotPosition();
        plotter.drawTo(penPosition.x, penPosition.y);
        stage.update();
    }

});