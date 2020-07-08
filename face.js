const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
// const optionsInputs = document.querySelectorAll('.controls input[type="range"]');

async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360 }
    });
    video.srcObject = stream;
    await video.play();
    console.log(video.videoWidth, video.videoHeight);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
}

async function detect(){
   const faces = await faceDetector.detect(video);
   faces.forEach(drawFace);
   requestAnimationFrame(detect);
}
function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);
}


populateVideo().then(detect);

