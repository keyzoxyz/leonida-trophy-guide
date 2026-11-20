// Leonida Trophy Guide — the whole application, a plain ES module with no framework and no
// build step. It imports the generated data module, renders the roadmap and the trophy cards
// once, and then keeps ticking, filtering, searching, the spoiler switch, the detail sheet and
// export/import working against that render with targeted DOM updates.
//
// Earned state lives in localStorage under EARN_KEY as an array of trophy ids, so progress
// survives a reload without the page ever making a network request.

import { GAME, PLATFORM, VERIFIED_AT, STAGES, TROPHIES } from './data/trophies.js';

const EARN_KEY = 'leonida-trophies-earned-v1';
const SPOILER_KEY = 'leonida-trophies-spoiler-v1';
const GRADES = ['platinum', 'gold', 'silver', 'bronze'];

const byId = new Map(TROPHIES.map((t) => [t.id, t]));
const stageById = new Map(STAGES.map((s) => [s.id, s]));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
  earned: loadEarned(),
  spoiler: localStorage.getItem(SPOILER_KEY) === '1',
  kind: 'all',
  grade: null,
  flags: { missable: false, unearned: false, earned: false },
  query: '',
  openId: null,
};

function loadEarned() {
  try {
    const raw = JSON.parse(localStorage.getItem(EARN_KEY) ?? '[]');
    return new Set(Array.isArray(raw) ? raw.filter((n) => byId.has(n)) : []);
  } catch {
    return new Set();
  }
}

const saveEarned = () => localStorage.setItem(EARN_KEY, JSON.stringify([...state.earned].sort((a, b) => a - b)));

function renderHeader() {
  const total = TROPHIES.length;
  const done = state.earned.size;
  const pct = Math.round((done / total) * 100);
  $('#earnedCount').textContent = done;
  $('#totalCount').textContent = total;
  $('#barFill').style.width = pct + '%';
  $('#progressBar').setAttribute('aria-valuenow', String(done));
  const idle = 'Nothing banked yet. Tick a trophy when the notification lands.';
  const legend = 'Leonida Legend. The platinum is in the post.';
  $('#scoreNote').textContent = done === 0 ? idle : pct === 100 ? legend : `${pct}% of the set · ${total - done} to go.`;
}

function renderGrades() {
  const host = $('#gradeChips');
  host.replaceChildren(el('p', { class: 'grades-label', text: 'Grades' }));
  for (const grade of GRADES) {
    const all = TROPHIES.filter((t) => t.grade === grade);
    const done = all.filter((t) => state.earned.has(t.id)).length;
    const chip = el('button', {
      class: `grade-chip${state.grade === grade ? ' is-on' : ''}`,
      type: 'button',
      'aria-pressed': state.grade === grade ? 'true' : 'false',
      'aria-label': `${grade}: ${done} of ${all.length} earned`,
      dataset: { grade },
    }, el('span', { class: 'grade-dot', 'aria-hidden': 'true' }), `${grade} `,
      el('span', { class: 'grade-count', text: `${done}/${all.length}` }));
    chip.addEventListener('click', () => {
      state.grade = state.grade === grade ? null : grade;
      renderGrades();
      renderList();
    });
    host.append(chip);
  }
}

function renderRoadmap() {
  $('#stageList').replaceChildren(...STAGES.map((stage) => {
    const inStage = TROPHIES.filter((t) => t.stage === stage.id);
    const done = inStage.filter((t) => state.earned.has(t.id)).length;
    const tally = inStage.length ? `${done}/${inStage.length} in this stage` : '';
    return el('li', {}, el('h3', { text: stage.title }), el('p', { text: stage.note }),
      tally ? el('p', { class: 'stage-tally', text: tally }) : null);
  }));
  const left = TROPHIES.filter((t) => t.missable && !state.earned.has(t.id)).length;
  $('#missableCount').textContent = left;
}

function matches(t) {
  if (state.kind !== 'all' && t.kind !== state.kind) return false;
  if (state.grade && t.grade !== state.grade) return false;
  if (state.flags.missable && !t.missable) return false;
  if (state.flags.unearned && state.earned.has(t.id)) return false;
  if (state.flags.earned && !state.earned.has(t.id)) return false;
  if (!state.query) return true;
  const hay = [t.name, t.description, t.guide, t.kind, ...t.steps, ...t.sources].join(' ').toLowerCase();
  return hay.includes(state.query.toLowerCase());
}

function renderList() {
  const visible = TROPHIES.filter(matches);
  $('#cardList').replaceChildren(...visible.map(cardFor));
  $('#emptyState').hidden = visible.length > 0;
  const bits = [`${visible.length} of ${TROPHIES.length} shown`];
  bits.push(`${visible.filter((t) => state.earned.has(t.id)).length} earned here`);
  if (state.flags.missable) bits.push('missable only');
  if (state.grade) bits.push(`${state.grade} only`);
  if (state.kind !== 'all') bits.push(state.kind);
  if (state.query) bits.push(`matching “${state.query}”`);
  $('#listMeta').textContent = bits.join(' · ');
  renderGrades();
  renderRoadmap();
}

const spoilerHides = (t) => state.spoiler && t.kind === 'story' && !state.earned.has(t.id);
const maskedName = (t) => (spoilerHides(t) ? 'Spoilers — earn it first' : t.name);
const maskedDescription = (t) => (spoilerHides(t)
  ? 'Hidden until earned. Spoiler-safe mode withholds story trophies you have not banked yet.'
  : t.description);

function renderSpoiler() {
  document.body.classList.toggle('spoiler', state.spoiler);
  const btn = $('#spoilerBtn');
  btn.classList.toggle('is-on', state.spoiler);
  btn.setAttribute('aria-pressed', state.spoiler ? 'true' : 'false');
  btn.replaceChildren(el('span', { class: 'ctrl-dot', 'aria-hidden': 'true' }),
    state.spoiler ? 'Spoiler-safe: on' : 'Spoiler-safe: off');
}

function cardFor(t) {
  const li = el('li', { class: 'tcard', dataset: { id: String(t.id), grade: t.grade } });
  const name = el('button', { class: 'tname', type: 'button', text: maskedName(t) });
  const toggle = el('button', { class: 'tcheck', type: 'button' });
  const desc = el('p', { class: 'tdesc' });
  const meta = el('div', { class: 'tmeta' });
  const open = el('button', { class: 'topen', type: 'button', text: 'Guide +' });

  meta.append(
    el('span', { class: 'pill pill-grade', text: t.grade }),
    el('span', { class: 'pill', text: t.kind }),
    el('span', { class: 'pill pill-stage', text: stageById.get(t.stage)?.title ?? 'stage ?' }),
  );
  if (t.missable) meta.append(el('span', { class: 'pill pill-miss', text: 'missable' }));
  if (t.hidden) meta.append(el('span', { class: 'pill pill-hidden', text: 'hidden' }));
  meta.append(open);
  li.append(el('div', { class: 'thead' }, name, toggle), desc, meta);

  const sync = () => {
    const earned = state.earned.has(t.id);
    li.classList.toggle('is-earned', earned);
    toggle.textContent = earned ? 'Earned ✓' : 'Mark earned';
    toggle.setAttribute('aria-pressed', earned ? 'true' : 'false');
    name.textContent = maskedName(t);
    desc.textContent = maskedDescription(t);
    desc.classList.toggle('is-masked', spoilerHides(t));
  };
  sync();

  const flip = () => {
    if (state.earned.has(t.id)) state.earned.delete(t.id);
    else state.earned.add(t.id);
    saveEarned();
    sync();
    renderHeader();
    renderRoadmap();
    renderList();
    if (state.openId === t.id) fillSheet(t);
  };
  toggle.addEventListener('click', flip);
  open.addEventListener('click', () => openSheet(t.id));
  name.addEventListener('click', () => openSheet(t.id));
  return li;
}

const sheet = () => $('#detailSheet');

function fillSheet(t) {
  const stage = stageById.get(t.stage);
  $('#sheetGrade').textContent = `${t.grade} · ${stage ? stage.title : 'unfiled'}`;
  $('#sheetName').textContent = maskedName(t);
  $('#sheetDesc').textContent = maskedDescription(t);
  const flags = $('#sheetFlags');
  flags.replaceChildren(el('span', { class: 'pill pill-grade', text: t.grade }),
    el('span', { class: 'pill', text: t.kind }));
  if (t.missable) flags.append(el('span', { class: 'pill pill-miss', text: 'missable' }));
  if (t.hidden) flags.append(el('span', { class: 'pill pill-hidden', text: 'hidden' }));
  $('#sheetGuide').textContent = spoilerHides(t)
    ? 'The guide is withheld in spoiler-safe mode until this trophy is earned, or the switch is turned off.'
    : t.guide;
  $('#sheetWhy').textContent = t.why;
  $('#sheetSteps').replaceChildren(...t.steps.map((s) => el('li', { text: s })));
  $('#sheetSources').replaceChildren(...t.sources.map((s) => el('span', { text: s })));
  const btn = $('#sheetToggle');
  btn.textContent = state.earned.has(t.id) ? 'Mark unearned' : 'Mark earned';
  btn.onclick = () => {
    if (state.earned.has(t.id)) state.earned.delete(t.id);
    else state.earned.add(t.id);
    saveEarned();
    fillSheet(t);
    renderHeader();
    renderList();
  };
}

function openSheet(id) {
  const t = byId.get(id);
  if (!t) return;
  state.openId = id;
  fillSheet(t);
  sheet().hidden = false;
  $('#sheetBackdrop').hidden = false;
}

function closeSheet() {
  state.openId = null;
  sheet().hidden = true;
  $('#sheetBackdrop').hidden = true;
}

function exportProgress() {
  const payload = {
    game: GAME, platform: PLATFORM, verifiedAt: VERIFIED_AT,
    exportedAt: new Date().toISOString(),
    earned: [...state.earned].sort((a, b) => a - b),
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
  const a = el('a', { href: url, download: 'leonida-trophy-progress.json' });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus(`Exported ${state.earned.size} earned trophies.`);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const ids = Array.isArray(parsed) ? parsed : parsed.earned;
      if (!Array.isArray(ids)) throw new Error('no earned array in that file');
      const clean = ids.filter((n) => byId.has(n));
      state.earned = new Set(clean);
      saveEarned();
      renderAll();
      setStatus(`Imported ${clean.length} earned trophies from ${file.name}.`);
    } catch (err) {
      setStatus(`Import failed: ${err.message}`, true);
    }
  };
  reader.readAsText(file);
}

let statusTimer;
function setStatus(text, isError = false) {
  const status = $('#ctrlStatus');
  status.textContent = text;
  status.style.color = isError ? 'var(--coral)' : '';
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { status.textContent = ''; }, 6000);
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else node.setAttribute(key, value);
  }
  for (const child of children.flat()) if (child != null) node.append(child);
  return node;
}

function renderAll() {
  renderHeader();
  renderSpoiler();
  renderGrades();
  renderRoadmap();
  renderList();
}

function wire() {
  $('#spoilerBtn').addEventListener('click', () => {
    state.spoiler = !state.spoiler;
    localStorage.setItem(SPOILER_KEY, state.spoiler ? '1' : '0');
    renderSpoiler();
    renderList();
    if (state.openId) fillSheet(byId.get(state.openId));
  });

  $('#exportBtn').addEventListener('click', exportProgress);
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (ev) => {
    const file = ev.target.files?.[0];
    if (file) importProgress(file);
    ev.target.value = '';
  });
  $('#printBtn').addEventListener('click', () => window.print());

  for (const chip of $$('.kind-chip')) {
    chip.addEventListener('click', () => {
      state.kind = chip.dataset.kind;
      for (const other of $$('.kind-chip')) {
        const on = other === chip;
        other.classList.toggle('is-on', on);
        other.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      renderList();
    });
  }

  for (const chip of $$('.flag-chip')) {
    chip.addEventListener('click', () => {
      const flag = chip.dataset.flag;
      if (flag === 'clear') state.flags = { missable: false, unearned: false, earned: false };
      else state.flags[flag] = !state.flags[flag];
      for (const other of $$('.flag-chip[data-flag]:not([data-flag="clear"])')) {
        const on = Boolean(state.flags[other.dataset.flag]);
        other.classList.toggle('is-on', on);
        other.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      renderList();
    });
  }

  $('#searchInput').addEventListener('input', (ev) => {
    state.query = ev.target.value.trim();
    renderList();
  });

  $('#sheetClose').addEventListener('click', closeSheet);
  $('#sheetBackdrop').addEventListener('click', closeSheet);

  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape') return;
    const search = $('#searchInput');
    // A non-empty search is the nearer thing to escape: clear it first, close the sheet second.
    if (search.value !== '') {
      search.value = '';
      state.query = '';
      search.focus();
      renderList();
    } else if (!sheet().hidden) {
      closeSheet();
    }
  });
}

renderAll();
wire();