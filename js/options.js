/**
 * Options page — hotkey configuration for the Spatial Navigation extension.
 *
 * Reads and writes chrome.storage.local["extension-settings"], the same object
 * the content script loads its hotkey table from.
 */

'use strict';

/* ================================================================== *
 * Settings
 * ================================================================== */

let settings = null;
let hotkeyCodes = {};

function loadSettings(callback) {
  chrome.storage.local.get(['extension-settings'], (result) => {
    settings = result['extension-settings'] || {};
    if (!settings.hotkeys) settings.hotkeys = {};
    if (!settings.hotkeys.codes) settings.hotkeys.codes = {};
    hotkeyCodes = settings.hotkeys.codes;
    if (typeof callback === 'function') callback();
  });
}

/* ================================================================== *
 * Hotkey formatting
 * ================================================================== */

const KEY_LABELS = {
  control: 'Ctrl',
  arrowup: '&uarr;',
  arrowright: '&rarr;',
  arrowdown: '&darr;',
  arrowleft: '&larr;',
  ' ': 'Space',
  pageup: 'PgUp',
  pagedown: 'PgDn',
  delete: 'Del',
};

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

/**
 * "shift + e" -> "Shift + E". Arrow keys become HTML entities, so the result
 * is markup; everything else is escaped, because event.key can legitimately
 * be "<" or "&".
 */
function formatHotkey(keys) {
  return Array.from(keys)
    .map((key) => {
      const lower = key.toLowerCase();
      if (KEY_LABELS[lower]) return KEY_LABELS[lower];
      return escapeHtml(key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());
    })
    .join(' + ');
}

/* ================================================================== *
 * Notifications
 * ================================================================== */

const NOTIFY_COLORS = {
  success: { bg: 'rgb(67 255 125 / 70%)', text: 'white', border: 'lime' },
  failure: { bg: 'rgb(255 70 104 / 70%)', text: 'white', border: 'red' },
  info: { bg: 'rgb(0 137 255 / 60%)', text: 'white', border: 'rgb(0 137 255)' },
};

let notifyTimer = 0;

function notify(type, text, timeout) {
  const notification = document.getElementById('notify');
  const notificationText = document.getElementById('notifyText');
  if (!notification || !notificationText) return;

  const colors = NOTIFY_COLORS[type] || NOTIFY_COLORS.info;
  notification.style.setProperty('--notificationBGColor', colors.bg);
  notification.style.setProperty('--notificationBorder', colors.border);
  notification.style.setProperty('--notificationTextColor', colors.text);

  notificationText.textContent = text;
  notification.classList.add('active');

  // Restart the timer instead of stacking them, so rapid edits don't hide the
  // notification early.
  clearTimeout(notifyTimer);
  notifyTimer = setTimeout(() => notification.classList.remove('active'), timeout);
}

/* ================================================================== *
 * Rendering
 * ================================================================== */

const CLOSE_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    <path d="M13.5 6l-1.4-1.4-3.1 3-3.1-3L4.5 6l3.1 3.1-3 2.9 1.5 1.4L9 10.5l2.9 2.9 1.5-1.4-3-2.9"></path>
  </svg>
`;

function populateFields() {
  document.querySelectorAll(".setting[data-type='shortcut']").forEach(renderSection);
}

function renderSection(section) {
  const combos = hotkeyCodes[section.id] || [];

  // Remove only the buttons this function created; the section's own label and
  // description markup is left alone.
  section.querySelectorAll('.btn').forEach((btn) => btn.remove());

  section.appendChild(buildAddButton(section));
  combos.forEach((combo, index) => {
    section.appendChild(buildHotkeyRow(section, combo, index));
  });
}

function buildAddButton(section) {
  const button = document.createElement('div');
  button.id = `${section.id}-btn`;
  button.className = 'btn btn-hov addHotkey';

  const label = document.createElement('span');
  label.className = 'btn-text';
  label.textContent = 'Click to type a new shortcut';
  button.appendChild(label);

  button.addEventListener('click', captureHotkey);
  return button;
}

function buildHotkeyRow(section, combo, index) {
  const row = document.createElement('div');
  row.id = `${section.id}-hotkey-${index}`;
  row.className = 'btn hotkeys';

  const label = document.createElement('span');
  label.className = 'btn-text';
  label.innerHTML = formatHotkey(combo);
  row.appendChild(label);

  const close = document.createElement('button');
  close.className = 'close';
  close.title = 'Delete shortcut';
  close.innerHTML = CLOSE_ICON;
  close.addEventListener('click', () => {
    updateHotkey(row, null, index);
    notify('success', 'Hotkey removed!', 2000);
  });
  row.appendChild(close);

  return row;
}

/* ================================================================== *
 * Capture
 * ================================================================== */

function captureHotkey(event) {
  const button = event.currentTarget;
  const section = button.parentNode;

  button.removeEventListener('click', captureHotkey);
  button.className = 'btn btn-enter';

  const label = button.querySelector('.btn-text');
  label.textContent = 'Enter the shortcut';

  const keysDown = new Set();
  let recorded = null;

  window.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('keyup', onKeyUp, true);

  function stopCapture() {
    window.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('keyup', onKeyUp, true);
  }

  function onKeyDown(keyEvent) {
    keyEvent.preventDefault();
    keyEvent.stopPropagation();

    if (keyEvent.key.toLowerCase() === 'escape') {
      stopCapture();
      renderSection(section);
      return;
    }

    keysDown.add(keyEvent.key.toLowerCase());
    label.innerHTML = formatHotkey(keysDown);
    // Snapshot at peak: keyup fires one key at a time, so by the time the set
    // empties we've lost the combo.
    recorded = new Set(keysDown);
  }

  function onKeyUp(keyEvent) {
    keysDown.delete(keyEvent.key.toLowerCase());
    if (keysDown.size !== 0) return;

    stopCapture();
    const combo = Array.from(recorded);

    if (isDuplicate(combo)) {
      updateHotkey(button, null);
      notify('failure', 'That hotkey is already in use...', 2000);
    } else {
      updateHotkey(button, combo);
      notify('success', 'Hotkey successfully added!', 2000);
    }
  }
}

function isDuplicate(candidate) {
  return Object.values(hotkeyCodes).some((combos) =>
    combos.some((combo) => sameCombo(candidate, combo)),
  );
}

/** Order-sensitive, matching how the content script compares held keys. */
function sameCombo(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return a.every((key, i) => key === b[i]);
}

/* ================================================================== *
 * Persistence
 * ================================================================== */

/**
 * Adds `combo` to the section, or removes the combo at `index` when `combo`
 * is null. Passing null with no index just re-renders (the rejected-duplicate
 * path). `element` is the button that triggered the change; it is removed
 * before the section is rebuilt.
 */
function updateHotkey(element, combo, index) {
  const section = element.parentNode;
  section.removeChild(element);

  if (!hotkeyCodes[section.id]) hotkeyCodes[section.id] = [];
  const combos = hotkeyCodes[section.id];

  if (combo === null && typeof index !== 'undefined') {
    combos.splice(index, 1);
  } else if (combo !== null) {
    combos.unshift(combo);
  }

  chrome.storage.local.set({ 'extension-settings': settings }, () => {
    loadSettings(() => renderSection(section));
  });
}

/* ================================================================== *
 * Boot
 * ================================================================== */

function init() {
  loadSettings(populateFields);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
