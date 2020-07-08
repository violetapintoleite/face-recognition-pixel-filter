const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
const SIZE = 10;
const SCALE = 1.5;
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
    faces.forEach(censor);
   requestAnimationFrame(detect);
}
function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);
}
function censor({boundingBox: face}){
    faceCtx.imageSmoothingEnabled = false;
    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    // draw the small face
faceCtx.drawImage(
    // 5 source args
    video, // where the source comes from
    face.x, // where do we start pull from
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x,
    face.y,
    SIZE,
    SIZE,
);
// draw the small face back on, but scale up

const width = face.width * SCALE;
const height = face.height * SCALE;
faceCtx.drawImage(
    faceCanvas, // source
    face.x,
    face.y,
    SIZE,
    SIZE,

    // Drawing args
    face.x,
    face.y,
    face.width,
    face.height,
)
}

populateVideo().then(detect);

