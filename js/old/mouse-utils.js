var lastMousePosition;

function getMouseDirection(mousePosition){
    var directionX, directionY;

    if(lastMousePosition){

        if(mousePosition.x > lastMousePosition.x){
            directionX = +1;
        }else if(mousePosition.x == lastMousePosition.x){
            directionX = 0;
        }else{
            directionX = -1;
        }

        if(mousePosition.y > lastMousePosition.y){
            directionY = +1;
        }else if(mousePosition.y == lastMousePosition.y){
            directionY = 0;
        }else{
            directionY = -1;
        }

        lastMousePosition = mousePosition;
        return {x: directionX, y: directionY};

    }else{
        lastMousePosition = mousePosition;
        return {x: 0, y: 0};
    }        
}