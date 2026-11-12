/**
 * Background script — seeds default hotkeys.
 *
 * Runs as a Chrome service worker and a Firefox event page unchanged: no DOM
 * access, and the listener registers at top level as non-persistent
 * backgrounds require.
 */

const DEFAULT_HOTKEYS = {
  navUp: [["w"]],
  navLeft: [["a"]],
  navDown: [["s"]],
  navRight: [["d"]],
  expand: [["e"]],
  contract: [["shift", "e"]],
  quit: [["q"]],
  click: [["f"], ["enter"]],
  shiftClick: [["shift", "enter"], ["shift", "f"]],
  controlClick: [["control", "enter"], ["control", "f"]],
  disableKeys: [["control", "shift", "x"]],
};

// Callbacks, not promises: in Firefox the chrome.* namespace is callback-only.
// Promises live on browser.*, which Chrome doesn't have.
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["extension-settings"], function (stored) {
    let settings = stored["extension-settings"] || {};
    let hotkeys = settings.hotkeys || {};
    let codes = hotkeys.codes || {};

    // onInstalled also fires on UPDATE. Merging rather than overwriting means a
    // version bump gives new actions their defaults without discarding
    // bindings the user configured.
    let merged = { ...DEFAULT_HOTKEYS, ...codes };

    settings.hotkeys = { ...hotkeys, codes: merged };

    chrome.storage.local.set({ "extension-settings": settings }, function () {
      console.log("Settings checked...");
    });
  });
});
