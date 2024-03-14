import "./reset.css";
import "./style.css";
import GUI from "lil-gui";
import * as RiTa from "rita";
// import p5
import p5 from "p5";

// console.log(RiTa);
function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Use the ternary operator to test the "flavor" query parameter
const flavor = getQueryParam("flavor");
const result =
  flavor === "A"
    ? "Flavor is A"
    : flavor === "B"
    ? "Flavor is B"
    : "Flavor is neither A nor B";

const config = {
  sources:
    flavor === "A"
      ? ["calvino", "hooks", "butler", "oliver", "rumi"]
      : ["consequences", "deleuze", "naam"],
};

const s = (p) => {
  class Model {
    constructor(name, txt, imagesLocation, qtyImages) {
      this.name = name;
      this.sentences = [];
      this.currentSentence = 0;
      this.amtSentences = 10;
      this.currentChunk = 0;
      this.qtyImages = qtyImages;
      this.amtChunks = 0;
      this.txt = txt;
      this.rm = RiTa.RiTa.markov(3);
      this.images = [];
      this.currentImage = 0;
      //TODO: Chunk
    }
    initializeCorpus() {
      this.corpus = [];
      this.corpus = this.joinStringsInChunks(this.txt);
      //   console.log("logging this.txt");
      //   console.log(this.txt);
      //   console.log("logging corpus");
      //   console.log(this.corpus);

      this.corpus.forEach((e, i) => {
        if (e.length > 100) {
          e = e.replace(/\(.*?\)/g, "");
          e = e.replace(/"/g, "");
          e = e.replace(/\b[A-Z]+\b/g, "");
          e = e.replace(/\d+/g, "");
          e = e.replace(/\s+/g, " ").trim();
          this.rm.addText(e);
          console.log(e);
          // console.log(e);
        }
      });
    }
    initializeImages() {
      for (var i = 0; i < this.qtyImages; i++) {
        let fileString = `./${this.name}/images/${i}.png`;
        this.images.push(p.loadImage(fileString));
      }
    }
    regen() {
      console.log("regen");
      console.log(this.rm);
      this.sentences = this.rm.generate(this.amtSentences);
      //TODO: Chunk
    }
    getCurrentSentence() {
      return this.sentences[this.currentSentence];
    }
    getCurrentImage() {
      return this.images[this.currentImage];
    }
    joinStringsInChunks(originalArray) {
      const result = [];
      const chunkSize = 10; // Number of strings to join in each chunk
      const maxResultSize = 10; // Maximum number of elements in the resulting array
      console.log("joining strings!!!");
      for (
        let i = 0;
        i < originalArray.length && result.length < maxResultSize;
        i += chunkSize
      ) {
        // Slice out a chunk of 100 strings and join them into one string
        const chunk = originalArray.slice(i, i + chunkSize).join("");
        result.push(chunk);
      }

      return result;
    }
    next() {
      this.currentSentence++;
      if (this.currentSentence >= this.amtSentences) {
        this.currentSentence = 0;
      }
      this.currentImage++;
      if (this.currentImage >= this.images.length) {
        this.currentImage = 0;
      }
    }

    debug() {
      console.log(this.name);
    }
  }
  let x = 100;
  let y = 100;

  var sentences = [];
  const amtSentences = 10;
  var currentSentence = 0;
  var images = [];
  var models = [];
  var touchStartLocation = new p.createVector(0, 0);
  var currentModelIndex = 0;
  var currentModel = models[currentModelIndex];
  var mouseCharge = 0;

  p.preload = function () {
    console.log("preload");
    config.sources.forEach((source) => {
      const model = new Model(source, "", `./${source}/images`, 20);
      model.txt = p.loadStrings(`./${source}/sample.txt`);
      model.initializeImages();
      model.debug();
      models.push(model);
    });
  };

  p.setup = function () {
    p.createCanvas(
      p.windowWidth,
      p.windowHeight,
      document.querySelector("#contentContainer")
    );
    models.forEach((model) => {
      model.initializeCorpus();
      model.regen();
    });
  };

  p.draw = function () {
    p.background("black");
    p.strokeWeight(3);
    p.stroke("black");
    p.strokeWeight(5);
    p.fill("white");
    p.textAlign(p.CENTER);
    p.textSize(24);
    let currentModel = models[currentModelIndex];
    p.image(currentModel.getCurrentImage(), 0, 0);
    p.text(currentModel.getCurrentSentence(), 0, p.height / 2.5, p.width - 25);
  };

  var toChangeModels = false;

  p.touchEnded = function () {
    // models[currentModelIndex].next();
    let touchEndLocation = new p.createVector(p.mouseX, p.mouseY);
    let distance = p5.Vector.dist(touchStartLocation, touchEndLocation);
    console.log(distance);
    if (distance > 30) {
      toChangeModels = true;
    }
    if (toChangeModels) {
      currentModelIndex++;
      if (currentModelIndex >= models.length) {
        currentModelIndex = 0;
      }
      currentModel = models[currentModelIndex];
      toChangeModels = false;
    } else {
      models[currentModelIndex].next();
    }
  };
  p.mouseReleased = function () {
    //if distance between touchStartLocation and current mouse position is less than 10
    //then change models
    // mouseCharge = 0;
    let touchEndLocation = new p.createVector(p.mouseX, p.mouseY);
    let distance = p5.Vector.dist(touchStartLocation, touchEndLocation);
    console.log(distance);
    if (distance > 30) {
      toChangeModels = true;
    }
    if (toChangeModels) {
      currentModelIndex++;
      if (currentModelIndex >= models.length) {
        currentModelIndex = 0;
      }
      currentModel = models[currentModelIndex];
      toChangeModels = false;
    } else {
      models[currentModelIndex].next();
    }
  };
  p.touchStarted = function () {
    touchStartLocation = new p.createVector(p.mouseX, p.mouseY);
    console.log(touchStartLocation);
    // mouseCharge = 0;
  };
  p.mouseDown = function () {
    touchStartLocation = new p.createVector(p.mouseX, p.mouseY);
    console.log(touchStartLocation);
    // mouseCharge = 0;
  };
  p.mouseDragged = function () {
    mouseCharge = mouseCharge + 5;
    if (mouseCharge > 20) {
      toChangeModels = true;
    }
  };
};

new p5(s); // invoke p5
