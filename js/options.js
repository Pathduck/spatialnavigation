var SETTINGS_FULL;
var HOTKEY_CODES;

function getSettings(callback) {
  chrome.storage.local.get(["extension-settings"], function (result) {
    SETTINGS_FULL = result["extension-settings"];
    HOTKEY_CODES = SETTINGS_FULL.hotkeys.codes;
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
      let newHotkey = [...keysFinal];
      if (isNotDuplicateHotkey(newHotkey, HOTKEY_CODES)) {
        updateHotkey(element, newHotkey);
        alertMessage("success", "Hotkey successfully added!", 2000);
      } else {
        updateHotkey(element, null);
        alertMessage("failure", "That hotkey is already in use...", 2000);
      }
    }
  }
}

function alertMessage(type, text, timeOut) {
  let notification = document.getElementById("notify");
  let notificationText = document.getElementById("notifyText");

  // color the notification
  let bgColor, textColor, borderColor;
  switch (type) {
    case "success":
      bgColor = "rgb(67 255 125 / 70%)";
      textColor = "white";
      borderColor = "lime";
      break;
    case "failure":
      bgColor = "rgb(255 70 104 / 70%)";
      textColor = "white";
      borderColor = "red";
      break;
    default:
      bgColor = "rgb(0 137 255 / 60%)";
      textColor = "white";
      borderColor = "rgb(0 137 255)";
      break;
  }
  notification.style.setProperty("--notificationBGColor", bgColor);
  notification.style.setProperty("--notificationBorder", borderColor);
  notification.style.setProperty("--notificationTextColor", textColor);

  // Set the text
  notificationText.innerHTML = text;

  // Show the notification for the specified time
  notification.classList.add("active");
  setTimeout(function () {
    notification.classList.remove("active");
  }, timeOut);
}

function updateHotkey(element, newVal, index) {
  let parentSection = element.parentNode;
  parentSection.removeChild(element);
  let newSettings = SETTINGS_FULL;

  if (newVal === null && typeof index !== "undefined") {
    // remove the hotkey at the index provided
    newSettings.hotkeys.codes[parentSection.id].splice(index, 1);
  } else if (newVal !== null) {
    // add the new hotkey to the beginning of the stored hotkeys
    newSettings.hotkeys.codes[parentSection.id].unshift(newVal);
  }

  chrome.storage.local.set({ "extension-settings": newSettings }, function () {
    getSettings(setHotkeyBtn(parentSection));
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

function setHotkeyBtn(btnParent) {
  let hotkeys = HOTKEY_CODES[btnParent.id];

  // remove old buttons
  while (btnParent.childNodes.length > 2) {
    btnParent.removeChild(btnParent.lastChild);
  }

  // TODO: Check if hotkey combo in storage

  let createNewBtn = document.createElement("div");
  createNewBtn.setAttribute("id", btnParent.id + "-btn");
  createNewBtn.setAttribute("class", "btn btn-hov addHotkey");
  createNewBtn.innerHTML = `
       <span class="btn-text">
           Click to type a new shortcut
       </span>
   `;
  // Add listner for new hotkey input
  createNewBtn.addEventListener("click", enterNewHotkey);
  btnParent.appendChild(createNewBtn);

  // if in storage print stored combo
  if (hotkeys.length !== 0) {
    hotkeys.forEach((hotkey, index) => {
      let el = document.createElement("div");
      el.setAttribute("id", btnParent.id + "-hotkey-" + index);
      el.setAttribute("class", "btn hotkeys");
      el.innerHTML = `
      <span class="btn-text">
            ${formateHotkeys(new Set(hotkey))}
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
          updateHotkey(el, null, index);
          alertMessage("success", "Hotkey removed!", 2000);
        })
      );
      btnParent.appendChild(el);
    });
  }
}

function isNotDuplicateHotkey(newHotkey, allHotkeys) {
  let arrayHotkeys = Object.values(allHotkeys);
  for (command of arrayHotkeys) {
    for (hotkey of command) {
      if (areArraysEqual(newHotkey, hotkey)) {
        return false;
      }
    }
  }
  // no duplicates found
  return true;
}

function areArraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
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
