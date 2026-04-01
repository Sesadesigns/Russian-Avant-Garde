document.addEventListener("DOMContentLoaded", () => {
  const artists = document.querySelectorAll(".artist");
  const artworks = document.querySelectorAll(".artwork");
  const allDetails = document.querySelectorAll(".artist details");
  const topLinks = document.querySelectorAll(".nav-top a");
  const bottomLinks = document.querySelectorAll(".nav-bottom a");
  const summaries = document.querySelectorAll(".artist summary");

  let activeFilter = null; 


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


    document.querySelector("h1").addEventListener("click", () => {
  activeFilter = null;
  resetAll();
  topLinks.forEach(l => l.classList.remove("active"));
  bottomLinks.forEach(l => l.classList.remove("active"));
  summaries.forEach(s => s.classList.remove("active"));
  allDetails.forEach(d => d.open = false);
});

artworks.forEach(img => {
  img.addEventListener("click", () => {
    const artistId = img.dataset.artist;

    filterByArtist(artistId);

    artists.forEach(a => {
      a.style.display = a.dataset.artist === artistId ? "block" : "none";
    });

    const artistEl = document.querySelector(`.artist[data-artist="${artistId}"]`);
    if (artistEl) {
      const details = artistEl.querySelector("details");
      if (details) details.open = true;
    }

    topLinks.forEach(l => l.classList.remove("active"));
    bottomLinks.forEach(l => l.classList.remove("active"));
    summaries.forEach(s => s.classList.remove("active"));

    const summary = document.querySelector(`.artist[data-artist="${artistId}"] summary`);
    if (summary) summary.classList.add("active");
  });
});


  topLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const isActive = link.classList.contains("active");
      topLinks.forEach(l => l.classList.remove("active"));
      summaries.forEach(s => s.classList.remove("active"));
      if (isActive) {
        activeFilter = null;
        resetAll();
      } else {
        activeFilter = { type: "discipline", value: link.dataset.disciplines.toLowerCase() };
        link.classList.add("active");
        filterBy("discipline", activeFilter.value);
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
        activeFilter = null;
        resetAll();
      } else {
        activeFilter = { type: "movement", value: link.dataset.movements.toLowerCase() };
        link.classList.add("active");
        filterBy("movement", activeFilter.value);
      }
      allDetails.forEach(d => d.open = false);
    });
  });

  summaries.forEach(summary => {
    summary.addEventListener("click", () => {
      const artistId = summary.closest(".artist").dataset.artist;
      const isActive = summary.classList.contains("active");
      summaries.forEach(s => s.classList.remove("active"));
      if (isActive) {
        if (activeFilter) {
          filterBy(activeFilter.type, activeFilter.value);
          if (activeFilter.type === "discipline") {
            topLinks.forEach(l => {
              if (l.dataset.disciplines.toLowerCase() === activeFilter.value) l.classList.add("active");
            });
          } else {
            bottomLinks.forEach(l => {
              if (l.dataset.movements.toLowerCase() === activeFilter.value) l.classList.add("active");
            });
          }
        } else {
          resetAll();
        }
      
      } else {
  summary.classList.add("active");
  filterByArtist(artistId);
  setTimeout(() => {
    summary.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 50);
}
    });
  });

  allDetails.forEach(details => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        allDetails.forEach(other => {
          if (other !== details) other.open = false;
        });
      }
    });
  });
});