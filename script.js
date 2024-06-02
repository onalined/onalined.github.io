// Get references to elements
const timestamp = document.querySelector("#timestamp");
const initialIssue = document.querySelector("#initialIssue");
const troubleshooting = document.querySelector("#troubleshooting");
const resolution = document.querySelector("#resolution");
const generateButton = document.querySelector("#generateButton");
const templateDiv = document.querySelector("#template");
const notesOutputDiv = document.querySelector("#notesOutput");

// Function to get formatted date and time
function getFormattedDateTime() {
    return new Date().toLocaleString();
}

// Initial timestamp display
timestamp.textContent = getFormattedDateTime();

generateButton.addEventListener("click", () => {
    // 1. Get input values (trim whitespace)
    const initialIssueText = initialIssue.value.trim();
    const troubleshootingText = troubleshooting.value.trim();
    const resolutionText = resolution.value.trim();

    // 2. Input validation: Ensure all fields are filled
    if (!initialIssueText || !troubleshootingText || !resolutionText) {
        alert("Please fill in all fields before generating notes.");
        return;
    }

    // Format and display the notes in the notesOutput div
    notesOutputDiv.innerHTML = `
        <div class="notes-container">
            <h2>Job Notes</h2>
            <p>Timestamp: ${getFormattedDateTime()}</p>
            
            <h3>Initial Issue</h3>
            <p>${initialIssueText}</p>

            <h3>Troubleshooting</h3>
            <p>${troubleshootingText}</p>

            <h3>Resolution</h3>
            <p>${resolutionText}</p>
        </div>
        <button id="copyButton">Copy Notes</button>
        <button id="resetButton">Reset</button>
    `;
    // Show notes, hide template, and add event listeners to the new buttons
    templateDiv.style.display = "none";
    notesOutputDiv.style.display = "block";
    const copyButton = document.querySelector("#copyButton");
    const resetButton = document.querySelector("#resetButton");

    // Copy button functionality (using Clipboard API if available)
    copyButton.addEventListener("click", () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(notesOutputDiv.textContent)
                .then(() => alert("Notes copied to clipboard!"))
                .catch(err => console.error('Failed to copy: ', err));
        } else {
            // Fallback to old method
            const tempTextarea = document.createElement("textarea");
            tempTextarea.value = notesOutputDiv.textContent;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
            alert("Notes copied to clipboard!");
        }
    });

    resetButton.addEventListener("click", () => {
        // Clear inputs and switch back to the template view
        initialIssue.value = "";
        troubleshooting.value = "";
        resolution.value = "";
        notesOutputDiv.style.display = "none";
        templateDiv.style.display = "block";
    });
});

// Copy button functionality (using Clipboard API if available)
copyButton.addEventListener("click", () => {
    // Get the text content without extra whitespace
    const notesText = notesOutputDiv.querySelector('.notes-container').textContent; 

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(notesText) 
            .then(() => alert("Notes copied to clipboard!"))
            .catch(err => console.error('Failed to copy: ', err));
    } else {
        // ... (fallback method - same as before)
    }
});
