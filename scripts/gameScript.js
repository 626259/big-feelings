function playAnimation(feeling) {
  const video = document.getElementById("bg-video");
  if (feeling === "happy") {
    video.scrollIntoView({ behavior: "smooth" });
    video.setAttribute("src", "../resources/happy.mp4");
    video.muted = false;
    video.controls = true;
    video.load();
    video.play();
  } else if (feeling === "sad") {
    video.scrollIntoView({ behavior: "smooth" });
    video.setAttribute("src", "../resources/sad.mp4");
    video.muted = false;
    video.controls = true;
    video.load();
    video.play();
  } else if (feeling === "angry") {
    video.scrollIntoView({ behavior: "smooth" });
    video.setAttribute("src", "../resources/angry.mp4");
    video.muted = false;
    video.controls = true;
    video.addEventListener(
      "loadedmetadata",
      function () {
        this.currentTime = 13;
      },
      false
    );
    video.load();
    video.play();
  }
}
function pauseVideo() {
  const video = document.getElementById("bg-video");
  video.pause();
}
