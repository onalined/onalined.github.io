// Get references to elements
const timestamp = document.getElementById("timestamp");
const initialIssue = document.getElementById("initialIssue");
const troubleshooting = document.getElementById("troubleshooting");
const resolution = document.getElementById("resolution");
const generateButton = document.getElementById("generateButton");
const notesOutput = document.getElementById("notesOutput");
const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");

// Function to get formatted date and time
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

// Initial timestamp display
timestamp.textContent = getFormattedDateTime();

// Event listener for the "Generate Notes" button
generateButton.addEventListener("click", function () {
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
  // (Updated formatting for titles with ---)
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

  // 4. Create a container for the notes
  const notesContainer = document.createElement("div");
  notesContainer.classList.add("notes-container");
  notesContainer.innerHTML = notes;

  // 5. Replace the original template with the formatted notes
  const template = document.getElementById("template");
  template.parentNode.replaceChild(notesContainer, template);

  // 6. Show the copy and reset buttons
  copyButton.style.display = "block";
  resetButton.style.display = "block";

  // Copy button functionality (with trim for copied text)
  copyButton.addEventListener("click", function () {
    const notesText = notesContainer.textContent.trim(); // Trim whitespace
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = notesText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("Notes copied to clipboard!");
  });

  // Reset button functionality
  resetButton.addEventListener("click", function () {
    initialIssue.value = "";
    troubleshooting.value = "";
    resolution.value = "";
    notesContainer.parentNode.replaceChild(template, notesContainer);
    copyButton.style.display = "none";
    resetButton.style.display = "none";
  });
});

