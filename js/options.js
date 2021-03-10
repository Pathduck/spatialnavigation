var SETTINGS_FULL;
var HOTKEY_CODES;

function getSettings(callback) {
  chrome.storage.local.get(["extension-settings"], function (result) {
    SETTINGS_FULL = result["extension-settings"];
    HOTKEY_CODES = SETTINGS_FULL.hotkeys.codes;
    console.log(HOTKEY_CODES);
    if (callback instanceof Function) {
      callback();
    }
  });
}

function populateFields() {
  let hotkeyDivs = document.querySelectorAll(".setting[data-type='shortcut']");
  hotkeyDivs.forEach((hotkeyDiv) => {
    setHotkeyBtn(hotkeyDiv);
  });
}

function enterNewHotkey(event) {
  let element = event.currentTarget;
  element.removeEventListener("click", enterNewHotkey);
  element.setAttribute("class", "btn btn-enter");
  let textArea = element.children[0];
  textArea.innerHTML = `
          Enter the shortcut
  `;

  let keysDown = new Set();
  let keysFinal;
  window.addEventListener("keydown", keyPress);
  window.addEventListener("keyup", keyRelease);

  function keyPress(e) {
    e.preventDefault();
    e.stopPropagation();

    // hitting escape cancels input
    if (e.key.toLowerCase() === "escape") {
      window.removeEventListener("keydown", keyPress);
      window.removeEventListener("keyup", keyRelease);
      setHotkeyBtn(element.parentNode);
    }
    keysDown.add(e.key.toLowerCase(), keysDown.size);
    console.log(keysDown);
    textArea.innerHTML = formateHotkeys(keysDown);
    keysFinal = new Set(keysDown);
  }
  function keyRelease(e) {
    keysDown.delete(e.key.toLowerCase());

    // once no more keys are pressed, the final combo is recorded
    if (keysDown.size === 0) {
      window.removeEventListener("keydown", keyPress);
      window.removeEventListener("keyup", keyRelease);
      // setHotkeyBtn(element.parentNode);
      updateHotkey(element, [...keysFinal]);
    }
  }
}

function updateHotkey(element, newVal) {
  let parentSection = element.parentNode;
  parentSection.removeChild(element);
  let newSettings = SETTINGS_FULL;
  newSettings.hotkeys.codes[parentSection.id] = newVal;
  chrome.storage.local.set({ "extension-settings": newSettings }, function () {
    setHotkeyBtn(parentSection);
    // TODO: Send message to content scripts that settings updated
  });
}

function formateHotkeys(set1) {
  let replaceTable = {
    Control: "Ctrl",
    Arrowup: "&uarr;",
    Arrowright: "&rarr;",
    Arrowdown: "&darr;",
    Arrowleft: "&larr;",
    "  ": " Space",
    Pageup: "PgUp",
    Pagedown: "PgDn",
    Delete: "Del",
  };

  let keyString = [...set1].map((c) => c.slice(0, 1).toUpperCase() + c.slice(1).toLowerCase()).join(" + ");
  keyString = keyString.replace(
    /Control|Arrowup|Arrowright|Arrowdown|Arrowleft|\s\s|Pageup|Pagedown|Delete/g,
    function (match) {
      return replaceTable[match];
    }
  );
  keyString = keyString === " " ? "Space" : keyString;

  return keyString;
}

function setHotkeyBtn(element) {
  let el = document.createElement("div");
  // TODO: Check if hotkey combo in storage

  // if in storage print stored combo
  if (HOTKEY_CODES[element.id].length !== 0) {
    console.log(element.id);
    // delete previous btn
    let old = document.getElementById(element.id + "-hotkey");
    if (old !== null && element.parentNode) {
      old.parentNode.removeChild(old);
    }
    el.setAttribute("id", element.id + "-hotkey");
    el.setAttribute("class", "btn hotkeys");
    el.innerHTML = `
      <span class="btn-text">
            ${formateHotkeys(new Set(HOTKEY_CODES[element.id]))}
      </span>
      <button class="close" title="Delete shortcut">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M13.5 6l-1.4-1.4-3.1 3-3.1-3L4.5 6l3.1 3.1-3 2.9 1.5 1.4L9 10.5l2.9 2.9 1.5-1.4-3-2.9"></path>
          </svg>
      </button>
    `;
    el.getElementsByClassName("close")[0].addEventListener(
      "click",
      (deleteHotkey = function () {
        updateHotkey(el, []);
      })
    );
    element.appendChild(el);
  } else {
    // delete any previous btn
    let old = document.getElementById(element.id + "-btn");
    if (old !== null && element.parentNode) {
      old.parentNode.removeChild(old);
    }

    el.setAttribute("id", element.id + "-btn");
    el.setAttribute("class", "btn btn-hov");
    el.innerHTML = `
        <span class="btn-text">
            Click to type a new shortcut
        </span>
    `;
    // Add listner for new hotkey input
    el.addEventListener("click", enterNewHotkey);
    element.appendChild(el);
  }
}

getSettings(function () {
  // once the DOM is ready file in all settings info
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(stateCheck);
      populateFields();
    }
  }, 100);
});
