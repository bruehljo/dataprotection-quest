(function () {
  'use strict';

  const content = window.DATA_QUEST_CONTENT || {};
  const ui = content.ui || {};
  const stations = content.stations || [];
  const boss = content.boss || { pages: [], quiz: [] };
  const introPages = content.introPages || [];
  const outroPages = content.outroPages || [];

  const el = {
    lives: document.getElementById('lives'),
    timer: document.getElementById('timer'),
    progress: document.getElementById('progress'),
    hint: document.getElementById('hint'),
    hudLivesLabel: document.getElementById('hud-lives-label'),
    hudTimeLabel: document.getElementById('hud-time-label'),
    hudProgressLabel: document.getElementById('hud-progress-label'),
    hudHintLabel: document.getElementById('hud-hint-label'),
    world: document.getElementById('world'),
    worldSign: document.getElementById('world-sign'),
    stations: Array.from(document.querySelectorAll('.station')),
    mouse: document.getElementById('mouse'),
    startScreen: document.getElementById('start-screen'),
    startTitle: document.getElementById('start-title'),
    startBadge: document.getElementById('start-badge'),
    startLead: document.getElementById('start-lead'),
    featureList: document.getElementById('feature-list'),
    startSideText: document.getElementById('start-side-text'),
    bestTimeInline: document.getElementById('best-time-inline'),
    startBtn: document.getElementById('start-btn'),
    skipIntroBtn: document.getElementById('skip-intro-btn'),
    bubbleLayer: document.getElementById('bubble-layer'),
    bubble: document.getElementById('bubble'),
    bubbleSpeaker: document.getElementById('bubble-speaker'),
    bubbleTitle: document.getElementById('bubble-title'),
    bubbleBody: document.getElementById('bubble-body'),
    bubbleChoices: document.getElementById('bubble-choices'),
    choiceStatus: document.getElementById('choice-status'),
    bubbleActions: document.getElementById('bubble-actions'),
    cutsceneScreen: document.getElementById('cutscene-screen'),
    cutsceneStage: document.getElementById('cutscene-stage'),
    cutNotice: document.getElementById('cut-notice'),
    bossScreen: document.getElementById('boss-screen'),
    bossBtn: document.getElementById('boss-btn'),
    bossCopy1: document.getElementById('boss-copy-1'),
    bossCopy2: document.getElementById('boss-copy-2'),
    resultScreen: document.getElementById('result-screen'),
    resultHeading: document.getElementById('result-heading'),
    resultText: document.getElementById('result-text'),
    bestTime: document.getElementById('best-time'),
    finalTime: document.getElementById('final-time'),
    finalLives: document.getElementById('final-lives'),
    finalScore: document.getElementById('final-score'),
    statBestLabel: document.getElementById('stat-best-label'),
    statTimeLabel: document.getElementById('stat-time-label'),
    statLivesLabel: document.getElementById('stat-lives-label'),
    statScoreLabel: document.getElementById('stat-score-label'),
    retryBtn: document.getElementById('retry-btn')
  };

  const storageKey = 'dq_best_time_v16';
  const state = {
    seconds: 0,
    timerId: null,
    lives: 3,
    score: 0,
    completed: new Set(),
    started: false,
    mouseX: 8,
    mouseY: 78,
    bestTime: window.localStorage.getItem(storageKey) || '',
    bossDone: false,
    inBoss: false
  };

  function applyUiTexts() {
    document.title = ui.title || document.title;
    el.hudLivesLabel.textContent = ui.hudLives || 'Leben';
    el.hudTimeLabel.textContent = ui.hudTime || 'Zeit';
    el.hudProgressLabel.textContent = ui.hudProgress || 'Fortschritt';
    el.hudHintLabel.textContent = ui.hudHint || 'Hinweis';
    el.hint.textContent = ui.hintStart || 'Klicke in die Wiese oder direkt auf ein Tier.';
    el.startBadge.textContent = ui.badge || 'Comic Edition';
    el.startTitle.textContent = ui.title || 'Data Quest';
    el.startLead.textContent = ui.lead || '';
    el.featureList.innerHTML = '';
    (ui.bullets || []).forEach(function (item) {
      const li = document.createElement('li');
      li.textContent = item;
      el.featureList.appendChild(li);
    });
    el.startSideText.textContent = ui.sideText || '';
    el.startBtn.textContent = ui.startButton || 'Spiel starten';
    el.skipIntroBtn.textContent = ui.skipButton || 'Direkt zur Schulung';
    el.bossBtn.textContent = ui.buttons && ui.buttons.bossStart ? ui.buttons.bossStart : 'Bosskampf starten';
    el.retryBtn.textContent = ui.stats && ui.stats.retry ? ui.stats.retry : 'Noch einmal spielen';
    el.resultHeading.textContent = ui.resultHeading || 'Zertifikat';
    el.resultText.textContent = ui.resultText || '';
    el.statBestLabel.textContent = ui.stats && ui.stats.best ? ui.stats.best : 'Bestzeit';
    el.statTimeLabel.textContent = ui.stats && ui.stats.time ? ui.stats.time : 'Zeit';
    el.statLivesLabel.textContent = ui.stats && ui.stats.lives ? ui.stats.lives : 'Leben';
    el.statScoreLabel.textContent = ui.stats && ui.stats.score ? ui.stats.score : 'Punkte';
    el.bestTimeInline.textContent = state.bestTime || (ui.bestTimeEmpty || 'noch keine');
    el.worldSign.innerHTML = '<span>' + escapeHtml(ui.worldSignTop || 'Datenschutz- und') + '</span><span>' + escapeHtml(ui.worldSignBottom || 'Datensicherheitswiese') + '</span>';
    el.bossCopy1.textContent = boss.pages[0] ? boss.pages[0].body : '';
    el.bossCopy2.textContent = boss.pages[1] ? boss.pages[1].body : '';
  }

  function formatTime(totalSeconds) {
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return mm + ':' + ss;
  }
  function parseTime(text) {
    const parts = String(text || '').split(':');
    return parts.length === 2 ? (Number(parts[0]) * 60 + Number(parts[1])) : Infinity;
  }
  function updateHud() {
    el.lives.textContent = '❤'.repeat(Math.max(0, state.lives)) + '♡'.repeat(Math.max(0, 3 - state.lives));
    el.timer.textContent = formatTime(state.seconds);
    el.progress.textContent = state.completed.size + ' / ' + stations.length;
    el.bestTime.textContent = state.bestTime || '--:--';
    el.bestTimeInline.textContent = state.bestTime || (ui.bestTimeEmpty || 'noch keine');
  }
  function startTimer() {
    stopTimer();
    state.timerId = window.setInterval(function () {
      state.seconds += 1;
      updateHud();
    }, 1000);
  }
  function stopTimer() {
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function playTone(freq, duration, type, gain) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!playTone.ctx) playTone.ctx = new AudioCtx();
    const ctx = playTone.ctx;
    if (ctx.state === 'suspended') return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type || 'triangle';
    osc.frequency.value = freq;
    amp.gain.value = gain || 0.03;
    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start();
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  }
  function unlockAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!playTone.ctx) playTone.ctx = new AudioCtx();
    if (playTone.ctx.state === 'suspended') playTone.ctx.resume();
  }

  function setBubbleMode(cutscene) {
    el.bubbleLayer.classList.toggle('cutscene-mode', Boolean(cutscene));
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function paragraphHtml(text) {
    return String(text).split(/\n\n+/).map(function (part) {
      return '<p>' + escapeHtml(part).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function openBubble(config) {
    el.bubbleLayer.classList.remove('hidden');
    setBubbleMode(config.cutscene);
    el.bubble.dataset.speaker = config.speaker || 'neutral';
    el.bubbleSpeaker.textContent = config.speaker || '';
    el.bubbleTitle.textContent = config.title || '';
    el.bubbleBody.innerHTML = config.htmlBody || paragraphHtml(config.body || '');
    el.choiceStatus.textContent = '';
    el.bubbleChoices.innerHTML = '';
    el.bubbleChoices.classList.add('hidden');
    el.bubbleActions.innerHTML = '';
    (config.actions || []).forEach(function (action) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = action.primary ? 'primary' : 'secondary';
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      el.bubbleActions.appendChild(button);
    });
  }
  function closeBubble() {
    el.bubbleLayer.classList.add('hidden');
    setBubbleMode(false);
    el.bubble.dataset.speaker = 'neutral';
    el.bubbleChoices.innerHTML = '';
    el.bubbleActions.innerHTML = '';
    el.choiceStatus.textContent = '';
  }

  function showPagedDialog(pages, done, onPage, cutsceneMode) {
    let index = 0;
    function render() {
      if (typeof onPage === 'function') onPage(index);
      const page = pages[index];
      const htmlBody = page.htmlBody || (
        '<div class="lesson-chip">Seite ' + (index + 1) + ' von ' + pages.length + '</div>' +
        '<div class="lesson-card">' + paragraphHtml(page.body || '') + '</div>'
      );
      openBubble({
        speaker: page.speaker,
        title: page.title,
        htmlBody: htmlBody,
        cutscene: cutsceneMode,
        actions: [{
          label: index === pages.length - 1
            ? ((ui.buttons && ui.buttons.continue) || 'Weiter')
            : ((ui.buttons && ui.buttons.next) || 'Nächste Seite'),
          primary: true,
          onClick: function () {
            playTone(640, 0.07, 'triangle', 0.02);
            index += 1;
            if (index >= pages.length) {
              closeBubble();
              if (done) done();
            } else {
              render();
            }
          }
        }]
      });
    }
    render();
  }

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }
  function prepareQuestion(question) {
    const items = question.options.map(function (text, idx) {
      return { text: text, original: idx };
    });
    const shuffled = shuffle(items);
    return {
      context: question.context,
      q: question.q,
      options: shuffled.map(function (item) { return item.text; }),
      correct: shuffled.findIndex(function (item) { return item.original === question.correct; })
    };
  }

  function renderQuizBody(question, questionIndex, total) {
    return ''
      + '<div class="lesson-chip">Frage ' + (questionIndex + 1) + ' von ' + total + '</div>'
      + '<div class="context-box"><strong>' + escapeHtml((ui.quizContextLabel || 'Situation')) + '</strong><p>'
      + escapeHtml(question.context)
      + '</p></div>'
      + '<p class="quiz-note">' + escapeHtml(ui.quizNote || 'Wähle genau eine Antwort aus und bestätige sie.') + '</p>';
  }

  function showQuiz(questionSet, onComplete, options) {
    const prepared = questionSet.map(prepareQuestion);
    const failureText = options && options.failureText ? options.failureText : (ui.wrongStation || 'Leider falsch.');
    let questionIndex = 0;

    function renderQuestion() {
      const question = prepared[questionIndex];
      openBubble({
        speaker: ui.quizSpeaker || 'Quiz',
        title: question.q,
        htmlBody: renderQuizBody(question, questionIndex, prepared.length),
        actions: []
      });

      el.bubbleChoices.classList.remove('hidden');
      const groupName = 'question_' + questionIndex + '_' + Date.now();
      question.options.forEach(function (option, idx) {
        const label = document.createElement('label');
        label.className = 'choice-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = groupName;
        input.value = String(idx);
        input.addEventListener('change', function () {
          Array.from(el.bubbleChoices.querySelectorAll('input')).forEach(function (other) {
            if (other !== input) other.checked = false;
          });
        });
        const text = document.createElement('span');
        text.textContent = option;
        label.appendChild(input);
        label.appendChild(text);
        el.bubbleChoices.appendChild(label);
      });

      const confirm = document.createElement('button');
      confirm.type = 'button';
      confirm.className = 'confirm-btn primary';
      confirm.textContent = ui.buttons && ui.buttons.confirm ? ui.buttons.confirm : 'Antwort bestätigen';
      confirm.addEventListener('click', function () {
        const selected = el.bubbleChoices.querySelector('input:checked');
        if (!selected) {
          el.choiceStatus.textContent = ui.chooseFirst || 'Bitte wähle zuerst eine Antwort aus.';
          return;
        }
        const selectedIndex = Number(selected.value);
        const items = Array.from(el.bubbleChoices.querySelectorAll('.choice-item'));
        items.forEach(function (item, idx) {
          item.classList.toggle('correct', idx === question.correct);
          item.classList.toggle('incorrect', idx === selectedIndex && idx !== question.correct);
        });
        confirm.disabled = true;

        if (selectedIndex === question.correct) {
          state.score += 100;
          playTone(760, 0.12, 'triangle', 0.03);
          el.choiceStatus.textContent = ui.correct || 'Richtig!';
          questionIndex += 1;
          window.setTimeout(function () {
            if (questionIndex >= prepared.length) {
              closeBubble();
              onComplete(true);
            } else {
              renderQuestion();
            }
          }, 760);
        } else {
          state.lives -= 1;
          updateHud();
          playTone(190, 0.18, 'sawtooth', 0.03);
          el.choiceStatus.textContent = failureText;
          window.setTimeout(function () {
            closeBubble();
            onComplete(false);
          }, 1120);
        }
      });
      el.bubbleActions.innerHTML = '';
      el.bubbleActions.appendChild(confirm);
    }

    renderQuestion();
  }

  function moveMouseTo(x, y, callback) {
    const dx = Math.abs(state.mouseX - x);
    const dy = Math.abs(state.mouseY - y);
    const duration = Math.max(700, Math.min(1800, (dx + dy) * 30));
    el.mouse.classList.add('walking');
    el.mouse.style.transitionDuration = duration + 'ms';
    el.mouse.style.left = x + '%';
    el.mouse.style.top = y + '%';
    state.mouseX = x;
    state.mouseY = y;
    window.setTimeout(function () {
      el.mouse.classList.remove('walking');
      if (callback) callback();
    }, duration + 40);
  }

  function stationById(id) {
    return stations.find(function (station) { return station.id === id; });
  }

  function canInteract() {
    return state.started
      && el.bubbleLayer.classList.contains('hidden')
      && el.cutsceneScreen.classList.contains('hidden')
      && el.bossScreen.classList.contains('hidden');
  }

  function openStation(id, button) {
    const station = stationById(id);
    if (!station || state.completed.has(id) || state.inBoss) return;
    const x = parseFloat(button.style.left);
    const y = Math.min(82, parseFloat(button.style.top) + 8);

    moveMouseTo(x, y, function () {
      const pages = station.pages.map(function (body) {
        return { speaker: station.speaker, title: station.title, body: body };
      });
      showPagedDialog(pages, function () {
        showQuiz(station.quiz, function (ok) {
          if (ok) {
            state.completed.add(id);
            button.classList.add('completed');
            state.score += 50;
            updateHud();
            el.hint.textContent = (ui.stationDoneHint || '{speaker} ist abgeschlossen.').replace('{speaker}', station.speaker);
            if (state.completed.size === stations.length) {
              window.setTimeout(showBossScreen, 320);
            }
          } else if (state.lives <= 0) {
            gameOver();
          } else {
            el.hint.textContent = 'Diese Station ist noch nicht geschafft.';
          }
        }, { failureText: ui.wrongStation });
      }, null, false);
    });
  }

  function setCutsceneStep(type, stepIndex) {
    el.cutsceneStage.className = 'cutscene-stage ' + type + '-step-' + (stepIndex + 1);
    el.cutNotice.classList.toggle('hidden', type !== 'outro');
  }

  function playCutscene(type, pages, onDone) {
    el.cutsceneScreen.classList.remove('hidden');
    showPagedDialog(pages, function () {
      el.cutsceneScreen.classList.add('hidden');
      el.cutsceneStage.className = 'cutscene-stage';
      if (onDone) onDone();
    }, function (index) {
      setCutsceneStep(type, index);
    }, true);
  }

  function showBossScreen() {
    state.inBoss = true;
    el.worldSign.innerHTML = '<span>' + escapeHtml(ui.allDoneSign || 'Alle Themen abgeschlossen') + '</span>';
    el.hint.textContent = ui.bossWaiting || 'Jörg wartet auf dem Prüfungsbildschirm.';
    el.bossScreen.classList.remove('hidden');
  }

  function launchBoss() {
    unlockAudio();
    playTone(480, 0.12, 'triangle', 0.03);
    el.bossScreen.classList.add('hidden');
    showQuiz(boss.quiz || [], function (ok) {
      if (ok) {
        state.score += 250;
        state.bossDone = true;
        playCutscene('outro', outroPages, finishGame);
      } else if (state.lives <= 0) {
        gameOver();
      } else {
        el.bossScreen.classList.remove('hidden');
        el.hint.textContent = ui.bossRetry || 'Jörg wartet noch. Versuche es erneut.';
      }
    }, { failureText: ui.wrongBoss });
  }

  function finishGame() {
    stopTimer();
    const current = formatTime(state.seconds);
    if (!state.bestTime || state.seconds < parseTime(state.bestTime)) {
      state.bestTime = current;
      window.localStorage.setItem(storageKey, current);
    }
    el.resultText.textContent = ui.resultText || '';
    el.finalTime.textContent = current;
    el.finalLives.textContent = String(state.lives);
    el.finalScore.textContent = String(state.score);
    updateHud();
    el.resultScreen.classList.remove('hidden');
  }

  function hardStart(skipIntro) {
    unlockAudio();
    playTone(520, 0.10, 'triangle', 0.03);
    el.startScreen.classList.add('hidden');
    state.started = true;
    state.seconds = 0;
    updateHud();
    startTimer();
    if (skipIntro) {
      el.hint.textContent = ui.moveHint || 'Klicke auf ein Tier oder in die Wiese, damit die Maus losläuft.';
    } else {
      playCutscene('intro', introPages, function () {
        el.hint.textContent = ui.moveHint || 'Klicke auf ein Tier oder in die Wiese, damit die Maus losläuft.';
      });
    }
  }

  function resetGame() {
    stopTimer();
    state.seconds = 0;
    state.lives = 3;
    state.score = 0;
    state.completed = new Set();
    state.started = false;
    state.mouseX = 8;
    state.mouseY = 78;
    state.inBoss = false;
    state.bossDone = false;
    el.mouse.style.left = state.mouseX + '%';
    el.mouse.style.top = state.mouseY + '%';
    el.startScreen.classList.remove('hidden');
    el.resultScreen.classList.add('hidden');
    el.bossScreen.classList.add('hidden');
    el.cutsceneScreen.classList.add('hidden');
    closeBubble();
    el.worldSign.innerHTML = '<span>' + escapeHtml(ui.worldSignTop || 'Datenschutz- und') + '</span><span>' + escapeHtml(ui.worldSignBottom || 'Datensicherheitswiese') + '</span>';
    el.hint.textContent = ui.hintStart || 'Klicke in die Wiese oder direkt auf ein Tier.';
    el.stations.forEach(function (button) { button.classList.remove('completed'); });
    updateHud();
  }

  function gameOver() {
    stopTimer();
    showPagedDialog([
      { speaker: 'Erzählstimme', title: ui.gameOverTitle || 'Alle Leben verloren', body: ui.gameOverBody || 'Die Maus braucht einen neuen Anlauf.' }
    ], resetGame, null, false);
  }

  function bindEvents() {
    el.startBtn.addEventListener('click', function () { hardStart(false); });
    el.skipIntroBtn.addEventListener('click', function () { hardStart(true); });
    el.stations.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        if (!canInteract()) return;
        openStation(button.dataset.id, button);
      });
    });
    el.world.addEventListener('click', function (event) {
      if (!canInteract()) return;
      if (event.target.closest('.station')) return;
      const rect = el.world.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      moveMouseTo(Math.max(6, Math.min(94, x)), Math.max(48, Math.min(84, y)));
    });
    el.bossBtn.addEventListener('click', launchBoss);
    el.retryBtn.addEventListener('click', resetGame);
  }

  applyUiTexts();
  bindEvents();
  updateHud();
})();
