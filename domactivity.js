document.addEventListener("DOMContentLoaded", function() {
    fetch("paintings.json")
        .then(response => response.json())
        .then(paintings => {
            //the paintings data
            const list = document.querySelector("#paintings ul");
            const figure = document.querySelector("figure");
            const title = document.querySelector("#title");
            const artist = document.querySelector("#artist");
            const description = document.querySelector("#description");
            //builds the thumbnails
            paintings.forEach(p => {
                const li = document.createElement("li");
                const img = document.createElement("img");
                img.src = `images/small/${p.id}.jpg`;
                img.dataset.id = p.id;   // store the ID for later
                img.alt = p.title;
                li.appendChild(img);
                list.appendChild(li);
            });
            //thumbnail click event listener
            list.addEventListener("click", (e) => {
                //respond if clicked on an image
                if (e.target.tagName !== "IMG") return;
                const id = e.target.dataset.id;
                const painting = paintings.find(p => p.id === id);
                //clears previous content
                figure.innerHTML = "";
                description.textContent = "";
                //add the new large image
                const big = document.createElement("img");
                big.id = "full";
                big.src = `images/large/${painting.id}.jpg`;
                figure.appendChild(big);
                //update title and artist
                title.textContent = painting.title;
                artist.textContent = painting.artist;
                //draw the feature rectangles
                painting.features.forEach(feature => {
                    const box = document.createElement("div");
                    box.classList.add("box");
                    //the upperleft and lower right coordinates of the feature rectangle
                    const x1 = feature.upperLeft[0];
                    const y1 = feature.upperLeft[1];
                    const x2 = feature.lowerRight[0];
                    const y2 = feature.lowerRight[1];
                    box.style.left = x1 + "px";
                    box.style.top = y1 + "px";
                    box.style.width = (x2 - x1) + "px";
                    box.style.height = (y2 - y1) + "px";
                    //hover handlers
                    box.addEventListener("mouseover", () => {
                        description.textContent = feature.description;
                    });
                      box.addEventListener("mouseout", () => {
                        description.textContent = "";
                    });
                    figure.appendChild(box);
                });
            });
        });    
    
});