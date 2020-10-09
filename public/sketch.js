// Tensorflow demo

//Detector de orientação sexual

let video;
let classifier;
let modelURL = './model/';
let label = "waiting...";
var socket;
// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  socket = io();
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2.1: Start classifying
  classifyVideo();
}

// STEP 2.2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
}

var boiola = document.getElementById("boiola");

var macho = document.getElementById("macho");
var lastlabel=""


// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  if(lastlabel!=label){
    
    lastlabel=label

    if(lastlabel=="rui"){
      boiola.pause();
      boiola.currentTime = 0
      macho.currentTime = 0
      macho.play();
    }
    
    if(lastlabel=="juca"){
      macho.pause();
      macho.currentTime = 0
      boiola.currentTime = 0
      boiola.play();

    }
 
   
    socket.emit('label', label);
    
  }

  console.log(results);
  classifyVideo();
}