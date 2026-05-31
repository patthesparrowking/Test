function getCurrentPage() {
    const path = window.location.pathname;
    const fileName = path.split("/").pop();

    return fileName || "index.html";
}

function createNav() {
    const currentPage = getCurrentPage();

    const navItems = [
        { 
            href: "index.html",
            label: "Start",
            icon: `<svg class="nav-icon"><use href="assets/icons/sprite.svg#icon-home"></use></svg>`
        },

        {
            href: "label.html",
            label: "Etiketten",
            icon: `<svg class="nav-icon"><use href="assets/icons/sprite.svg#icon-label"></use></svg>`
        },
        {
            href: "map.html",
            label: "Karte",
            icon: `<svg class="nav-icon"><use href="assets/icons/sprite.svg#icon-map"></use></svg>`
        },
        {
            href: "collection.html",
            label: "Sammlung",
            icon: `<svg class="nav-icon"><use href="assets/icons/sprite.svg#icon-book"></use></svg>`
        },
        {
            href: "glossary.html", 
            label: "Glossar",
            icon: `<svg class="nav-icon"><use href="assets/icons/sprite.svg#icon-gps"></use></svg>`
        }
    ];

    const nav = document.createElement("nav");
    nav.className = "bottom-nav";
    nav.classList.add("no-print");

    navItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.href;
        link.className = "nav-item"

        const linkIcon = document.createElement("span");
        linkIcon.className = "nav-icon";
        linkIcon.innerHTML =  item.icon;

        const linkLabel = document.createElement("span");
        linkLabel.textContent = item.label;

        if (item.href === currentPage) {
            link.classList.add("active");
        }
        link.appendChild(linkIcon);
        link.appendChild(linkLabel)
        nav.appendChild(link)
    });

    return nav;
}

function injectNav() {
    const placeholder = document.getElementById("bottomnav-root");
    if (!placeholder) return;

    placeholder.replaceWith(createNav());
}

document.addEventListener("DOMContentLoaded", injectNav);