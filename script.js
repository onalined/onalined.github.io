const timestamp = document.getElementById("timestamp");
const initialIssue = document.getElementById("initialIssue");
const troubleshooting = document.getElementById("troubleshooting");
const resolution = document.getElementById("resolution");
const generateButton = document.getElementById("generateButton");
const notesOutput = document.getElementById("notesOutput");
const template = document.getElementById("template");

function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString(); // Adjust format if needed
}

timestamp.textContent = getFormattedDateTime();

generateButton.addEventListener("click", function() {
  const notes = `${getFormattedDateTime()}

--- <strong>Initial Issue</strong> ---
${initialIssue.value}

--- <strong>Troubleshooting</strong> ---
${troubleshooting.value}

--- <strong>Resolution</strong> ---
${resolution.value}`;

  // Create notes element (with buttons)
  const notesElement = document.createElement("pre");
  notesElement.textContent = notes;

  notesElement.style.whiteSpace = "pre-wrap"; // Preserve line breaks

  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  copyButton.addEventListener("click", function() {
    navigator.clipboard.writeText(notes)
      .then(() => alert("Notes copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  });

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", function() {
    notesOutput.style.display = "none";
    template.style.display = "block";
    initialIssue.value = "";
    troubleshooting.value = "";
    resolution.value = "";
  });

  // Update notesOutput content
  notesOutput.innerHTML = ""; 
  notesOutput.appendChild(notesElement);
  notesOutput.appendChild(copyButton);
  notesOutput.appendChild(resetButton);

  // Show notes and hide template
  notesOutput.style.display = "block";
  template.style.display = "none"; 
});
