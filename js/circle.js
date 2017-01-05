var Circle = function(x, y, radius){

	this.radius = radius;
	this.dotRadius = 4;

	this.circle = new createjs.Shape();
    this.circle
    	.graphics
    	.setStrokeStyle(1)
    	.beginStroke("black")
    	.drawCircle(0, 0, this.radius)
    	.lineTo(0, 0);

    this.dot = new createjs.Shape();
    this.dot
    	.graphics
    	.setStrokeStyle(1)
    	.beginStroke("black")
    	.drawCircle(this.radius / 2, 0, this.dotRadius);

	this.circleContainer = new createjs.Container();
	this.circleContainer.addChild(this.circle);
	this.circleContainer.addChild(this.dot);

	this.dot.x = this.radius/ 2;
	this.dot.y = 0;

    this.circleContainer.x = x;
    this.circleContainer.y = y;

}

Circle.prototype.setRotation = function(degrees){
	this.circleContainer.rotation = degrees;
};

Circle.prototype.getRotation = function(){
	return this.circleContainer.rotation;
};

Circle.prototype.getRadius = function(){
	return this.radius;
};

Circle.prototype.setX = function(x){
	this.circleContainer.x = x;
};

Circle.prototype.setY = function(y){
	this.circleContainer.y = y;
};

Circle.prototype.getX = function(){
	return this.circleContainer.x;
};

Circle.prototype.getY = function(){
	return this.circleContainer.y;
};

Circle.prototype.getCircumferenceLength = function(){
	return trigonometry.calculateCircumference(this.getRadius());
};

Circle.prototype.getArcLength = function(arcInDegrees){
	return trigonometry.calculateArc(arcInDegrees, this.getRadius());
};

Circle.prototype.addToStage = function(stage){
	stage.addChild(this.circleContainer);
};

Circle.prototype.getDotPosition = function(){
	var point = this.dot.localToGlobal(this.dot.x, this.dot.y);

	return {x: point.x, y: point.y};
};