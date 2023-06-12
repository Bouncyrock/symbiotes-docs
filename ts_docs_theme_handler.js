function onStateChangeEvent (msg) {
    if (msg.kind === "hasInitialized") {
        let root = document.querySelector(":root");
        root.style.setProperty("--ts-background-primary", "var(--ts-default-theme-background-primary)");
        //TODO: This will likely break whenever themes in TS have different background primary as this doesn't follow the theme switch
    }
}
