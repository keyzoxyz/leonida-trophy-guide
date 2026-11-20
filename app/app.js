// Leonida Trophy Guide — the page's whole brain. It draws the trophy cards, the roadmap and the
// missable callout from app/data/trophies.js, keeps the reader's progress in localStorage (with a JSON
// export/import for moving it between browsers), and treats two things as separate layers: an open
// detail sheet, and a search that Escape unwinds first. No framework, no network call, no build step.

import { TROPHIES, STAGES } from './data/trophies.js';

const $ = (selector) => document.querySelector(selector);

const STORE_KEY = 'leonida-guide-progress-v1';
const SAVE_VERSION = 1;

// One object holds everything the screen depends on; every render reads from here and nothing else.
// Keep it in sync with the controls, never the other way round: an import or a chip click can change
// several fields at once, and trusting the DOM to remember them is how a filter drifts out of step.
const view = {
  earned: new Set(),
  grade: null,
  kind: 'all',
  missableOnly: false,
  hideEarned: true,
  unearnedOnly: false,
  stage: null,
  query: '',
  spoiler: false,
};

let opener = null; // the element that opened the sheet, so closing it can put focus back
let typing = 0;    // the pending debounced search render

/* ── saved progress ──────────────────────────────────────────────────── */

function loadSaved() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORE_KEY);
  } catch {
    return; // storage blocked: the page still works, it just will not remember anything
  }
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.earned)) {
      view.earned = new Set(saved.earned.filter((id) => Number.isInteger(id) && id >= 1 && id <= 55));
    }
    if (typeof saved.spoiler === 'boolean') view.spoiler = saved.spoiler;
  } catch {
    view.earned = new Set(); // a corrupt save must never take the page down
  }
}

function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      version: SAVE_VERSION,
      earned: [...view.earned].sort((a, b) => a - b),
      spoiler: view.spoiler,
      savedAt: new Date().toISOString(),
    }));
  } catch {
    // private browsing or a full quota: this session works, the next one starts clean
  }
}

function saveToFile() {
  const doc = {
    app: 'leonida-trophy-guide',
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    spoilerMode: view.spoiler,
    earned: [...view.earned].sort((a, b) => a - b),
  };
  const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'leonida-progress.json';
  link.click();
  URL.revokeObjectURL(url);
}

function loadFromFile(file) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    try {
      const doc = JSON.parse(String(reader.result));
      if (!Array.isArray(doc.earned)) throw new Error('not an export');
      view.earned = new Set(doc.earned.filter((id) => Number.isInteger(id)));
      if (typeof doc.spoilerMode === 'boolean') view.spoiler = doc.spoilerMode;
      persist();
      renderAll();
    } catch {
      alert('That file is not a Leonida progress export.');
    }
  });
  reader.readAsText(file);
}

/* ── reading the data ────────────────────────────────────────────────── */

// A story beat (or an entry the data marks hidden) is masked only while it is unearned. Stage number
// is not the test: a late collectible is not a spoiler, and an early choice mission still is.
function masked(t) {
  return view.spoiler && !view.earned.has(t.id) && (t.kind === 'story' || t.hidden === true);
}

// Name, guide and cited sources, joined before lowercasing, so "Rockstar Newswire" finds every trophy
// that leans on it and no query can match across the seam between two fields.
function searchable(t) {
  const sources = Array.isArray(t.sources) ? t.sources.join(' ') : '';
  return `${t.name} ${t.guide} ${sources}`.toLowerCase();
}

function visible(t) {
  if (view.grade !== null && t.grade !== view.grade) return false;
  if (view.kind !== 'all' && t.kind !== view.kind) return false;
  if (view.missableOnly && !t.missable) return false;
  if (view.stage !== null && t.stage !== view.stage) return false;

  const earned = view.earned.has(t.id);
  if (view.hideEarned && earned) return false;
  if (view.unearnedOnly && earned) return false;

  const q = view.query.trim().toLowerCase();
  return q === '' || searchable(t).includes(q);
}

/* ── tiny DOM helpers ────────────────────────────────────────────────── */

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function tag(kind, text) {
  return make('span', 'badge' + (kind ? ' ' + kind : ''), text);
}

function shortGrade(grade) {
  return grade === 'platinum' ? 'Pt' : grade.charAt(0).toUpperCase();
}

/* ── the trophy list ─────────────────────────────────────────────────── */

function renderCards() {
  const host = $('#trophyList');
  host.textContent = '';
  const rows = TROPHIES.filter(visible);

  if (rows.length === 0) {
    host.append(make('div', 'empty', 'No trophies match the current filters and search.'));
    return;
  }

  for (const t of rows) {
    const earned = view.earned.has(t.id);
    const hidden = masked(t);

    const card = make('article', 'tcard' + (earned ? ' earned' : '') + (t.missable ? ' missable' : ''));
    card.dataset.id = String(t.id);
    card.dataset.spoiler = hidden ? '1' : '0';
    card.setAttribute('role', 'listitem');

    card.append(make('div', 'tgrade ' + t.grade, shortGrade(t.grade)));

    const body = make('div', 'tmain');
    body.append(
      make('h3', 'tname', hidden ? '??? hidden until earned' : t.name),
      make('p', 'tdesc', hidden
        ? 'story trophy — description hidden in spoiler-safe mode'
        : t.description),
    );

    const marks = make('div', 'tbadges');
    if (t.missable) marks.append(tag('miss', 'missable'));
    marks.append(tag('stage', `stage ${t.stage + 1}`));
    if (t.count) marks.append(tag('count', String(t.count)));
    if (t.kind === 'meta') marks.append(tag('', 'meta'));
    body.append(marks);

    const check = make('button', 'tcheck', '✓');
    check.type = 'button';
    const spoken = hidden ? 'this hidden story trophy' : t.name;
    check.setAttribute('aria-label', earned ? `Mark ${spoken} as not earned` : `Mark ${spoken} as earned`);
    check.setAttribute('aria-pressed', earned ? 'true' : 'false');
    check.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleEarned(t.id);
      // The whole list was just rebuilt, so hand focus to this trophy's replacement button.
      const replacement = host.querySelector(`.tcard[data-id="${t.id}"] .tcheck`);
      if (replacement) replacement.focus({ preventScroll: true });
    });

    card.append(body, check);
    card.addEventListener('click', () => openSheet(t.id));
    host.append(card);
  }
}

/* ── the roadmap and its callout ─────────────────────────────────────── */

function renderRoadmap() {
  const list = $('#roadmapList');
  list.textContent = '';

  for (const st of STAGES) {
    const members = TROPHIES.filter((t) => t.stage === st.id);
    const done = members.filter((t) => view.earned.has(t.id)).length;
    const openTraps = members.filter((t) => t.missable && !view.earned.has(t.id)).length;

    const row = make('li', [
      view.stage === st.id ? 'active' : '',
      members.length > 0 && done === members.length ? 'done' : '',
      openTraps > 0 ? 'has-missable' : '',
    ].filter(Boolean).join(' '));
    row.dataset.stage = String(st.id);
    row.tabIndex = 0;
    if (view.stage === st.id) row.setAttribute('aria-current', 'true');
    if (openTraps > 0) {
      row.setAttribute('aria-label', `${st.title}, ${done} of ${members.length} earned, ${openTraps} missable still open`);
    }

    row.append(
      make('span', 'stage-n', String(st.id + 1).padStart(2, '0')),
      make('span', 'stage-title', st.title),
      make('span', 'stage-count', `${done}/${members.length}`),
      make('span', 'stage-note', st.note),
    );

    const pick = () => {
      view.stage = view.stage === st.id ? null : st.id;
      renderAll();
      const replacement = list.querySelector(`li[data-stage="${st.id}"]`);
      if (replacement) replacement.focus({ preventScroll: true });
    };
    row.addEventListener('click', pick);
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        pick();
      }
    });
    list.append(row);
  }
}

function renderCallout() {
  const total = TROPHIES.filter((t) => t.missable).length;
  const open = TROPHIES.filter((t) => t.missable && !view.earned.has(t.id));
  const box = $('#missableCallout');

  box.hidden = false;
  box.classList.toggle('clear', open.length === 0);
  $('#missableCount').textContent = String(open.length);
  $('#missableLabel').textContent = open.length === 0 ? 'missable left'
    : open.length === 1 ? 'missable still open' : 'missables still open';
  $('#missableNote').textContent = open.length === 0
    ? `All ${total} missable trophies are earned, so the platinum can no longer slip away.`
    : `${total - open.length} of ${total} done. Finish each strand inside the chapter that opens it.`;

  const chips = $('#missableStages');
  chips.textContent = '';
  if (open.length === 0) return;

  const perStage = new Map();
  for (const t of open) perStage.set(t.stage, (perStage.get(t.stage) ?? 0) + 1);

  for (const st of STAGES) {
    const count = perStage.get(st.id);
    if (!count) continue;
    const chip = make('button', 'mcallout-stage' + (view.stage === st.id ? ' on' : ''),
      `${st.title} · ${count}`);
    chip.type = 'button';
    chip.setAttribute('aria-label', `Show the ${count} missable troph${count === 1 ? 'y' : 'ies'} in ${st.title}`);
    chip.addEventListener('click', () => {
      view.stage = view.stage === st.id ? null : st.id;
      view.missableOnly = true;
      renderAll();
    });
    chips.append(chip);
  }
}

/* ── counters and chips ──────────────────────────────────────────────── */

function renderGradeChips() {
  const wrap = $('#gradeChips');
  wrap.textContent = '';
  for (const grade of ['platinum', 'gold', 'silver', 'bronze']) {
    const all = TROPHIES.filter((t) => t.grade === grade);
    const got = all.filter((t) => view.earned.has(t.id)).length;
    const chip = make('button', 'grade-chip g-' + grade + (view.grade === grade ? ' on' : ''),
      `${shortGrade(grade)} ${got}/${all.length}`);
    chip.type = 'button';
    chip.setAttribute('aria-label', `Filter to ${grade} trophies`);
    chip.setAttribute('aria-pressed', view.grade === grade ? 'true' : 'false');
    chip.addEventListener('click', () => {
      view.grade = view.grade === grade ? null : grade;
      renderAll();
    });
    wrap.append(chip);
  }
}

function renderProgress() {
  renderGradeChips();
  const done = TROPHIES.filter((t) => view.earned.has(t.id)).length;
  const pct = Math.round((done / TROPHIES.length) * 100);
  $('#earnedCount').textContent = String(done);
  $('#totalCount').textContent = String(TROPHIES.length);
  $('#earnedPct').textContent = `${pct}%`;
  $('#progressFill').style.width = `${pct}%`;
  const bar = $('#progressBar');
  bar.setAttribute('aria-valuenow', String(done));
  bar.setAttribute('aria-valuemax', String(TROPHIES.length));
}

function syncChips() {
  for (const chip of document.querySelectorAll('.kind-chip')) {
    const on = chip.dataset.kind === view.kind;
    chip.classList.toggle('on', on);
    chip.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  for (const chip of document.querySelectorAll('.flag-chip')) {
    const on = chip.dataset.flag === 'missable' ? view.missableOnly
      : chip.dataset.flag === 'earned' ? view.hideEarned
        : chip.dataset.flag === 'unearned-only' ? view.unearnedOnly
          : false;
    chip.classList.toggle('on', on);
    chip.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  const box = $('#search');
  if (box.value !== view.query) box.value = view.query;
  $('#spoilerMode').checked = view.spoiler;
}

function renderAll() {
  renderCards();
  renderRoadmap();
  renderCallout();
  renderProgress();
  syncChips();
  document.body.classList.toggle('spoiler', view.spoiler);
}

function toggleEarned(id) {
  if (view.earned.has(id)) view.earned.delete(id);
  else view.earned.add(id);
  persist();
  renderAll();
}

/* ── the detail sheet ────────────────────────────────────────────────── */

function openSheet(id) {
  const t = TROPHIES.find((trophy) => trophy.id === id);
  if (!t) return;

  const hidden = masked(t);
  const body = $('#detailBody');
  body.textContent = '';

  const head = make('div', 'dhead');
  head.append(make('div', 'tgrade ' + t.grade, shortGrade(t.grade)));
  const meta = make('div');
  const title = make('h2', '', hidden ? 'Hidden story trophy' : t.name);
  title.id = 'detailTitle';
  meta.append(
    title,
    make('div', 'dgrade-line',
      `${t.grade} · ${t.kind}${t.missable ? ' · missable' : ''}${t.count ? ` · ${t.count}` : ''}`),
  );
  head.append(meta);
  body.append(head);

  body.append(make('blockquote', 'ddesc', hidden
    ? 'Earn this trophy to reveal its official description.'
    : `“${t.description}”`));

  // The why line names the story beat as often as not, so spoiler-safe mode withholds it with the guide.
  if (!hidden && t.why) body.append(make('p', 'dwhy', t.why));

  body.append(make('p', 'dguide', hidden
    ? 'Guide hidden in spoiler-safe mode, because the steps name the mission and the beat it belongs to.'
    : t.guide));

  if (!hidden && Array.isArray(t.steps) && t.steps.length > 0) {
    const section = make('div', 'dsection');
    const steps = make('ol', 'dsteps');
    for (const step of t.steps) steps.append(make('li', '', step));
    section.append(make('h3', '', 'How to earn it'), steps);
    body.append(section);
  }

  const sources = make('div', 'dsection');
  const sourceChips = make('div', 'dsources');
  for (const source of t.sources ?? []) sourceChips.append(make('span', '', source));
  sources.append(make('h3', '', 'Sources'), sourceChips);
  body.append(sources);

  const actions = make('div', 'dactions');
  const mark = make('button', 'primary', view.earned.has(t.id) ? 'Mark as not earned' : 'Mark as earned');
  mark.type = 'button';
  mark.addEventListener('click', () => {
    toggleEarned(t.id);
    closeSheet();
    openSheet(t.id);
  });
  actions.append(mark);
  body.append(actions);

  opener = document.activeElement;
  $('#detailSheet').hidden = false;
  document.body.classList.add('sheet-open');
  $('#closeDetail').focus();
}

function closeSheet() {
  const sheet = $('#detailSheet');
  if (sheet.hidden) return;
  sheet.hidden = true;
  document.body.classList.remove('sheet-open');
  if (opener && typeof opener.focus === 'function') opener.focus();
  opener = null;
}

/* ── wiring ──────────────────────────────────────────────────────────── */

function wire() {
  // One delegated handler for both chip rows. Choosing a kind is a change of view, so it also drops
  // any stage picked from the roadmap; letting the stage survive is how a filter lands on an empty list.
  $('#filters').addEventListener('click', (event) => {
    const kindChip = event.target.closest('.kind-chip');
    if (kindChip) {
      view.kind = kindChip.dataset.kind;
      view.stage = null;
      renderAll();
      return;
    }
    const flagChip = event.target.closest('.flag-chip');
    if (!flagChip) return;
    switch (flagChip.dataset.flag) {
      case 'missable': view.missableOnly = !view.missableOnly; break;
      case 'earned': view.hideEarned = !view.hideEarned; break;
      case 'unearned-only': view.unearnedOnly = !view.unearnedOnly; break;
      default: return;
    }
    syncChips();
    renderCards();
  });

  $('#search').addEventListener('input', (event) => {
    view.query = event.target.value;
    // 55 cards rebuilt on every keystroke is wasteful; wait for a short pause in typing instead.
    clearTimeout(typing);
    typing = setTimeout(renderCards, 60);
  });

  $('#spoilerMode').addEventListener('change', (event) => {
    view.spoiler = event.target.checked;
    persist();
    renderAll();
  });

  $('#exportBtn').addEventListener('click', saveToFile);
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) loadFromFile(file);
    event.target.value = '';
  });

  $('#closeDetail').addEventListener('click', closeSheet);
  $('#detailSheet').addEventListener('click', (event) => {
    if (event.target === $('#detailSheet')) closeSheet();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    // Escape unwinds the narrowest layer first. Text in the search box means the reader is filtering,
    // probably from a result they already opened, so one key clears the search and leaves the sheet up;
    // only an already-empty box lets the same key close the sheet.
    const box = $('#search');
    if (box.value !== '') {
      box.value = '';
      view.query = '';
      clearTimeout(typing);
      renderCards();
      return;
    }
    closeSheet();
  });
}

loadSaved();
wire();
renderAll();