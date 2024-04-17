document.getElementById("start-game").addEventListener("click", function () {
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("start-game").classList.add("hidden");

  // Generate random emojis and text for matching
  const emotions = ['happy', 'sad', 'angry', 'cry'];
  const texts = ['happy', 'sad', 'angry', 'cry'];

  // Shuffle arrays to randomize
  shuffleArray(emotions);
  shuffleArray(texts);

  // Add dropzones and images dynamically
  const dropzoneContainer = document.getElementById("dropzone-container");
  const emotionImagesContainer = document.getElementById("emotion-images");

  for (let i = 0; i < emotions.length; i++) {
    const dropzone = document.createElement("div");
    dropzone.classList.add("dropzone", "bg-purple-600", "text-white", "text-lg", "md:text-xl", "font-semibold", "p-4", "md:p-6", "rounded-md", "shadow-md", "mb-4", "md:mb-0", "md:mr-4");
    dropzone.dataset.emotion = texts[i];
    dropzone.textContent = texts[i];
    dropzoneContainer.appendChild(dropzone);

    const emotionImage = document.createElement("img");
    emotionImage.src = `../resources/${emotions[i]}.png`;
    emotionImage.alt = emotions[i];
    emotionImage.classList.add("w-24", "h-24", "md:w-32", "md:h-32", "mr-4");
    emotionImagesContainer.appendChild(emotionImage);
  }

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
      no_of_try += 1;
      dropzones.forEach(function (dropzone) {
        if (isOverlapping(dropzone, this.target)) {
          var emotion = dropzone.dataset.emotion;
          if (this.target.alt === emotion) {
            dropzone.classList.add('dropped');
            updateScore(1);
            showMessage('correct');
            checkGameStatus();
          } else {
            showMessage('incorrect');
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
  var no_of_try = 0;
  function updateScore(points) {
    score += points;
    document.getElementById("score-value").innerText = score;
  }

  // Show message function
  function showMessage(type) {
    var messageToShow;
    if (type === 'correct') {
      messageToShow = document.getElementById("correct-message");
    } else if (type === 'incorrect') {
      messageToShow = document.getElementById("incorrect-message");
    } else if (type === 'finish') {
      if (score === texts.length) {
        messageToShow = document.getElementById("finish-success-message");
      } else {
        messageToShow = document.getElementById("finish-normal-message");
      }
    }
    messageToShow.classList.remove('hidden');
    setTimeout(function () {
      messageToShow.classList.add('hidden');
    }, 1000);
  }

  // Check game status
  function checkGameStatus() {
    var dropzones = document.querySelectorAll('.dropzone');
    var allMatched = true;
    dropzones.forEach(function (dropzone) {
      if (!dropzone.classList.contains('dropped')) {
        allMatched = false;
        if (no_of_try === texts.length) {
          finishTheGame()
        }
      }
    });
    if (allMatched) {
      finishTheGame();
      document.getElementById('fireworks').classList.remove("hidden");
    }
  }

  // Timer functionality
  var timeLeft = 30;
  var timerInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("time-remaining").innerText = timeLeft;
    if (timeLeft === 0) {
      finishTheGame();
    }
  }, 1000);

  function finishTheGame() {
    // Create a new div for displaying the score
    const scoreDisplay = document.createElement("div");
    scoreDisplay.classList.add("text-center")
    scoreDisplay.innerText = "Your Score Was " + score;
    document.getElementById("start-game").appendChild(scoreDisplay);


    score = 0;
    no_of_try = 0;
    timeLeft = 0;
    document.getElementById("score-value").innerText = 0;
    document.getElementById("time-remaining").innerText = 0;
    clearInterval(timerInterval);
    document.getElementById("start-game").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
  }
});


// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}