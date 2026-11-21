// Trophy guide UI: rendering, filtering, progress storage and spoiler masking.
import { GAME, PLATFORM, VERIFIED_AT, STAGES, TROPHIES } from './data/trophies.js';

const STORAGE_KEY = 'gta6-trophy-progress-v1';
const GRADE_LABELS = { platinum: 'Platinum', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' };
const KIND_LABELS = { story: 'Story', side: 'Side mission', collectible: 'Collectible', activity: 'Activity', challenge: 'Challenge', online: 'Online' };
const byId = new Map(TROPHIES.map((trophy) => [trophy.id, trophy]));
const ALL_IDS = new Set(byId.keys());
const stageById = new Map(STAGES.map((stage) => [stage.id, stage]));
const HAYSTACK = new Map(TROPHIES.map((trophy) => [trophy.id,
  [trophy.name, trophy.guide, ...(trophy.sources || [])].join(' ').toLowerCase()]));

const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
));

const els = {
  list: $('#trophy-list'), search: $('#search-input'), spoiler: $('#spoiler-toggle'), roadmapList: $('.roadmap-list'),
  earnedCount: $('#earned-count'), progressBar: $('#progress-bar'), progressFill: $('#progress-fill'), progressLabel: $('#progress-label'),
  exportBtn: $('#export-btn'), importInput: $('#import-input'), sheet: $('#detail-sheet'), verifiedAt: $('#verified-at'),
  detailGrade: $('#detail-grade'), detailTitle: $('#detail-title'), detailDescription: $('#detail-description'),
  detailKind: $('#detail-kind'), detailStatus: $('#detail-status'), detailHint: $('#detail-hint'),
};

let earned = loadEarned();
let query = '';
let activeKind = 'all';
let activeShow = 'all';
let currentId = null;
const activeGrades = new Set();

function loadEarned() {
  const result = new Set();
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    const list = Array.isArray(raw) ? raw : raw && Array.isArray(raw.earned) ? raw.earned : [];
    for (const item of list) {
      const id = typeof item === 'string' ? item : item && item.id;
      if (ALL_IDS.has(id)) result.add(id);
    }
  } catch {
    // Storage can be unavailable (private mode) or hold malformed data.
  }
  return result;
}

function saveEarned() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      game: GAME, platform: PLATFORM, verifiedAt: VERIFIED_AT, earned: [...earned],
    }));
  } catch {
    // Ignore quota or privacy-mode failures; in-memory progress still works.
  }
}

function isMasked(trophy) {
  return els.spoiler.checked && trophy.kind === 'story' && !earned.has(trophy.id);
}

function visibleTrophies() {
  const terms = query ? query.split(/\s+/) : [];
  return TROPHIES.filter((trophy) => {
    if (activeKind !== 'all' && trophy.kind !== activeKind) return false;
    if (activeGrades.size && !activeGrades.has(trophy.grade)) return false;
    if (activeShow === 'earned' && !earned.has(trophy.id)) return false;
    if (activeShow === 'unearned' && earned.has(trophy.id)) return false;
    if (activeShow === 'missable' && !trophy.missable) return false;
    if (terms.length) {
      const haystack = HAYSTACK.get(trophy.id) || '';
      if (!terms.every((term) => haystack.includes(term))) return false;
    }
    return true;
  });
}

function cardHTML(trophy) {
  const masked = isMasked(trophy);
  const isEarned = earned.has(trophy.id);
  const stage = stageById.get(trophy.stage);
  const title = masked ? 'Hidden story trophy' : trophy.name;
  const description = masked
    ? 'This story trophy is masked while spoiler protection is on. Turn the toggle off or mark it earned to reveal it.'
    : trophy.description;
  const classes = ['card'];
  if (trophy.grade === 'platinum') classes.push('card--platinum');
  if (!isEarned) classes.push('card--locked');

  return `<article class="${classes.join(' ')}" role="listitem" tabindex="0" data-id="${esc(trophy.id)}" aria-labelledby="title-${esc(trophy.id)}">
  <span class="card__icon" aria-hidden="true">${isEarned ? '✓' : ''}</span>
  <span class="card__grade">${GRADE_LABELS[trophy.grade] || trophy.grade}</span>
  <h3 class="card__title" id="title-${esc(trophy.id)}">${esc(title)}</h3>
  <p class="card__desc">${esc(description)}</p>
  <p class="card__meta"><span>${KIND_LABELS[trophy.kind] || trophy.kind}</span><span aria-hidden="true">·</span><span>${esc(stage ? stage.title : '')}</span>${trophy.missable ? '<span class="card__flag">Missable</span>' : ''}</p>
  <div class="card__progress" aria-hidden="true"><span style="width:${isEarned ? 100 : 0}%"></span></div>
  <button type="button" class="card__toggle" data-action="toggle" aria-pressed="${isEarned}" aria-label="${isEarned ? 'Mark as unearned' : 'Mark as earned'}: ${esc(title)}">${isEarned ? 'Earned' : 'Mark earned'}</button>
</article>`;
}

function render(focusId) {
  const visible = visibleTrophies();
  els.list.innerHTML = visible.length
    ? visible.map(cardHTML).join('')
    : '<p class="empty-state">No trophies match those filters.</p>';
  updateProgress();
  renderRoadmap();
  if (focusId) {
    requestAnimationFrame(() => {
      const button = els.list.querySelector(`.card[data-id="${focusId}"] [data-action="toggle"]`);
      if (button) button.focus();
    });
  }
}

function updateProgress() {
  const total = TROPHIES.length;
  const count = TROPHIES.reduce((sum, trophy) => sum + (earned.has(trophy.id) ? 1 : 0), 0);
  const percent = total ? Math.round((count / total) * 100) : 0;
  els.earnedCount.textContent = `${count} / ${total}`;
  els.progressFill.style.width = `${percent}%`;
  els.progressBar.setAttribute('aria-valuenow', String(percent));
  els.progressBar.setAttribute('aria-valuetext', `${count} of ${total} trophies earned`);
  els.progressLabel.textContent = `${percent}% complete`;
}

function renderRoadmap() {
  if (!els.roadmapList) return;
  const rows = STAGES.map((stage, index) => {
    const group = TROPHIES.filter((trophy) => trophy.stage === stage.id);
    return {
      stage, index, total: group.length,
      count: group.filter((trophy) => earned.has(trophy.id)).length,
      done: group.length > 0 && group.every((trophy) => earned.has(trophy.id)),
    };
  });
  const currentIndex = rows.findIndex((row) => row.total > 0 && !row.done);
  els.roadmapList.innerHTML = rows.map((row) => `<li class="roadmap-step${row.done ? ' is-done' : ''}${row.index === currentIndex ? ' is-current' : ''}">
  <span class="step-badge">${row.index + 1}</span>
  <div class="step-body">
    <h3 class="step-title">${esc(row.stage.title)}</h3>
    <p class="step-note">${esc(row.stage.note)}</p>
    <p class="step-count">${row.count} / ${row.total} earned${row.done ? ' · complete' : ''}</p>
  </div>
</li>`).join('');
}

function openDetail(trophy) {
  if (!trophy) return;
  currentId = trophy.id;
  const masked = isMasked(trophy);
  const isEarned = earned.has(trophy.id);
  const stage = stageById.get(trophy.stage);
  els.detailGrade.textContent = GRADE_LABELS[trophy.grade] || trophy.grade;
  els.detailTitle.textContent = masked ? 'Hidden story trophy' : trophy.name;
  els.detailDescription.textContent = masked
    ? 'This story trophy is masked while spoiler protection is on. Turn the toggle off or mark it earned to reveal it.'
    : trophy.description;
  els.detailKind.textContent = [KIND_LABELS[trophy.kind] || trophy.kind, stage && stage.title, trophy.missable && 'Missable']
    .filter(Boolean).join(' · ');
  els.detailStatus.textContent = isEarned ? 'Earned' : 'Not earned yet';
  if (masked) {
    els.detailHint.hidden = true;
    els.detailHint.replaceChildren();
  } else {
    const steps = (trophy.steps || []).map((step) => `<li>${esc(step)}</li>`).join('');
    const sources = (trophy.sources || []).map(esc).join('; ');
    els.detailHint.hidden = false;
    els.detailHint.innerHTML = `<p><strong>How to earn it:</strong> ${esc(trophy.guide)}</p>
${trophy.why ? `<p><strong>Why it matters:</strong> ${esc(trophy.why)}</p>` : ''}
${steps ? `<ol>${steps}</ol>` : ''}
${sources ? `<p><strong>Sources:</strong> ${sources}</p>` : ''}`;
  }
  if (!els.sheet.open) {
    try { els.sheet.showModal(); }
    catch { els.sheet.setAttribute('open', ''); }
  }
}

function closeSheet() {
  if (!els.sheet.open) {
    currentId = null;
    return;
  }
  try {
    els.sheet.close();
  } catch {
    els.sheet.removeAttribute('open');
  }
  currentId = null;
}

function clearSearch() {
  if (!els.search.value) return false;
  els.search.value = '';
  query = '';
  render();
  return true;
}

function toggleEarned(id) {
  if (!byId.has(id)) return;
  const wasEarned = earned.has(id);
  if (wasEarned) earned.delete(id);
  else earned.add(id);
  saveEarned();
  render(id);
  if (els.sheet.open && currentId === id) openDetail(byId.get(id));
  announce(`${wasEarned ? 'Removed trophy from' : 'Added trophy to'} your earned list.`);
}

let statusEl = null;
function announce(message) {
  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.id = 'app-status';
    statusEl.setAttribute('role', 'status');
    statusEl.setAttribute('aria-live', 'polite');
    statusEl.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0';
    document.body.append(statusEl);
  }
  statusEl.textContent = message;
}

function exportProgress() {
  const payload = {
    game: GAME, platform: PLATFORM, verifiedAt: VERIFIED_AT,
    exportedAt: new Date().toISOString(), earned: [...earned],
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `gta6-trophy-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  announce(`Exported ${earned.size} earned trophies.`);
}

async function importProgress(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const list = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.earned) ? parsed.earned : null;
    if (!list) throw new Error('Unrecognised progress file');
    const next = new Set();
    for (const item of list) {
      const id = typeof item === 'string' ? item : item && item.id;
      if (ALL_IDS.has(id)) next.add(id);
    }
    earned = next;
    saveEarned();
    render();
    announce(`Imported ${earned.size} earned trophies.`);
  } catch (error) {
    console.warn('Trophy import failed', error);
    announce('Import failed. Choose a JSON progress file exported from this guide.');
  }
}

els.list.addEventListener('click', (event) => {
  const toggle = event.target.closest('[data-action="toggle"]');
  if (toggle) {
    const card = toggle.closest('.card');
    if (card) toggleEarned(card.dataset.id);
    return;
  }
  const card = event.target.closest('.card');
  if (card) openDetail(byId.get(card.dataset.id));
});

els.list.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('card')) {
    event.preventDefault();
    openDetail(byId.get(event.target.dataset.id));
  }
});

els.search.addEventListener('input', () => {
  query = els.search.value.trim().toLowerCase();
  render();
});

const kindButtons = [...document.querySelectorAll('.chip-kind')];
kindButtons.forEach((button) => button.addEventListener('click', () => {
  activeKind = button.dataset.kind || 'all';
  kindButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  render();
}));

const gradeButtons = [...document.querySelectorAll('.chip-grade')];
gradeButtons.forEach((button) => button.addEventListener('click', () => {
  const grade = button.dataset.grade;
  if (!grade) return;
  if (activeGrades.has(grade)) activeGrades.delete(grade);
  else activeGrades.add(grade);
  button.setAttribute('aria-pressed', String(activeGrades.has(grade)));
  render();
}));

const showButtons = [...document.querySelectorAll('.chip-show')];
showButtons.forEach((button) => button.addEventListener('click', () => {
  activeShow = button.dataset.show || 'all';
  showButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  render();
}));

els.spoiler.addEventListener('change', () => {
  render();
  if (els.sheet.open && currentId) openDetail(byId.get(currentId));
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (els.search.value) {
    event.preventDefault();
    event.stopPropagation();
    clearSearch();
    return;
  }
  if (els.sheet.open) {
    event.preventDefault();
    closeSheet();
  }
}, true);

els.sheet.addEventListener('cancel', (event) => {
  if (els.search.value) {
    event.preventDefault();
    clearSearch();
  }
});
els.sheet.addEventListener('close', () => {
  currentId = null;
});

els.exportBtn.addEventListener('click', exportProgress);
els.importInput.addEventListener('change', async () => {
  const file = els.importInput.files && els.importInput.files[0];
  if (file) await importProgress(file);
  els.importInput.value = '';
});

window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY) return;
  earned = loadEarned();
  render();
  if (els.sheet.open && currentId) openDetail(byId.get(currentId));
});

if (els.verifiedAt) {
  els.verifiedAt.dateTime = VERIFIED_AT;
  els.verifiedAt.textContent = VERIFIED_AT;
}
document.title = `${GAME} Trophy Guide`;
els.list.setAttribute('aria-label', `${GAME} trophy list for ${PLATFORM}`);

render();