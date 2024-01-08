function switchPaths(event) {
    let switchers = document.getElementsByClassName("os-path-switcher");
    for (let switcher of switchers) {
        let newPathText = switcher.dataset[toCamelCase(`path-${event.target.value}`)];
        switcher.childNodes[0].innerHTML = preparePathStr(newPathText);
        if (event.target.value == "linux" && switcher.dataset.hideInfoPopup != "true") {
            switcher.childNodes[1].removeAttribute("hidden");
        } else {
            switcher.childNodes[1].setAttribute("hidden", "");
        }
        switcher.childNodes[2].value = event.target.value;
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

function initSwitchers() {
    let switchers = document.getElementsByClassName("os-path-switcher");
    for (let switcher of switchers) {

        let optionWindows = document.createElement("option");
        optionWindows.setAttribute("selected", "true");
        optionWindows.value = "win";
        optionWindows.innerText = "\uF11C";
        optionWindows.dataset.content = "<i class='fa-brands fa-windows'></i>";
        let optionLinux = document.createElement("option");
        optionLinux.value = "linux";
        optionLinux.innerText = "\uF119";
        let optionMac = document.createElement("option");
        optionMac.value = "mac";
        optionMac.innerText = "\uF102";

        let pathText = switcher.getElementsByTagName("code")[0];
        let winPath = switcher.childNodes[0].innerHTML;
        switcher.dataset.pathWin = winPath;
        pathText.innerHTML = preparePathStr(switcher.dataset.pathWin);

        let optionalInfo = document.createElement("button");
        optionalInfo.innerText = "i";
        optionalInfo.classList.add("info-button");
        optionalInfo.setAttribute("hidden", "");
        optionalInfo.addEventListener("click", openInfoPopup);

        let switchDropdown = document.createElement("select");
        switchDropdown.appendChild(optionWindows);
        switchDropdown.appendChild(optionLinux);
        switchDropdown.appendChild(optionMac);
        switchDropdown.addEventListener("change", switchPaths);

        switcher.appendChild(optionalInfo);
        switcher.appendChild(switchDropdown);
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
    initSwitchers();
    initInfoPopup();
});
