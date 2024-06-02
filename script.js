const timestamp = document.getElementById("timestamp");
const initialIssue = document.getElementById("initialIssue");
const troubleshooting = document.getElementById("troubleshooting");
const resolution = document.getElementById("resolution");
const generateButton = document.getElementById("generateButton");
const templateDiv = document.getElementById("template");
const notesOutputDiv = document.getElementById("notesOutput");

function getFormattedDateTime() {
  return new Date().toLocaleString();
}

timestamp.textContent = getFormattedDateTime();

generateButton.addEventListener("click", () => {
  const initialIssueText = initialIssue.value.trim();
  const troubleshootingText = troubleshooting.value.trim();
  const resolutionText = resolution.value.trim();

  if (!initialIssueText || !troubleshootingText || !resolutionText) {
    alert("Please fill in all fields.");
    return;
  }

  const notesText = `Job Notes
Timestamp: ${getFormattedDateTime()}

Initial Issue:
${initialIssueText}

Troubleshooting:
${troubleshootingText}

Resolution:
${resolutionText}`;

  notesOutputDiv.innerHTML = `
    <div class="notes-container">
      <h2>Job Notes</h2>
      <pre>${notesText}</pre> 
    </div>
    <button id="copyButton">Copy Notes</button>
    <button id="resetButton">Reset</button>
  `;

  templateDiv.style.display = "none";
  notesOutputDiv.style.display = "block";

  const copyButton = document.getElementById("copyButton");
  const resetButton = document.getElementById("resetButton");

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(notesText)
      .then(() => alert("Notes copied!"))
      .catch(err => console.error("Copy failed:", err));
  });

  resetButton.addEventListener("click", () => {
    initialIssue.value = troubleshooting.value = resolution.value = "";
    notesOutputDiv.style.display = "none";
    templateDiv.style.display = "block";
  });
});
