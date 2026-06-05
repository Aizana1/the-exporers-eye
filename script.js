// The Explorer's Eye — game logic

const state = {
  score: 0,
  completedRegions: new Set(),
  completedObjects: new Set(), // `${regionId}/${objectId}`
  current: { regionIdx: null, objectIdx: null, questionIdx: 0, attempts: 0 }
};

const $ = (id) => document.getElementById(id);
const SVGNS = "http://www.w3.org/2000/svg";

function svgEl(name, attrs) {
  const el = document.createElementNS(SVGNS, name);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

// Load the object's photo into el; leaves el empty if image is missing.
function setMedia(el, obj) {
  el.classList.remove("has-photo");
  el.textContent = "";
  if (!obj.image) return;
  const img = new Image();
  img.alt = obj.title;
  img.onload = () => {
    el.textContent = "";
    el.appendChild(img);
    el.classList.add("has-photo");
  };
  img.src = obj.image;
}

/* ---------- Photo modal ---------- */
function openPhotoModal(src, title) {
  $("photoModalImg").src = src;
  $("photoModalImg").alt = title;
  $("photoModalTitle").textContent = title;
  $("photoModal").hidden = false;
}

function closePhotoModal() {
  $("photoModal").hidden = true;
  $("photoModalImg").src = "";
}

$("photoModalClose").addEventListener("click", closePhotoModal);
$("photoModalOverlay").addEventListener("click", closePhotoModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePhotoModal();
});

function attachPhotoClick(el, obj) {
  el.addEventListener("click", (e) => {
    if (!el.classList.contains("has-photo")) return;
    e.stopPropagation();
    openPhotoModal(obj.image, obj.title);
  });
}

const screens = {
  welcome: $("screen-welcome"),
  map: $("screen-map"),
  region: $("screen-region"),
  quiz: $("screen-quiz"),
  regionDone: $("screen-region-done"),
  final: $("screen-final"),
  diagrams: $("screen-diagrams"),
  twine: $("screen-twine")
};

// Remember which screen to return to when leaving the diagrams view.
let diagramsReturn = "welcome";
// Remember which screen to return to when leaving the Twine view.
let twineReturn = "welcome";

function show(name) {
  Object.values(screens).forEach((s) => { s.hidden = true; s.classList.remove("active"); });
  screens[name].hidden = false;
  screens[name].classList.add("active");
  $("topbar").hidden = name === "welcome";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function refreshStatus() {
  $("scoreVal").textContent = state.score;
  $("regionsVal").textContent = state.completedRegions.size;
}

/* ---------- World map ---------- */
function renderMap() {
  const hotspots = $("hotspots");
  const legend = $("mapLegend");
  hotspots.innerHTML = "";
  legend.innerHTML = "";

  REGIONS.forEach((region, idx) => {
    const done = state.completedRegions.has(region.id);
    const { x, y } = region.map;
    const activate = () => openRegion(idx);

    const g = svgEl("g", {
      class: "hotspot" + (done ? " completed" : ""),
      transform: `translate(${x} ${y})`,
      tabindex: "0",
      role: "button",
      "aria-label": region.name + (done ? " — completed" : "")
    });
    g.style.setProperty("--accent", region.accent);

    g.appendChild(svgEl("rect", { class: "hs-hit", x: -54, y: -34, width: 108, height: 90, rx: 12, fill: "transparent" }));
    g.appendChild(svgEl("circle", { class: "hs-pulse", r: 30 }));
    g.appendChild(svgEl("circle", { class: "hs-dot", r: 21 }));

    if (done) {
      const icon = svgEl("text", { class: "hs-icon", x: 0, y: 1, "text-anchor": "middle", "dominant-baseline": "central" });
      icon.textContent = "✓";
      g.appendChild(icon);
    }

    const label = svgEl("text", { class: "hs-label", x: 0, y: 42, "text-anchor": "middle" });
    label.textContent = region.name;
    g.appendChild(label);

    g.addEventListener("click", activate);
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
    hotspots.appendChild(g);

    const li = document.createElement("li");
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "legend-chip" + (done ? " completed" : "");
    chip.style.setProperty("--accent", region.accent);
    chip.innerHTML =
      `<span class="lc-dot" aria-hidden="true"></span>` +
      `<span class="lc-name">${region.name}</span>` +
      (done ? `<span class="lc-check" aria-hidden="true">&#10003;</span>` : "");
    chip.addEventListener("click", activate);
    li.appendChild(chip);
    legend.appendChild(li);
  });

  refreshStatus();
  show("map");
}

/* ---------- Region: object list ---------- */
function openRegion(regionIdx) {
  state.current.regionIdx = regionIdx;
  const region = REGIONS[regionIdx];
  $("regionHeading").textContent = region.name;
  $("regionBlurb").textContent = region.blurb;

  const grid = $("objectGrid");
  grid.innerHTML = "";
  region.objects.forEach((obj, idx) => {
    const key = `${region.id}/${obj.id}`;
    const done = state.completedObjects.has(key);
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "object-tile";
    tile.innerHTML = `
      <div class="object-thumb" data-thumb></div>
      <div>
        <p class="ot-title">${obj.title}</p>
        <p class="ot-sub">${done ? '<span class="ot-done">&#10003; Visited</span>' : obj.culture}</p>
      </div>`;
    const thumb = tile.querySelector("[data-thumb]");
    setMedia(thumb, obj);
    attachPhotoClick(thumb, obj);
    tile.addEventListener("click", (e) => {
      if (thumb.classList.contains("has-photo") && e.target === thumb) return;
      startObject(regionIdx, idx);
    });
    grid.appendChild(tile);
  });
  show("region");
}

/* ---------- Quiz ---------- */
function startObject(regionIdx, objectIdx) {
  state.current.regionIdx = regionIdx;
  state.current.objectIdx = objectIdx;
  state.current.questionIdx = 0;
  state.current.attempts = 0;
  renderQuestion();
  show("quiz");
}

function currentObject() {
  return REGIONS[state.current.regionIdx].objects[state.current.objectIdx];
}

function renderQuestion() {
  const region = REGIONS[state.current.regionIdx];
  const obj = currentObject();
  const q = obj.questions[state.current.questionIdx];
  state.current.attempts = 0;

  const plate = $("objPlate");
  setMedia(plate, obj);
  attachPhotoClick(plate, obj);
  plate.title = `${obj.title} — click to enlarge`;
  $("quizObjTitle").textContent = obj.title;
  $("quizObjCulture").textContent = obj.culture;
  $("quizCounter").textContent =
    `${region.name} · Question ${state.current.questionIdx + 1} of ${obj.questions.length}`;

  $("questionPrompt").textContent = q.prompt;

  const list = $("optionsList");
  list.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(i, btn));
    list.appendChild(btn);
  });

  hideBurton();
  $("quizActions").innerHTML = "";
}

function setBurton(text) {
  $("burtonText").innerHTML = text;
  $("burtonMsg").hidden = false;
}
function hideBurton() { $("burtonMsg").hidden = true; }

function optionButtons() {
  return Array.from($("optionsList").querySelectorAll(".option"));
}
function lockOptions() { optionButtons().forEach((b) => (b.disabled = true)); }

function handleAnswer(choiceIdx, btn) {
  const q = currentObject().questions[state.current.questionIdx];
  const correct = choiceIdx === q.answer;

  if (correct) {
    btn.classList.add("correct");
    lockOptions();
    const firstTry = state.current.attempts === 0;
    awardAndContinue(SCORES.correct, firstTry
      ? "Burton: \"Spot on, first try! A true explorer's eye.\""
      : "Burton: \"There it is — well reasoned after a nudge.\"");
    return;
  }

  btn.classList.add("wrong");
  btn.disabled = true;
  state.current.attempts += 1;

  if (state.current.attempts === 1) {
    setBurton(q.hint + " <em>Try once more.</em>");
  } else {
    lockOptions();
    revealAnswer();
    setBurton("Burton: \"Not to worry — being wrong is part of the journey. Here is the answer.\"");
    showStudyOrSkip();
  }
}

function revealAnswer() {
  const q = currentObject().questions[state.current.questionIdx];
  optionButtons().forEach((b, i) => {
    if (i === q.answer) b.classList.add("correct");
  });
}

function showStudyOrSkip() {
  const actions = $("quizActions");
  actions.innerHTML = "";

  const studyBtn = document.createElement("button");
  studyBtn.type = "button";
  studyBtn.className = "btn btn-secondary";
  studyBtn.textContent = "Study the information";
  studyBtn.addEventListener("click", () => {
    const q = currentObject().questions[state.current.questionIdx];
    setBurton(`<strong>The story:</strong> ${q.study}`);
    awardAndContinue(SCORES.study, null, true);
  });

  const skipBtn = document.createElement("button");
  skipBtn.type = "button";
  skipBtn.className = "btn btn-secondary";
  skipBtn.textContent = "Move on to the next question";
  skipBtn.addEventListener("click", () => awardAndContinue(SCORES.skip, null, true));

  actions.append(studyBtn, skipBtn);
}

function awardAndContinue(gained, msg, keepBurton) {
  state.score += gained;
  refreshStatus();
  if (msg && !keepBurton) setBurton(msg);

  const actions = $("quizActions");
  actions.innerHTML = "";
  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "btn btn-primary";
  nextBtn.textContent = isLastQuestion() ? "Finish object" : "Next question";
  nextBtn.addEventListener("click", advance);
  actions.appendChild(nextBtn);
}

function isLastQuestion() {
  return state.current.questionIdx >= currentObject().questions.length - 1;
}

function advance() {
  if (!isLastQuestion()) {
    state.current.questionIdx += 1;
    renderQuestion();
    return;
  }
  const region = REGIONS[state.current.regionIdx];
  const obj = currentObject();
  state.completedObjects.add(`${region.id}/${obj.id}`);

  const allDone = region.objects.every((o) =>
    state.completedObjects.has(`${region.id}/${o.id}`));

  if (allDone) {
    state.completedRegions.add(region.id);
    refreshStatus();
    if (state.completedRegions.size === REGIONS.length) {
      showFinal();
    } else {
      showRegionDone(region);
    }
  } else {
    openRegion(state.current.regionIdx);
  }
}

/* ---------- Completion screens ---------- */
function showRegionDone(region) {
  $("regionDoneText").textContent =
    `You have explored all of ${region.name}. ${REGIONS.length - state.completedRegions.size} region(s) remain. Onward, traveller!`;
  show("regionDone");
}

function showFinal() {
  $("finalText").innerHTML =
    "\"Magnificent! You have crossed the Americas, China, Egypt and Africa, and met objects you might once have scrolled past. You now know a little of where they come from and why they matter.\" &mdash; Sir Richard Burton";
  $("finalScore").textContent = state.score;
  show("final");
}

/* ---------- Design & Diagrams ---------- */
function openDiagrams() {
  // Find the currently visible screen so we can return to it.
  const current = Object.keys(screens).find((k) => !screens[k].hidden);
  if (current && current !== "diagrams") diagramsReturn = current;
  show("diagrams");
}

function closeDiagrams() {
  if (diagramsReturn === "welcome") show("welcome");
  else if (diagramsReturn === "region") openRegion(state.current.regionIdx);
  else show(diagramsReturn);
}

/* ---------- Twine version ---------- */
function openTwine() {
  // Find the currently visible screen so we can return to it.
  const current = Object.keys(screens).find((k) => !screens[k].hidden);
  if (current && current !== "twine") twineReturn = current;
  show("twine");
}

function closeTwine() {
  if (twineReturn === "welcome") show("welcome");
  else if (twineReturn === "region") openRegion(state.current.regionIdx);
  else show(twineReturn);
}

/* ---------- Reset ---------- */
function resetGame() {
  state.score = 0;
  state.completedRegions = new Set();
  state.completedObjects = new Set();
  state.current = { regionIdx: null, objectIdx: null, questionIdx: 0, attempts: 0 };
  refreshStatus();
  renderMap();
}

/* ---------- Wiring ---------- */
$("startBtn").addEventListener("click", renderMap);
$("homeBtn").addEventListener("click", renderMap);
$("regionBack").addEventListener("click", renderMap);
$("quizBack").addEventListener("click", () => openRegion(state.current.regionIdx));
$("regionDoneBtn").addEventListener("click", renderMap);
$("playAgainBtn").addEventListener("click", resetGame);
$("diagramsBtn").addEventListener("click", openDiagrams);
$("welcomeDiagramsBtn").addEventListener("click", openDiagrams);
$("diagramsBack").addEventListener("click", closeDiagrams);
$("twineBtn").addEventListener("click", openTwine);
$("welcomeTwineBtn").addEventListener("click", openTwine);
$("twineBack").addEventListener("click", closeTwine);

refreshStatus();
