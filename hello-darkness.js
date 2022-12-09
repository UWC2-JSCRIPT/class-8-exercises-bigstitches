document.body.style.backgroundColor = 'rgb(255, 255, 255)';

var glblColor = 256; // reduction starts before setting background color, so start at 256
var glblFont = 0;

// displays background function
function colorDegred() {
    if (glblColor === 0) return;
    glblColor--;
    document.body.style.backgroundColor = `rgb(${glblColor}, ${glblColor}, ${glblColor})`;
    return;
}

setInterval(colorDegred, 50); // half second is too slow!  pls allow me to turn in with 50ms... 

// let's try that a different way with the header element!!
const wordShow = (function timeOut() {
   setTimeout(() => {
        document.getElementsByTagName('h1')[0].style.color = `rgb(${glblFont}, ${glblFont}, ${glblFont})`;
        glblFont++;
        if (glblFont < 256) timeOut();
  }, 50); // timeout 50ms
})();


// This will just make it blink... not what I want...
/*
for (let i = 0; i < 256; i++) {
    setInterval(function() {
      document.getElementsByTagName('h1')[0].style.color = `rgb(${i}, ${i}, ${i})`;
      console.log(i);
    }, 5000);
}
*/
