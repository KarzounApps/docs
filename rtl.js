/**
 * Mintlify does not set html[dir=rtl] for Arabic locales, and custom JS only
 * runs after the page is interactive — so first paint is always LTR.
 *
 * Pair with rtl-boot.css: the page stays visibility:hidden until we set
 * data-rtl-ready after applying direction (avoids LTR→RTL flash).
 */
(function () {
  var RTL_PREFIXES = ["ar", "he"];
  var READY_ATTR = "data-rtl-ready";
  var lastLocale = null;
  var pendingReveal = false;
  var applying = false;

  function isRtlPath(pathname) {
    var parts = (pathname || "/").split("/").filter(Boolean);
    if (!parts.length) return null;
    return RTL_PREFIXES.indexOf(parts[0]) !== -1 ? parts[0] : null;
  }

  function markReady() {
    pendingReveal = false;
    document.documentElement.setAttribute(READY_ATTR, "1");
  }

  function applyDirection() {
    if (applying) return;
    applying = true;

    try {
      var locale = isRtlPath(window.location.pathname);
      var root = document.documentElement;
      var nextLocale = locale || "en";
      var localeChanged = lastLocale !== null && lastLocale !== nextLocale;
      lastLocale = nextLocale;

      // Soft language switches: hide for one frame so chrome doesn't flash LTR.
      if (localeChanged) {
        pendingReveal = true;
        root.removeAttribute(READY_ATTR);
      }

      if (locale) {
        if (root.getAttribute("dir") !== "rtl") root.setAttribute("dir", "rtl");
        if (root.getAttribute("lang") !== locale) root.setAttribute("lang", locale);
        root.dataset.locale = locale;
      } else {
        if (root.getAttribute("dir") === "rtl") root.setAttribute("dir", "ltr");
        if (root.getAttribute("lang") === "ar" || root.getAttribute("lang") === "he") {
          root.setAttribute("lang", "en");
        }
        if (root.dataset.locale !== "en") root.dataset.locale = "en";
      }

      if (localeChanged) {
        requestAnimationFrame(function () {
          requestAnimationFrame(markReady);
        });
      } else if (!pendingReveal) {
        markReady();
      }
    } finally {
      applying = false;
    }
  }

  applyDirection();

  window.addEventListener("popstate", applyDirection);
  document.addEventListener("DOMContentLoaded", applyDirection);

  var pushState = history.pushState;
  history.pushState = function () {
    var result = pushState.apply(this, arguments);
    applyDirection();
    return result;
  };

  var replaceState = history.replaceState;
  history.replaceState = function () {
    var result = replaceState.apply(this, arguments);
    applyDirection();
    return result;
  };

  // Mintlify may reset dir/lang after hydration / language switch — re-assert.
  var n = 0;
  var timer = setInterval(function () {
    applyDirection();
    if (++n > 20) clearInterval(timer);
  }, 100);

  try {
    new MutationObserver(applyDirection).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-current-path", "lang", "dir"],
    });
  } catch (e) {
    /* ignore */
  }

  // Never leave the page blank if something goes wrong.
  setTimeout(markReady, 1500);
})();
