function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

  function serialEvent() {
    var data = serial.readLine();

    if (data.length > 0) {
      // console.log(data);
      var sensors = split(data, ",");
     // console.log(sensors);

      P1 = int(sensors[0]);
      P2 = int(sensors[1]);
      P3 = int(sensors[2]);
      P4 = int(sensors[3]);
    }
  }

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

// create some HTML elements in the sketch:
function createHTML() {
  serialDiv = createElement('p', 'incoming data goes here');
  serialDiv.attribute('aria-label', 'incoming data');
  serialDiv.attribute('aria-role', 'alert');
  serialDiv.attribute('aria-live', 'polite');
  serialDiv.style('color', 'white');
  serialDiv.position(10, 40);
}

function printData(inString) {
  // put the input in the serialDiv div:
  serialDiv.html('log: ' + inString);
  // print it to the console as well
 // console.log(inString);
}
