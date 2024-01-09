function switchPaths(event) {
    let displays = document.getElementsByClassName("os-path-display");
    for (let display of displays) {
        let newPathText = display.dataset[toCamelCase(`path-${event.target.value}`)];
        display.childNodes[0].innerHTML = preparePathStr(newPathText);
        if (event.target.value == "linux" && display.dataset.hideInfoPopup != "true") {
            display.childNodes[1].removeAttribute("hidden");
        } else {
            display.childNodes[1].setAttribute("hidden", "");
        }
        switch (event.target.value) {
            case "win":
                display.childNodes[2].innerText = "\uF11C";
                break;
            case "linux":
                display.childNodes[2].innerText = "\uF119";
                break;
            case "mac":
                display.childNodes[2].innerText = "\uF102";
                break;

        }
    }
}

function preparePathStr(str) {
    return str.replace(/\/|\\|\s/g, function(match) {
        switch (match) {
            case "/":
                return "/<wbr>"
            case "\\":
                return "\\<wbr>";
            case " ":
                return "&nbsp;";
        }
    });
}

function toCamelCase(str) {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function openInfoPopup(event) {
    let popupType = event.target.parentNode.childNodes[2].value;
    //popup type currently unused
    document.getElementById("info-popup").removeAttribute("hidden");
}

function initPathDisplays() {
    let osSwitcher = document.createElement("select");
    osSwitcher.innerHTML =
    `<option value="win" selected>Windows</option>
     <option value="linux">Linux</option>
     <option value="mac">Mac</option>`;
    osSwitcher.id = "os-selector";
    osSwitcher.classList.add("pinned-item");
    osSwitcher.addEventListener("change", switchPaths);
    document.getElementById("os-selector-help").after(osSwitcher);

    let displays = document.getElementsByClassName("os-path-display");
    for (let display of displays) {
        let pathText = display.getElementsByTagName("code")[0];
        let winPath = display.childNodes[0].innerHTML;
        display.dataset.pathWin = winPath;
        pathText.innerHTML = preparePathStr(display.dataset.pathWin);

        let optionalInfo = document.createElement("button");
        optionalInfo.innerText = "i";
        optionalInfo.classList.add("info-button");
        optionalInfo.setAttribute("hidden", "");
        optionalInfo.addEventListener("click", openInfoPopup);

        let osDisplay = document.createElement("span");
        osDisplay.classList.add("os-display");
        osDisplay.innerText = "\uF11C";

        display.appendChild(optionalInfo);
        display.appendChild(osDisplay);
    }
}

function initInfoPopup() {
    let popup = document.createElement("div");
    popup.setAttribute("hidden", "");
    popup.id = "info-popup";

    let popupHeader = document.createElement("h1");
    popupHeader.innerText = "Info on file paths on Linux";

    let popupContent = document.createElement("p");
    popupContent.innerHTML = `On Linux the Windows folder structure is replicated by Proton next to the install folder. On a typical Steam installation from your distribution's repositories and with TaleSpire installed at the default library location you will find this at <code>~/<wbr>.steam/<wbr>steam/<wbr>steamapps/<wbr>compatdata/<wbr>720620/<wbr>pfx/<wbr>drive_c/</code> with the rest of the Windows folder structure being in there. If you have installed TaleSpire to another library location the <code>compatdata</code> folder will be at that location instead.`;

    let closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", function () {
        document.getElementById("info-popup").setAttribute("hidden", "");
    })
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

window.addEventListener("load", () => {
    initPathDisplays();
    initInfoPopup();
});
