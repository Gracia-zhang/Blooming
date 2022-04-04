const debug = false;
// left &right hand variable
let left ={};
let right = {};
let handKinectX;


let autoplay = false;
let showsFPS = false;
let clearsBackground = true;
let windEnabled = true;
//PFont font;
let rotRange = 10;
let rotDecay = 1.1;
let sizeDecay = 0.7;
let lengthDecay = 0.91;
let levelMax = 0;
let leafLevel = 2;
let leafChance = 0.3;
let branchHue = 50;
let leafHue = 150;
let leafSat = 100;
let mouseWind = 0;
let mouseWindV = 0;
let mouseWind1 = 0;
let mouseWindV1 = 0;
let startLength;
let startSize;
let trunkColor;
let bgColor;
let time = 0;
let lengthRand = 1.0;
let bloomWidthRatio = 0.6;
let bloomSizeAverage = 25;
let flowerlevel = 5;
let growDelay =180;

let leafColors = [];
let flowerColors = [];
let rotP4 = [];
let leafi = 0;
let floweri = 0;

let mDamp = 0.00002;
let wDamp = 0.003;
let mFriction = 0.98;

let flowerChance = 0.1;
let flowerColor;
let flowerWidth = 10;
let flowerHeight = 20;

let node;
let isNode = false;

let pKHeadX, pKHeadY;
let kHeadX, kHeadY;
let gotData = false;
let leftX,leftY;
let rightX,rightY;
let headX,headY;


let hands;
let weight;
let phand =0;
let exframe =0;
let dx=0;

let serial; // variable to hold an instance of the serialport library
let portName = 'COM3'; // fill in your serial port name here
let P1 = 0;
let P2 = 0;
let P3 = 0;
let P4 = 0; // for incoming serial data

let serialDiv; // an HTML div to show incoming serial data


function setup() {
  createCanvas(1280, 720);
  //createCanvas(600, 400);
  colorMode(HSB, 255);
  // font = createFont("Helvetica", 24);
  ellipseMode(CENTER);
  
  // createHTML();                       // make some HTML to place incoming data into
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  initKinectron();

  randomize();
  reset();
}

function draw() {
  
  if (P4>=180 && gotData) {
    if(isNode ===false){
    if(growDelay<0){
      randomize();
      reset();
      time =0;
    growDelay =180;
    }else{
      growDelay--;
    }
  }
  if(isNode===true){
    time++;
    if (levelMax < 8) {
      if(time===300||time===600||time===1200||time===2100||time===3300||time===4800||time===6900||time===9600){
    growup();
      }
  }
  }
    dx = Math.floor(kHeadX - pKHeadX);
  console.log(dx);
  mouseWindV += -dx * mDamp;
  mouseWindV += (0 - mouseWind) * wDamp;
  mouseWindV *= mFriction;
  mouseWind += mouseWindV;
  }else{
     if(isNode ===true){
    isNode =false;
  }
if (!gotData) {
    console.log('returning');
    return;

  }
    dx = 0;
  console.log(dx);
  mouseWindV += -dx * mDamp;
  mouseWindV += (0 - mouseWind) * wDamp;
  mouseWindV *= mFriction;
  mouseWind += mouseWindV;
  }
  
 

  if (clearsBackground) {
    //background(bgColor);
    background(0, 0, 0);
  }
  if (showsFPS) {
    displayFPS();
  }
  push();
  translate(width / 2, height);
  
  node.display();
pop();
  
  if (debug) {
    fill(255, 255, 255);
    ellipse(kHeadX, kHeadY, 100, 100);
  }
}

function reset() {
  //background(bgColor);
  background(0, 0, 0);
  levelMax = 0;
  let p4 = map(P4, 0, 15000, 20, 60);
  node = new Node(startLength, startSize, p4, 0);
  isNode = true;
}

function mousePressed() {
  if (mouseX >= 400) {
    randomize();
    reset();
  } else if (levelMax < 8) {
    growup();
  }
}

function growup() {
  let p1 = map(P1, 0, 300, 150, 255);
  let p3 = map(P3, 0, 300, 0, 255);

  leafColors.push(p1);
  flowerColors.push(p3);
  floweri += 1;
  leafi += 1;
  levelMax += 1;
  node.moreLevels();
  console.log(node)
}
