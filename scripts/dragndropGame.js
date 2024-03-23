document.addEventListener("DOMContentLoaded", function () {
    // Initialize Draggable
    Draggable.create("#emotion-images img", {
      bounds: "#emotion-game",
      edgeResistance: 0.65,
      onDragStart: function () {
        this.startX = this.x;
        this.startY = this.y;
      },
      onDragEnd: function () {
        var dropzones = document.querySelectorAll('.dropzone');
        var dropped = false;
        dropzones.forEach(function (dropzone) {
          if (isOverlapping(dropzone, this.target)) {
            var emotion = dropzone.dataset.emotion;
            console.log(emotion)
            if (this.target.alt === emotion) {
              dropzone.classList.add('dropped');
              updateScore(1);
            } else {
              // Handle incorrect match if needed
            }
            dropped = true;
          }
        }.bind(this));
        if (!dropped) {
          this.x = this.startX;
          this.y = this.startY;
        }
      }
    });

    // Check if draggable element is overlapping with dropzone
    function isOverlapping(dropzone, element) {
      var dropRect = dropzone.getBoundingClientRect();
      var elementRect = element.getBoundingClientRect();
      return !(
        dropRect.right < elementRect.left ||
        dropRect.left > elementRect.right ||
        dropRect.bottom < elementRect.top ||
        dropRect.top > elementRect.bottom
      );
    }

    // Update score function
    var score = 0;
    function updateScore(points) {
      score += points;
      document.getElementById("score").innerText = "Score: " + score;
    }

    // Timer functionality
    var timeLeft = 60;
    var timerInterval = setInterval(function () {
      timeLeft--;
      document.getElementById("time-remaining").innerText = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        alert("Time's up! Your score is " + score);
        // Add any additional actions you want to perform when the time is up
      }
    }, 1000);
});