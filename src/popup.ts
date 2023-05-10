function addTemplateItem(template: string) {
  const templateList = document.getElementById("templateList");
  const item = document.createElement("button");
  item.textContent = template;
  item.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(template);
      alert("Template copied to clipboard");
    } catch (err) {
      console.error("Failed to copy template to clipboard: ", err);
    }
  });
  templateList?.appendChild(item);
}

document.getElementById("saveTemplate")?.addEventListener("click", () => {
  const templateEditor = document.getElementById(
    "templateEditor"
  ) as HTMLTextAreaElement;
  const template = templateEditor.value;
  if (template) {
    chrome.storage.local.get("savedTemplates", (data) => {
      const templates = data.savedTemplates || [];
      templates.push(template);
      chrome.storage.local.set({ savedTemplates: templates }, () => {
        alert("Template saved");
        addTemplateItem(template); // Add new item to list
      });
    });
  }
});

chrome.storage.local.get("savedTemplates", (data) => {
  const templates = data.savedTemplates || [];
  templates.forEach((template: string) => {
    addTemplateItem(template); // Add each item to list
  });
});
