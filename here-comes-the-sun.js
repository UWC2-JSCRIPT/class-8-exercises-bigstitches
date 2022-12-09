//
//console.log('here')
let start, previousTimeStamp;
let done = false;
const element = document.getElementById('alf');
var rgb = 0;
document.body.style.backgroundColor = 'rgb(255, 255, 255)';

// displays background function
function colorDegred(timestamp) {
    //let color = 255 - eachStep
    document.body.style.backgroundColor = `rgb(${rgb}, ${rgb}, ${rgb})`;
    rgb++;
    //return;
    
    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;
    //console.log(elapsed);

    if (rgb > 256) done = true; // stop the animation after white

    if (elapsed < 9000) { // Stop the animation after 9 seconds
        previousTimeStamp = timestamp;
        if (!done) {
            window.requestAnimationFrame(colorDegred);
        }
    }
}
window.requestAnimationFrame(colorDegred);


var x = 0;
const animate = function() {
    x++;
    if (x < window.innerWidth) {
        const transform = `translateX(${x}px)`;
        //document.getElementById("alf").style.transform = "rotate(7deg)";
        element.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(animate);
    }
}

/*
let start, previousTimeStamp;
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
    }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // Math.min() is used here to make sure the element stops at exactly 200px
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = `translateX(${count}px)`;
    if (count === 200) done = true;
  }

  if (elapsed < 2000) { // Stop the animation after 2 seconds
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}
*/
//window.requestAnimationFrame(step);
window.requestAnimationFrame(animate);