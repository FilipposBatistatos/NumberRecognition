//training data
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
  
  //algorithm variables
  let data = [];
  let result;
  
  const net = new brain.NeuralNetwork();
  const trainingData = [
      { input: zero, output: { zero: 1 } },
      { input: one, output: { one: 1 } },
      { input: two, output: { two: 1 } },
      { input: three, output: { three: 1 } },
      { input: four, output: { four: 1 } },
      { input: five, output: { five: 1 } },
      { input: six, output: { six: 1 } },
      { input: seven, output: { seven: 1 } },
      { input: eight, output: { eight: 1 } },
      { input: nine, output: { nine: 1 } }
  ];
  
  net.train(trainingData, { log: (stats) => console.log(stats) });
  
  function setup() {
    //this should be a function... 
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
    
    createCanvas(500, 500);
    background(240);
    grid();
    
    button = createButton('Clear');
    button.position(0,500);
    button.mousePressed(setup);
    
    button = createButton('Test');
    button.position(50,500);
    button.mousePressed(test);
    
  }
  
  function draw() {
    
    //if mouse is pressed
    if ((mouseIsPressed) && (mouseX <= width) && (mouseY <= height)){
      noStroke();
      fill(100);
      let coords = [mouseX, mouseY];
      ellipse(coords[0], coords[1], 20);
      drawing.push(coords);
    }
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
  
  function mouseReleased() {
    let linearData = [];

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
            fill(255, 0, 0);
            rect((width/dimension)*x, (height/dimension)*y, width/dimension, height/dimension);
          }
        }
      }
      //feed data into the network for processing
      result = net.run(linearData);
      console.log(printResult(result));
    }
  }

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
  
  function grid() {
    stroke(200);
    
    for (let y = 0; y < height; y+=height/dimension){
      line(0, y, width, y);
    }
    for (let x = 0; x < width; x+=width/dimension){
      line(x, 0, x, height);
    }
  }
  
  