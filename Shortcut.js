const modal = document.getElementById("modal");
const saveBtn = document.getElementById("save-btn");
const addBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");

// Open/Close
addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeBtn.addEventListener('click', () => {
    modal.classList.add("hidden");
});

// Save
saveBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("linkName");
    const urlInput = document.getElementById("linkurl");
    
    const name = nameInput.value.trim();
    let url = urlInput.value.trim(); 

    if (name && url) {
        if(!url.startsWith("https://") && !url.startsWith("http://")) {
            url = "https://" + url;
        }
        
        // Get existing or empty array
        const shortcuts = JSON.parse(localStorage.getItem("Links")) || [];
        shortcuts.push({name, url});
        localStorage.setItem("Links", JSON.stringify(shortcuts));

        nameInput.value = "";
        urlInput.value = "";
        modal.classList.add("hidden");

        showShortcuts();
    }
});

// Render
function showShortcuts() {
    const container = document.getElementById("links-list");
    if (!container) return;
    const shortcuts = JSON.parse(localStorage.getItem("Links")) || [];

    container.innerHTML = "";

    shortcuts.forEach((link, index) => {
        const linkHTML = `
        <div class="shortcut-item">
            <a href="${link.url}" target="_blank">
                <img src="https://www.google.com/s2/favicons?domain=${link.url}&sz=32" alt="icon">
                <p>${link.name}</p>
            </a>
            <button class="delete-btn" onclick="deleteLink(${index})">×</button>
        </div>
        `;
        container.innerHTML += linkHTML;
    });
}

// Delete
window.deleteLink = function(index) {
    let shortcuts = JSON.parse(localStorage.getItem("Links")) || [];
    shortcuts.splice(index, 1);
    localStorage.setItem("Links", JSON.stringify(shortcuts));
    showShortcuts();
};

// Run on load
showShortcuts();