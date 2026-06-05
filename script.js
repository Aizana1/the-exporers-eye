// The Explorer's Eye — game logic

const state = {
  score: 0,
  completedRegions: new Set(),
  completedObjects: new Set(), // `${regionId}/${objectId}`
  current: { regionIdx: null, objectIdx: null, questionIdx: 0, attempts: 0 }
};

const $ = (id) => document.getElementById(id);

const screens = {
  welcome: $("screen-welcome"),
  map: $("screen-map"),
  region: $("screen-region"),
  quiz: $("screen-quiz"),
  regionDone: $("screen-region-done"),
  final: $("screen-final")
};

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
  const grid = $("regionGrid");
  grid.innerHTML = "";
  REGIONS.forEach((region, idx) => {
    const done = state.completedRegions.has(region.id);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "region-card" + (done ? " completed" : "");
    card.style.setProperty("--accent", region.accent);
    card.innerHTML = `
      <span class="rc-done">&#10003; Done</span>
      <div class="rc-icon">${region.icon}</div>
      <h3 class="rc-name">${region.name}</h3>
      <p class="rc-blurb">${region.blurb}</p>`;
    card.addEventListener("click", () => openRegion(idx));
    grid.appendChild(card);
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
      <div class="object-thumb">${obj.emoji}</div>
      <div>
        <p class="ot-title">${obj.title}</p>
        <p class="ot-sub">${done ? '<span class="ot-done">&#10003; Visited</span>' : obj.culture}</p>
      </div>`;
    tile.addEventListener("click", () => startObject(regionIdx, idx));
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

  // Object header
  const plate = $("objPlate");
  plate.innerHTML = obj.emoji;
  plate.title = `${obj.title} (${obj.museumId})`;
  $("quizObjTitle").textContent = obj.title;
  $("quizObjCulture").textContent = obj.culture;
  $("quizCounter").textContent =
    `${region.name} · Question ${state.current.questionIdx + 1} of ${obj.questions.length}`;

  // Prompt
  $("questionPrompt").textContent = q.prompt;

  // Options
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

  // Reset feedback + actions
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
    let gained;
    if (state.current.attempts === 0) gained = SCORES.firstTry;
    else gained = SCORES.afterHint;
    awardAndContinue(gained, gained === SCORES.firstTry
      ? "Burton: \"Spot on, first try! A true explorer's eye.\""
      : "Burton: \"There it is — well reasoned after a nudge.\"");
    return;
  }

  // Wrong answer
  btn.classList.add("wrong");
  btn.disabled = true;
  state.current.attempts += 1;

  if (state.current.attempts === 1) {
    // First wrong → hint and retry
    setBurton(q.hint + " <em>Try once more.</em>");
  } else {
    // Second wrong → reveal answer + study-or-skip
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
    awardAndContinue(SCORES.afterStudy, null, true);
  });

  const skipBtn = document.createElement("button");
  skipBtn.type = "button";
  skipBtn.className = "btn btn-secondary";
  skipBtn.textContent = "Move on to the next question";
  skipBtn.addEventListener("click", () => awardAndContinue(SCORES.skip, null, true));

  actions.append(studyBtn, skipBtn);
}

// gained: points to add. msg: optional Burton line. keepBurton: don't overwrite existing message.
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
  // Object finished
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
    openRegion(state.current.regionIdx); // back to object list to pick the other object
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

refreshStatus();
