import "./reset.css";
import "./style.css";
import GUI from "lil-gui";
// import p5
import p5 from "p5";

const scrollEvent = () => {
  const contentContainer = document.querySelector("#contentContainer");

  if (contentContainer.scrollTop > 600) {
    // select the first child of content container
    // if it exists, remove it

    //   const app = document.querySelector("#app");
    //   const A = document.querySelector("#A");
    //   const B = document.querySelector("#B");

    let snappedElement = null;
    let minDistance = Infinity; // Start with a very high distance that will be updated.
    const contentElements = document.querySelectorAll(".content");
    // Get all the '.content' elements

    // Iterate through all '.content' elements
    contentElements.forEach((element) => {
      // Calculate the distance of the element's top edge from the container's current scroll position
      const distance = Math.abs(
        element.getBoundingClientRect().top -
          contentContainer.getBoundingClientRect().top
      );

      // Check if this element is closer than the previous closest
      if (distance < minDistance) {
        minDistance = distance; // Update the closest distance
        snappedElement = element; // Update the element that is currently snapped
      }
    });

    if (snappedElement) {
      const otherElements = Array.from(contentElements).filter(
        (element) => element.id !== snappedElement.id
      );
      console.log("Currently snapped element:", snappedElement.id);

      console.log("Other element(s):");
      otherElements.forEach((element) => {
        console.log(element.id);
        // select by element.id
        let other = document.querySelector(`#${element.id}`);
        // make other display none
        //   other.style.display = "none";
        //after a delay of 200ms do contentContainer.appendChild(other);
        setTimeout(() => {
          contentContainer.appendChild(other);
        }, 200);
        // You can perform additional actions with each of the other elements here
      });
    }

    // You can perform additional actions with the snappedElement here
  }

  //log the element that content Container is o

  //   console.log(contentContainer.scrollTop);
  //   contentContainer.appendChild(A);
  // if (main.scrollTop > 50) {
  //   section1.style.backgroundColor = "red";

  // } else {
  //   section1.style.backgroundColor = "pink";
  // }

  // if (main.scrollTop > window.innerHeight / 2) {
  //   section2.style.backgroundColor = "blue";
  // } else {
  //   section2.style.backgroundColor = "purple";
  // }
};
const contentContainer = document.querySelector("#contentContainer");
contentContainer.addEventListener("scroll", scrollEvent);

const s = (p) => {
  let x = 100;
  let y = 100;

  p.setup = function () {
    // p.createCanvas(700, 410);
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

new p5(s); // invoke p5

// var p5_ = new p5();
// let obj = {
//   size: 5.0,
//   pixelsPerInch: 96,
//   initialRadius: 20,
//   maxRadius: 500,
//   incrementBase: 3,
//   growthVariation: 5,
//   noisiness: 3.0,
// };
// // console.log(p5);

// const createSVG = function () {
//   var size = `${obj.size * obj.pixelsPerInch}`;
//   var draw = SVG().addTo("body").size(size, size);
//   const width = draw.width();
//   const height = draw.height();
//   for (
//     let r = obj.initialRadius;
//     r < obj.maxRadius;
//     r += obj.incrementBase + p5_.random(obj.growthVariation)
//   ) {
//     var points = [];
//     for (let theta = 0; theta < p5_.TWO_PI; theta += 0.01) {
//       // var modification = map(r,0,obj.maxRadius,2,10)
//       var strength = p5_.map(r, 0, obj.maxRadius, 0, 300);
//       var modifiedR =
//         r +
//         strength *
//           p5_.noise(
//             p5_.cos(theta) + 2,
//             p5_.sin(theta) + 1,
//             (obj.noisiness * r) / obj.maxRadius
//           );
//       // var r = 20 + random(1,2)
//       var x = modifiedR * p5_.cos(theta);
//       var y = modifiedR * p5_.sin(theta);
//       x += width / 2;
//       y += height / 2;
//       points.push(p5_.createVector(x, y));
//     }
//     let pathString = "";
//     // move to first point
//     pathString += `M ${points[0].x} ${points[0].y}`;
//     for (let i = 1; i < points.length; i++) {
//       // line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
//       // pathString += `M ${points[i - 1].x} ${points[i - 1].y} L ${points[i].x} ${
//       //   points[i].y
//       // }`;
//       pathString += ` L ${points[i].x} ${points[i].y}`;
//     }
//     draw
//       .path(pathString)
//       .attr({ fill: "none", stroke: "#000", "stroke-width": 1 });
//   }
// };

// const destroySVG = function () {
//   document.querySelector("svg").remove();
// };
// const newSVG = function () {
//   destroySVG();
//   createSVG();
// };
// createSVG();

// const gui = new GUI();
// gui.add(document, "treering v0.0.1");

// gui
//   .add(obj, "size")
//   .min(0.05)
//   .max(5)
//   .step(0.05)
//   .name("Size (inches)")
//   .onChange((value) => {
//     newSVG();
//   });

// gui
//   .add(obj, "pixelsPerInch")
//   .min(72)
//   .max(300)
//   .step(1)
//   .onChange((value) => {
//     newSVG();
//   });
// // same for initialRadius
// gui
//   .add(obj, "initialRadius")
//   .min(0)
//   .max(100)
//   .step(1)
//   .onChange((value) => {
//     newSVG();
//   });
// // same for growthVariation
// gui
//   .add(obj, "growthVariation")
//   .min(1)
//   .max(12)
//   .step(1)
//   .onChange((value) => {
//     newSVG();
//   });
// // same for noisiness
// gui
//   .add(obj, "noisiness")
//   .min(1.0)
//   .max(5)
//   .step(0.05)
//   .onChange((value) => {
//     newSVG();
//   });
// gui.add(
//   {
//     "Download SVG": function () {
//       downloadSVG(document.querySelector("svg"), "treering.svg");
//     },
//   },
//   "Download SVG"
// );

// const downloadSVG = function (svgElement, fileName) {
//   // Serialize the SVG to a string
//   var serializer = new XMLSerializer();
//   var svgString = serializer.serializeToString(svgElement);

//   // Convert string to Blob
//   var svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

//   // Create a URL for the Blob and set it as the href of an anchor tag
//   var downloadLink = document.createElement("a");
//   downloadLink.href = URL.createObjectURL(svgBlob);
//   downloadLink.download = fileName;
//   document.body.appendChild(downloadLink);
//   downloadLink.click();
//   document.body.removeChild(downloadLink);
// };
// same for maxRadius
// gui
//   .add(obj, "maxRadius")
//   .min(100)
//   .max(1000)
//   .step(1)
//   .onChange((value) => {
//     newSVG();
//   });

// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
