/**
 * spatial-navigation
 *
 * Keyboard navigation of clickable elements on a page.
 * Selection moves with configurable hotkeys (WASD by default) and the page
 * scrolls to keep the selection in view.
 *
 * Based on falsandtru/spatial-navigation v0.4.7 (MIT, (c) 2015 falsandtru).
 * Converted from the compiled-TypeScript browserify bundle to plain JavaScript.
 */

(() => {
  'use strict';

  /* ================================================================== *
   * Constants
   * ================================================================== */

  const CURSOR_CLASS = 'spatialnavigation-cursor';
  const URLDISPLAY_ID = 'spatialnavigation-urldisplay';
  const MARKER_CLASS = 'spatialnavigation-marker';

  /** Breathing room kept between the selection and the viewport edge, in px. */
  const SCROLL_MARGIN = 60;

  /** Keypresses inside this window are coalesced; only the last one runs. */
  const INPUT_DEBOUNCE_MS = 10;

  /** How far below the fold "down" is willing to look, in viewport heights. */
  const DOWN_SEARCH_SCREENS = 4;

  /** How far above the fold "up" is willing to look, in viewport heights. */
  const UP_SEARCH_SCREENS = 3;

  const COMMAND = {
    UP: 'up',
    UP_COLUMN: 'up-column',
    DOWN: 'down',
    DOWN_COLUMN: 'down-column',
    LEFT: 'left',
    RIGHT: 'right',
    EXPAND: 'expand',
    CONTRACT: 'contract',
    CLICK: 'click',
    SHIFT_CLICK: 'shift-click',
    CONTROL_CLICK: 'control-click',
    QUIT: 'quit',
    INVALID: 'invalid',
  };

  const CLICKABLE_SELECTOR = [
    'a',
    'input',
    'select',
    'option',
    'datalist',
    'textarea',
    'button',
    'audio',
    'video',
    'embed',
    '[onclick]',
    '[tabindex]:not([role="tablist"]):not(ul):not(#hdtb):not(#hdtbMenus)',
    '[role="link"]',
    '[role="button"]',
    '[role="checkbox"]',
    '[role="option"]',
    '[role="tab"]',
    '[role="menuitem"]',
  ].join(',');

  /* ================================================================== *
   * Hotkeys
   * ================================================================== */

  const KEYS_DOWN = new Set();
  let hotkeyCodes = {};

  function loadSettings(callback) {
    chrome.storage.local.get(['extension-settings'], (result) => {
      const settings = result['extension-settings'];
      hotkeyCodes = (settings && settings.hotkeys && settings.hotkeys.codes) || {};
      if (typeof callback === 'function') callback();
    });
  }

  function startKeyTracking() {
    window.addEventListener('keyup', (event) => {
      if (event.key) KEYS_DOWN.delete(event.key.toLowerCase());
    });

    // Changing tabs or windows from the keyboard never delivers a keyup, so the
    // modifiers would otherwise stay stuck down.
    window.addEventListener('blur', () => KEYS_DOWN.clear());
  }

  function trackKeyDown(event) {
    if (event.metaKey) KEYS_DOWN.add('meta');
    if (event.ctrlKey) KEYS_DOWN.add('control');
    if (event.altKey) KEYS_DOWN.add('alt');
    if (event.shiftKey) KEYS_DOWN.add('shift');
    if (event.key) KEYS_DOWN.add(event.key.toLowerCase());
  }

  function isHotkeyPressed(hotkeyId) {
    const combos = hotkeyCodes[hotkeyId];
    // Settings load asynchronously; treat "not loaded yet" as "not pressed".
    if (!combos) return false;
    return combos.some(matchesKeysDown);
  }

  /** Order-sensitive comparison of the held keys against a hotkey combo. */
  function matchesKeysDown(combo) {
    if (KEYS_DOWN.size !== combo.length) return false;
    let i = 0;
    for (const key of KEYS_DOWN) {
      if (key.toLowerCase() !== combo[i].toLowerCase()) return false;
      i += 1;
    }
    return true;
  }

  /* ================================================================== *
   * Enable / disable toggle
   *
   * Stored in the page's localStorage, so the setting is per-origin and
   * survives reloads. Wrapped because localStorage throws in sandboxed
   * frames and when the user has blocked site data.
   * ================================================================== */

  const ENABLED_KEY = 'isEnabled';

  function isEnabled() {
    try {
      const stored = window.localStorage.getItem(ENABLED_KEY);
      if (stored === null) {
        window.localStorage.setItem(ENABLED_KEY, 'true');
        return true;
      }
      return stored === 'true';
    } catch (_) {
      return true;
    }
  }

  function setEnabled(value) {
    try {
      window.localStorage.setItem(ENABLED_KEY, String(value));
    } catch (_) {
      /* storage unavailable */
    }
  }

  /* ================================================================== *
   * Key -> command
   * ================================================================== */

  function keyToCommand(event) {
    trackKeyDown(event);

    if (isHotkeyPressed('disableKeys')) {
      setEnabled(!isEnabled());
    }
    if (!isEnabled()) return COMMAND.INVALID;

    if (isHotkeyPressed('navUp')) return COMMAND.UP;
    if (isHotkeyPressed('navLeft')) return COMMAND.LEFT;
    if (isHotkeyPressed('navDown')) return COMMAND.DOWN;
    if (isHotkeyPressed('navRight')) return COMMAND.RIGHT;
    if (isHotkeyPressed('expand')) return COMMAND.EXPAND;
    if (isHotkeyPressed('contract')) return COMMAND.CONTRACT;
    if (isHotkeyPressed('quit')) return COMMAND.QUIT;
    if (isHotkeyPressed('click')) return COMMAND.CLICK;
    if (isHotkeyPressed('shiftClick')) return COMMAND.SHIFT_CLICK;
    if (isHotkeyPressed('controlClick')) return COMMAND.CONTROL_CLICK;

    return COMMAND.INVALID;
  }

  /* ================================================================== *
   * Viewport state
   *
   * Refreshed once per command and read by the geometry helpers below.
   * ================================================================== */

  let winWidth = 0;
  let winHeight = 0;
  let winTop = 0;
  let winLeft = 0;

  function readViewport() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    winTop = window.scrollY;
    winLeft = window.scrollX;
  }

  /** Element bounds in page coordinates. */
  function offsetOf(elem) {
    const rect = elem.getBoundingClientRect();
    return {
      top: winTop + rect.top,
      left: winLeft + rect.left,
      right: winLeft + rect.right,
      bottom: winTop + rect.bottom,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    };
  }

  const inRange = (top, left, right, bottom) => (elem) => {
    const offset = offsetOf(elem);
    return (
      top <= offset.top && offset.top <= bottom - 10 &&
      left <= offset.left && offset.left <= right - 10
    );
  };

  function isInWindow(elem) {
    return !!elem && inRange(winTop, winLeft, winLeft + winWidth, winTop + winHeight)(elem);
  }

  /* ================================================================== *
   * Visibility
   * ================================================================== */

  function isVisible(elem) {
    const rect = elem.getBoundingClientRect();
    const point = document.elementFromPoint(
      Math.ceil(rect.left + rect.width / 2),
      Math.ceil(rect.top + Math.min(rect.height / 2, 10)),
    );
    // elementFromPoint only sees the viewport, so anything scrolled off-screen
    // falls back to a style check.
    return point
      ? isVisibleSize(elem) && (point === elem || isDescendant(elem, point))
      : isVisibleSize(elem) && isVisibleStyle(elem);
  }

  function isDescendant(parent, child) {
    return child ? child.parentElement === parent || isDescendant(parent, child.parentElement) : false;
  }

  function isVisibleSize(elem) {
    return elem.offsetWidth > 9 && elem.offsetHeight > 9;
  }

  // NOTE: the `||` here is upstream's, and is almost certainly meant to be `&&`
  // — as written it returns true for nearly everything. Preserved deliberately;
  // tightening it changes which elements are reachable.
  function isVisibleStyle(elem) {
    const style = window.getComputedStyle(elem);
    return (
      style.display !== 'none' ||
      style.visibility !== 'hidden' ||
      !(parseInt(style.zIndex, 10) < 0)
    );
  }

  /** Prefer a visible child image over the element itself, when there is one. */
  function shiftVisibleImg(elem) {
    return Array.from(elem.querySelectorAll('img')).filter(isVisible).shift() || elem;
  }

  /* ================================================================== *
   * Text weighting
   *
   * Used to guess which column of a page is the "main" one when there is no
   * selection yet: heavier, larger text wins.
   * ================================================================== */

  const hasText = (node) => node.textContent.trim().length > 0;
  const isTextNode = (node) => node.nodeName === '#text';

  function findTextNodes(elem) {
    return Array.from(elem.childNodes)
      .map((node) => (isTextNode(node) ? [node] : findTextNodes(node)))
      .reduce((acc, nodes) => acc.concat(nodes), []);
  }

  function findVisibleTextNodes(elem) {
    return findTextNodes(elem)
      .filter(hasText)
      .filter((node) => isVisible(node.parentElement));
  }

  const hasVisibleTextNode = (elem) => findVisibleTextNodes(elem).length > 0;

  function fontWeightRate(elem) {
    const fontWeight = window.getComputedStyle(elem).fontWeight;
    let weight;
    switch (fontWeight) {
      case 'normal': weight = 400; break;
      case 'bold': weight = 700; break;
      default: weight = parseInt(fontWeight, 10);
    }
    return 1 + (weight / 400 - 1) / 3;
  }

  function fontWeightRateAverage(textNodeParents) {
    return textNodeParents
      .sort((a, b) => a.textContent.trim().length - b.textContent.trim().length)
      .slice(-1)
      .map(fontWeightRate)
      .pop();
  }

  function textWeight(elem) {
    const fontSize =
      parseInt(window.getComputedStyle(elem).fontSize, 10) ||
      parseInt(window.getComputedStyle(document.documentElement).fontSize, 10) ||
      16;
    const parents = findVisibleTextNodes(elem).map((node) => node.parentElement);
    const weightAverage = fontWeightRateAverage(parents);
    const length = parents.reduce((sum, node) => sum + node.textContent.trim().length, 0);
    return fontSize * weightAverage * Number(length > 3);
  }

  function textWeightAverage(elems) {
    if (elems.length === 0) return 0;
    const total = elems.reduce((sum, elem) => sum + textWeight(elem), 0);
    return (total / elems.length) * (Math.min(elems.length, 10) / 10 + 0.5);
  }

  function compareGroupsByTextWeight(a, b) {
    return (
      textWeightAverage(a.filter(hasText).slice(0, 10)) -
      textWeightAverage(b.filter(hasText).slice(0, 10)) ||
      -compareLeftDistance(a[0], b[0])
    );
  }

  /* ================================================================== *
   * Sorting
   * ================================================================== */

  function compareLeftDistance(a, b) {
    return (
      Math.floor(a.getBoundingClientRect().left) -
      Math.floor(b.getBoundingClientRect().left)
    );
  }

  function compareLeftTopDistance(a, b) {
    const distance = (elem) => {
      const rect = elem.getBoundingClientRect();
      return Math.floor(rect.left + rect.top * 5);
    };
    return distance(a) - distance(b);
  }

  function compareCursorDistance(cursor) {
    const weight = 10;
    const from = offsetOf(cursor);
    const distance = (elem) => {
      const to = offsetOf(elem);
      return Math.floor(Math.abs(to.left - from.left) + Math.abs(to.top - from.top) * weight);
    };
    return (a, b) => distance(a) - distance(b);
  }

  function compareCursorVerticalDistance(cursor) {
    const weight = 3;
    const from = offsetOf(cursor);
    const distance = (elem) => {
      const to = offsetOf(elem);
      // Elements horizontally overlapping the cursor count as perfectly aligned.
      const horizontal =
        to.left <= from.left && from.left <= to.right ? 0 : to.left - from.left;
      return Math.floor(Math.abs(horizontal) * weight + Math.abs(to.top - from.top));
    };
    return (a, b) => distance(a) - distance(b);
  }

  function compareCursorLeftDistance(cursor) {
    const weight = 5;
    const from = offsetOf(cursor);
    const distance = (elem) => {
      const to = offsetOf(elem);
      return Math.floor(Math.abs(to.right - from.left) + Math.abs(to.top - from.top) * weight);
    };
    return (a, b) => distance(a) - distance(b);
  }

  function compareCursorRightDistance(cursor) {
    const weight = 5;
    const from = offsetOf(cursor);
    const distance = (elem) => {
      const to = offsetOf(elem);
      return Math.floor(Math.abs(to.left - from.right) + Math.abs(to.top - from.top) * weight);
    };
    return (a, b) => distance(a) - distance(b);
  }

  function nodeDepth(elem) {
    let count = 0;
    let parent = elem;
    while ((parent = parent.parentElement)) count += 1;
    return count;
  }

  const compareNodeDepth = (a, b) => nodeDepth(a) - nodeDepth(b);

  /* ================================================================== *
   * Column detection
   * ================================================================== */

  function columns(targets) {
    return targets
      .sort(compareLeftDistance)
      .reduce(groupByLeftEdge, [])
      .map(dropShallowNodes)
      .filter((group) => group.length > 1);
  }

  function groupByLeftEdge(groups, elem) {
    if (groups.length === 0) return [[elem]];
    const group = groups.slice(-1)[0];
    const sameColumn =
      Math.floor(group[0].getBoundingClientRect().left) ===
      Math.floor(elem.getBoundingClientRect().left);
    return sameColumn
      ? groups.slice(0, -1).concat([group.concat(elem)])
      : groups.concat([[elem]]);
  }

  /** Keep only the depth-tier of the column that has more than one member. */
  function dropShallowNodes(group) {
    return group
      .sort(compareNodeDepth)
      .reduce((acc, elem) => {
        if (acc.length === 0) return [[elem]];
        return compareNodeDepth(acc[0][0], elem) === 0
          ? [[elem].concat(acc[0])].concat(acc.slice(1))
          : [[elem]].concat(acc);
      }, [])
      .filter((tier) => tier.length > 1)
      .reduce((acc, tier) => acc.concat(tier), []);
  }

  /* ================================================================== *
   * Target finding
   * ================================================================== */

  function findLeftTops(targets) {
    return targets
      .filter(isInWindow)
      .map(shiftVisibleImg)
      .sort(compareLeftTopDistance);
  }

  function findMainColumn(targets) {
    return columns(
      targets
        .filter((target) => target.getBoundingClientRect().left < winWidth / 2)
        .filter(hasVisibleTextNode),
    )
      .sort(compareGroupsByTextWeight)
      .map((group) => group.filter(isInWindow))
      .filter((group) => group.length > 0)
      .reduce((_, group) => group, findLeftTops(targets))
      .map(shiftVisibleImg)
      .sort(compareLeftTopDistance);
  }

  function findLeftColumn(targets) {
    const mainColumn = findMainColumn(targets);
    const left =
      mainColumn.length > 0
        ? mainColumn[0].parentElement.getBoundingClientRect().left
        : Infinity;
    return columns(targets.filter((target) => target.getBoundingClientRect().right < left))
      .map((group) => group.filter(isInWindow))
      .filter((group) => group.length > 0)
      .sort(compareGroupsByTextWeight)
      .reduce((_, group) => group, mainColumn)
      .map(shiftVisibleImg)
      .sort(compareLeftTopDistance);
  }

  function findRightColumn(targets) {
    const mainColumn = findMainColumn(targets);
    const right =
      mainColumn.length > 0
        ? mainColumn[0].parentElement.getBoundingClientRect().right
        : -Infinity;
    return columns(targets.filter((target) => target.getBoundingClientRect().left > right))
      .map((group) => group.filter(isInWindow))
      .filter((group) => group.length > 0)
      .sort(compareGroupsByTextWeight)
      .reduce((_, group) => group, mainColumn)
      .map(shiftVisibleImg)
      .sort(compareLeftTopDistance);
  }

  function findCursorTops(targets, cursor) {
    const margin = 3;
    return targets
      .map(shiftVisibleImg)
      .filter(
        inRange(
          Math.max(winTop - winHeight * UP_SEARCH_SCREENS, 0),
          winLeft,
          winLeft + winWidth,
          offsetOf(cursor).top + margin,
        ),
      )
      .sort(compareCursorVerticalDistance(cursor));
  }

  function findCursorBottoms(targets, cursor) {
    const margin = 3;
    return targets
      .map(shiftVisibleImg)
      .filter(
        inRange(
          offsetOf(cursor).bottom - margin,
          winLeft,
          winLeft + winWidth,
          winTop + winHeight * DOWN_SEARCH_SCREENS,
        ),
      )
      .sort(compareCursorVerticalDistance(cursor));
  }

  function findCursorLefts(targets, cursor) {
    const margin = 3;
    return targets
      .map(shiftVisibleImg)
      .filter(inRange(winTop, 0, offsetOf(cursor).left + margin, winTop + winHeight))
      .sort(compareCursorLeftDistance(cursor));
  }

  function findCursorRights(targets, cursor) {
    const margin = 3;
    return targets
      .map(shiftVisibleImg)
      .filter(inRange(winTop, offsetOf(cursor).right - margin, Infinity, winTop + winHeight))
      .sort(compareCursorRightDistance(cursor));
  }

  function findCursorNearTargets(targets, cursor) {
    return targets
      .map(shiftVisibleImg)
      .filter(isInWindow)
      .sort(compareCursorDistance(cursor));
  }

  /** Restrict results to the column the cursor already sits in. */
  function findCursorColumn(targets, cursor) {
    const left = cursor.getBoundingClientRect().left;
    const inCursorColumn = (elem) => elem.getBoundingClientRect().left === left;
    return columns(targets.filter(inCursorColumn).filter(hasVisibleTextNode))
      .reduce((_, group) => group, targets)
      .map(shiftVisibleImg)
      .sort((a, b) => compareGroupsByTextWeight([b], [a]) || compareLeftTopDistance(a, b));
  }

  function isCursorActive(cursor) {
    const rect = cursor && cursor.getBoundingClientRect();
    return !(
      !rect ||
      rect.bottom < 0 ||
      rect.top > winHeight ||
      rect.right < 0 ||
      rect.left > winWidth
    );
  }

  /* ================================================================== *
   * Analysis
   * ================================================================== */

  let queried = null;
  let linkCount = 0;

  function analyze(command, cursor) {
    if (!queried || !cursor || linkCount !== document.links.length) {
      queried = Array.from(document.querySelectorAll(CLICKABLE_SELECTOR));
      linkCount = document.links.length;
    }

    const visible = queried.filter((target) => isVisible(shiftVisibleImg(target)));
    const targets = findTargets(visible, command, cursor);

    // If the chosen target is off-screen the page is about to scroll, which
    // invalidates every cached rect.
    if (!isInWindow(targets[0])) queried = null;

    return targets;
  }

  function findTargets(targets, command, rawCursor) {
    const cursor = isCursorActive(rawCursor) ? rawCursor : null;

    switch (command) {
      case COMMAND.UP:
        return cursor ? findCursorTops(targets, cursor) : findLeftTops(targets);
      case COMMAND.UP_COLUMN:
        return cursor
          ? findCursorColumn(findCursorTops(targets, cursor), cursor)
          : findLeftTops(targets);
      case COMMAND.DOWN:
        return cursor ? findCursorBottoms(targets, cursor) : findMainColumn(targets);
      case COMMAND.DOWN_COLUMN:
        return cursor
          ? findCursorColumn(findCursorBottoms(targets, cursor), cursor)
          : findMainColumn(targets);
      case COMMAND.LEFT:
        return cursor ? findCursorLefts(targets, cursor) : findLeftColumn(targets);
      case COMMAND.RIGHT:
        return cursor ? findCursorRights(targets, cursor) : findRightColumn(targets);
      case COMMAND.EXPAND:
        return findCursorNearTargets(
          targets,
          cursor || findMainColumn(targets)[0] || document.body,
        ).filter(isInWindow);
      case COMMAND.CONTRACT:
        return findCursorNearTargets(
          targets,
          cursor || findMainColumn(targets)[0] || document.body,
        )
          .filter(isInWindow)
          .reverse();
      default:
        return [];
    }
  }

  /* ================================================================== *
   * Scrolling
   *
   * Replaces the old scrollIntoViewIfNeeded() call, which is non-standard,
   * missing in Firefox, and re-centres rather than scrolling minimally.
   * ================================================================== */

  function keepInView(elem, margin = SCROLL_MARGIN) {
    if (!elem) return;

    // Innermost scroll containers first, then the page itself.
    let parent = elem.parentElement;
    while (parent) {
      if (isScrollable(parent)) scrollContainer(parent, elem, margin);
      parent = parent.parentElement;
    }
    scrollPage(elem, margin);
  }

  function isScrollable(elem) {
    if (elem === document.body || elem === document.documentElement) return false;
    const style = window.getComputedStyle(elem);
    const scrollsY = style.overflowY === 'auto' || style.overflowY === 'scroll';
    const scrollsX = style.overflowX === 'auto' || style.overflowX === 'scroll';
    return (
      (scrollsY && elem.scrollHeight > elem.clientHeight) ||
      (scrollsX && elem.scrollWidth > elem.clientWidth)
    );
  }

  function scrollContainer(box, elem, margin) {
    const bounds = box.getBoundingClientRect();
    const rect = elem.getBoundingClientRect();
    box.scrollTop += scrollDelta(
      rect.top, rect.bottom, bounds.top, bounds.bottom,
      capMargin(margin, bounds.height, rect.height),
    );
    box.scrollLeft += scrollDelta(
      rect.left, rect.right, bounds.left, bounds.right,
      capMargin(margin, bounds.width, rect.width),
    );
  }

  function scrollPage(elem, margin) {
    const viewHeight = document.documentElement.clientHeight;
    const viewWidth = document.documentElement.clientWidth;
    const rect = elem.getBoundingClientRect();
    const dy = scrollDelta(
      rect.top, rect.bottom, 0, viewHeight,
      capMargin(margin, viewHeight, rect.height),
    );
    const dx = scrollDelta(
      rect.left, rect.right, 0, viewWidth,
      capMargin(margin, viewWidth, rect.width),
    );
    if (dy || dx) window.scrollBy(dx, dy);
  }

  /** Never ask for more margin than the container can spare. */
  function capMargin(margin, outer, inner) {
    return Math.min(margin, Math.max(0, (outer - inner) / 2));
  }

  /** How far to move so [near, far] lands inside [lo + margin, hi - margin]. */
  function scrollDelta(near, far, lo, hi, margin) {
    if (near < lo + margin) return near - (lo + margin);
    // Math.min keeps elements taller than the viewport top-aligned rather than
    // scrolling straight past them.
    if (far > hi - margin) return Math.min(far - (hi - margin), near - (lo + margin));
    return 0;
  }

  /* ================================================================== *
   * Cursor rendering
   * ================================================================== */

  // The class is repeated to raise specificity to 0,3,0 without changing what
  // it matches. Sites commonly ship `button:focus { outline: none !important }`
  // at 0,1,1, which beats a single class even when both are !important.
  const CURSOR_SELECTOR = `.${CURSOR_CLASS}.${CURSOR_CLASS}.${CURSOR_CLASS}`;

  const CURSOR_STYLE = [
    `${CURSOR_SELECTOR} {`,
    '  outline: 3px solid gold !important;',
    '  outline-offset: -3px !important;',
    '  opacity: unset !important;',
    // '  position: relative !important;',
	'  background-color: rgba(255, 255, 0, 0.25) !important;',
    '}',
    // Painted above descendants, so artwork and overlays can't cover it.
    // `${CURSOR_SELECTOR}::after {`,
    // '  content: "" !important;',
    // '  position: absolute !important;',
    // '  inset: 0 !important;',
    // '  border: 3px solid gold !important;',
    // '  background-color: rgba(255, 255, 0, 0.25) !important;',
    // '  pointer-events: none !important;',
    // '  z-index: 2147483647 !important;',
    // '}',
    `img.${CURSOR_CLASS} {`,
    '  outline-offset: -3px !important;',
    '}',
  ].join('\n');

  function injectStyle() {
    if (document.getElementById('spatialnavigation-style')) return;
    const style = document.createElement('style');
    style.id = 'spatialnavigation-style';
    style.textContent = CURSOR_STYLE;
    // documentElement rather than head, so this lands after site stylesheets
    // and wins on source order too.
    document.documentElement.appendChild(style);
  }

  const currentCursor = () => document.querySelector(`.${CURSOR_CLASS}`);

  function select(elem) {
    unselect();
    displayUrl(elem);
    elem.classList.add(CURSOR_CLASS);
  }

  function unselect() {
    const cursor = currentCursor();
    if (!cursor) return;
    cursor.classList.remove(CURSOR_CLASS);
    undisplayUrl();
  }

  /** Append `!important` to each declaration. */
  const important = (declarations) =>
    declarations.map((rule) => `${rule.replace(/;\s*$/, '')} !important;`).join('');

  function displayUrl(cursor) {
    if (!cursor) return;
    if (cursor.tagName.toLowerCase() !== 'a') {
      displayUrl(cursor.parentElement);
      return;
    }
    const display = document.createElement('span');
    display.id = URLDISPLAY_ID;
    display.style.cssText = important([
      'position: fixed;',
      'z-index: 9999;',
      'left: 0px;',
      'bottom: 0px;',
      'padding: 5px;',
      'color: #ececec;',
      'background-color: #26272A;',
      'border-radius: 2px;',
      'font-family: Meiryo, Helvetica, sans-serif;',
      'font-size: 11.5px;',
      'text-align: left;',
    ]);
    display.textContent = cursor.href;
    document.body.appendChild(display);
  }

  function undisplayUrl() {
    const display = document.getElementById(URLDISPLAY_ID);
    if (display) display.remove();
  }

  /* ================================================================== *
   * Clicking
   * ================================================================== */

  function click(elem, shiftKey, ctrlKey) {
    const isAnchor = elem.tagName.toLowerCase() === 'a';
    const target = elem.hasAttribute('target') && elem.getAttribute('target');

    // Strip target so shift/ctrl-click get their normal new-window semantics.
    if (isAnchor) elem.removeAttribute('target');

    for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
      elem.dispatchEvent(
        new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          view: window,
          detail: 1,
          ctrlKey,
          shiftKey,
        }),
      );
    }

    if (isAnchor) {
      if (typeof target === 'boolean') elem.removeAttribute('target');
      else elem.setAttribute('target', target);
    }
  }

  const KEEP_SELECTED_TAGS = ['a', 'button', 'option', 'input', 'select', 'textarea'];
  const KEEP_SELECTED_ROLES = ['button', 'link', 'menuitem', 'tab', 'option', 'checkbox'];

  function trigger(cursor, shiftKey, ctrlKey) {
    if (!cursor) return;

    // Sample the centre, not the top-left corner: on elements whose bounding
    // box extends past their painted area the corner resolves to an ancestor
    // or to nothing at all.
    const rect = cursor.getBoundingClientRect();
    const hit = document.elementFromPoint(
      Math.round(rect.left + rect.width / 2),
      Math.round(rect.top + rect.height / 2),
    );
    if (!hit) return;

    const tag = cursor.tagName.toLowerCase();
    const role = cursor.getAttribute('role');
    const keepSelected =
      KEEP_SELECTED_TAGS.includes(tag) ||
      cursor.parentElement.tagName.toLowerCase() === 'a' ||
      cursor.onclick ||
      KEEP_SELECTED_ROLES.includes(role);

    if (keepSelected) select(cursor);
    else unselect();

    // Click BEFORE focus. Focusing can make a framework re-render and replace
    // the node, after which events dispatched on the old reference reach
    // nothing — React attaches listeners to its root container, not the node.
    click(cursor, shiftKey, ctrlKey);

    // Purely so keyboard focus follows the selection. If the highlight ever
    // flashes and vanishes, this line is the cause — remove it.
    if (cursor.isConnected) cursor.focus();
  }

  /* ================================================================== *
   * Marker mode (expand / contract)
   *
   * Labels each candidate with a letter and reads the next typed character
   * out of an offscreen input. 'e' and 'q' are reserved: 'e' pages through
   * further candidates.
   * ================================================================== */

  const MARKER_KEYS = 'abcdfghijklmnoprstuvwxyz'.split('');

  // Full-width and kana characters an IME may produce, mapped to ASCII.
  const FULLWIDTH =
    'ｑＱｗＷえＥｒＲｔＴｙＹうＵいＩおＯｐＰあＡｓＳｄＤｆＦｇＧｈＨｊＪｋＫｌＬｚＺｘＸｃＣｖＶｂＢｎＮｍＭ';
  const ASCII = 'qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM';
  const JA_TO_EN = new Map(
    Array.from(FULLWIDTH).map((char, i) => [char, ASCII[i]]),
  );

  const normalizeKey = (char) => JA_TO_EN.get(char) || char;

  /** True while marker labels are on screen and the offscreen input owns keys. */
  let markerMode = false;

  function showMarkers(targets, callback, reverse, stack = []) {
    if (targets.length === 0) return;

    markerMode = true;

    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    const container = document.createElement('div');
    const observer = document.createElement('input');
    const table = new Map();

    observer.style.cssText = important([
      'position: fixed;',
      'width: 0px;',
      'height: 0px;',
      'bottom: 0px;',
      'right: 0px;',
      'margin: 0px;',
      'border-width: 0px;',
      'padding: 0px;',
      'z-index: -1;',
    ]);

    observer.addEventListener('input', handler);
    observer.addEventListener('blur', handler);
    document.body.appendChild(observer);
    observer.focus();
    // Some pages steal focus back; reclaim it once if the markers are still up.
    setTimeout(() => {
      if (observer.isConnected) observer.focus();
    }, 1000);

    targets.slice(0, MARKER_KEYS.length).forEach((target, i) => {
      const key = MARKER_KEYS[i];
      const rect = target.getBoundingClientRect();
      const marker = document.createElement('span');
      marker.classList.add(MARKER_CLASS, `${MARKER_CLASS}-${key}`);
      marker.style.cssText = important([
        'position: absolute;',
        'overflow: visible;',
        'z-index: 9999;',
        `top: ${scrollTop + rect.top - 3}px;`,
        `left: ${scrollLeft + rect.left - 12}px;`,
        'min-width: 5px;',
        'margin: 0px;',
        'border: 0px;',
        'padding: 1px 3px;',
        'border-radius: 3px;',
        'box-shadow: 1px 1px 1px 1px;',
        'background-color: gold;',
        'font-family: Helvetica, Arial, sans-serif;',
        'text-transform: uppercase;',
        'font-size: 13px;',
        'font-weight: bold;',
        'line-height: normal;',
        'color: black;',
      ]);
      marker.textContent = key;
      table.set(key, target);
      container.appendChild(marker);
    });

    document.body.appendChild(container);

    function handler(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      markerMode = false;

      const key = normalizeKey(event.target.value);
      const shiftKey = key === key.toUpperCase();
      const target = table.get(key.toLowerCase());

      observer.removeEventListener('input', handler);
      observer.removeEventListener('blur', handler);
      container.remove();

      // TODO: no way to detect Ctrl from an input event.
      if (key && target) callback(target, shiftKey, false);

      observer.blur();
      setTimeout(() => observer.remove(), 1);

      const pageForward = reverse ? 'E' : 'e';
      const pageBack = reverse ? 'e' : 'E';
      const size = MARKER_KEYS.length;

      if (key === pageForward) {
        if (targets.length > size) {
          showMarkers(targets.slice(size), callback, reverse, stack.concat(targets.slice(0, size)));
        } else {
          showMarkers(stack.concat(targets), callback, reverse);
        }
      } else if (key === pageBack) {
        let previous = stack;
        let rest = targets;
        if (previous.length === 0) {
          previous = targets;
          rest = [];
        }
        if (previous.length > size) {
          showMarkers(
            previous.slice(-size).concat(rest),
            callback,
            reverse,
            previous.slice(0, Math.max(previous.length - size, 0)),
          );
        } else {
          showMarkers(previous.concat(rest), callback, reverse);
        }
      }
    }
  }

  /* ================================================================== *
   * Command application
   * ================================================================== */

  function applyCommand(command, targets) {
    switch (command) {
      case COMMAND.UP:
      case COMMAND.UP_COLUMN:
      case COMMAND.DOWN:
      case COMMAND.DOWN_COLUMN:
      case COMMAND.LEFT:
      case COMMAND.RIGHT: {
        const target = targets[0];
        if (!target) break;
        select(target);
        keepInView(target);
        break;
      }
      case COMMAND.EXPAND:
        showMarkers(targets, trigger, false);
        break;
      case COMMAND.CONTRACT:
        showMarkers(targets, trigger, true);
        break;
      case COMMAND.CLICK:
        trigger(currentCursor(), false, false);
        break;
      case COMMAND.SHIFT_CLICK:
        trigger(currentCursor(), true, false);
        break;
      case COMMAND.CONTROL_CLICK:
        trigger(currentCursor(), false, true);
        break;
      default:
        // QUIT and anything unhandled clear the selection.
        unselect();
    }
  }

  /* ================================================================== *
   * Input pipeline
   *
   * Replaces the lazychain stream: coalesce keypresses inside a short window
   * and act only on the most recent one.
   * ================================================================== */

  let pending = null;
  let flushTimer = 0;

  function schedule(command, cursor) {
    pending = { command, cursor };
    if (flushTimer) return;
    flushTimer = window.setTimeout(flush, INPUT_DEBOUNCE_MS);
  }

  function flush() {
    flushTimer = 0;
    const job = pending;
    pending = null;
    if (!job) return;
    readViewport();
    applyCommand(job.command, analyze(job.command, job.cursor));
  }

  /* ================================================================== *
   * Keydown handling
   * ================================================================== */

  function isTyping(elem) {
    if (!elem || !elem.tagName) return false;

    switch (elem.tagName.toLowerCase()) {
      case 'input':
        switch (elem.getAttribute('type')) {
          case 'checkbox':
          case 'radio':
          case 'file':
          case 'submit':
          case 'reset':
          case 'button':
          case 'image':
          case 'range':
          case 'color':
            return false;
          default:
            return true;
        }
      case 'select':
        return false;
      case 'datalist':
      case 'option':
      case 'textarea':
        return true;
      default:
        break;
    }

    if (elem.getAttribute('role') === 'textbox') return true;

    let node = elem;
    do {
      if (node.contentEditable === 'true') return true;
    } while ((node = node.parentElement));

    return false;
  }

  function handleKeyDown(event) {
    undisplayUrl();

    // Marker mode owns the keyboard. Return without preventDefault so the key
    // reaches the offscreen input; don't rely on isTyping noticing it, because
    // a page that steals focus would then have D navigate instead of picking
    // marker D.
    if (markerMode) return;

    if (event.defaultPrevented) return;

    // composedPath()[0] rather than target: events crossing a shadow boundary
    // retarget to the host, so a text field inside a shadow root looks like a
    // plain div and we'd swallow the user's typing.
    const source = (event.composedPath && event.composedPath()[0]) || event.target;
    if (isTyping(source)) return;

    const cursor = currentCursor();
    const command = keyToCommand(event);

    if (command === COMMAND.INVALID) return;
    // Click commands are meaningless without something selected.
    if (!cursor && (command === COMMAND.CLICK || command === COMMAND.SHIFT_CLICK)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    schedule(command, cursor);
  }

  /* ================================================================== *
   * Boot
   * ================================================================== */

  function start() {
    loadSettings();
    startKeyTracking();
    injectStyle();
    window.addEventListener('keydown', handleKeyDown, true);

    // Options-page edits reach already-open tabs without a reload. Fires in
    // every content script automatically, so no messaging is needed.
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes['extension-settings']) return;
      const next = changes['extension-settings'].newValue;
      hotkeyCodes = (next && next.hotkeys && next.hotkeys.codes) || {};
    });
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
