// Leonida Trophy Guide — the app. One module, four jobs: load the data, render the list and the
// roadmap, track progress in localStorage with export/import, and keep the spoiler setting honest.
// No framework, no network: everything the page needs is beside it.

import { TROPHIES, STAGES } from './data/trophies.js';

const $ = (sel) => document.querySelector(sel);

const state = {
  earned: new Set(),          // trophy ids marked done
  spoiler: false,             // hide unearned story trophies' identity
  kind: 'all',
  missableOnly: false,
  hideEarned: true,
  unearnedOnly: false,
  query: '',
  activeStage: null,
};

const STORAGE_KEY = 'leonida-guide-progress-v1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const doc = JSON.parse(raw);
    if (Array.isArray(doc.earned)) state.earned = new Set(doc.earned);
    if (typeof doc.spoiler === 'boolean') state.spoiler = doc.spoiler;
  } catch {
    /* a broken save must not take the page down; start fresh */
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    earned: [...state.earned],
    spoiler: state.spoiler,
    savedAt: new Date().toISOString(),
  }));
}

function exportProgress() {
  const doc = {
    app: 'leonida-trophy-guide',
    version: 1,
    savedAt: new Date().toISOString(),
    spoilerMode: state.spoiler,
    earned: [...state.earned].sort((a, b) => a - b),
  };
  const blob = new Blob([JSON.stringify(doc, null, 1)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
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
      const ids = Array.isArray(doc.earned) ? doc.earned.filter((n) => Number.isInteger(n)) : [];
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

/* ── rendering ───────────────────────────────────────────────────────── */

function gradeClass(grade) {
  return grade === 'platinum' ? 'platinum' : grade; // platinum also gets its own tint
}

function isSpoiler(t) {
  return state.spoiler && !state.earned.has(t.id) && (t.kind === 'story' || t.name.length > 0 && t.stage <= 1);
}

function matches(t) {
  if (state.kind !== 'all' && t.kind !== state.kind) return false;
  if (state.missableOnly && !t.missable) return false;
  const done = state.earned.has(t.id);
  if (state.hideEarned && done) return false;
  if (state.unearnedOnly && done) return false;
  if (state.activeStage !== null && t.stage !== state.activeStage) return false;
  if (state.query) {
    const q = state.query.toLowerCase();
    if (!t.name.toLowerCase().includes(q) && !t.guide.toLowerCase().includes(q)) return false;
  }
  return true;
}

function renderList() {
  const list = $('#trophyList');
  const rows = TROPHIES.filter(matches);
  list.textContent = '';
  if (rows.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'Nothing matches these filters.';
    list.append(empty);
    return;
  }
  for (const t of rows) {
    const earned = state.earned.has(t.id);
    const card = document.createElement('article');
    card.className = 'tcard' + (earned ? ' earned' : '') + (t.missable ? ' missable' : '');
    card.dataset.id = String(t.id);
    card.dataset.spoiler = isSpoiler(t) ? '1' : '0';
    card.setAttribute('role', 'listitem');

    const grade = document.createElement('div');
    grade.className = `tgrade ${gradeClass(t.grade)}`;
    grade.textContent = t.grade === 'platinum' ? 'Pt' : t.grade[0].toUpperCase();

    const main = document.createElement('div');
    main.className = 'tmain';
    const name = document.createElement('h3');
    name.className = 'tname';
    name.textContent = isSpoiler(t) ? '??? hidden until earned' : t.name;
    const desc = document.createElement('p');
    desc.className = 'tdesc';
    desc.textContent = isSpoiler(t) ? 'story trophy — description hidden in spoiler-safe mode' : t.description;
    main.append(name, desc);

    const badges = document.createElement('div');
    badges.className = 'tbadges';
    if (t.missable) badges.append(badge('miss', 'missable'));
    badges.append(badge('stage', `stage ${t.stage + 1}`));
    if (t.count) badges.append(badge('count', String(t.count)));
    if (t.kind === 'meta') badges.append(badge('', 'meta'));
    main.append(badges);

    const check = document.createElement('button');
    check.className = 'tcheck';
    check.type = 'button';
    check.setAttribute('aria-label', `Mark ${t.name} ${earned ? 'unearned' : 'earned'}`);
    check.textContent = '✓';
    check.addEventListener('click', (ev) => {
      ev.stopPropagation();
      toggleEarned(t.id);
    });

    card.addEventListener('click', () => openDetail(t.id));
    card.append(grade, main, check);
    list.append(card);
  }
}

function badge(cls, text) {
  const el = document.createElement('span');
  el.className = 'badge' + (cls ? ` ${cls}` : '');
  el.textContent = text;
  return el;
}

function renderRoadmap() {
  const ol = $('#roadmapList');
  ol.textContent = '';
  for (const st of STAGES) {
    const rows = TROPHIES.filter((t) => t.stage === st.id);
    const done = rows.filter((t) => state.earned.has(t.id)).length;
    const li = document.createElement('li');
    li.className = (state.activeStage === st.id ? 'active ' : '') + (done === rows.length && rows.length ? 'done' : '');
    li.dataset.stage = String(st.id);

    const n = document.createElement('span');
    n.className = 'stage-n';
    n.textContent = String(st.id + 1).padStart(2, '0');

    const title = document.createElement('span');
    title.className = 'stage-title';
    title.textContent = st.title;

    const count = document.createElement('span');
    count.className = 'stage-count';
    count.textContent = `${done}/${rows.length}`;

    const note = document.createElement('span');
    note.className = 'stage-note';
    note.textContent = st.note;

    li.append(n, title, count, note);
    li.addEventListener('click', () => {
      state.activeStage = state.activeStage === st.id ? null : st.id;
      renderRoadmap();
      renderList();
    });
    ol.append(li);
  }
}

function renderProgress() {
  const done = TROPHIES.filter((t) => state.earned.has(t.id)).length;
  $('#earnedCount').textContent = String(done);
  $('#totalCount').textContent = String(TROPHIES.length);
  const pct = Math.round((done / TROPHIES.length) * 100);
  $('#earnedPct').textContent = `${pct}%`;
  $('#progressFill').style.width = `${pct}%`;
}

function renderAll() {
  renderList();
  renderRoadmap();
  renderProgress();
  document.body.classList.toggle('spoiler', state.spoiler);
  $('#spoilerMode').checked = state.spoiler;
}

function toggleEarned(id) {
  if (state.earned.has(id)) state.earned.delete(id);
  else state.earned.add(id);
  saveProgress();
  renderAll();
}

/* ── detail sheet ────────────────────────────────────────────────────── */

function openDetail(id) {
  const t = TROPHIES.find((x) => x.id === id);
  if (!t) return;
  const body = $('#detailBody');
  body.textContent = '';

  const head = document.createElement('div');
  head.className = 'dhead';
  const grade = document.createElement('div');
  grade.className = `tgrade ${gradeClass(t.grade)}`;
  grade.textContent = t.grade === 'platinum' ? 'Pt' : t.grade[0].toUpperCase();
  const hwrap = document.createElement('div');
  const h = document.createElement('h2');
  const spoiler = isSpoiler(t);
  h.textContent = spoiler ? 'Hidden story trophy' : t.name;
  const gline = document.createElement('div');
  gline.className = 'dgrade-line';
  gline.textContent = `${t.grade} · ${t.kind}${t.missable ? ' · missable' : ''}${t.count ? ` · ${t.count}` : ''}`;
  hwrap.append(h, gline);
  head.append(grade, hwrap);

  const desc = document.createElement('blockquote');
  desc.className = 'ddesc';
  desc.textContent = spoiler ? 'Earn this trophy to reveal its official description.' : `“${t.description}”`;

  const guide = document.createElement('p');
  guide.className = 'dguide';
  guide.textContent = t.guide;

  body.append(head, desc, guide);

  if (Array.isArray(t.steps) && t.steps.length) {
    const sec = document.createElement('div');
    sec.className = 'dsection';
    const h3 = document.createElement('h3');
    h3.textContent = 'How to earn it';
    const ol = document.createElement('ol');
    ol.className = 'dsteps';
    for (const s of t.steps) {
      const li = document.createElement('li');
      li.textContent = s;
      ol.append(li);
    }
    sec.append(h3, ol);
    body.append(sec);
  }

  const srcSec = document.createElement('div');
  srcSec.className = 'dsection';
  const srcH = document.createElement('h3');
  srcH.textContent = 'Sources';
  const chips = document.createElement('div');
  chips.className = 'dsources';
  for (const s of t.sources ?? []) {
    const el = document.createElement('span');
    el.textContent = s;
    chips.append(el);
  }
  srcSec.append(srcH, chips);
  body.append(srcSec);

  const actions = document.createElement('div');
  actions.className = 'dactions';
  const markBtn = document.createElement('button');
  markBtn.type = 'button';
  markBtn.className = 'primary';
  const earned = state.earned.has(t.id);
  markBtn.textContent = earned ? 'Mark as not earned' : 'Mark as earned';
  markBtn.addEventListener('click', () => {
    toggleEarned(t.id);
    closeDetail();
    openDetail(t.id);
  });
  actions.append(markBtn);
  body.append(actions);

  $('#detailSheet').hidden = false;
}

function closeDetail() {
  $('#detailSheet').hidden = true;
}

/* ── wiring ──────────────────────────────────────────────────────────── */

function wire() {
  for (const chip of document.querySelectorAll('.kind-chip')) {
    chip.addEventListener('click', () => {
      for (const c of document.querySelectorAll('.kind-chip')) c.classList.toggle('on', c === chip);
      state.kind = chip.dataset.kind;
      renderList();
    });
  }
  $('#filters').addEventListener('click', (ev) => {
    const chip = ev.target.closest('.flag-chip');
    if (!chip) return;
    const flag = chip.dataset.flag;
    if (flag === 'missable') {
      state.missableOnly = !state.missableOnly;
      chip.classList.toggle('on', state.missableOnly);
    } else if (flag === 'earned') {
      state.hideEarned = !state.hideEarned;
      chip.classList.toggle('on', state.hideEarned);
    } else if (flag === 'unearned-only') {
      state.unearnedOnly = !state.unearnedOnly;
      chip.classList.toggle('on', state.unearnedOnly);
    }
    renderList();
  });
  $('#search').addEventListener('input', (ev) => {
    state.query = ev.target.value.trim();
    renderList();
  });
  $('#spoilerMode').addEventListener('change', (ev) => {
    state.spoiler = ev.target.checked;
    saveProgress();
    renderAll();
  });
  $('#exportBtn').addEventListener('click', exportProgress);
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (f) importProgress(f);
    ev.target.value = '';
  });
  $('#closeDetail').addEventListener('click', closeDetail);
  $('#detailSheet').addEventListener('click', (ev) => {
    if (ev.target === $('#detailSheet')) closeDetail();
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeDetail();
  });
}

loadProgress();
wire();
renderAll();
