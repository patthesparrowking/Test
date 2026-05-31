let glossary = {
    terms: [],
    prepositions: []
}

async function loadGlossary() {
    
    const response = await fetch("data/glossary.json");
    const glossary = await response.json();

    document.getElementById("search").addEventListener("input", e => {

    const search = e.target.value.toLowerCase();

    const filteredTerms = glossary.terms.filter(term => 
        term.german.toLowerCase().includes(search) ||
        term.latin.toLowerCase().includes(search) ||
        term.note.toLowerCase().includes(search)
    )

        const filteredPrepositions = glossary.prepositions.filter(preposition => 
        preposition.latin.toLowerCase().includes(search) ||
        preposition.case.toLowerCase().includes(search)
    )


        renderTerms(filteredTerms);
        renderPrepositions(filteredPrepositions);
});

    renderTerms(glossary.terms);
    renderPrepositions(glossary.prepositions);
}

document.addEventListener("DOMContentLoaded", loadGlossary);

function renderTermTable(entries) {
    const tbody = document.getElementById("glossary-body");

    tbody.innerHTML = "";

    entries.forEach(entry => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${term.german}</td>
            <td>${entry.latin}</td>
            <td>${entry.ablative}</td>
            <td>${entry.genus}</td>
            <td>${entry.declination}</td>
            <td>${entry.note}</td>
        `;

        tbody.appendChild(row);
    });
}


function renderTerms(terms) {
    const container = document.getElementById("term-cards");

    container.innerHTML =  terms.map(term => `
        <article class="glossary-card">
            <h3>${term.german}</h3>
            <p><em>${term.latin}</em></p>
            <p>Ablativ: ${term.ablative}</p>
            <p>${term.genus} · ${term.declination}</p>
            <p>${term.note}</p>
        </article>
    `).join("");
}

function renderPrepositions(prepositions) {
    const container = document.getElementById("preposition-cards");

    container.innerHTML =  prepositions.map(preposition => `
        <article class="glossary-card">
            <p><em>${preposition.latin}</em></p>
            <p>${preposition.case}</p>
        </article>
    `).join("");
}



// async function loadGlossary() {

//     const response = await fetch("data/glossary.json");

//     glossaryData = await response.json();

//     renderTerms(glossaryData.terms);
//     renderPrepositions(glossaryData.prepositions);
// }

