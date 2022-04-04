let kinectron;

let depthX;
let depthY;
function initKinectron() {
  // Define and create an instance of kinectron
  kinectron = new Kinectron("f72f3e6d4e63.ngrok.io"); //CHANGE THIS!!!!

  // Set Kinect type to windows
  kinectron.setKinectType("windows");

  // Connect with server over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
 kinectron.startTrackedBodies(bodyTracked);
}

// The incoming "body" argument holds the Kinect skeleton data
function bodyTracked(body) {
  background(0, 20);

  if (gotData === true) {
    pKHeadX = kHeadX;
    pKHeadY = kHeadY;
  }
  
   for (let jointType in body.joints) {
    joint = body.joints[jointType];
     
    if(jointType == 0){
      headX = joint.depthX;
      headY = joint.depthY;
    }

    // find right hand
    if (jointType == 11) {      
      rightX = joint.depthX;
      rightY = joint.depthY;
    }

    // find left hand
    if (jointType == 7) {
      leftX = joint.depthX;
      leftY = joint.depthY;
    } 
  }
  
  
  if(rightY>leftY){
    
    if(headY>leftY){
    depthX = leftX;
    depthY = leftY;
    }else{
    depthX = headX;
    depthY = headY;
    }
    
  }else{
    depthX = rightX;
    depthY = rightY;
  }
  
  

  kHeadX = depthX * width;
  kHeadY = depthY * height;

  if (gotData === false) {
    pKHeadX = kHeadX;
    pKHeadY = kHeadY;

    gotData = true;
  }
  }