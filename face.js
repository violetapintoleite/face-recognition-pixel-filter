const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
// const optionsInputs = document.querySelectorAll('.controls input[type="range"]');

// console.log(optionsInputs);


console.log(video, canvas, faceCanvas, faceDetector);

function populateVideo(){
    const stream = navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
    });
    console.log(stream);
}

