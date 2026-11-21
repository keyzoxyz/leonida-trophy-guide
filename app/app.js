// Leonida Trophy Guide — all client-side, no network. Data comes from ./data/trophies.js,
// progress from localStorage, and every view is a re-render of one small state object.
import { GAME, PLATFORM, VERIFIED_AT, STAGES, TROPHIES } from './data/trophies.js';

const KEY = 'leonida-trophy-guide:v1';
const TOTAL = TROPHIES.length;
const byId = new Map(TROPHIES.map((t) => [t.id, t]));
const stageTitle = new Map(STAGES.map((s) => [s.id, s.title]));

const state = {
  earned: new Set(),
  grade: 'all',
  kind: 'all',
  show: 'all',
  q: '',
  spoilerSafe: true,
  openId: null,
  lastFocus: null,
};

const $ = (id) => document.getElementById(id);
const els = {
  list: $('trophies'),
  roadmap: $('roadmap-list'),
  earned: $('earned'),
  meter: $('meter'),
  meterFill: $('meter-fill'),
  scoreSub: $('score-sub'),
  gradeBar: $('grade-bar'),
  kindBar: $('kind-bar'),
  showBar: $('show-bar'),
  search: $('search'),
  result: $('result-count'),
  empty: $('empty'),
  sheet: $('sheet'),
  sheetBody: $('sheet-body'),
  panel: document.querySelector('#sheet .panel'),
  spoiler: $('spoiler'),
  spoilerState: $('spoiler-state'),
  missableCount: $('missable-count'),
  note: $('control-note'),
};

// ---------------------------------------------------------------- persistence
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) apply(JSON.parse(raw), false);
  } catch {
    // A corrupt or unavailable store just means starting from zero.
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot()));
  } catch {
    note('Could not save in this browser');
  }
}

function snapshot() {
  return {
    game: GAME, platform: PLATFORM, verifiedAt: VERIFIED_AT,
    earned: [...state.earned].sort((a, b) => a - b),
    spoilerSafe: state.spoilerSafe,
  };
}

function apply(data, announce = true) {
  if (!data || typeof data !== 'object') throw new Error('not an object');
  const next = new Set();
  for (const id of Array.isArray(data.earned) ? data.earned : []) {
    const n = Number(id);
    if (byId.has(n)) next.add(n);
  }
  state.earned = next;
  if (typeof data.spoilerSafe === 'boolean') state.spoilerSafe = data.spoilerSafe;
  save();
  render();
  if (announce) note(`Imported ${next.size} earned of ${TOTAL}`);
}

function note(text) {
  els.note.textContent = text;
  clearTimeout(note.timer);
  note.timer = setTimeout(() => {
    els.note.textContent = 'Saved in this browser only';
  }, 4000);
}

// ---------------------------------------------------------------- filtering
const isEarned = (t) => state.earned.has(t.id);
const isMasked = (t) => state.spoilerSafe && t.kind === 'story' && !isEarned(t);

function matches(t) {
  if (state.grade !== 'all' && t.grade !== state.grade) return false;
  if (state.kind !== 'all' && t.kind !== state.kind) return false;
  if (state.show === 'missable' && !t.missable) return false;
  if (state.show === 'earned' && !isEarned(t)) return false;
  if (state.show === 'unearned' && isEarned(t)) return false;
  if (state.q) {
    const hay = `${t.name}\n${t.guide}\n${t.sources.join('\n')}`.toLowerCase();
    if (!hay.includes(state.q)) return false;
  }
  return true;
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------------------------------------------------------------- render
function render() {
  const shown = TROPHIES.filter(matches);
  renderProgress();
  renderGrades();
  renderRoadmap();
  renderList(shown);
  renderSpoiler();
}

function renderProgress() {
  const n = state.earned.size;
  const pct = Math.round((n / TOTAL) * 100);
  els.earned.textContent = String(n);
  els.meterFill.style.width = `${pct}%`;
  els.meter.setAttribute('aria-valuenow', String(n));
  if (n === TOTAL) {
    els.scoreSub.textContent = 'Platinum earned — Leonida Legend';
    els.scoreSub.classList.add('is-done');
  } else {
    els.scoreSub.textContent = n ? `${TOTAL - n} to go · ${pct}% complete` : 'Platinum locked';
    els.scoreSub.classList.remove('is-done');
  }
}

function renderGrades() {
  for (const btn of els.gradeBar.querySelectorAll('[data-grade]')) {
    const g = btn.dataset.grade;
    const count = g === 'all' ? TOTAL : TROPHIES.filter((t) => t.grade === g).length;
    btn.querySelector('b').textContent = String(count);
    btn.classList.toggle('is-on', state.grade === g);
  }
  for (const btn of els.kindBar.querySelectorAll('[data-kind]')) btn.classList.toggle('is-on', state.kind === btn.dataset.kind);
  for (const btn of els.showBar.querySelectorAll('[data-show]')) btn.classList.toggle('is-on', state.show === btn.dataset.show);
  els.missableCount.textContent = `${TROPHIES.filter((t) => t.missable).length} missable trophies.`;
}

function renderRoadmap() {
  els.roadmap.innerHTML = STAGES.map((s) => {
    const all = TROPHIES.filter((t) => t.stage === s.id);
    const got = all.filter(isEarned).length;
    const done = all.length > 0 && got === all.length;
    return `<li class="stage${done ? ' is-done' : ''}">
      <span class="stage-n">${String(s.id).padStart(2, '0')}</span>
      <span>
        <span class="stage-title">${esc(s.title)}</span>
        <span class="stage-note">${esc(s.note)}</span>
        <span class="stage-count">${got}/${all.length} earned</span>
      </span>
    </li>`;
  }).join('');
}

function renderList(shown) {
  els.list.innerHTML = shown.map((t) => {
    const masked = isMasked(t);
    const earned = isEarned(t);
    const name = masked ? 'Hidden story trophy' : t.name;
    const desc = masked ? 'Earn it to reveal the name. Turn spoiler-safe off to read ahead.' : t.description;
    const flags = [
      `<span class="g-badge">${t.grade}</span>`,
      `<span class="kind-label">${t.kind}</span>`,
      t.missable ? '<span class="miss-flag">Missable</span>' : '',
      `<span class="idx">#${String(t.id).padStart(2, '0')}</span>`,
    ].join('');
    return `<article class="tcard g-${t.grade}${earned ? ' is-earned' : ''}${masked ? ' is-masked' : ''}" data-id="${t.id}">
      <button class="check" type="button" aria-pressed="${earned}" aria-label="${earned ? 'Unmark' : 'Mark'} ${esc(name)}" data-check="${t.id}">${earned ? '✓' : '○'}</button>
      <button class="card-main" type="button" data-open="${t.id}">
        <span class="card-top">${flags}</span>
        <span class="tname">${esc(name)}</span>
        <span class="tdesc">${esc(desc)}</span>
      </button>
    </article>`;
  }).join('');
  els.empty.hidden = shown.length > 0;
  els.result.textContent = `${shown.length} of ${TOTAL} shown`;
}

function renderSpoiler() {
  els.spoiler.classList.toggle('is-on', state.spoilerSafe);
  els.spoiler.classList.toggle('is-off', !state.spoilerSafe);
  els.spoiler.setAttribute('aria-pressed', String(state.spoilerSafe));
  els.spoilerState.textContent = state.spoilerSafe ? 'on' : 'off';
}

// ---------------------------------------------------------------- detail sheet
function openSheet(id) {
  const t = byId.get(id);
  if (!t) return;
  state.lastFocus = document.activeElement;
  state.openId = id;
  const masked = isMasked(t);
  const earned = isEarned(t);
  const flag = t.missable ? '<span class="miss-flag">Missable</span>' : '';
  const body = masked
    ? `<p class="body">Spoiler-safe is on, and this story trophy is still unearned. Its name, description and
       route are hidden so browsing the list cannot spoil the plot. Mark it earned when it pops, or turn
       spoiler-safe off in the toolbar to read the guide anyway.</p>`
    : `<h4>How to earn it</h4>
       <p class="body">${esc(t.guide)}</p>
       <p class="why">${esc(t.why)}</p>
       <h4>Steps</h4>
       <ol class="steps-list">${t.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
       <h4>Sources</h4>
       <ul class="sources-list">${t.sources.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`;
  els.sheetBody.innerHTML = `
    <div class="sheet-top g-${t.grade}">
      <span class="g-badge">${t.grade}</span>
      <span class="kind-label">${t.kind}</span>${flag}
      <span class="idx">#${String(t.id).padStart(2, '0')} / ${TOTAL}</span>
    </div>
    <h3 id="sheet-name">${esc(masked ? 'Hidden story trophy' : t.name)}</h3>
    <p class="sheet-desc">${esc(masked ? 'Spoiler-safe is on.' : t.description)}</p>
    <div class="sheet-meta">
      <div>Stage<b>${t.stage} · ${esc(stageTitle.get(t.stage) ?? 'Roadmap')}</b></div>
      <div>Grade<b>${t.grade}</b></div>
      <div>Missable<b>${t.missable ? 'Yes — do not delay' : 'No'}</b></div>
      <div>Status<b>${earned ? 'Earned' : 'Not yet'}</b></div>
    </div>
    ${body}
    <div class="sheet-actions">
      <button class="primary${earned ? ' is-on' : ''}" type="button" data-toggle-earned="${t.id}">
        ${earned ? 'Mark as unearned' : 'Mark as earned'}
      </button>
    </div>`;
  els.sheet.hidden = false;
  document.body.classList.add('sheet-open');
  els.panel.focus();
}

function closeSheet() {
  if (els.sheet.hidden) return;
  state.openId = null;
  els.sheet.hidden = true;
  document.body.classList.remove('sheet-open');
  const back = state.lastFocus;
  state.lastFocus = null;
  if (back && typeof back.focus === 'function') back.focus();
}

// ---------------------------------------------------------------- actions
function toggleEarned(id) {
  if (state.earned.has(id)) state.earned.delete(id);
  else state.earned.add(id);
  save();
  render();
  if (state.openId === id) openSheet(id);
}

function exportProgress() {
  const blob = new Blob([JSON.stringify({ ...snapshot(), exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leonida-trophy-progress.json';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  note(`Exported ${state.earned.size} earned`);
}

function resetFilters() {
  state.grade = 'all';
  state.kind = 'all';
  state.show = 'all';
  state.q = '';
  els.search.value = '';
  render();
}

// ---------------------------------------------------------------- events
els.list.addEventListener('click', (event) => {
  const check = event.target.closest('[data-check]');
  if (check) return toggleEarned(Number(check.dataset.check));
  const open = event.target.closest('[data-open]');
  if (open) openSheet(Number(open.dataset.open));
});

els.sheetBody.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-toggle-earned]');
  if (btn) toggleEarned(Number(btn.dataset.toggleEarned));
});

els.sheet.addEventListener('click', (event) => {
  if (event.target.closest('[data-close]')) closeSheet();
});

for (const [bar, key, attr] of [
  [els.gradeBar, 'grade', 'data-grade'],
  [els.kindBar, 'kind', 'data-kind'],
  [els.showBar, 'show', 'data-show'],
]) {
  bar.addEventListener('click', (event) => {
    const btn = event.target.closest(`[${attr}]`);
    if (!btn) return;
    state[key] = btn.dataset[key];
    render();
  });
}

els.spoiler.addEventListener('click', () => {
  state.spoilerSafe = !state.spoilerSafe;
  save();
  render();
});

$('export').addEventListener('click', exportProgress);

$('import').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    apply(JSON.parse(await file.text()));
  } catch {
    note('That file was not valid progress JSON');
  }
  event.target.value = '';
});

$('reset').addEventListener('click', resetFilters);

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  // Search first: Escape empties a live query, and only then closes the sheet.
  if (state.q) {
    state.q = '';
    els.search.value = '';
    render();
    els.search.focus();
    return;
  }
  if (!els.sheet.hidden) closeSheet();
});

load();
render();