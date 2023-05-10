async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Template copied to clipboard");
  } catch (err) {
    console.error("Failed to copy template to clipboard: ", err);
  }
}

function createTemplateItem(template: string) {
  const item = document.createElement("button");
  item.textContent = template;
  item.addEventListener("click", () => copyToClipboard(template));
  return item;
}

function saveTemplate(template: string) {
  chrome.storage.local.get("savedTemplates", (data) => {
    const templates = data.savedTemplates || [];
    templates.push(template);
    chrome.storage.local.set({ savedTemplates: templates }, () => {
      templateList?.appendChild(createTemplateItem(template));
    });
  });
}

const templateEditor = document.getElementById(
  "templateEditor"
) as HTMLTextAreaElement;
const saveTemplateButton = document.getElementById("saveTemplate");
const templateList = document.getElementById("templateList");

saveTemplateButton?.addEventListener("click", () => {
  const template = templateEditor.value;
  if (template) {
    saveTemplate(template);
  }
});

chrome.storage.local.get("savedTemplates", (data) => {
  const templates = data.savedTemplates || [];
  templates.forEach((template: string) => {
    templateList?.appendChild(createTemplateItem(template));
  });
});
