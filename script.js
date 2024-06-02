// Get references to elements (using querySelector for better performance)
const timestamp = document.querySelector("#timestamp");
const initialIssue = document.querySelector("#initialIssue");
const troubleshooting = document.querySelector("#troubleshooting");
const resolution = document.querySelector("#resolution");
const generateButton = document.querySelector("#generateButton");
const notesOutput = document.querySelector("#notesOutput");
const copyButton = document.querySelector("#copyButton");
const resetButton = document.querySelector("#resetButton");

// Function to get formatted date and time
function getFormattedDateTime() {
  return new Date().toLocaleString(); // Simplified
}

// Initial timestamp display (outside the event listener for optimization)
timestamp.textContent = getFormattedDateTime();

// Event listener for the "Generate Notes" button
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

  // 3. Generate formatted notes (template literal)
  const notes = `
    <h2>Job Notes</h2>
    <p>Timestamp: ${getFormattedDateTime()}</p>
    
    <h3>--- Initial Issue ---</h3>
    <p>${initialIssueText}</p>
    
    <h3>--- Troubleshooting ---</h3>
    <p>${troubleshootingText}</p>
    
    <h3>--- Resolution ---</h3>
    <p>${resolutionText}</p>
  `;

  // 4. Display formatted notes in the output area
  notesOutput.innerHTML = notes;
  notesOutput.classList.add("notes-container");

  // 5. Show buttons
  copyButton.style.display = "block";
  resetButton.style.display = "block";

  // Copy button functionality (using Clipboard API if available)
  copyButton.addEventListener("click", () => {
    const notesText = notesOutput.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(notesText)
            .then(() => alert("Notes copied to clipboard!"))
            .catch(err => console.error('Failed to copy: ', err));
    } else {
        // Fallback to old method
        const tempTextarea = document.createElement("textarea");
        tempTextarea.value = notesText;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);
        alert("Notes copied to clipboard!");
    }
  });

  // Reset button functionality
  resetButton.addEventListener("click", () => {
    initialIssue.value = "";
    troubleshooting.value = "";
    resolution.value = "";
    notesOutput.innerHTML = "";
    copyButton.style.display = "none";
    resetButton.style.display = "none";
  });
});

