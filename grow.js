class Node {

  constructor(_len, _size, _rotRange, _level) {
    this.len = _len * (1 + random(-lengthRand, lengthRand));
    this.size = _size;
    this.level = _level;
    this.rot = radians(random(-_rotRange, _rotRange));
    this.s = 0;
    this.windFactor = random(0.2,1);
    this.doesBloom = false;
    this.branchColor;
    this.bloomSize = random(bloomSizeAverage * 0.7, bloomSizeAverage * 1.3);
    this.leafColor;
    this.leafRot = radians(random(-180, 180));
    this.leafScale = 0.0;
    this.leafDelay = random(600, 800);
    this.doesFlower;
    this.flowerScale = 0.0;
    this.flowerScaleT = random(0.8, 1.2);
    this.flowerBright = 255;
    this.flowerDelay = random(1000, 1100);
    

    this.n1;
    this.n2;

    if (this.level < leafLevel) {
      this.rot *= 0.3;
    }
    if (this.level == 0) {
      this.rot = 0;
    }

    if (this.level >= leafLevel && random(1) < leafChance) {
      this.doesBloom = true;
    }
    this.seed = random(100);
    this.randomizeColor();

    if (random(1) < flowerChance) {
      this.doesFlower = true;
    }

    this.rr = _rotRange * rotDecay;

  }

  display() {
    strokeWeight(this.size);
    this.s += (1.0 - this.s) / (150 + (this.level * 5));
    scale(this.s);
    push();
    if (this.level >= leafLevel) {
      stroke(this.branchColor);
      //stroke(100);
    } else {
      stroke(20, 125, 65);
    }
    let rotOffset = sin(noise(millis() * 0.000006 * (this.level * 1)) * 100);
    if (!windEnabled) {
      rotOffset = 0;
    }
    rotate(this.rot + (rotOffset * 0.1 + mouseWind) * this.windFactor);
    line(0, 0, 0, -this.len);
    translate(0, -this.len);

    // draw leaves
    if (this.doesBloom) {
      if (this.leafDelay < 0) {
        this.leafScale += (1.0 - this.leafScale) * 0.05;
         
        let p2 = map(P2, 0, 900, -30, 30);
        fill(leafHue, leafColors[this.level-1], this.leafColorB);

        noStroke();
       push();
        scale(this.leafScale);
        rotate(this.leafRot);

        translate(0, -this.bloomSize / 2);
        //translate(0, p2 / 2);
        ellipse(0, 0, this.bloomSize * bloomWidthRatio, this.bloomSize);
        //ellipse(0, 0, p2 * bloomWidthRatio, p2);
        pop();
      } else {
        this.leafDelay--;
      }
    }
    // draw flowers
    if (this.doesFlower && this.level >= flowerlevel) {
      if (this.flowerDelay < 0) {
        push();
        this.flowerScale += (this.flowerScaleT - this.flowerScale) * 0.1;
        scale(this.flowerScale);
        rotate(this.flowerScale * 3);
        noStroke();
        //fill(hue(flowerColor), flowerColors[this.level], this.flowerBright);
        fill(hue(flowerColor), flowerColors[this.level-1], this.flowerBright);
        ellipse(0, 0, flowerWidth, flowerHeight);
        rotate(radians(360 / 3));
        ellipse(0, 0, flowerWidth, flowerHeight);
        rotate(radians(360 / 3));
        ellipse(0, 0, flowerWidth, flowerHeight);
        fill(this.branchColor);
        //fill(100);
        ellipse(0, 0, 5, 5);
        pop();
      } else {
        this.flowerDelay--;
      }
    }
    
    push();
    if (this.n1) this.n1.display();
    pop();
    push();
    if (this.n2) this.n2.display();
    pop();
    pop();
  }

  randomizeColor() {
    this.branchColor = color(branchHue, random(170, 255), random(100, 200));
    this.leafColorB = random(40, 200);
    this.flowerBright = random(200, 255);

    if (this.n1) {
      this.n1.randomizeColor();
    }
    if (this.n2) {
      this.n2.randomizeColor();
    }
  }


  moreLevels() {
    if (this.n1) {
      this.n1.moreLevels();
      this.n2.moreLevels();
    } else if (this.level < levelMax) {
      this.n1 = new Node(this.len * lengthDecay, this.size * sizeDecay, this.rr, this.level + 1);
      this.n2 = new Node(this.len * lengthDecay, this.size * sizeDecay, this.rr, this.level + 1);
    }
  }
}