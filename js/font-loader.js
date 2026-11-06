(() => {
  if (!("FontFace" in window) || !document.fonts || !document.currentScript) return;

  const fontURL = new URL("../fonts/TsangerJinKai02-W04.woff2", document.currentScript.src);

  function loadFont() {
    const font = new FontFace(
      "TsangerJinKai02",
      `url("${fontURL.href}") format("woff2")`,
      { weight: "400", style: "normal", display: "swap" }
    );

    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      document.documentElement.classList.add("w04-font-ready");
    }).catch(() => {
      // Keep the theme's default font if the download fails.
    });
  }

  function scheduleFont() {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadFont, { timeout: 3000 });
    } else {
      window.setTimeout(loadFont, 1500);
    }
  }

  if (document.readyState === "complete") {
    scheduleFont();
  } else {
    window.addEventListener("load", scheduleFont, { once: true });
  }
})();
