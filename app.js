const texts = {
    standard: {
        // title: "Herbarium Didacticae",
        titleTwo: "",
        titleThree: "Didacticae",
        locationlabel: "Fundort:",
        geodataLabel: "",
        habitatLabel: "Standort:",
        annotationLabel: "Annotation:",
        collectorLabel: "Sammler:",
        determinerLabel: "Bestimmer:"
    },

    scientific: {
        // title: "Herbarium SELIGER'sche Sammlungen",
        titleTwo: "Seliger",
        titleThree: "'sche Sammlungen",
        locationlabel: "loc.",
        geodataLabel: "",
        habitatLabel: "hab.",
        annotationLabel: "ann.",
        collectorLabel: "leg.",
        determinerLabel: "det."
    }
};

document.getElementById("versionToggle").addEventListener("change", function() {
    const version = this.checked ? texts.scientific : texts.standard;


    document.getElementById("titleTwo").textContent = version.titleTwo;
    document.getElementById("titleThree").textContent = version.titleThree;

    document.getElementById("locationLabel").textContent = version.locationlabel;
    document.getElementById("habitatLabel").textContent = version.habitatLabel;
    document.getElementById("annotationLabel").textContent = version.annotationLabel;
    document.getElementById("collectorLabel").textContent = version.collectorLabel;
    document.getElementById("determinerLabel").textContent = version.determinerLabel;
});



window.onbeforeprint = function() {
    copyInputValuesToPrintText();
    hideEmptyPrintLines();
    hideSubSpeciesIfUnchecked();
};

window.onafterprint = function () {
    resetHiddenLines();
};

function copyInputValuesToPrintText() {
    document.querySelectorAll(".print-input[data-print-target]").forEach(input => {
        const targetID = input.dataset.printTarget;
        const target = document.getElementById(targetID);

        if (!target) return;

        if (input.type === "date" && input.value) {
            target.textContent = formatDate(input.value);
        } else {
            target.textContent = input.value.trim();
        }
    });
}

function hideEmptyPrintLines() {
    document.querySelectorAll("[data-hide-if-empty]").forEach(line => {
        const inputId = line.dataset.hideIfEmpty;
        const input = document.getElementById(inputId);

        if (!input) return;

        line.style.display = input.value.trim() === "" ? "none" : "";
    });
}

function hideSubSpeciesIfUnchecked() {
    const checkbox = document.getElementById("subSpeciesCheck");
    const line = document.querySelector(".subspecies-line");

    if (!checkbox || !line) return;

    line.style.display = checkbox.checked ? "" : "none";
};

function resetHiddenLines() {
    document.querySelectorAll(".subspecies-line, .location-line, .habitat-line, .annotation-line").forEach(line => {
        line.style.display = "";
    });
}

function formatDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
}

function applyVersion(version) {

    if (version === "scientific") {

        document.documentElement.style.setProperty( "--label-width", "2rem");
        document.documentElement.style.setProperty( "--label-print-width", "6%");
        document.documentElement.style.setProperty( "--textarea-width", "44ch");

    } else {
        document.documentElement.style.setProperty("--label-width", "5.5rem");
        document.documentElement.style.setProperty("--label-print-width", "18%");
        document.documentElement.style.setProperty( "--textarea-width", "42ch");
    }
}

document
    .getElementById("versionToggle")
    .addEventListener("change", function () {

        applyVersion(
            this.checked
                ? "scientific"
                : "standard"
        );

    });