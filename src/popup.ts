async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Template copied to clipboard");
  } catch (err) {
    console.error("Failed to copy template to clipboard: ", err);
  }
}

function createTemplateItem(template: string, index: number) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("template-item");

  const item = document.createElement("button");
  item.textContent = template;
  item.classList.add("template-text");
  item.addEventListener("click", () => copyToClipboard(template));
  itemContainer.appendChild(item);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = `
  <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="width: 16px; height: 16px; opacity: 1;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#4B4B4B;}
  </style>
  <g>
    <path class="st0" d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297
      C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297
      c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695
      h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z" style="fill: rgb(75, 75, 75);"></path>
    <path class="st0" d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269
      l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296
      c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288
      c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241
      c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z
       M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125
      c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z" style="fill: rgb(75, 75, 75);"></path>
  </g>
  </svg>`;
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up to item
    deleteTemplate(index);
  });
  itemContainer.appendChild(deleteButton);

  return itemContainer;
}

function saveTemplate(template: string) {
  chrome.storage.local.get("savedTemplates", (data) => {
    const templates = data.savedTemplates || [];
    templates.push(template);
    chrome.storage.local.set({ savedTemplates: templates }, () => {
      templateList?.appendChild(createTemplateItem(template, templates.length));
    });
  });
}

function deleteTemplate(index: number) {
  chrome.storage.local.get("savedTemplates", (data) => {
    const templates = data.savedTemplates || [];
    templates.splice(index, 1);
    chrome.storage.local.set({ savedTemplates: templates }, () => {
      const templateItem = document.getElementById(`templateItem-${index}`);
      templateItem?.parentNode?.removeChild(templateItem);
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
  templates.forEach((template: string, index: number) => {
    templateList?.appendChild(createTemplateItem(template, index));
  });
});
