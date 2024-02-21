document.addEventListener("DOMContentLoaded", function () {
  // Retrieve highest score and its date from local storage
  const highestScore = localStorage.getItem("highestScore");
  const highestScoreDate = localStorage.getItem("highestScoreDate");

  // Reference to the achievement list container
  const achievementList = document.getElementById("achievement-list");

  // Create elements to display the highest score and its date
  const highestScoreElement = document.createElement("div");
  highestScoreElement.classList.add(
    "bg-white",
    "shadow-lg",
    "p-6",
    "rounded-lg",
    "text-center",
    "achievement-card"
  );
  highestScoreElement.innerHTML = `
    <p class="text-4xl font-bold mb-2">Highest Score:</p>
    <p class="text-3xl font-bold">Score: ${highestScore || 0}</p>
    <p class="text-3xl font-bold">Date: ${highestScoreDate || "N/A"}</p>
  `;

  // Append the highest score element to the achievement list container
  achievementList.appendChild(highestScoreElement);
});
