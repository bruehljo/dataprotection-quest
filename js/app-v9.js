(function () {
  'use strict';

  const stations = [
    {
      id: 'grundrechte',
      speaker: 'Eule Erika',
      title: 'Warum Datenschutz ein Grundrecht ist',
      pages: [
        'Menschen sollen selbst bestimmen können, wer was über sie weiß. Genau das schützt das Recht auf informationelle Selbstbestimmung.',
        'Datenschutz schützt Freiheit, Würde und Privatsphäre. Er ist deshalb in Europa nicht nur eine Formalität, sondern ein Grundrecht.',
        'Die DSGVO fiel nicht vom Himmel. Sie knüpft an Grundrechte und den Schutz vor Missbrauch personenbezogener Daten an.'
      ],
      quiz: [
        { q: 'Was schützt die informationelle Selbstbestimmung?', options: ['Die Kontrolle über eigene personenbezogene Daten', 'Nur Unternehmensdaten', 'Nur Daten von Behörden'], correct: 0 },
        { q: 'Warum ist Datenschutz ein Grundrecht?', options: ['Weil Datenverarbeitung immer verboten ist', 'Weil Privatsphäre und Freiheit geschützt werden sollen', 'Weil Computer sonst langsamer sind'], correct: 1 },
        { q: 'Welche Aussage zur DSGVO stimmt?', options: ['Sie entstand ohne Vorgeschichte', 'Sie schützt zentrale Persönlichkeitsrechte', 'Sie gilt nur für Großunternehmen'], correct: 1 }
      ]
    },
    {
      id: 'daten',
      speaker: 'Schildkröte Theo',
      title: 'Welche Daten sind personenbezogen?',
      pages: [
        'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen.',
        'Dazu gehören etwa Name, E-Mail-Adresse, Adresse, Telefonnummer oder auch eine IP-Adresse, wenn sie einer Person zugeordnet werden kann.',
        'Besonders schützenswert sind sensible Daten, etwa Gesundheitsdaten oder Informationen über politische oder religiöse Überzeugungen.'
      ],
      quiz: [
        { q: 'Was sind personenbezogene Daten?', options: ['Alle Infos mit Bezug zu einer Person', 'Nur Name und Adresse', 'Nur sensible Daten'], correct: 0 },
        { q: 'Welche Angabe kann personenbezogen sein?', options: ['Wetter in Wien', 'IP-Adresse', 'Der Name einer Stadt'], correct: 1 },
        { q: 'Welche Daten sind besonders sensibel?', options: ['Gesundheitsdaten', 'Lieblingsessen', 'Schuhgröße im Schaufenster'], correct: 0 }
      ]
    },
    {
      id: 'rollen',
      speaker: 'Hund Hugo',
      title: 'Wer macht was?',
      pages: [
        'Der Verantwortliche entscheidet über Zweck und Mittel der Verarbeitung. Er sagt also, warum und wie Daten verarbeitet werden.',
        'Ein Auftragsverarbeiter verarbeitet Daten nicht für eigene Zwecke, sondern im Auftrag des Verantwortlichen.',
        'Manchmal setzt ein Auftragsverarbeiter weitere Dienstleister ein. Das sind Subauftragsverarbeiter.'
      ],
      quiz: [
        { q: 'Wer entscheidet über Zweck und Mittel?', options: ['Der Verantwortliche', 'Der Postbote', 'Die betroffene Person allein'], correct: 0 },
        { q: 'Was macht ein Auftragsverarbeiter?', options: ['Er legt eigene Zwecke fest', 'Er verarbeitet Daten im Auftrag', 'Er ersetzt Behörden'], correct: 1 },
        { q: 'Was ist ein Subauftragsverarbeiter?', options: ['Ein weiterer Dienstleister in der Kette', 'Ein zweiter Verantwortlicher', 'Immer die IT-Leitung'], correct: 0 }
      ]
    },
    {
      id: 'rechtsgrundlagen',
      speaker: 'Fuchs Frieda',
      title: 'Wann ist Verarbeitung erlaubt?',
      pages: [
        'Datenverarbeitung ist nicht einfach so erlaubt. Sie braucht eine Rechtsgrundlage.',
        'Zu den wichtigsten Rechtsgrundlagen gehören Einwilligung, Vertrag, rechtliche Verpflichtung, lebenswichtige Interessen, öffentliche Aufgabe und berechtigte Interessen.',
        'Einwilligungen müssen freiwillig, informiert und eindeutig sein. Sie können außerdem widerrufen werden.'
      ],
      quiz: [
        { q: 'Wann darf man Daten verarbeiten?', options: ['Immer, wenn es praktisch ist', 'Nur mit Rechtsgrundlage', 'Nie'], correct: 1 },
        { q: 'Was ist eine mögliche Rechtsgrundlage?', options: ['Neugier', 'Einwilligung', 'Routine'], correct: 1 },
        { q: 'Welche Eigenschaft muss eine Einwilligung haben?', options: ['Sie muss freiwillig sein', 'Sie gilt automatisch für immer', 'Sie darf geheim bleiben'], correct: 0 }
      ]
    },
    {
      id: 'rechte',
      speaker: 'Bär Bruno',
      title: 'Welche Rechte haben Betroffene?',
      pages: [
        'Betroffene Personen haben das Recht auf Auskunft. Sie dürfen erfahren, welche Daten über sie verarbeitet werden.',
        'Je nach Fall gibt es außerdem Rechte auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Datenübertragbarkeit.',
        'Besonders wichtig ist auch das Widerspruchsrecht, etwa gegen bestimmte Verarbeitungen oder Direktwerbung.'
      ],
      quiz: [
        { q: 'Welches Recht haben betroffene Personen?', options: ['Recht auf Auskunft', 'Kein eigenes Recht', 'Nur ein Recht auf Schweigen'], correct: 0 },
        { q: 'Was bedeutet Recht auf Löschung?', options: ['Daten archivieren', 'Daten löschen lassen können', 'Daten drucken'], correct: 1 },
        { q: 'Was ist das Widerspruchsrecht?', options: ['Verarbeitung in bestimmten Fällen ablehnen können', 'Die IT kritisieren', 'Passwörter austauschen'], correct: 0 }
      ]
    },
    {
      id: 'unternehmen',
      speaker: 'Hase Hanna',
      title: 'Datenschutz im Unternehmen',
      pages: [
        'Im Unternehmen dürfen nur berechtigte Personen auf Daten zugreifen. Zugriffsrechte müssen sauber organisiert sein.',
        'Wer mit Daten arbeitet, muss vertraulich damit umgehen und Vorfälle oder Unsicherheiten früh melden.',
        'Kommt es zu einer Datenschutzverletzung, zählt Zeit: Der Vorfall muss intern sofort gemeldet und geprüft werden.'
      ],
      quiz: [
        { q: 'Wer darf auf Daten zugreifen?', options: ['Alle im Unternehmen', 'Nur berechtigte Personen', 'Nur Führungskräfte'], correct: 1 },
        { q: 'Was ist ein Data Breach?', options: ['Ein Backup', 'Eine Datenschutzverletzung', 'Eine Umfrage'], correct: 1 },
        { q: 'Was ist bei einer Datenschutzverletzung wichtig?', options: ['Sofort intern melden', 'Abwarten', 'Nur privat notieren'], correct: 0 }
      ]
    },
    {
      id: 'sicherheit',
      speaker: 'Adler Amir',
      title: 'Datensicherheit im Alltag',
      pages: [
        'Datensicherheit beginnt bei Alltagsroutinen: starke Passwörter, gesperrte Bildschirme, Updates und Vorsicht bei E-Mails.',
        'Phishing-Nachrichten arbeiten oft mit Druck, Überraschung oder ungewöhnlichen Links. Man soll sie prüfen, nicht reflexhaft anklicken.',
        'Auch Besucher, Ausdrucke, offene Schreibtische oder fremde USB-Sticks können Sicherheitsrisiken sein.'
      ],
      quiz: [
        { q: 'Woran erkennt man Phishing häufig?', options: ['An Dringlichkeit und merkwürdigen Links', 'An höflicher Sprache', 'An einem Firmenlogo'], correct: 0 },
        { q: 'Was ist ein gutes Passwort?', options: ['Geburtsjahr und Vorname', 'Lang und möglichst einzigartig', '123456'], correct: 1 },
        { q: 'Was ist gute Sicherheitspraxis?', options: ['Bildschirm sperren', 'Passwort auf Post-it schreiben', 'USB-Sticks unbekannter Herkunft nutzen'], correct: 0 }
      ]
    }
  ];

  const boss = {
    pages: [
      'Alle Tiere haben dir geholfen. Doch jetzt wartet Jörg, der Datenschutzboss. Er prüft, ob du die Zusammenhänge wirklich verstanden hast.',
      'Die fünf Bossfragen sind etwas schwerer. Lies sie genau, entscheide sorgfältig und bleib ruhig.'
    ],
    quiz: [
      { q: 'Warum ist die Kombination aus Name, Adresse, Hobbys und E-Mail riskant?', options: ['Weil daraus gezielte Täuschung und Profilbildung möglich werden', 'Weil Hobbys immer geheim sind', 'Weil Adressen nie gespeichert werden dürfen'], correct: 0 },
      { q: 'Welche Aussage ist am treffendsten?', options: ['Datenschutz schützt nur vor Werbung', 'Datenschutz schützt Freiheit und Kontrolle über persönliche Informationen', 'Datenschutz ist nur ein IT-Thema'], correct: 1 },
      { q: 'Was ist bei Einwilligungen besonders wichtig?', options: ['Sie müssen freiwillig und widerrufbar sein', 'Sie sind automatisch unbegrenzt gültig', 'Sie ersetzen jede andere Rechtsgrundlage dauerhaft'], correct: 0 },
      { q: 'Warum ist eine schnelle Meldung von Datenschutzvorfällen wichtig?', options: ['Weil Schäden begrenzt und Pflichten eingehalten werden müssen', 'Weil sonst der Drucker nicht mehr geht', 'Weil Meldungen nur am selben Tag erlaubt sind'], correct: 0 },
      { q: 'Welche Haltung ist im Arbeitsalltag richtig?', options: ['Nur sammeln, was wirklich nötig ist, und sorgfältig schützen', 'Lieber mehr Daten sammeln, falls man sie später braucht', 'Sensible Daten sind harmlos, wenn sie intern bleiben'], correct: 0 }
    ]
  };

  const introPages = [
    { speaker: 'Katze', title: 'Ein Käse. Ein Tausch. Ein Fehler.', body: 'Katze: „Na, kleine Maus? Für dieses Stück Käse brauche ich nur ein paar harmlose Infos: Vor- und Nachname, Anschrift, Hobbys und deine E-Mail-Adresse.“' },
    { speaker: 'Maus', title: 'Zu schnell vertraut', body: 'Maus: „Nur dafür? Klingt doch harmlos ...“\n\nDie Maus erzählt mehr, als sie sollte. Die Katze grinst, nimmt die Daten und verschwindet mit einem vielsagenden Blick.' },
    { speaker: 'Erzählstimme', title: 'Was diese Daten wert sind', body: 'Schon diese Kombination reicht oft aus, um eine Person gezielt anzusprechen, glaubwürdige Phishing-Nachrichten zu formulieren, Profile zu bilden oder weiteren Missbrauch vorzubereiten.' },
    { speaker: 'Erzählstimme', title: 'Warum Datenschutz wichtig ist', body: 'Das Recht auf informationelle Selbstbestimmung schützt die Entscheidung darüber, wer was über uns weiß. Genau deshalb gibt es Datenschutzregeln wie die DSGVO: nicht als Bürokratie, sondern als Schutzschild.' }
  ];

  const finalePages = [
    { speaker: 'Maus', title: 'Der Bescheid', body: 'Die Maus reicht Jörg einen Bescheid der Datenschutzbehörde. „Man darf mit Daten nicht spielen, als wären sie wertlos.“' },
    { speaker: 'Jörg', title: 'Einsicht', body: 'Jörg schaut betreten auf das Papier. „Verstanden. Datenschutz ist Verantwortung.“' },
    { speaker: 'Erzählstimme', title: 'Geschafft', body: 'Die Maus hat die Kontrolle zurückgewonnen. Jetzt weiß sie: Daten sind Teil der eigenen Identität – und müssen mit Sorgfalt geschützt werden.' }
  ];

  const state = {
    started: false,
    timerId: null,
    seconds: 0,
    lives: 3,
    progress: 0,
    score: 0,
    completed: new Set(),
    activeDialogQueue: [],
    currentStationId: null,
    bestTime: localStorage.getItem('dq_best_time_v9') || '',
    audioUnlocked: false,
    bossUnlocked: false,
    mouseX: 12,
    mouseY: 72
  };

  const el = {
    world: document.getElementById('world'),
    mouse: document.getElementById('mouse'),
    lives: document.getElementById('lives'),
    timer: document.getElementById('timer'),
    progress: document.getElementById('progress'),
    hint: document.getElementById('hint'),
    startScreen: document.getElementById('start-screen'),
    startBtn: document.getElementById('start-btn'),
    bubbleLayer: document.getElementById('bubble-layer'),
    bubbleSpeaker: document.getElementById('bubble-speaker'),
    bubbleTitle: document.getElementById('bubble-title'),
    bubbleBody: document.getElementById('bubble-body'),
    bubbleChoices: document.getElementById('bubble-choices'),
    bubbleActions: document.getElementById('bubble-actions'),
    bossStation: document.getElementById('boss-station'),
    finalSign: document.getElementById('final-sign'),
    resultScreen: document.getElementById('result-screen'),
    resultText: document.getElementById('result-text'),
    bestTime: document.getElementById('best-time'),
    finalTime: document.getElementById('final-time'),
    finalLives: document.getElementById('final-lives'),
    finalScore: document.getElementById('final-score'),
    retryBtn: document.getElementById('retry-btn')
  };

  const stationButtons = Array.from(document.querySelectorAll('.station')).filter(btn => btn.dataset.id !== 'boss');

  function formatTime(totalSeconds) {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return m + ':' + s;
  }

  function updateHud() {
    el.lives.textContent = '❤'.repeat(state.lives) + '♡'.repeat(3 - state.lives);
    el.timer.textContent = formatTime(state.seconds);
    el.progress.textContent = state.progress + ' / 7';
    if (state.bestTime) el.bestTime.textContent = state.bestTime;
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
    if (!state.audioUnlocked || !window.AudioContext && !window.webkitAudioContext) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!playTone.ctx) playTone.ctx = new Ctx();
    const ctx = playTone.ctx;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type || 'triangle';
    osc.frequency.value = freq;
    amp.gain.value = gain || 0.03;
    osc.connect(amp).connect(ctx.destination);
    osc.start();
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  }

  function unlockAudio() {
    state.audioUnlocked = true;
    playTone(440, 0.08, 'sine', 0.02);
  }

  function openBubble(config) {
    el.bubbleLayer.classList.remove('hidden');
    el.bubbleSpeaker.textContent = config.speaker || '';
    el.bubbleTitle.textContent = config.title || '';
    el.bubbleBody.textContent = config.body || '';
    el.bubbleChoices.innerHTML = '';
    el.bubbleChoices.classList.add('hidden');
    el.bubbleActions.innerHTML = '';
    (config.actions || []).forEach(function (action) {
      const btn = document.createElement('button');
      btn.className = action.primary ? 'primary' : 'secondary';
      btn.textContent = action.label;
      btn.addEventListener('click', action.onClick, { once: true });
      el.bubbleActions.appendChild(btn);
    });
  }

  function closeBubble() {
    el.bubbleLayer.classList.add('hidden');
    el.bubbleChoices.innerHTML = '';
    el.bubbleActions.innerHTML = '';
  }

  function showPagedDialog(pages, onDone) {
    let index = 0;
    function next() {
      const item = pages[index];
      openBubble({
        speaker: item.speaker,
        title: item.title,
        body: item.body,
        actions: [{ label: index === pages.length - 1 ? 'Weiter' : 'Nächste Seite', primary: true, onClick: function () {
          playTone(660, 0.08);
          index += 1;
          if (index >= pages.length) {
            closeBubble();
            if (onDone) onDone();
          } else {
            next();
          }
        } }]
      });
    }
    next();
  }

  function showQuiz(questionSet, onComplete) {
    let questionIndex = 0;
    function renderQuestion() {
      const q = questionSet[questionIndex];
      openBubble({ speaker: 'Quiz', title: q.q, body: 'Wähle genau eine Antwort aus.', actions: [] });
      el.bubbleChoices.classList.remove('hidden');
      const name = 'q_' + questionIndex;
      q.options.forEach(function (option, idx) {
        const label = document.createElement('label');
        label.className = 'choice-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = name;
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
      const status = document.createElement('div');
      status.className = 'choice-status';
      status.textContent = ' '; 
      el.bubbleChoices.appendChild(status);

      const confirm = document.createElement('button');
      confirm.className = 'confirm-btn primary';
      confirm.textContent = 'Antwort bestätigen';
      confirm.addEventListener('click', function () {
        const selected = el.bubbleChoices.querySelector('input:checked');
        if (!selected) {
          status.textContent = 'Bitte wähle zuerst eine Antwort.';
          return;
        }
        const selectedIndex = Number(selected.value);
        const items = Array.from(el.bubbleChoices.querySelectorAll('.choice-item'));
        items.forEach(function (item, idx) {
          item.classList.toggle('correct', idx === q.correct);
          item.classList.toggle('incorrect', idx === selectedIndex && idx !== q.correct);
        });
        if (selectedIndex === q.correct) {
          playTone(740, 0.12, 'triangle', 0.03);
          status.textContent = 'Richtig!';
          state.score += 100;
          questionIndex += 1;
          confirm.disabled = true;
          setTimeout(function () {
            if (questionIndex >= questionSet.length) {
              closeBubble();
              onComplete(true);
            } else {
              renderQuestion();
            }
          }, 650);
        } else {
          playTone(190, 0.2, 'sawtooth', 0.03);
          state.lives -= 1;
          updateHud();
          status.textContent = 'Leider falsch. Du verlierst ein Leben.';
          confirm.disabled = true;
          setTimeout(function () {
            closeBubble();
            onComplete(false);
          }, 900);
        }
      });
      el.bubbleActions.innerHTML = '';
      el.bubbleActions.appendChild(confirm);
    }
    renderQuestion();
  }

  function moveMouseToPercent(x, y, cb) {
    const dx = Math.abs(state.mouseX - x);
    const dy = Math.abs(state.mouseY - y);
    const duration = Math.max(650, Math.min(1800, (dx + dy) * 35));
    el.mouse.classList.add('walking');
    el.mouse.style.transitionDuration = duration + 'ms';
    el.mouse.style.left = x + '%';
    el.mouse.style.top = y + '%';
    state.mouseX = x;
    state.mouseY = y;
    window.setTimeout(function () {
      el.mouse.classList.remove('walking');
      if (cb) cb();
    }, duration + 20);
  }

  function stationById(id) {
    return stations.find(function (s) { return s.id === id; });
  }

  function markStationComplete(id) {
    state.completed.add(id);
    state.progress = state.completed.size;
    const button = document.querySelector('.station[data-id="' + id + '"]');
    if (button) button.classList.add('completed');
    updateHud();
    if (state.progress === 7) {
      state.bossUnlocked = true;
      el.bossStation.classList.remove('hidden');
      el.finalSign.style.display = 'flex';
      el.hint.textContent = 'Alle Tiere sind geschafft. Klicke auf Jörg.';
      playTone(880, 0.18, 'triangle', 0.04);
    }
  }

  function resetGame() {
    stopTimer();
    state.seconds = 0;
    state.lives = 3;
    state.progress = 0;
    state.score = 0;
    state.completed = new Set();
    state.bossUnlocked = false;
    state.mouseX = 12;
    state.mouseY = 72;
    el.mouse.style.left = state.mouseX + '%';
    el.mouse.style.top = state.mouseY + '%';
    el.bossStation.classList.add('hidden');
    el.finalSign.style.display = 'none';
    stationButtons.forEach(function (button) { button.classList.remove('completed'); button.disabled = false; });
    updateHud();
    el.hint.textContent = 'Klicke auf einen Ort oder eine Figur.';
    closeBubble();
    el.resultScreen.classList.add('hidden');
    el.startScreen.classList.remove('hidden');
    state.started = false;
  }

  function gameOverRestart() {
    showPagedDialog([
      { speaker: 'Erzählstimme', title: 'Alle Leben verloren', body: 'Die Maus muss die Schulung von vorne beginnen. Dieses Mal schafft sie es besser.' }
    ], function () {
      resetGame();
    });
  }

  function finishGame() {
    stopTimer();
    const current = formatTime(state.seconds);
    if (!state.bestTime || state.seconds < parseTime(state.bestTime)) {
      state.bestTime = current;
      localStorage.setItem('dq_best_time_v9', current);
    }
    updateHud();
    el.resultText.textContent = 'Die Maus hat alle Stationen besucht, Jörg besiegt und verstanden, warum Datenschutz im Alltag zählt.';
    el.finalTime.textContent = current;
    el.finalLives.textContent = String(state.lives);
    el.finalScore.textContent = String(state.score);
    el.resultScreen.classList.remove('hidden');
  }

  function parseTime(text) {
    const parts = text.split(':');
    if (parts.length !== 2) return Infinity;
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  function launchBoss() {
    moveMouseToPercent(84, 18, function () {
      showPagedDialog(boss.pages.map(function (body) {
        return { speaker: 'Jörg', title: 'Bosskampf', body: body };
      }), function () {
        showQuiz(boss.quiz, function (ok) {
          if (ok) {
            showPagedDialog(finalePages, finishGame);
          } else if (state.lives <= 0) {
            gameOverRestart();
          } else {
            el.hint.textContent = 'Jörg wartet noch. Klicke erneut auf ihn.';
          }
        });
      });
    });
  }

  function launchStation(id, target) {
    const station = stationById(id);
    if (!station || state.completed.has(id)) return;
    const x = parseFloat(target.style.left);
    const y = parseFloat(target.style.top) + 8;
    moveMouseToPercent(x, y, function () {
      const pages = station.pages.map(function (body) {
        return { speaker: station.speaker, title: station.title, body: body };
      });
      showPagedDialog(pages, function () {
        showQuiz(station.quiz, function (ok) {
          if (ok) {
            markStationComplete(id);
            el.hint.textContent = station.speaker + ' ist geschafft.';
          } else if (state.lives <= 0) {
            gameOverRestart();
          } else {
            el.hint.textContent = 'Versuche die Station noch einmal.';
          }
        });
      });
    });
  }

  function bindEvents() {
    el.startBtn.addEventListener('click', function () {
      if (!state.audioUnlocked) unlockAudio();
      el.startScreen.classList.add('hidden');
      state.started = true;
      updateHud();
      startTimer();
      showPagedDialog(introPages, function () {
        el.hint.textContent = 'Beginne links bei Eule Erika.';
      });
    });

    stationButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        if (!state.started || !el.bubbleLayer.classList.contains('hidden')) return;
        launchStation(button.dataset.id, button);
      });
    });

    el.bossStation.addEventListener('click', function (event) {
      event.stopPropagation();
      if (!state.started || !state.bossUnlocked || !el.bubbleLayer.classList.contains('hidden')) return;
      launchBoss();
    });

    el.world.addEventListener('click', function (event) {
      if (!state.started || !el.bubbleLayer.classList.contains('hidden')) return;
      const rect = el.world.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      moveMouseToPercent(Math.max(6, Math.min(94, x)), Math.max(16, Math.min(84, y)));
    });

    el.retryBtn.addEventListener('click', function () {
      resetGame();
    });
  }

  updateHud();
  bindEvents();
})();
