let currentPreviewTheme = "default-theme";

function createColorPreview() {
    let themeSection = document.getElementById("ts-theme");

    let themeSelector = document.createElement("select");
    themeSelector.innerHTML =
    `<option value="default-theme">Default Theme</option>
    <option value="high-contrast-theme">High Contrast Theme</option>`;
    themeSelector.id = "theme-selector";
    themeSelector.setAttribute("onchange", "updateColorPreview(event)");
    let container = document.getElementById("theme-section-container");
    container.insertBefore(themeSelector, themeSection.nextSibling);

    //todo: this code currently doesn't clean up after itself in case of theme updates
    let colors = document.querySelectorAll("li[id^=--ts-]");
    for (let color of colors)
    {
        color.appendChild(createColorPreviewElement(color));
    }
}

function updateColorPreview(event) {
    currentPreviewTheme = event.target.value;
    let colors = document.querySelectorAll("li[id^=--ts-]");
    for (let color of colors)
    {
        let element = document.getElementById("preview-element" + color.id);
        if (color.id.startsWith("--ts-color-") && !(color.id == "--ts-color-danger") ||
            color.id.startsWith("--ts-accent") && !(color.id == "--ts-accent-background") ||
            color.id.startsWith("--ts-link")
        )
        {
            element.style =
            `color: var(${color.id.replace("--ts", "--ts-" + currentPreviewTheme)});
            border: 1px solid var(${color.id.replace("--ts", "--ts-" + currentPreviewTheme)});
            background-color: var(--ts-${currentPreviewTheme}-background-primary)`;
        }
        else if (color.id.startsWith("--ts-accessibility"))
        {
            switch (color.id)
            {
                case "--ts-accessibility-focus":
                    element.style =
                    `color: var(--ts-color-primary);
                    border: 1px solid var(--ts-${currentPreviewTheme}-accessibility-border);
                    outline: 3px solid var(--ts-${currentPreviewTheme}-accessibility-focus);
                    outline-offset: -1px;
                    background-color: var(--ts-${currentPreviewTheme}-background-primary)`;
                    break;
                case "--ts-accessibility-border":
                    element.style =
                    `color: var(--ts-color-primary);
                    border: 1px solid var(--ts-${currentPreviewTheme}-accessibility-border);
                    background-color: var(--ts-${currentPreviewTheme}-background-primary)`;
                    break;
            }
        }
        else
        {
            element.style =
            `color: var(--ts-color-primary);
            border: 1px solid var(--ts-color-primary);
            background-color: var(${color.id.replace("--ts", "--ts-" + currentPreviewTheme)})`;
        }
    }
}

function createColorPreviewElement(color) {
    let element = document.createElement("div");
    element.id = "preview-element" + color.id;
    element.innerText = "Example";
    element.classList.add("color-preview", "tooltip");

    if (color.id.startsWith("--ts-color-") && !(color.id == "--ts-color-danger") ||
        color.id.startsWith("--ts-accent") && !(color.id == "--ts-accent-background") ||
        color.id.startsWith("--ts-link")
    )
    {
        element.style =
        `color: var(${color.id.replace("--ts", "--ts-" + currentPreviewTheme)});
        border: 1px solid var(${color.id.replace("--ts", "--ts-" + currentPreviewTheme)});
        background-color: var(--ts-${currentPreviewTheme}-background-primary)`;
        element.dataset.tooltipText = `Text color: ${color.id} \nBorder color: ${color.id} \nBackground color: --ts-background-primary`;
    }
    else if (color.id.startsWith("--ts-accessibility"))
    {
        switch (color.id)
        {
            case "--ts-accessibility-focus":
                element.style =
                `color: var(--ts-color-primary);
                border: 1px solid var(--ts-${currentPreviewTheme}-accessibility-border);
                outline: 3px solid var(--ts-${currentPreviewTheme}-accessibility-focus);
                outline-offset: -1px;
                background-color: var(--ts-${currentPreviewTheme}-background-primary)`;
                element.dataset.tooltipText = `Text color: --ts-color-primary \nOutline color: --ts-accessibility-focus \nBackground color: --ts-background-primary`;
                break;
            case "--ts-accessibility-border":
                element.style =
                `color: var(--ts-color-primary);
                border: 1px solid var(--ts-${currentPreviewTheme}-accessibility-border);
                background-color: var(--ts-${currentPreviewTheme}-background-primary)`;
                element.dataset.tooltipText = `Text color: --ts-color-primary \nBorder color: --ts-accessibility-border \nBackground color: --ts-background-primary`;
                break;
        }
    }
    else
    {
        element.style =
        `color: var(--ts-color-primary);
        border: 1px solid var(--ts-color-primary);
        background-color: var(${color.id.replace("--ts", "--ts-" + currentPreviewTheme)})`;
        element.dataset.tooltipText = `Text color: --ts-color-primary \nBorder color: --ts-color-primary \nBackground color: ${color.id}`;
    }

    return element;
}

window.addEventListener("DOMContentLoaded", createColorPreview);
