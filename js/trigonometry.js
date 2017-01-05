var trigonometry = (function(){

	function translateArc(sourceDegrees, sourceRadius, targetRadius){
		var sourceArcLength = calculateArc(Math.abs(sourceDegrees), sourceRadius),
			destinationDegrees = getDegreesToCoverLength(sourceArcLength, targetRadius);

		return destinationDegrees;
	}

	function pointToDegrees(x, y){
		var atan2 = Math.atan2(y, x),
			arcInRadians,
			degrees;

		if(atan2 > 0){
			arcInRadians = atan2;
		}else{
			arcInRadians = atan2 + (2 * Math.PI);
		}

		degrees = radiansToDegrees(arcInRadians);

		return degrees;
	}

	function degreesToPoint(degrees, radius){
		var radians = degreesToRadians(degrees),
			x = radius * Math.cos(radians),
			y = radius * Math.sin(radians);

		return {x: x, y: y};
	}

	function calculateCircumference(radius){
		return 2 * Math.PI * radius;
	}

	function calculateArc(degrees, radius){
		return degreesToRadians(degrees) * radius;
	}

	function radiansToDegrees(radians){
		return radians * (180 / Math.PI);
	}

	function degreesToRadians(degrees){
		return degrees * (Math.PI / 180);
	}

	function getDegreesToCoverLength(lengthToCover, radius){
		var circumference = calculateCircumference(radius);
		return lengthToCover * 360 / circumference;
	}

	function isInFirstQuadrant(degrees){
        if( (0 <= degrees) && (degrees < 90) ){
            return true;
        }else{
            return false;
        }
    }

    function isInFourthQuadrant(degrees){
        if( (270 < degrees) && (degrees <= 360) ){
            return true;
        }else{
            return false;
        }
    }

	return {

		isInFirstQuadrant: isInFirstQuadrant,
		isInFourthQuadrant: isInFourthQuadrant,
		translateArc: translateArc,
		degreesToRadians: degreesToRadians,
		degreesToPoint: degreesToPoint,
		radiansToDegrees: radiansToDegrees,
		pointToDegrees: pointToDegrees,
		calculateCircumference: calculateCircumference,
		calculateArc: calculateArc,
		getDegreesToCoverLength: getDegreesToCoverLength

	};

})();