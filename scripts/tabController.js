const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("tab-btn-active"));
    tab.classList.add("tab-btn-active");

    const selectedTabContent = document.getElementById(
      `content-${tab.id.split("-")[1]}`
    );
    tabContents.forEach((content) => content.classList.remove("active"));
    selectedTabContent.classList.add("active");
  });
});
