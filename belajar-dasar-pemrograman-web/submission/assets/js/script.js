document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-info");
  const extraInfo = document.getElementById("extra-info");

  toggleBtn.addEventListener("click", () => {
    const isVisible = extraInfo.style.display === "block";
    extraInfo.style.display = isVisible ? "none" : "block";
    toggleBtn.textContent = isVisible ? "Tampilkan Info Tambahan" : "Sembunyikan Info";
  });
});
