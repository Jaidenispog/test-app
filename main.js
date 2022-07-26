song ="";
 
leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

score_left_wristY = 0;
score_right_wristY = 0;



function preload(){

    song= loadSound("music.mp3");

}

function setup(){

    canvas= createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){

    if(results.length > 0){

        console.log(results);

        score_left_wristY= results[0].pose.keypoints[9].score;
        score_right_wristY= results[0].pose.keypoints[10].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log(
            "left wrist X:  " + leftWristX +
            "left wrist Y:  " + leftWristY +
            "right wrist X:  " + rightWristX +
            "right wrist Y:  " + rightWristY+
            "score of left wrist Y is  "+score_left_wristY+
            "score of right wrist Y is  "+score_right_wristY)

  

    }

    


}


function modelLoaded(){
    console.log("Your model has been loaded");
}

function draw(){

    image(video, 0, 0, 600, 500);
    
    fill("#f00c0c");
    stroke("#f00c0c");

    if(score_left_wristY > 0.2){

        circle(leftWristX, leftWristY, 20);
        NleftWristY = Number(leftWristY);
        FleftWristY = floor(NleftWrist);
        volume= FleftWristY / 500;

        document.getElementById("volume").innerHTML= "volume is =" + volume;
        song.setVolume(volume);
    }


    if(score_right_wristY > 0.2){


   


    circle(rightWristX, rightWristY, 20);


    if(rightWristY > 0 && rightWristY <= 100){

        document.getElementById('speed').innerHTML= "Speed is now 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200){
    
        document.getElementById('speed').innerHTML= "Spped is now 1x";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300){

        document.getElemtById('speed').innerHTML= "Speed is now 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400){
        
        document.getElementById('speed').innerHTML= "Speed is now 2x";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500){

        document.getElementById('speed').innerHTML= "Song is now 2.5x";
        song.rate(2.5)
    }

}

    

    



    
    
    

}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
}


