(document.addEventListener("DOMContentLoaded", () => {

const navLinks = document.querySelectorAll(".nav-horizontal a"); 
const artists = document.querySelectorAll(".artist"); 
const artworks = document.querySelectorAll(".artwork"); 
const allDetails = document.querySelectorAll(".artist details");
    
    navLinks.forEach(link => { 
    link.addEventListener("click", e => { 
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        const selectedMovement = (link.dataset.movements || "").toLowerCase();
       
    artworks.forEach(img => { 
        const movements = img.dataset.movement 
            .toLowerCase() 
            .split(" ");
            
        img.style.display = 
        movements.includes(selectedMovement) ? "block" : "none"; });
        
        artists.forEach(artist => { const movements = artist.dataset.movement 
            .toLowerCase() 
            .split(" ");
            if (movements.includes(selectedMovement)) { 
                artist.style.display = "block"; 
            } else { 
                artist.style.display = "none";
            } 
        });

            const selectedDiscipline = link.dataset.disciplines.toLowerCase();
                
        
     artworks.forEach(img => { 
        const disciplines = img.dataset.discipline 
            .toLowerCase() 
            .split(" ");

        img.style.display = 
        disciplines.includes(selectedDiscipline) ? "block" : "none";   });
            
        artists.forEach(artist => {        
             const disciplines = artist.dataset.discipline 
            .toLowerCase() .split(" ");
                    
                if (disciplines.includes(selectedDiscipline)) { 
                    artist.style.display = "block"; 
                } else { 
                    artist.style.display = "none"; 
                } 
                });

            allDetails.forEach(details => { 
                details.open = false; 
            }); 
        }); 
    });
            allDetails.forEach(details => { 
                details.addEventListener("toggle", () => { 
                    if (details.open) { 
                        allDetails.forEach(other => { 
                    if (other !== details) { 
                        other.open = false; 
                    } 
                }); 
            } 
        }); 
    }); 
})); 
