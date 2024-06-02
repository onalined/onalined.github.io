const timestamp = document.getElementById("timestamp");
const initialIssue = document.getElementById("initialIssue");
const troubleshooting = document.getElementById("troubleshooting");
const resolution = document.getElementById("resolution");
const generateButton = document.getElementById("generateButton");

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

  const notesElement = document.createElement("pre");
  notesElement.textContent = notes;

  notesElement.style.whiteSpace = "pre-wrap"; // Preserve line breaks

  const template = document.getElementById("template");
  template.parentNode.replaceChild(notesElement, template);
});
