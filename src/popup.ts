document.getElementById("saveTemplate")?.addEventListener("click", () => {
  const templateEditor = document.getElementById(
    "templateEditor"
  ) as HTMLTextAreaElement;
  const template = templateEditor.value;
  if (template) {
    chrome.storage.local.set({ savedTemplate: template }, () => {
      alert("Template saved");
    });
  }
});

chrome.storage.local.get("savedTemplate", (data) => {
  const templateEditor = document.getElementById(
    "templateEditor"
  ) as HTMLTextAreaElement;
  if (data.savedTemplate) {
    templateEditor.value = data.savedTemplate;
  }
});

document
  .getElementById("applyTemplate")
  ?.addEventListener("click", async () => {
    // Async keyword added
    const templateEditor = document.getElementById(
      "templateEditor"
    ) as HTMLTextAreaElement;
    const template = templateEditor.value;
    if (template) {
      try {
        await navigator.clipboard.writeText(template); // Copy template to clipboard
        alert("Template copied to clipboard"); // Notify user
        window.close();
      } catch (err) {
        console.error("Failed to copy template to clipboard: ", err);
      }
    }
  });
