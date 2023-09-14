////// DOM elements selecting.
const videoPlayer = document.querySelector(".player");
const progressBar = document.querySelector(".progress-bar");
const video = document.querySelector(".video");
const playButton = document.querySelector(".play-pause");
const rewindButton = document.querySelector(".rewind");
const forwardButton = document.querySelector(".fast-forward");

//////////////////////////////
// Handling application events.

////// Handling video playback progress change by user input.
progressBar.addEventListener("input", (event) => {
  updateProgressBarValueAndUI(event.target, event.target.value);
  updateVideoProgress(video, event.target);
});

////// Handling play and pause clicks.
playButton.addEventListener("click", (event) => {
  if (event.currentTarget.classList.contains("icon-switch")) {
    event.currentTarget.classList.toggle("icon-switch");
    videoPlayAndPause(video, false);
    return;
  }
  event.currentTarget.classList.toggle("icon-switch");
  videoPlayAndPause(video, true);
});

////// Handling rewind click, by 10 seconds.
rewindButton.addEventListener("click", (event) => {
  videoRewindAndFastForward(video, "REWIND");
});

////// Handling fast forward click, by 10 seconds.
forwardButton.addEventListener("click", (event) => {
  videoRewindAndFastForward(video, "FORWARD");
});

videoPlayer.addEventListener("click", (event) => {
  const clicked = event.target;
  if (clicked.classList.contains("no-effect")) {
    return;
  }

  const controlsBox = document.querySelector(".controls-box");
  if (controlsBox.classList.contains("hide")) {
    controlsBox.classList.remove("hide");
    return;
  }
  controlsBox.classList.add("hide");
});

//////////////////////////////////////
// Application functions

////// Play and pause video function.
function videoPlayAndPause(video, play) {
  if (play) {
    video.play().then(() => {
      video.addEventListener("timeupdate", (event) => {
        console.log("Time is updating...");
        const currentPercentage =
          (event.target.currentTime / event.target.duration) * 100;
        updateProgressBarValueAndUI(progressBar, currentPercentage);
      });
    });
    return;
  }
  video.pause();
}

////// Rewind and fast forward video by 10 seconds function.
function videoRewindAndFastForward(video, direction) {
  if (direction === "REWIND") video.currentTime -= 10;
  if (direction === "FORWARD") video.currentTime += 10;

  const currentPercentage = (video.currentTime / video.duration) * 100;
  updateProgressBarValueAndUI(progressBar, currentPercentage);
}

////// Update progress bar function.
function updateProgressBarValueAndUI(progressBar, currentPercentage) {
  progressBar.value = currentPercentage;
  progressBar.style.backgroundSize = `${currentPercentage}% 100%`;
}

////// Update video progress function(when user change progress bar value).
function updateVideoProgress(video, progressBar) {
  video.currentTime = (progressBar.value / 100) * video.duration;
}

// TESTING
