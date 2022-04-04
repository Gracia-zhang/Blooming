function randomize() {
  randomizeBackground();
  randomizeColor();
  rotRange = random(20, 60);
  rotDecay = random(0.9, 1.1);
  startLength = random(20, 60);
  startSize = random(10, 30);
  lengthRand = random(0.0, 0.2);
  leafChance = random(0.3, 0.9);
  sizeDecay = random(0.6, 0.7);
  lengthDecay = map(startLength, 40, 130, 1.1, 0.85);
  leafLevel = random(0, 4);
  bloomWidthRatio = random(0.1, 0.9);
  bloomSizeAverage = random(20, 40);
  mDamp = 0.00002;
  wDamp = 0.005;
  mFriction = 0.96;
  flowerWidth = random(5, 15);
  flowerHeight = random(10, 30);
  flowerChance = 0.1;
}

function randomizeBackground() {
  bgColor = color(random(255), random(0, 100), 255);
}

function randomizeColor() {
  branchHue = random(0, 255);
  leafHue = random(0, 255);
  leafSat = random(0, 255);
  flowerColor = color(random(255), random(0, 255), 255);
  if (node) node.randomizeColor();
}