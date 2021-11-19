var status = "";
object = [];

function preload(){
    img = loadImage("fruitBasket.png")
}

function setup(){
    canvas = createCanvas(640, 400);
    canvas.position(330, 150);;
    objetDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting object";
}

function modelLoaded(){
   console.log("model laoded");
   status = true;
   objetDetector.detect(img, gotResult); 
}

function draw(){
    image(img, 0, 0, 640, 420);
    status = true;
    objetDetector.detect(img, gotResult);
    if(status != ""){
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: object detected";
            fill("#ff0000");
            percent = floor(object[i].confidence*100);
            console.log(percent);
            text(object[i].label+" "+percent+"%", object[i].x+5, object[i].y+15);
            console.log(object[i].label+" "+percent+"%");
            noFill();
            stroke("#ff0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            console.log(object[i].x+" "+object[i].y);
            document.getElementById("objectDetected").innerHTML = "There Are 7 big object in images form which cocossd has detect 4"
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error();
    }
    else{
        object = results;
        console.log(object);
    }
}