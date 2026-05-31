let catalogue = {specimens: []}
let specimenMap = null;
let specimenMarker = null;

async function loadCatalogue() {
    
    const response = await fetch("data/specimens.json");
    const catalogue = await response.json();


// SUCHFUNKTION:
    document.getElementById("search").addEventListener("input", e => {

    const search = e.target.value.toLowerCase();

        const filteredCatalogue = catalogue.specimens.filter(specimen => 
            specimen.taxonGerman.toLowerCase().includes(search) ||
            specimen.taxonLatin.toLowerCase().includes(search) ||
            specimen.family.toLowerCase().includes(search)
        )
        renderSpecimens(filteredCatalogue);
    });

    renderLivingSpecimens(catalogue.livingSpecimens)
    renderSpecimens(catalogue.specimens);
    renderSpecimensTable(catalogue.specimens)
    renderCollectionStats(catalogue.specimens)
}


document.addEventListener("DOMContentLoaded", loadCatalogue);

function renderCollectionStats(specimens) {
    const plantCount = specimens.length;
    const familyCount = new Set(specimens.map(specimen => specimen.family).filter(Boolean)).size;
    const locationCount = new Set(specimens.map(specimen => specimen.location).filter(Boolean)).size;
    const validDates = specimens.map(specimen => new Date(specimen.date)).filter(date => !isNaN(date));

    let latestDate = "-";

    if(validDates.length > 0) {

        const newest = new Date(Math.max(...validDates)
    );

    latestDate = newest.toLocaleDateString("de-DE", {year: "numeric"});
    }

    document.getElementById("plant-count").textContent = plantCount;
    document.getElementById("family-count").textContent = familyCount;
    document.getElementById("location-count").textContent = locationCount;
    document.getElementById("latest-date").textContent = latestDate;
}

function renderLivingSpecimens(livingSpecimens) {
    const container = document.getElementById("living-cards");

    container.innerHTML =  livingSpecimens.map(livingSpecimen => `
        <article class="plant-card">
            <img src="${livingSpecimen.img}" alt="">
            <div class="plant-info">
                <h2>${livingSpecimen.taxonLatin}</h2>
                <p>${livingSpecimen.taxonGerman}</p>
                <span>${livingSpecimen.family}</span>

                <div class="plant-meta">
                    <small>
                        <svg class="icon-small" width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                            <g transform="matrix(0.0691598,0,0,0.0691598,-1.70492,-1.42828)">
                                <path d="M256,20.652C350.766,20.652 427.704,97.59 427.704,192.356C427.704,287.121 256,483.348 256,483.348C256,483.348 84.296,287.121 84.296,192.356C84.296,97.59 161.234,20.652 256,20.652ZM256,43.244C173.703,43.244 106.889,110.059 106.889,192.356C106.889,217.877 121.677,251.267 141.099,285.968C176.638,349.466 229.227,415.962 256,448.346C282.773,415.962 335.362,349.466 370.901,285.968C390.323,251.267 405.111,217.877 405.111,192.356C405.111,110.059 338.297,43.244 256,43.244ZM256,118.704C295.901,118.704 328.296,151.099 328.296,191C328.296,230.901 295.901,263.296 256,263.296C216.099,263.296 183.704,230.901 183.704,191C183.704,151.099 216.099,118.704 256,118.704ZM256,141.296C228.568,141.296 206.296,163.568 206.296,191C206.296,218.432 228.568,240.704 256,240.704C283.432,240.704 305.704,218.432 305.704,191C305.704,163.568 283.432,141.296 256,141.296Z"/>
                            </g>
                        </svg>
                        <span>${livingSpecimen.locationShort}</span>
                    </small>
                    <small>
                        <svg class="icon-small" width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                            <g transform="matrix(1.14286,0,0,1.03846,-2.28571,0.846154)">
                                <path d="M24.268,4L27.637,4C28.941,4 30,5.165 30,6.6L30,27.4C30,28.835 28.941,30 27.637,30L4.363,30C3.059,30 2,28.835 2,27.4L2,6.6C2,5.165 3.059,4 4.363,4L7.732,4L7.732,1.037C7.732,0.594 8.059,0.235 8.462,0.235C8.864,0.235 9.191,0.594 9.191,1.037L9.191,4L22.809,4L22.809,1.037C22.809,0.594 23.136,0.235 23.538,0.235C23.941,0.235 24.268,0.594 24.268,1.037L24.268,4ZM28.542,9.938L28.542,6.6C28.542,6.051 28.137,5.605 27.637,5.605L24.268,5.605L24.268,6.963C24.268,7.406 23.941,7.765 23.538,7.765C23.136,7.765 22.809,7.406 22.809,6.963L22.809,5.605L9.191,5.605L9.191,6.963C9.191,7.406 8.864,7.765 8.462,7.765C8.059,7.765 7.732,7.406 7.732,6.963L7.732,5.605L4.363,5.605C3.863,5.605 3.458,6.051 3.458,6.6L3.458,9.938L28.542,9.938ZM3.458,11.543L3.458,27.4C3.458,27.949 3.863,28.395 4.363,28.395L27.637,28.395C28.137,28.395 28.542,27.949 28.542,27.4L28.542,11.543L3.458,11.543ZM10.268,23.545L10.268,24.772C10.268,25.216 9.941,25.575 9.538,25.575L7.385,25.575C6.982,25.575 6.655,25.216 6.655,24.772L6.655,23.545C6.655,23.102 6.982,22.743 7.385,22.743L9.538,22.743C9.941,22.743 10.268,23.102 10.268,23.545ZM25.345,16.434L25.345,17.619C25.345,18.062 25.018,18.422 24.615,18.422L22.462,18.422C22.059,18.422 21.732,18.062 21.732,17.619L21.732,16.434C21.732,15.991 22.059,15.631 22.462,15.631L24.615,15.631C25.018,15.631 25.345,15.991 25.345,16.434ZM25.345,23.545L25.345,24.772C25.345,25.216 25.018,25.575 24.615,25.575L22.462,25.575C22.059,25.575 21.732,25.216 21.732,24.772L21.732,23.545C21.732,23.102 22.059,22.743 22.462,22.743L24.615,22.743C25.018,22.743 25.345,23.102 25.345,23.545ZM17.806,23.545L17.806,24.772C17.806,25.216 17.48,25.575 17.077,25.575L14.923,25.575C14.52,25.575 14.194,25.216 14.194,24.772L14.194,23.545C14.194,23.102 14.52,22.743 14.923,22.743L17.077,22.743C17.48,22.743 17.806,23.102 17.806,23.545ZM10.268,16.434L10.268,17.661C10.268,18.105 9.941,18.464 9.538,18.464L7.385,18.464C6.982,18.464 6.655,18.105 6.655,17.661L6.655,16.434C6.655,15.991 6.982,15.631 7.385,15.631L9.538,15.631C9.941,15.631 10.268,15.991 10.268,16.434ZM17.806,16.434L17.806,17.661C17.806,18.105 17.48,18.464 17.077,18.464L14.923,18.464C14.52,18.464 14.194,18.105 14.194,17.661L14.194,16.434C14.194,15.991 14.52,15.631 14.923,15.631L17.077,15.631C17.48,15.631 17.806,15.991 17.806,16.434Z"/>
                            </g>
                        </svg>
                         ${new Date(livingSpecimen.date).toLocaleDateString("de-DE")}
                    </small>
                </div>
            </div>
            <div class="action">
            <button class="more-button" data-id="${livingSpecimen.id}">
                <span>
                    <svg width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                        <g transform="matrix(1,0,0,1,11,2.13163e-14)">
                            <path d="M5,12C7.208,12 9,13.792 9,16C9,18.208 7.208,20 5,20C2.792,20 1,18.208 1,16C1,13.792 2.792,12 5,12ZM16,12C18.208,12 20,13.792 20,16C20,18.208 18.208,20 16,20C13.792,20 12,18.208 12,16C12,13.792 13.792,12 16,12ZM-6,12C-3.792,12 -2,13.792 -2,16C-2,18.208 -3.792,20 -6,20C-8.208,20 -10,18.208 -10,16C-10,13.792 -8.208,12 -6,12Z"/>
                            <path d="M16,12C18.208,12 20,13.792 20,16C20,18.208 18.208,20 16,20C13.792,20 12,18.208 12,16C12,13.792 13.792,12 16,12ZM16,13.667C14.712,13.667 13.667,14.712 13.667,16C13.667,17.288 14.712,18.333 16,18.333C17.288,18.333 18.333,17.288 18.333,16C18.333,14.712 17.288,13.667 16,13.667ZM-6,12C-3.792,12 -2,13.792 -2,16C-2,18.208 -3.792,20 -6,20C-8.208,20 -10,18.208 -10,16C-10,13.792 -8.208,12 -6,12ZM-6,13.667C-7.288,13.667 -8.333,14.712 -8.333,16C-8.333,17.288 -7.288,18.333 -6,18.333C-4.712,18.333 -3.667,17.288 -3.667,16C-3.667,14.712 -4.712,13.667 -6,13.667ZM5,12C7.208,12 9,13.792 9,16C9,18.208 7.208,20 5,20C2.792,20 1,18.208 1,16C1,13.792 2.792,12 5,12ZM5,13.667C3.712,13.667 2.667,14.712 2.667,16C2.667,17.288 3.712,18.333 5,18.333C6.288,18.333 7.333,17.288 7.333,16C7.333,14.712 6.288,13.667 5,13.667Z"/>
                        </g>
                    </svg>
                </span>
            </button>
        </article>
    `).join("");

    addMoreButtonListeners(livingSpecimens);
}

function renderSpecimens(specimens) {
    const container = document.getElementById("herbarium-cards");

    container.innerHTML =  specimens.map(specimen => `
        <article class="plant-card">
            <img src="${specimen.img}" alt="">
            <div class="plant-info">
                <h2>${specimen.taxonLatin}</h2>
                <p>${specimen.taxonGerman}</p>
                <span>${specimen.family}</span>

                <div class="plant-meta">
                    <small>
                        <svg class="icon-small" width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                            <g transform="matrix(0.0691598,0,0,0.0691598,-1.70492,-1.42828)">
                                <path d="M256,20.652C350.766,20.652 427.704,97.59 427.704,192.356C427.704,287.121 256,483.348 256,483.348C256,483.348 84.296,287.121 84.296,192.356C84.296,97.59 161.234,20.652 256,20.652ZM256,43.244C173.703,43.244 106.889,110.059 106.889,192.356C106.889,217.877 121.677,251.267 141.099,285.968C176.638,349.466 229.227,415.962 256,448.346C282.773,415.962 335.362,349.466 370.901,285.968C390.323,251.267 405.111,217.877 405.111,192.356C405.111,110.059 338.297,43.244 256,43.244ZM256,118.704C295.901,118.704 328.296,151.099 328.296,191C328.296,230.901 295.901,263.296 256,263.296C216.099,263.296 183.704,230.901 183.704,191C183.704,151.099 216.099,118.704 256,118.704ZM256,141.296C228.568,141.296 206.296,163.568 206.296,191C206.296,218.432 228.568,240.704 256,240.704C283.432,240.704 305.704,218.432 305.704,191C305.704,163.568 283.432,141.296 256,141.296Z"/>
                            </g>
                        </svg>
                        <span>${specimen.locationShort}</span>
                    </small>
                    <small>
                        <svg class="icon-small" width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                            <g transform="matrix(1.14286,0,0,1.03846,-2.28571,0.846154)">
                                <path d="M24.268,4L27.637,4C28.941,4 30,5.165 30,6.6L30,27.4C30,28.835 28.941,30 27.637,30L4.363,30C3.059,30 2,28.835 2,27.4L2,6.6C2,5.165 3.059,4 4.363,4L7.732,4L7.732,1.037C7.732,0.594 8.059,0.235 8.462,0.235C8.864,0.235 9.191,0.594 9.191,1.037L9.191,4L22.809,4L22.809,1.037C22.809,0.594 23.136,0.235 23.538,0.235C23.941,0.235 24.268,0.594 24.268,1.037L24.268,4ZM28.542,9.938L28.542,6.6C28.542,6.051 28.137,5.605 27.637,5.605L24.268,5.605L24.268,6.963C24.268,7.406 23.941,7.765 23.538,7.765C23.136,7.765 22.809,7.406 22.809,6.963L22.809,5.605L9.191,5.605L9.191,6.963C9.191,7.406 8.864,7.765 8.462,7.765C8.059,7.765 7.732,7.406 7.732,6.963L7.732,5.605L4.363,5.605C3.863,5.605 3.458,6.051 3.458,6.6L3.458,9.938L28.542,9.938ZM3.458,11.543L3.458,27.4C3.458,27.949 3.863,28.395 4.363,28.395L27.637,28.395C28.137,28.395 28.542,27.949 28.542,27.4L28.542,11.543L3.458,11.543ZM10.268,23.545L10.268,24.772C10.268,25.216 9.941,25.575 9.538,25.575L7.385,25.575C6.982,25.575 6.655,25.216 6.655,24.772L6.655,23.545C6.655,23.102 6.982,22.743 7.385,22.743L9.538,22.743C9.941,22.743 10.268,23.102 10.268,23.545ZM25.345,16.434L25.345,17.619C25.345,18.062 25.018,18.422 24.615,18.422L22.462,18.422C22.059,18.422 21.732,18.062 21.732,17.619L21.732,16.434C21.732,15.991 22.059,15.631 22.462,15.631L24.615,15.631C25.018,15.631 25.345,15.991 25.345,16.434ZM25.345,23.545L25.345,24.772C25.345,25.216 25.018,25.575 24.615,25.575L22.462,25.575C22.059,25.575 21.732,25.216 21.732,24.772L21.732,23.545C21.732,23.102 22.059,22.743 22.462,22.743L24.615,22.743C25.018,22.743 25.345,23.102 25.345,23.545ZM17.806,23.545L17.806,24.772C17.806,25.216 17.48,25.575 17.077,25.575L14.923,25.575C14.52,25.575 14.194,25.216 14.194,24.772L14.194,23.545C14.194,23.102 14.52,22.743 14.923,22.743L17.077,22.743C17.48,22.743 17.806,23.102 17.806,23.545ZM10.268,16.434L10.268,17.661C10.268,18.105 9.941,18.464 9.538,18.464L7.385,18.464C6.982,18.464 6.655,18.105 6.655,17.661L6.655,16.434C6.655,15.991 6.982,15.631 7.385,15.631L9.538,15.631C9.941,15.631 10.268,15.991 10.268,16.434ZM17.806,16.434L17.806,17.661C17.806,18.105 17.48,18.464 17.077,18.464L14.923,18.464C14.52,18.464 14.194,18.105 14.194,17.661L14.194,16.434C14.194,15.991 14.52,15.631 14.923,15.631L17.077,15.631C17.48,15.631 17.806,15.991 17.806,16.434Z"/>
                            </g>
                        </svg>
                         ${new Date(specimen.date).toLocaleDateString("de-DE")}
                    </small>
                </div>
            </div>
            <div class="action">
            <button class="more-button" data-id="${specimen.id}">
                <span>
                    <svg width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                        <g transform="matrix(1,0,0,1,11,2.13163e-14)">
                            <path d="M5,12C7.208,12 9,13.792 9,16C9,18.208 7.208,20 5,20C2.792,20 1,18.208 1,16C1,13.792 2.792,12 5,12ZM16,12C18.208,12 20,13.792 20,16C20,18.208 18.208,20 16,20C13.792,20 12,18.208 12,16C12,13.792 13.792,12 16,12ZM-6,12C-3.792,12 -2,13.792 -2,16C-2,18.208 -3.792,20 -6,20C-8.208,20 -10,18.208 -10,16C-10,13.792 -8.208,12 -6,12Z"/>
                            <path d="M16,12C18.208,12 20,13.792 20,16C20,18.208 18.208,20 16,20C13.792,20 12,18.208 12,16C12,13.792 13.792,12 16,12ZM16,13.667C14.712,13.667 13.667,14.712 13.667,16C13.667,17.288 14.712,18.333 16,18.333C17.288,18.333 18.333,17.288 18.333,16C18.333,14.712 17.288,13.667 16,13.667ZM-6,12C-3.792,12 -2,13.792 -2,16C-2,18.208 -3.792,20 -6,20C-8.208,20 -10,18.208 -10,16C-10,13.792 -8.208,12 -6,12ZM-6,13.667C-7.288,13.667 -8.333,14.712 -8.333,16C-8.333,17.288 -7.288,18.333 -6,18.333C-4.712,18.333 -3.667,17.288 -3.667,16C-3.667,14.712 -4.712,13.667 -6,13.667ZM5,12C7.208,12 9,13.792 9,16C9,18.208 7.208,20 5,20C2.792,20 1,18.208 1,16C1,13.792 2.792,12 5,12ZM5,13.667C3.712,13.667 2.667,14.712 2.667,16C2.667,17.288 3.712,18.333 5,18.333C6.288,18.333 7.333,17.288 7.333,16C7.333,14.712 6.288,13.667 5,13.667Z"/>
                        </g>
                    </svg>
                </span>
            </button>
        </article>
    `).join("");

    addMoreButtonListeners(specimens);
}

function addMoreButtonListeners(specimens) {
  document.querySelectorAll(".more-button").forEach(button => {
    button.addEventListener("click", () => {
      const specimenId = button.dataset.id;
      const specimen = specimens.find(item => item.id === specimenId);

      openSpecimenModal(specimen);
    });
  });
}



function openSpecimenModal(specimen) {
  const modal = document.getElementById("specimen-modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <h2><em>${specimen.taxonLatin}</em></h2>
    <p><strong>Deutscher Name:</strong> ${specimen.commonName}</p>
    <p><strong>Familie:</strong> ${specimen.family}</p>
    <p><strong>Fundort:</strong> ${specimen.location}</p>
    <p><strong>Datum:</strong> ${new Date(specimen.date).toLocaleDateString("de-DE")}</p>
    <p><strong>Sammler/in:</strong> ${specimen.collector}</p>
    <p><strong>Bemerkung:</strong> ${specimen.annotation}</p>
  `;

  modal.classList.remove("hidden");

  renderSpecimenMap(specimen);
}



function renderSpecimenMap(specimen) {

    const mapElement = document.getElementById("specimen-map");
    
    const lat = Number(specimen.latitude);
    const lng = Number(specimen.longitude);

    if (!lat || !lng) {
        mapElement.classList.add("map-empty");
        mapElement.innerHTML = "Keine Koordinaten vorhanden.";
        return;
    }



    if (specimenMap) {
        specimenMap.remove();
        specimenMap = null;
        specimenMarker = null;
    }

    mapElement.classList.remove("map-empty");
    mapElement.innerHTML = "";

    specimenMap = L.map("specimen-map").setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "&copy; OpenStreetMap"
        }).addTo(specimenMap);

    specimenMarker = L.marker([lat, lng])
        .addTo(specimenMap)
        .bindPopup(`
            <strong><em>${specimen.taxonLatin}</em></strong><br>
            ${specimen.location ?? ""}
        `)
        .openPopup();

    setTimeout(() => {
        specimenMap.invalidateSize();
    }, 150);
}

    document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("specimen-modal").classList.add("hidden");
});

function renderSpecimensTable(specimens) {
    const tbody = document.getElementById("collection-body");

    tbody.innerHTML = "";

    specimens.forEach(specimen => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="notes" title="${specimen.id}">${specimen.id}</td>	
            <td class="notes" title="${specimen.barcode}">${specimen.barcode}</td>	
            <td class="notes" title="${specimen.taxonLatin}">${specimen.taxonLatin}</td>	
            <td class="notes" title="${specimen.taxonGerman}">${specimen.taxonGerman}</td>	
            <td class="notes" title="${specimen.collector}">${specimen.collector}</td>	
            <td>${specimen.collectorNumber}</td>	
            <td>${specimen.date}</td>	
            <td>${specimen.latitude}</td>	
            <td>${specimen.longitude}</td>	
            <td>${specimen.altitude}</td>	
            <td>${specimen.country}</td>	
            <td class="notes" title="${specimen.location}">${specimen.location}</td>	
            <td class="notes" title="${specimen.habitat}">${specimen.habitat}</td>	
            <td class="notes" title="${specimen.annotation}">${specimen.annotation}</td>	
            <td class="notes" title="${specimen.origin}">${specimen.origin}</td>	
            <td>${specimen.family}</td>	
            <td>${specimen.subfamily}</td>	
            <td>${specimen.genus}</td>	
            <td>${specimen.epitdet}</td>	
            <td>${specimen.autdor}</td>	
            <td>${specimen.infraType}</td>	
            <td>${specimen.infraEpitdet}</td>	
            <td class="notes" title="${specimen.infraAuthor}">${specimen.infraAuthor}</td>	
            <td class="notes" title="${specimen.acceptedName}">${specimen.acceptedName}</td>	
            <td>${specimen.wild}</td>	
            <td>${specimen.herbSeliger}</td>	
            <td>${specimen.hortSeliger}</td>	
            <td>${specimen.schnaps}</td>	
            <td>${specimen.SilicaPED}</td>	
            <td>${specimen.hortPED}</td>	
            <td>${specimen.herbUBT}</td>	
            <td class="notes" title="${specimen.protologue}">${specimen.protologue}</td>
        `;

        tbody.appendChild(row);
    });

}

function openCollection(collectionName) {
    var i;
    var x = document.getElementsByClassName("collection");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(collectionName).style.display = "block";
}

function activeTabs() {
    


  var tabs = document.querySelectorAll('.tab-btn');

 for (var i = 0, len = tabs.length; i < len; i++) {
    tabs[i].addEventListener("click", function() {
      if (this.classList.contains('active'))
        return;

      var parent = this.parentNode,
          innerTabs = parent.querySelectorAll('.tab-btn');

      for (var index = 0, iLen = innerTabs.length; index < iLen; index++) {
        innerTabs[index].classList.remove('active');
      }

      this.classList.add('active');
    });
  }
}
document.addEventListener("DOMContentLoaded", activeTabs);