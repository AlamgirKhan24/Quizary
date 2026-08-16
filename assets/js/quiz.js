/* ==============================================
   QUIZARY — QUIZ PAGE (DYNAMIC)
   Reads ?subject= from the URL, loads that
   subject's 5 questions from data.js (window.
   QUIZARY_QUIZZES), and renders/updates the whole
   page: question text, options, progress bar,
   points, question navigator, and a real
   second-by-second countdown timer.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  const QUIZZES = window.QUIZARY_QUIZZES || {};
  const params = new URLSearchParams(window.location.search);
  const requestedSubject = params.get('subject');
  const subjectKey = (requestedSubject && QUIZZES[requestedSubject]) ? requestedSubject : 'geography';
  const quiz = QUIZZES[subjectKey];

  if (!quiz) return; // no data.js loaded / no quizzes defined — nothing to render

  const TOTAL = quiz.questions.length;
  const POINTS_PER_CORRECT = 25;
  const TIME_LIMIT_SECONDS = 60 * TOTAL; // 60s per question

  const state = {
    currentIndex: 0,
    selected: new Array(TOTAL).fill(null), // selected option index per question, or null
    secondsLeft: TIME_LIMIT_SECONDS,
    paused: false,
    finished: false
  };

  // ---- Element refs ----
  const titleEl = document.getElementById('quizTitle');
  const progressTextEl = document.getElementById('quizProgressText');
  const progressFillEl = document.getElementById('quizProgressFill');
  const progressPctEl = document.getElementById('quizProgressPct');
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const pointsEl = document.getElementById('quizPoints');
  const factEl = document.getElementById('quizFactText');
  const prevBtn = document.getElementById('quizPrevBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  const timerEl = document.getElementById('quizTimer');
  const timerRing = document.querySelector('.quiz-timer-ring circle:last-child');
  const pauseBtn = document.getElementById('quizPauseBtn');
  const sideFractionEl = document.getElementById('quizProgressFraction');
  const sideProgressFillEl = document.querySelector('.quiz-progress-track--sm .quiz-progress-fill');
  const navGrid = document.getElementById('quizNavGrid');

  const LETTERS = ['A', 'B', 'C', 'D'];
  const RING_CIRCUMFERENCE = 157; // matches r=25 circle already in the markup

  // ---- Build question navigator circles (once) ----
  function buildNav() {
    if (!navGrid) return;
    navGrid.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) {
      const cell = document.createElement('div');
      cell.className = 'qnav-cell';

      const circle = document.createElement('span');
      circle.className = 'qnav-circle';
      circle.textContent = String(i + 1);
      circle.dataset.index = i;
      circle.style.cursor = 'pointer';
      circle.addEventListener('click', () => goToQuestion(i));

      cell.appendChild(circle);
      navGrid.appendChild(cell);
    }
  }

  function updateNav() {
    const circles = navGrid.querySelectorAll('.qnav-circle');
    circles.forEach((circle, i) => {
      circle.classList.remove('qnav-circle--answered', 'qnav-circle--current');
      const cell = circle.parentElement;
      const existingCheck = cell.querySelector('.qnav-check');
      if (existingCheck) existingCheck.remove();

      if (i === state.currentIndex) {
        circle.classList.add('qnav-circle--current');
        if (state.selected[i] !== null) addCheck(cell, true);
      } else if (state.selected[i] !== null) {
        circle.classList.add('qnav-circle--answered');
        addCheck(cell, false);
      }
    });
  }

  function addCheck(cell, gold) {
    const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    check.setAttribute('class', gold ? 'qnav-check qnav-check--gold' : 'qnav-check');
    check.setAttribute('viewBox', '0 0 24 24');
    check.setAttribute('fill', 'none');
    check.setAttribute('stroke', 'currentColor');
    check.setAttribute('stroke-width', '3');
    check.setAttribute('stroke-linecap', 'round');
    check.setAttribute('stroke-linejoin', 'round');
    check.innerHTML = '<path d="m5 13 4 4 10-10"/>';
    cell.appendChild(check);
  }

  // ---- Render current question ----
  function render() {
    const q = quiz.questions[state.currentIndex];

    if (titleEl) titleEl.textContent = quiz.title;
    if (progressTextEl) progressTextEl.textContent = `Question ${state.currentIndex + 1} of ${TOTAL}`;
    if (questionEl) questionEl.textContent = q.text;
    if (factEl) factEl.textContent = q.fact || '';

    const pct = Math.round(((state.currentIndex + 1) / TOTAL) * 100);
    if (progressFillEl) progressFillEl.style.width = pct + '%';
    if (progressPctEl) progressPctEl.textContent = pct + '% Complete';
    if (sideFractionEl) sideFractionEl.textContent = `${state.currentIndex + 1}/${TOTAL}`;
    if (sideProgressFillEl) sideProgressFillEl.style.width = pct + '%';

    // Options
    if (optionsEl) {
      optionsEl.innerHTML = '';
      q.options.forEach((optionText, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.dataset.index = i;

        const letter = document.createElement('span');
        letter.className = 'quiz-option-letter';
        letter.textContent = LETTERS[i];

        const text = document.createElement('span');
        text.className = 'quiz-option-text';
        text.textContent = optionText;

        btn.appendChild(letter);
        btn.appendChild(text);

        if (state.selected[state.currentIndex] === i) {
          btn.classList.add('quiz-option--selected');
          const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          check.setAttribute('class', 'quiz-option-check');
          check.setAttribute('viewBox', '0 0 24 24');
          check.setAttribute('fill', 'none');
          check.setAttribute('stroke', 'currentColor');
          check.setAttribute('stroke-width', '2.5');
          check.setAttribute('stroke-linecap', 'round');
          check.setAttribute('stroke-linejoin', 'round');
          check.innerHTML = '<path d="m5 13 4 4 10-10"/>';
          btn.appendChild(check);
        }

        if (state.finished) btn.disabled = true;

        btn.addEventListener('click', () => selectOption(i));
        optionsEl.appendChild(btn);
      });
    }

    // Prev/Next button states
    if (prevBtn) prevBtn.disabled = state.currentIndex === 0;
    if (nextBtn) {
      const isLast = state.currentIndex === TOTAL - 1;
      nextBtn.innerHTML = isLast
        ? 'Finish Quiz <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>'
        : 'Next Question <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
    }

    updateNav();
    updatePoints();
  }

  function updatePoints() {
    let points = 0;
    state.selected.forEach((sel, i) => {
      if (sel !== null && sel === quiz.questions[i].correct) points += POINTS_PER_CORRECT;
    });
    if (pointsEl) pointsEl.textContent = points;
  }

  function selectOption(i) {
    if (state.finished) return;
    state.selected[state.currentIndex] = i;
    render();
  }

  function goToQuestion(i) {
    if (state.finished) return;
    state.currentIndex = Math.max(0, Math.min(TOTAL - 1, i));
    render();
  }

  function finishQuiz() {
    state.finished = true;
    clearInterval(timerInterval);
    let correctCount = 0;
    state.selected.forEach((sel, i) => {
      if (sel !== null && sel === quiz.questions[i].correct) correctCount++;
    });
    const points = correctCount * POINTS_PER_CORRECT;
    const query = new URLSearchParams({
      subject: subjectKey,
      score: points,
      correct: correctCount,
      total: TOTAL
    }).toString();
    window.location.href = `results.html?${query}`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToQuestion(state.currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (state.currentIndex === TOTAL - 1) {
      finishQuiz();
    } else {
      goToQuestion(state.currentIndex + 1);
    }
  });

  // ---- Real countdown timer ----
  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    if (timerEl) timerEl.textContent = formatTime(Math.max(0, state.secondsLeft));
    if (timerRing) {
      const fraction = Math.max(0, state.secondsLeft) / TIME_LIMIT_SECONDS;
      const offset = RING_CIRCUMFERENCE * (1 - fraction);
      timerRing.setAttribute('stroke-dashoffset', offset.toFixed(1));
    }
  }

  let timerInterval = setInterval(() => {
    if (state.paused || state.finished) return;
    state.secondsLeft--;
    updateTimerDisplay();
    if (state.secondsLeft <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      state.paused = !state.paused;
      pauseBtn.innerHTML = state.paused
        ? '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M7 5v14l12-7z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
    });
  }

  // ---- Init ----
  buildNav();
  updateTimerDisplay();
  render();

});