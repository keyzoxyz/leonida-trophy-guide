// Leonida Ledger — offline trophy guide behaviour, driven by ./data/trophies.js.

import { GAME, PLATFORM, VERIFIED_AT, STAGES, TROPHIES } from "./data/trophies.js";

const STORE_KEY = "leonida-ledger.progress.v1";
const GRADES = ["platinum", "gold", "silver", "bronze"];
const KINDS = ["story", "side", "activity", "heist", "collectible", "economy", "meta"];
const GRADE_LABELS = { platinum: "Platinum", gold: "Gold", silver: "Silver", bronze: "Bronze" };
const KIND_LABELS = {
  story: "Story", side: "Side", activity: "Activity", heist: "Heist",
  collectible: "Collectible", economy: "Economy", meta: "Meta",
};

const $ = (id) => document.getElementById(id);
const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
));
const byId = new Map(TROPHIES.map((trophy) => [trophy.id, trophy]));
const stageTitle = new Map(STAGES.map((stage) => [stage.id, stage.title]));

function loadEarned() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    const ids = Array.isArray(parsed) ? parsed : parsed && parsed.earned;
    return new Set((Array.isArray(ids) ? ids : []).map(Number).filter((id) => byId.has(id)));
  } catch {
    return new Set();
  }
}

const state = {
  earned: loadEarned(),
  query: "",
  kind: "all",
  grade: "all",
  show: "all",
  spoilers: false,
};
let currentDetailId = null, statusTimer = 0;

function saveEarned() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ earned: [...state.earned] }));
  } catch {
    // Storage can be unavailable (private mode, file://); the session still works.
  }
}

const isMasked = (trophy) =>
  !state.spoilers && !state.earned.has(trophy.id) && trophy.kind === "story";

function setStatus(message) {
  const status = $("import-status");
  status.textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { status.textContent = ""; }, 6000);
}

function buildChips() {
  const fill = (root, attr, values, label) => {
    root.replaceChildren(...values.map((value) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip";
      button.dataset[attr] = value;
      button.textContent = label(value);
      return button;
    }));
  };
  const kinds = KINDS.filter((kind) => TROPHIES.some((trophy) => trophy.kind === kind));
  fill($("kind-chips"), "kind", ["all", ...kinds], (value) => value === "all"
    ? `All kinds (${TROPHIES.length})`
    : `${KIND_LABELS[value] || value} (${TROPHIES.filter((trophy) => trophy.kind === value).length})`);
  const grades = GRADES.filter((grade) => TROPHIES.some((trophy) => trophy.grade === grade));
  fill($("grade-chips"), "grade", ["all", ...grades], (value) => value === "all"
    ? "All grades"
    : `${GRADE_LABELS[value] || value} (${TROPHIES.filter((trophy) => trophy.grade === value).length})`);
}

function syncChips() {
  const sync = (root, attr, value) => {
    root.querySelectorAll(`[data-${attr}]`).forEach((button) => {
      const active = button.dataset[attr] === value;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };
  sync($("kind-chips"), "kind", state.kind);
  sync($("grade-chips"), "grade", state.grade);
  sync($("show-chips"), "show", state.show);
}

function renderRoadmap() {
  const rows = STAGES.map((stage) => {
    const items = TROPHIES.filter((trophy) => trophy.stage === stage.id);
    const done = items.filter((trophy) => state.earned.has(trophy.id)).length;
    const complete = items.length > 0 && done === items.length;
    return `<li class="roadmap-step${complete ? " is-done" : ""}">
      <span class="step-index">${String(stage.id + 1).padStart(2, "0")}</span>
      <div class="step-body">
        <h3 class="step-title">${esc(stage.title)}</h3>
        <p class="step-note">${esc(stage.note)}</p>
        <span class="step-count">${done} / ${items.length} earned</span>
      </div>
    </li>`;
  }).join("");
  $("roadmap-list").innerHTML = `<ol class="roadmap-steps">${rows}</ol>`;
}

function cardHtml(trophy) {
  const masked = isMasked(trophy);
  const earned = state.earned.has(trophy.id);
  const name = masked ? "Hidden story trophy" : trophy.name;
  const description = masked
    ? "Name and details hidden to keep the story spoiler-safe. Enable spoiler mode to reveal them."
    : trophy.description;
  const classes = ["trophy-card", "card", earned && "is-earned", masked && "is-masked",
    trophy.grade === "platinum" && "card--platinum"].filter(Boolean);
  return `<article class="${classes.join(" ")}" data-id="${trophy.id}" tabindex="0" role="button" aria-label="${esc(name)} — open details">
    <header class="trophy-head">
      <span class="grade" data-grade="${esc(trophy.grade)}">${esc(GRADE_LABELS[trophy.grade] || trophy.grade)}</span>
      <span class="trophy-kind">${esc(KIND_LABELS[trophy.kind] || trophy.kind)}</span>
      ${trophy.missable ? '<span class="trophy-flag">Missable</span>' : ""}
    </header>
    <h3 class="trophy-name">${esc(name)}</h3>
    <p class="trophy-desc">${esc(description)}</p>
    <footer class="trophy-meta">
      <span class="trophy-stage">${esc(stageTitle.get(trophy.stage) || "Roadmap")}</span>
      <button type="button" class="btn trophy-toggle" data-act="toggle" data-id="${trophy.id}" aria-pressed="${earned}">${earned ? "Earned" : "Mark earned"}</button>
    </footer>
  </article>`;
}

function renderList() {
  const query = state.query.trim().toLowerCase();
  const list = TROPHIES
    .filter((trophy) => {
      if (state.kind !== "all" && trophy.kind !== state.kind) return false;
      if (state.grade !== "all" && trophy.grade !== state.grade) return false;
      if (state.show === "earned" && !state.earned.has(trophy.id)) return false;
      if (state.show === "unearned" && state.earned.has(trophy.id)) return false;
      if (state.show === "missable" && !trophy.missable) return false;
      if (!query) return true;
      return [trophy.name, trophy.guide, ...trophy.sources].join(" ").toLowerCase().includes(query);
    })
    .sort((a, b) => a.stage - b.stage || a.id - b.id);

  $("result-count").textContent = `Showing ${list.length} of ${TROPHIES.length}`;
  $("trophy-list").innerHTML = list.length
    ? list.map(cardHtml).join("")
    : `<p class="empty-state">No trophies match those filters${query ? ` for “${esc(state.query.trim())}”` : ""}.</p>`;
  $("trophy-list").setAttribute("aria-busy", "false");
}

function render() {
  const total = TROPHIES.length;
  const done = TROPHIES.filter((trophy) => state.earned.has(trophy.id)).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  $("earned-count").textContent = `${done} / ${total}`;
  $("progress-fill").style.width = `${percent}%`; $("progress-bar").setAttribute("aria-valuenow", String(percent));
  renderRoadmap();
  renderList();
  syncChips();
}

function toggleEarned(id) {
  if (state.earned.has(id)) state.earned.delete(id);
  else state.earned.add(id);
  saveEarned();
  render();
  if (currentDetailId === id) paintDetail(byId.get(id));
}

function paintDetail(trophy) {
  if (!trophy) return;
  const masked = isMasked(trophy);
  const earned = state.earned.has(trophy.id);
  $("detail-eyebrow").textContent = masked
    ? "Story trophy"
    : `${GRADE_LABELS[trophy.grade] || trophy.grade} · ${KIND_LABELS[trophy.kind] || trophy.kind}`;
  $("detail-title").textContent = masked ? "Hidden story trophy" : trophy.name;
  $("detail-description").textContent = masked
    ? "This story trophy is still unearned, so its name, description and guide stay behind the spoiler mask."
    : trophy.description;
  $("detail-meta").innerHTML = [
    `<span class="meta-chip">${esc(GRADE_LABELS[trophy.grade] || trophy.grade)}</span>`,
    `<span class="meta-chip">${esc(KIND_LABELS[trophy.kind] || trophy.kind)}</span>`,
    `<span class="meta-chip">${esc(stageTitle.get(trophy.stage) || "Roadmap")}</span>`,
    trophy.missable ? '<span class="meta-chip is-warn">Missable</span>' : "",
    earned ? '<span class="meta-chip is-done">Earned</span>' : "",
  ].join("");
  $("detail-steps").innerHTML = masked
    ? `<div class="spoiler-note"><p>Reveal this entry only if you are comfortable reading story detail.</p>
        <button type="button" class="btn" data-act="reveal">Reveal spoilers</button></div>`
    : `<section class="detail-block"><h3>How to earn it</h3><p>${esc(trophy.guide)}</p></section>
      <section class="detail-block"><h3>Why it matters</h3><p>${esc(trophy.why)}</p></section>
      <section class="detail-block"><h3>Steps</h3><ol>${trophy.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol></section>
      <section class="detail-block"><h3>Sources</h3><ul>${trophy.sources.map((source) => `<li>${esc(source)}</li>`).join("")}</ul></section>`;
  const toggle = $("detail-earned-toggle");
  toggle.textContent = earned ? "Mark as unearned" : "Mark as earned";
  toggle.setAttribute("aria-pressed", String(earned));
}

function openDetail(id) {
  const trophy = byId.get(id);
  if (!trophy) return;
  currentDetailId = id;
  paintDetail(trophy);
  const sheet = $("detail-sheet");
  if (!sheet.open) {
    if (typeof sheet.showModal === "function") sheet.showModal();
    else sheet.setAttribute("open", "");
  }
}

function exportProgress() {
  const payload = {
    game: GAME, platform: PLATFORM,
    format: "leonida-ledger-progress",
    exportedAt: new Date().toISOString(),
    earned: [...state.earned].sort((a, b) => a - b),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "leonida-ledger-progress.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  setStatus(`Exported ${state.earned.size} earned trophies.`);
}

async function importProgress(file) {
  try {
    const data = JSON.parse(await file.text());
    const ids = Array.isArray(data) ? data : data && data.earned;
    if (!Array.isArray(ids)) throw new Error("that file has no earned list");
    const valid = [...new Set(ids.map(Number).filter((id) => byId.has(id)))];
    state.earned = new Set(valid);
    saveEarned();
    render();
    if (currentDetailId) paintDetail(byId.get(currentDetailId));
    setStatus(`Imported ${valid.length} earned trophies.`);
  } catch (error) {
    setStatus(`Import failed: ${error.message}.`);
  }
}

// Wiring

$("kind-chips").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-kind]");
  if (!button) return;
  state.kind = button.dataset.kind;
  render();
});

$("grade-chips").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-grade]");
  if (!button) return;
  state.grade = button.dataset.grade;
  render();
});

$("show-chips").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-show]");
  if (!button) return;
  state.show = button.dataset.show;
  render();
});

$("search-input").addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

$("spoiler-toggle").addEventListener("change", (event) => {
  state.spoilers = event.target.checked;
  render();
  if (currentDetailId) paintDetail(byId.get(currentDetailId));
});

$("missable-jump").addEventListener("click", () => {
  state.show = "missable";
  render();
});

$("trophy-list").addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-act='toggle']");
  if (toggle) {
    event.stopPropagation();
    toggleEarned(Number(toggle.dataset.id));
    return;
  }
  const card = event.target.closest(".trophy-card");
  if (card) openDetail(Number(card.dataset.id));
});

$("trophy-list").addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".trophy-card");
  if (!card || event.target !== card) return;
  event.preventDefault(); openDetail(Number(card.dataset.id));
});

$("detail-steps").addEventListener("click", (event) => {
  if (!event.target.closest("[data-act='reveal']")) return;
  state.spoilers = true;
  $("spoiler-toggle").checked = true;
  render();
  if (currentDetailId) paintDetail(byId.get(currentDetailId));
});

$("detail-earned-toggle").addEventListener("click", () => {
  if (currentDetailId) toggleEarned(currentDetailId);
});

$("export-btn").addEventListener("click", exportProgress);

$("import-input").addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  event.target.value = "";
  if (file) importProgress(file);
});

// Escape clears a non-empty search first; only an empty search reaches the sheet.
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const search = $("search-input");
  if (search.value.trim() !== "") {
    event.preventDefault();
    event.stopPropagation();
    search.value = "";
    state.query = "";
    render();
    search.focus();
  } else if ($("detail-sheet").open) {
    event.preventDefault();
    event.stopPropagation();
    $("detail-sheet").close();
  }
}, true);

const verified = new Date(`${VERIFIED_AT}T00:00:00`);
if (!Number.isNaN(verified.getTime())) {
  const time = $("verified-date");
  time.dateTime = VERIFIED_AT;
  time.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(verified);
}

buildChips();
render();