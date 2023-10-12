/**
 * SiteOrFlight
 * A brief overview: This code seems to be building a website interface that fetches content from GitHub, 
 * has a dynamically adjusting typography based on the container's aspect ratio, and a folder structure that 
 * represents documents and a contact form.
 */

/* =======================
   Component: GitHub Fetch
   ======================= */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Fetches Markdown files from GitHub and injects them into the container.
     */
    fetch('https://api.github.com/repos/Cyrusublerman/SiteOrFlight/contents/folder_structure')
        .then(response => response.json())
        .then(data => {
            data.forEach(file => {
                fetch(file.download_url)
                    .then(response => response.text())
                    .then(text => {
                        const html = new showdown.Converter().makeHtml(text);
                        document.getElementById('container').innerHTML += html;
                    });
            });
        });
});

/* =============================
   Component: Dynamic Typography
   ============================= */
function generateTypographyStyles(container) {
    // Calculates typography styles based on container's aspect ratio
    const width = container.clientWidth;
    const height = container.clientHeight;
    const AR = width / height;
    const BaseSize = 16;
    const ARFactor = 5;
    const primaryFontSize = BaseSize + (ARFactor * AR);
    let styles = `.container { font-size: ${primaryFontSize}px; }`;

    const growthFactor = 1.1;
    const baseValues = [primaryFontSize, 1.6, 700];
    for (let s = 1; s <= 6; s++) {
        const fontSize = baseValues[0] * (2 / Math.pow(growthFactor, s - 1));
        const lineHeight = baseValues[1] + 0.05 * (s - 1);
        const fontWeight = baseValues[2] - (s - 1) * 100;
        styles += `
            h${s} {
                font-size: ${fontSize}px;
                line-height: ${lineHeight};
                font-weight: ${fontWeight};
            }
        `;
    }
    return styles;
}

function applyTypographyStyles(container) {
    // Applies generated typography styles to the site
    const styles = generateTypographyStyles(container);
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);
}
applyTypographyStyles(document.querySelector('.container'));

/* ===========================
   Component: Folder Structure
   =========================== */
const folderStructureElement = document.getElementById("folder-structure");
const mainContentElement = document.getElementById("markdown-content");

// Placeholder structure for folders
for (let i = 1; i <= 3; i++) {
    const folderElement = document.createElement("div");
    folderElement.className = "folder";
    folderElement.textContent = `Folder ${i}`;

    const documentList = document.createElement("div");
    documentList.className = "document-list";
    folderElement.appendChild(documentList);
    folderElement.addEventListener("click", function(event) {
        if (event.target === this) {
            this.classList.toggle("open");
        }
    });
    folderStructureElement.appendChild(folderElement);
}

/* =======================
   Component: Contact Form
   ======================= */
const contactMeFolder = document.getElementById("contact-me-folder");
contactMeFolder.addEventListener("click", function() {
    mainContentElement.innerHTML = "";
    mainContentElement.appendChild(createContactForm());

    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
    
        if (name && email && message) {
            console.log(`Sending message from ${name} (${email}): ${message}`);
        }
    });
});

function createContactForm() {
    // Generates a basic contact form
    const form = document.createElement("form");
    form.id = "contact-form";
    form.innerHTML = `
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="email" id="email" placeholder="Your Email" required>
        <textarea id="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
    `;
    return form;
}

/* ============================
   Component: Folder Toggle UI
   ============================ */
const toggleFoldersButton = document.getElementById("toggle-folders");
let allFoldersOpen = false;
toggleFoldersButton.addEventListener("click", function() {
    const folders = document.querySelectorAll(".folder");
    allFoldersOpen = !allFoldersOpen;
    folders.forEach(folder => {
        if (allFoldersOpen) {
            folder.classList.add("open");
        } else {
            folder.classList.remove("open");
        }
    });
});