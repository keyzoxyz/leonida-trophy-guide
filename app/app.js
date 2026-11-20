// Leonida Trophy Guide — the page's only script. It renders the trophy list and the roadmap, keeps
// progress in localStorage with export/import, enforces the spoiler setting, and treats search and the
// detail sheet as layers that unwind one at a time. No framework, no network request: the data module
// beside it is the whole backend.

import { TROPHIES, STAGES } from './data/trophies.js';

const $ = (sel) => document.querySelector(sel);

const state = {
  earned: new Set(),      // trophy ids marked done
  grade: null,            // null = every grade, else platinum | gold | silver | bronze
  kind: 'all',
  missableOnly: false,
  hideEarned: true,
  unearnedOnly: false,
  activeStage: null,
  query: '',
  spoiler: false,         // hide the identity of unearned story trophies
};

const STORAGE_KEY = 'leonida-guide-progress-v1';
let returnFocus = null;   // whatever opened the sheet, so closing it can hand focus back
let searchTimer = null;

/* ── persistence ─────────────────────────────────────────────────────── */

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.earned)) {
      state.earned = new Set(saved.earned.filter(Number.isInteger));
    }
    if (typeof saved.spoiler === 'boolean') state.spoiler = saved.spoiler;
  } catch {
    // a corrupt save must never take the page down; start clean instead
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      earned: [...state.earned],
      spoiler: state.spoiler,
      savedAt: new Date().toISOString(),
    }));
  } catch {
    // private mode or a full quota: the session works, it just will not survive a reload
  }
}

function exportProgress() {
  const doc = {
    app: 'leonida-trophy-guide',
    version: 1,
    savedAt: new Date().toISOString(),
    spoilerMode: state.spoiler,
    earned: [...state.earned].sort((a, b) => a - b),
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leonida-progress.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const doc = JSON.parse(String(reader.result));
      const ids = Array.isArray(doc.earned) ? doc.earned.filter(Number.isInteger) : [];
      state.earned = new Set(ids);
      if (typeof doc.spoilerMode === 'boolean') state.spoiler = doc.spoilerMode;
      saveProgress();
      renderAll();
    } catch {
      alert('That file is not a Leonida progress export.');
    }
  };
  reader.readAsText(file);
}

/* ── filtering ───────────────────────────────────────────────────────── */

function isSpoiler(t) {
  // Stage is not the test: an early collectible is not a story spoiler, and a late decision mission
  // still is. Only story beats (and explicitly hidden entries) are masked, and only until earned.
  return state.spoiler && !state.earned.has(t.id) && (t.kind === 'story' || t.hidden === true);
}

function haystack(t) {
  // Name, guide and sources, joined into one lowercase string. Joining first means a query can never
  // match across the seam between two fields, and searching "PSNProfiles" finds every trophy citing it.
  const sources = Array.isArray(t.sources) ? t.sources.join(' ') : '';
  return `${t.name} ${t.guide} ${sources}`.toLowerCase();
}

function matches(t) {
  if (state.grade && t.grade !== state.grade) return false;
  if (state.kind !== 'all' && t.kind !== state.kind) return false;
  if (state.missableOnly && !t.missable) return false;
  if (state.activeStage !== null && t.stage !== state.activeStage) return false;

  const done = state.earned.has(t.id);
  if (state.hideEarned && done) return false;
  if (state.unearnedOnly && done) return false;

  const q = state.query.trim().toLowerCase();
  if (q && !haystack(t).includes(q)) return false;
  return true;
}

/* ── small builders ─────────────────────────────────────────────────── */

function gradeLabel(grade) {
  return grade === 'platinum' ? 'Pt' : grade[0].toUpperCase();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function badge(kind, text) {
  return el('span', 'badge' + (kind ? ' ' + kind : ''), text);
}

/* ── the trophy list ────────────────────────────────────────────────── */

function renderList() {
  const list = $('#trophyList');
  const rows = TROPHIES.filter(matches);
  list.textContent = '';

  if (!rows.length) {
    const empty = el('div', 'empty', 'Nothing matches these filters.');
    list.append(empty);
    return;
  }

  for (const t of rows) {
    const earned = state.earned.has(t.id);
    const masked = isSpoiler(t);

    const card = el('article', 'tcard' + (earned ? ' earned' : '') + (t.missable ? ' missable' : ''));
    card.dataset.id = String(t.id);
    card.dataset.spoiler = masked ? '1' : '0';
    card.setAttribute('role', 'listitem');

    card.append(el('div', 'tgrade ' + t.grade, gradeLabel(t.grade)));

    const main = el('div', 'tmain');
    main.append(
      el('h3', 'tname', masked ? '??? hidden until earned' : t.name),
      el('p', 'tdesc', masked ? 'story trophy — description hidden in spoiler-safe mode' : t.description),
    );

    const badges = el('div', 'tbadges');
    if (t.missable) badges.append(badge('miss', 'missable'));
    badges.append(badge('stage', `stage ${t.stage + 1}`));
    if (t.count) badges.append(badge('count', String(t.count)));
    if (t.kind === 'meta') badges.append(badge('', 'meta'));
    main.append(badges);

    const check = el('button', 'tcheck', '✓');
    check.type = 'button';
    // A screen reader must not read out what the card is hiding, so the label follows the same rule.
    const spoken = masked ? 'this story trophy' : t.name;
    check.setAttribute('aria-label', earned ? `Mark ${spoken} as not earned` : `Mark ${spoken} as earned`);
    check.setAttribute('aria-pressed', earned ? 'true' : 'false');
    check.addEventListener('click', (ev) => {
      ev.stopPropagation();
      toggleEarned(t.id);
      // renderAll rebuilds every card, so put focus back on this trophy's new check button.
      const again = document.querySelector(`.tcard[data-id="${t.id}"] .tcheck`);
      if (again) again.focus({ preventScroll: true });
    });

    card.append(main, check);
    card.addEventListener('click', () => openDetail(t.id));
    list.append(card);
  }
}

/* ── the roadmap ────────────────────────────────────────────────────── */

function renderRoadmap() {
  const ol = $('#roadmapList');
  ol.textContent = '';

  for (const st of STAGES) {
    const rows = TROPHIES.filter((t) => t.stage === st.id);
    const done = rows.filter((t) => state.earned.has(t.id)).length;
    const traps = rows.filter((t) => t.missable && !state.earned.has(t.id)).length;

    const li = el('li', [
      state.activeStage === st.id ? 'active' : '',
      rows.length && done === rows.length ? 'done' : '',
      traps ? 'has-missable' : '',
    ].filter(Boolean).join(' '));
    li.dataset.stage = String(st.id);
    li.tabIndex = 0;
    if (state.activeStage === st.id) li.setAttribute('aria-current', 'true');
    if (traps) {
      li.setAttribute('aria-label', `${st.title}, ${done} of ${rows.length} earned, ${traps} missable still open`);
    }

    li.append(
      el('span', 'stage-n', String(st.id + 1).padStart(2, '0')),
      el('span', 'stage-title', st.title),
      el('span', 'stage-count', `${done}/${rows.length}`),
      el('span', 'stage-note', st.note),
    );

    const toggle = () => {
      state.activeStage = state.activeStage === st.id ? null : st.id;
      renderAll();
      // renderAll replaces every row, so the row the keyboard user just pressed would otherwise take
      // the focus with it and the next Enter would land on the page body.
      const again = ol.querySelector(`li[data-stage="${st.id}"]`);
      if (again) again.focus({ preventScroll: true });
    };

    li.addEventListener('click', toggle);
    li.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        toggle();
      }
    });
    ol.append(li);
  }
}

/* The callout: the one number that can cost a platinum. Counts unearned missables and points at the
   stages holding them, so the list and the roadmap cannot disagree. */
function renderMissableCallout() {
  const box = $('#missableCallout');
  const total = TROPHIES.filter((t) => t.missable).length;
  const open = TROPHIES.filter((t) => t.missable && !state.earned.has(t.id));

  box.hidden = false;
  box.classList.toggle('clear', open.length === 0);
  $('#missableCount').textContent = String(open.length);
  $('#missableLabel').textContent = open.length === 0 ? 'missable left'
    : open.length === 1 ? 'missable still open' : 'missables still open';
  $('#missableNote').textContent = open.length === 0
    ? `All ${total} missable trophies are earned — the platinum can no longer slip away.`
    : `${total - open.length} of ${total} done. Finish each strand in the chapter it opens.`;

  const stages = $('#missableStages');
  stages.textContent = '';
  if (!open.length) return;

  const byStage = new Map();
  for (const t of open) byStage.set(t.stage, (byStage.get(t.stage) ?? 0) + 1);

  for (const st of STAGES) {
    const n = byStage.get(st.id);
    if (!n) continue;
    const chip = el('button', 'mcallout-stage' + (state.activeStage === st.id ? ' on' : ''),
      `${st.title} · ${n}`);
    chip.type = 'button';
    chip.dataset.stage = String(st.id);
    chip.setAttribute('aria-label', `Show the ${n} missable troph${n === 1 ? 'y' : 'ies'} in ${st.title}`);
    chip.addEventListener('click', () => {
      state.activeStage = state.activeStage === st.id ? null : st.id;
      state.missableOnly = true;
      renderAll();
    });
    stages.append(chip);
  }
}

/* ── counters ───────────────────────────────────────────────────────── */

function renderGradeChips() {
  const wrap = $('#gradeChips');
  if (!wrap) return;
  wrap.textContent = '';
  for (const grade of ['platinum', 'gold', 'silver', 'bronze']) {
    const ofGrade = TROPHIES.filter((t) => t.grade === grade);
    const got = ofGrade.filter((t) => state.earned.has(t.id)).length;
    const chip = el('button', 'grade-chip g-' + grade + (state.grade === grade ? ' on' : ''),
      `${gradeLabel(grade)} ${got}/${ofGrade.length}`);
    chip.type = 'button';
    chip.setAttribute('aria-label', `Filter to ${grade} trophies`);
    chip.setAttribute('aria-pressed', state.grade === grade ? 'true' : 'false');
    chip.addEventListener('click', () => {
      state.grade = state.grade === grade ? null : grade;
      renderAll();
    });
    wrap.append(chip);
  }
}

function renderProgress() {
  renderGradeChips();
  const done = TROPHIES.filter((t) => state.earned.has(t.id)).length;
  const pct = Math.round((done / TROPHIES.length) * 100);
  $('#earnedCount').textContent = String(done);
  $('#totalCount').textContent = String(TROPHIES.length);
  $('#earnedPct').textContent = `${pct}%`;
  $('#progressFill').style.width = `${pct}%`;
  const bar = $('#progressBar');
  if (bar) {
    bar.setAttribute('aria-valuenow', String(done));
    bar.setAttribute('aria-valuemax', String(TROPHIES.length));
  }
}

/* Chips and state can drift (an import, the initial markup, a flag set from code), so the UI is redrawn
   from the state rather than trusted to stay in step with it. */
function syncChips() {
  for (const chip of document.querySelectorAll('.kind-chip')) {
    const on = chip.dataset.kind === state.kind;
    chip.classList.toggle('on', on);
    chip.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  for (const chip of document.querySelectorAll('.flag-chip')) {
    const on = chip.dataset.flag === 'missable' ? state.missableOnly
      : chip.dataset.flag === 'earned' ? state.hideEarned
        : chip.dataset.flag === 'unearned-only' ? state.unearnedOnly
          : false;
    chip.classList.toggle('on', on);
    chip.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  const search = $('#search');
  if (search && search.value !== state.query) search.value = state.query;
}

function renderAll() {
  renderList();
  renderRoadmap();
  renderMissableCallout();
  renderProgress();
  syncChips();
  document.body.classList.toggle('spoiler', state.spoiler);
  $('#spoilerMode').checked = state.spoiler;
}

function toggleEarned(id) {
  if (state.earned.has(id)) state.earned.delete(id);
  else state.earned.add(id);
  saveProgress();
  renderAll();
}

/* ── the detail sheet ───────────────────────────────────────────────── */

function openDetail(id) {
  const t = TROPHIES.find((trophy) => trophy.id === id);
  if (!t) return;

  const masked = isSpoiler(t);
  const body = $('#detailBody');
  body.textContent = '';

  const head = el('div', 'dhead');
  head.append(el('div', 'tgrade ' + t.grade, gradeLabel(t.grade)));
  const meta = el('div');
  const title = el('h2', '', masked ? 'Hidden story trophy' : t.name);
  title.id = 'detailTitle';
  meta.append(
    title,
    el('div', 'dgrade-line',
      `${t.grade} · ${t.kind}${t.missable ? ' · missable' : ''}${t.count ? ` · ${t.count}` : ''}`),
  );
  head.append(meta);
  body.append(head);

  body.append(el('blockquote', 'ddesc',
    masked ? 'Earn this trophy to reveal its official description.' : `“${t.description}”`));

  // The why line is prose like the guide, and it often names the story beat, so spoiler-safe mode hides
  // it with the guide rather than beside it.
  if (!masked && t.why) body.append(el('p', 'dwhy', t.why));

  body.append(el('p', 'dguide', masked
    ? 'Guide hidden in spoiler-safe mode — the steps name the mission and the story beat it belongs to.'
    : t.guide));

  if (!masked && Array.isArray(t.steps) && t.steps.length) {
    const sec = el('div', 'dsection');
    const ol = el('ol', 'dsteps');
    for (const step of t.steps) ol.append(el('li', '', step));
    sec.append(el('h3', '', 'How to earn it'), ol);
    body.append(sec);
  }

  const sources = el('div', 'dsection');
  const chips = el('div', 'dsources');
  for (const source of t.sources ?? []) chips.append(el('span', '', source));
  sources.append(el('h3', '', 'Sources'), chips);
  body.append(sources);

  const actions = el('div', 'dactions');
  const mark = el('button', 'primary', state.earned.has(t.id) ? 'Mark as not earned' : 'Mark as earned');
  mark.type = 'button';
  mark.addEventListener('click', () => {
    toggleEarned(t.id);
    closeDetail();
    openDetail(t.id);
  });
  actions.append(mark);
  body.append(actions);

  returnFocus = document.activeElement;
  $('#detailSheet').hidden = false;
  document.body.classList.add('sheet-open');
  $('#closeDetail').focus();
}

function closeDetail() {
  const sheet = $('#detailSheet');
  if (sheet.hidden) return;
  sheet.hidden = true;
  document.body.classList.remove('sheet-open');
  if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
  returnFocus = null;
}

/* ── wiring ─────────────────────────────────────────────────────────── */

function wire() {
  // One delegated handler for both chip rows: a kind switch is a different view, so it drops the
  // stage picked from the roadmap; letting it survive is how a filter ends up showing an empty list.
  $('#filters').addEventListener('click', (ev) => {
    const kindChip = ev.target.closest('.kind-chip');
    if (kindChip) {
      state.kind = kindChip.dataset.kind;
      state.activeStage = null;
      renderAll();
      return;
    }
    const flagChip = ev.target.closest('.flag-chip');
    if (!flagChip) return;
    const flag = flagChip.dataset.flag;
    if (flag === 'missable') state.missableOnly = !state.missableOnly;
    else if (flag === 'earned') state.hideEarned = !state.hideEarned;
    else if (flag === 'unearned-only') state.unearnedOnly = !state.unearnedOnly;
    else return;
    syncChips();
    renderList();
  });

  $('#search').addEventListener('input', (ev) => {
    state.query = ev.target.value;
    // Debounced so typing does not rebuild 55 cards per keystroke.
    clearTimeout(searchTimer);
    searchTimer = setTimeout(renderList, 60);
  });

  $('#spoilerMode').addEventListener('change', (ev) => {
    state.spoiler = ev.target.checked;
    saveProgress();
    renderAll();
  });

  $('#exportBtn').addEventListener('click', exportProgress);
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (ev) => {
    const file = ev.target.files && ev.target.files[0];
    if (file) importProgress(file);
    ev.target.value = '';
  });

  $('#closeDetail').addEventListener('click', closeDetail);
  $('#detailSheet').addEventListener('click', (ev) => {
    if (ev.target === $('#detailSheet')) closeDetail();
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape') return;
    // Escape unwinds one layer at a time, narrowest first. A non-empty search box is the narrower
    // layer: clear it, re-render the list, leave the sheet open. Only with the box already empty does
    // Escape close the detail sheet.
    const search = $('#search');
    if (search && search.value !== '') {
      search.value = '';
      state.query = '';
      renderList();
      return;
    }
    if (!$('#detailSheet').hidden) closeDetail();
  });
}

loadProgress();
wire();
renderAll();