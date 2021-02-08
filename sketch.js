//raw data
const zero = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1
];

const one = [
  0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,
  0,0,0,1,0,0,0
];

const two = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  0,0,0,0,0,0,1,
  0,0,0,0,1,0,0,
  0,0,0,1,0,0,0,
  0,1,0,0,0,0,0,
  1,1,1,1,1,1,1
];

const three = [
  1,1,1,1,1,1,1,
  0,0,0,0,0,0,1,
  0,0,0,0,0,0,1,
  0,1,1,1,1,1,1,
  0,0,0,0,0,0,1,
  0,0,0,0,0,0,1,
  1,1,1,1,1,1,1
];

const four = [
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,
  0,0,0,0,0,0,1,
  0,0,0,0,0,0,1,
  0,0,0,0,0,0,1
];

const five = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,
  1,0,0,0,0,0,0,
  1,1,1,1,1,1,1,
  0,0,0,0,0,0,1,
  0,0,0,0,0,0,1,
  1,1,1,1,1,1,1
];

const six = [
  0,0,0,0,0,0,1,
  0,0,0,0,1,0,0,
  0,0,1,0,0,0,0,
  0,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1
];

const seven = [
  1,1,1,1,1,1,1,
  0,0,0,0,0,1,0,
  0,0,0,0,1,0,0,
  0,0,0,1,0,0,0,
  0,0,1,0,0,0,0,
  0,1,0,0,0,0,0,
  1,0,0,0,0,0,0
];

const eight = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1
];

const nine = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,0,
  0,0,0,0,1,0,0,
  0,0,1,0,0,0,0,
  1,0,0,0,0,0,0
];
  
//visual variables
let dimension = 7;
let drawing = [];
let input;

//let state = 0; 
//0 = guessing
//1 = learning  

//algorithm variables
let data = []; //makes it easier to draw, could be optimised
let linearData = [];
let result;
  
//preparing neural net
const net = new brain.NeuralNetwork();
const trainingData = [
  { input: zero, output: { 0: 1 } },
  { input: one, output: { 1: 1 } },
  { input: two, output: { 2: 1 } },
  { input: three, output: { 3: 1 } },
  { input: four, output: { 4: 1 } },
  { input: five, output: { 5: 1 } },
  { input: six, output: { 6: 1 } },
  { input: seven, output: { 7: 1 } },
  { input: eight, output: { 8: 1 } },
  { input: nine, output: { 9: 1 } }
];

//train the network for the first time
net.train(trainingData); //to see iterations in console add [,{ log: (stats) => console.log(stats) }] to .train function
  
function setup() {
  reset();   
  CorrectButton = createButton('Correct');
  CorrectButton.position(10,510);
  CorrectButton.mousePressed(correctChoice);

  wrongButton = createButton('Wrong');
  wrongButton.position(390,510);
  wrongButton.mousePressed(wrongChoice);

  input = createSlider(0,9,5,1);
  input.position(170, 510)
  input.style('width', '160px');
    
  //debugging the function of the neural net
  // testButton = createButton('Test');
  // testButton.position(450,510);
  // testButton.mousePressed(test);
}
  
function draw() {
  fill(240);
  noStroke();
  rect(0,0,30,30);
  fill(0);
  textSize(20);
  text(input.value(), 10, 20);
  //if mouse is pressed
  if ((mouseIsPressed) && (mouseX <= width) && (mouseY <= height)){
    noStroke();
    fill(100);
    let coords = [mouseX, mouseY];
    ellipse(coords[0], coords[1], 20);
    drawing.push(coords);
  }
}

//----------------------------------------------------------------------------------------------------
//button functions 
function correctChoice(){
  trainingData.push(
    { input: linearData, output: { result: 1 } },
  );
  net.train(trainingData);
  reset();
}

function wrongChoice() {
  let value = input.value();
  console.log(value);
  trainingData.push(
    { input: linearData, output: { value: 1 } }
  );
  net.train(trainingData);
  reset();
}

function test(){
  console.log(net.run([
    1,1,1,1,1,1,1,
    1,0,0,0,0,0,1,
    1,0,0,0,0,0,1,
    1,1,1,1,1,1,0,
    0,0,0,0,1,0,0,
    0,0,1,0,0,0,0,
    1,0,0,0,0,0,0
  ]));
}

//----------------------------------------------------------------------------------------------------
//trigger the alrogthim on mouse release
function mouseReleased() {
  if ((mouseX <= width) && (mouseY <= height)){
    for (let i = 0; i < drawing.length; i++){
      let column = floor((drawing[i][0]/width)*dimension);
      let row = floor((drawing[i][1]/height)*dimension);
      if (data[row][column] == 0){
        data[row][column] = 1;
      }
    }
    //visualising the result to ensure it works fine
    for (let x = 0; x < dimension; x++){
      for (let y = 0; y < dimension; y++){
        linearData.push(data[x][y]);
        if (data[y][x] == 1){
          fill(51, 204, 204);
          rect((width/dimension)*x, (height/dimension)*y, width/dimension, height/dimension);
        }
      }
    }
    //feed data into the network for processing
    result = printResult(net.run(linearData));
    console.log(result); //console log for debugging
    drawResult(result); // draw the answer on the screen
    state = 1;
  }
}

//----------------------------------------------------------------------------------------------------
//assisting functions
function printResult(results){
  //should be redundant to brain.likely
  //as of now that does not work as expected
  let highestValue = 0;
  let highestNumber = ''
  for ( let number in results){
    if (results[number] > highestValue){
      highestValue = results[number];
      highestNumber = number;
    }
  }
  return highestNumber;
}
  
function drawResult(textToDraw){
  fill(0);
  textAlign(CENTER, CENTER);
  if (textToDraw.length > 1){
    textSize(80);
  }else{
    textSize(180);
  }
  text(textToDraw, width / 2, height / 2);
}

function reset(){
  data = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ];
    
  drawing = [];
  linearData = [];
    
  createCanvas(500, 500);
  background(240);
  stroke(200);
    
  for (let y = 0; y < height; y+=height/dimension){
    line(0, y, width, y);
  }
  for (let x = 0; x < width; x+=width/dimension){
    line(x, 0, x, height);
  }
}
  

