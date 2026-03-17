document.addEventListener("DOMContentLoaded", () => {
  const artists = document.querySelectorAll(".artist");
  const artworks = document.querySelectorAll(".artwork");
  const allDetails = document.querySelectorAll(".artist details");
  const topLinks = document.querySelectorAll(".nav-top a");
  const bottomLinks = document.querySelectorAll(".nav-bottom a");
  const summaries = document.querySelectorAll(".artist summary");

  function resetAll() {
    artworks.forEach(img => img.style.display = "block");
    artists.forEach(a => a.style.display = "block");
  }

  function filterBy(type, value) {
    artworks.forEach(img => {
      const val = (img.dataset[type] || "").toLowerCase().split(" ");
      img.style.display = val.includes(value) ? "block" : "none";
    });
    artists.forEach(artist => {
      const val = (artist.dataset[type] || "").toLowerCase().split(" ");
      artist.style.display = val.includes(value) ? "block" : "none";
    });
  }

  function filterByArtist(artistId) {
    artworks.forEach(img => {
      img.style.display = img.dataset.artist === artistId ? "block" : "none";
    });
  }

  topLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const isActive = link.classList.contains("active");
      topLinks.forEach(l => l.classList.remove("active"));
      summaries.forEach(s => s.classList.remove("active"));
      if (isActive) {
        resetAll();
      } else {
        link.classList.add("active");
        filterBy("discipline", link.dataset.disciplines.toLowerCase());
      }
      allDetails.forEach(d => d.open = false);
    });
  });

  bottomLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const isActive = link.classList.contains("active");
      bottomLinks.forEach(l => l.classList.remove("active"));
      summaries.forEach(s => s.classList.remove("active"));
      if (isActive) {
        resetAll();
      } else {
        link.classList.add("active");
        filterBy("movement", link.dataset.movements.toLowerCase());
      }
      allDetails.forEach(d => d.open = false);
    });
  });

  summaries.forEach(summary => {
    summary.addEventListener("click", () => {
      const artistId = summary.closest(".artist").dataset.artist;
      const isActive = summary.classList.contains("active");
      summaries.forEach(s => s.classList.remove("active"));
      topLinks.forEach(l => l.c