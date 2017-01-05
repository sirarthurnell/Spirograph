var GraphicsPlotter = function(stage){

	var shapeToPlot = new createjs.Shape();

    shapeToPlot.x = 0;
    shapeToPlot.y = 0;

    stage.addChild(shapeToPlot);

	this.g = shapeToPlot.graphics;
	this.g
		.setStrokeStyle(1)
	    .beginStroke("black");

	stage.update();
};

GraphicsPlotter.prototype.drawTo = function(x, y){
	this.g.lineTo(x, y);
};