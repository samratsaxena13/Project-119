quick_draw_data_set=['arm', 'basketball', 'mug', 'eye', 'envelope'];
random_no = Math.floor((Math.random()*quick_draw_data_set.length));
Element_of_array = quick_draw_data_set[random_no];
document.getElementById("taskLbl").innerHTML = Element_of_array;

timer_counter = 10;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = Element_of_array;
correctSound = document.getElementById("correctAudio");
incorrectSound = document.getElementById("incorrectAudio");
tickSound = document.getElementById("tickAudio");

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.position(535, 330);
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if(drawn_sketch == sketch){
        timer_counter = 0;
        answer_holder = "set";
        score = score + 1;
	    correctSound.play()
        document.getElementById("scoreLbl").innerHTML = score;
    }
}

setInterval(function(){timer_counter = timer_counter - 1; tickSound.play();}, 1000)

function check_sketch(){
    document.getElementById("timeLbl").innerHTML = timer_counter;
    if(timer_counter < 0){
        document.getElementById("results").innerHTML = "<h2 style='opacity: 0.6;'><i>Draw on the canvas</i></h2>";
        timer_counter = 10;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function updateCanvas(){
    background("white");
    Quick_draw_data_set=['arm', 'basketball', 'mug', 'eye', 'envelope'];
    Random_number = Math.floor((Math.random()*Quick_draw_data_set.length));
    element_of_array = Quick_draw_data_set[Random_number];
    sketch = element_of_array;
    document.getElementById("taskLbl").innerHTML = sketch;
    document.getElementById("results").innerHTML = "<h2 style='opacity: 0.6;'><i>Draw on the canvas</i></h2>";
}

function clearCanvas() {
    background("white");
    document.getElementById("results").innerHTML = "<h2 style='opacity: 0.6;'><i>Draw on the canvas</i></h2>";
}


function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    accuracyPercent = Math.round(results[0].confidence * 100) + '%';
    document.getElementById("results").innerHTML = "<label style='font-size: 20px;'>Sketch Predicted: &nbsp;<label id='predictionLbl' class='importantLbl'>" + drawn_sketch + "</label></label><br><label style='font-size: 20px;'>Accuracy: &nbsp;<label id='accuracyLbl' class='importantLbl'>" + accuracyPercent + "</label></label>";
    if(drawn_sketch == sketch){
        correctSound.play();
        document.getElementById("mainBody").style.backgroundColor = "green";
        setTimeout(function(){document.getElementById("mainBody").style.backgroundColor = "#BB467F";}, 500);
    } else {
        incorrectSound.play();
        document.getElementById("mainBody").style.backgroundColor = "red";
        setTimeout(function(){document.getElementById("mainBody").style.backgroundColor = "#BB467F";}, 500);
    }
}