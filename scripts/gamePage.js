// Get the dropdown element
const playDropdown = document.getElementById("play-dropdown");
// Get the play link
const playLink = document.getElementById("play-game");

// Toggle the dropdown when the play link is clicked
playLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default behavior of the link
  playDropdown.classList.toggle("hidden"); // Toggle the 'hidden' class
});

// Close the dropdown when clicking outside of it
document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#play-dropdown") &&
    !event.target.closest("#play-game")
  ) {
    playDropdown.classList.add("hidden");
  }
});
