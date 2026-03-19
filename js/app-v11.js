(function () {
  'use strict';

  const stations = [
    {
      id: 'grundrechte',
      speaker: 'Eule Erika',
      title: 'Warum Datenschutz ein Grundrecht ist',
      pages: [
        'Die DSGVO fiel nicht vom Himmel. Schon Art. 8 EMRK sowie Art. 7 und 8 der EU-Grundrechtecharta schützen Privatleben, Kommunikation und personenbezogene Daten.',
        'Der Kern dahinter ist das Recht auf informationelle Selbstbestimmung: Menschen sollen selbst entscheiden können, wer was über sie weiß und wofür diese Informationen verwendet werden.',
        'Datenschutzrecht schützt einzelne Personen vor Beeinträchtigungen ihrer Persönlichkeitssphäre. Darum geht es nicht nur um Technik, sondern um Freiheit, Würde und Kontrolle im Alltag.',
        'Die DSGVO gilt räumlich für Datenverarbeitungen in der EU und auch dann, wenn Personen in der EU Waren oder Dienstleistungen angeboten werden oder ihr Verhalten beobachtet wird.',
        'Sachlich erfasst die DSGVO automatisierte Verarbeitungen und geordnete nichtautomatisierte Verarbeitungen personenbezogener Daten natürlicher Personen.'
      ],
      quiz: [
        { q: 'Was ist der Kern der informationellen Selbstbestimmung?', options: ['Selbst entscheiden, wer was über mich weiß', 'Nur Behörden dürfen Daten nutzen', 'Daten dürfen nie gespeichert werden'], correct: 0 },
        { q: 'Warum ist Datenschutz ein Grundrecht?', options: ['Weil er Freiheit und Privatsphäre schützt', 'Weil Computer sonst abstürzen', 'Weil nur die IT das verlangt'], correct: 0 },
        { q: 'Wann kann die DSGVO auch außerhalb eines EU-Sitzes relevant sein?', options: ['Wenn Personen in der EU beobachtet oder angesprochen werden', 'Nur bei Papierakten', 'Nur bei staatlichen Stellen'], correct: 0 }
      ]
    },
    {
      id: 'daten',
      speaker: 'Schildkröte Theo',
      title: 'Welche Daten sind personenbezogen?',
      pages: [
        'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen. Es reicht, wenn jemand mit diesen Angaben erkannt oder von anderen unterschieden werden kann.',
        'Dazu zählen ganz klassische Angaben wie Name, Anschrift, Telefonnummer und E-Mail-Adresse, aber auch Zuordnungen wie Kundennummern, Standortdaten oder unter Umständen IP-Adressen.',
        'Besonders geschützt sind sensible Daten. Dazu gehören etwa rassische oder ethnische Herkunft, politische Meinungen, Religion, Gewerkschaftszugehörigkeit, genetische und biometrische Daten, Gesundheitsdaten oder Daten zum Sexualleben.',
        'Im Alltag ist wichtig: Nicht nur spektakuläre Daten sind relevant. Schon die Kombination mehrerer scheinbar harmloser Angaben kann eine Person klar identifizierbar und angreifbar machen.'
      ],
      quiz: [
        { q: 'Wann ist eine Information personenbezogen?', options: ['Wenn sie sich einer Person zuordnen lässt', 'Nur wenn es ein Name ist', 'Nur wenn sie geheim ist'], correct: 0 },
        { q: 'Welche Angabe kann personenbezogen sein?', options: ['Eine IP-Adresse', 'Nur ein Firmenlogo', 'Nur Wetterdaten'], correct: 0 },
        { q: 'Welche Kategorie ist besonders sensibel?', options: ['Gesundheitsdaten', 'Lieblingsessen', 'Bürofarbe'], correct: 0 }
      ]
    },
    {
      id: 'rollen',
      speaker: 'Hund Hugo',
      title: 'Rollenbilder in der DSGVO',
      pages: [
        'Der Verantwortliche ist die Stelle, die über Zwecke und Mittel der Verarbeitung entscheidet. Er legt also fest, ob und wie eine Verarbeitung stattfinden soll.',
        'Betroffene Personen machen ihre Rechte grundsätzlich gegenüber dem Verantwortlichen geltend. Dort liegt die rechtliche Verantwortung für die saubere Organisation der Verarbeitung.',
        'Der Auftragsverarbeiter verarbeitet Daten nicht für eigene Zwecke, sondern im Auftrag des Verantwortlichen und nur auf Grundlage schriftlicher Weisungen.',
        'Setzt ein Auftragsverarbeiter weitere Dienstleister ein, spricht man von Subauftragsverarbeitern. Auch diese Kette muss sauber geregelt und offengelegt werden.'
      ],
      quiz: [
        { q: 'Wer entscheidet über Zwecke und Mittel der Verarbeitung?', options: ['Der Verantwortliche', 'Der Auftragsverarbeiter', 'Die Poststelle'], correct: 0 },
        { q: 'Was darf ein Auftragsverarbeiter nicht tun?', options: ['Daten für eigene Zwecke verwenden', 'Daten im Auftrag bearbeiten', 'Weisungen erhalten'], correct: 0 },
        { q: 'Was ist ein Subauftragsverarbeiter?', options: ['Ein weiterer Dienstleister in der Verarbeitungskette', 'Immer die Geschäftsführung', 'Die betroffene Person'], correct: 0 }
      ]
    },
    {
      id: 'rechtsgrundlagen',
      speaker: 'Fuchs Frieda',
      title: 'Wann ist Verarbeitung erlaubt?',
      pages: [
        'Grundsatz: Die Verarbeitung personenbezogener Daten ist verboten, außer sie stützt sich auf eine Rechtsgrundlage. Bequemlichkeit oder bloße Neugier reichen nie aus.',
        'Wichtige Rechtsgrundlagen sind die informierte Einwilligung, die Erfüllung eines Vertrags oder vorvertragliche Maßnahmen, rechtliche Verpflichtungen, lebenswichtige Interessen, Aufgaben im öffentlichen Interesse und berechtigte Interessen.',
        'Eine Einwilligung muss freiwillig, informiert und eindeutig sein. Sie ist kein Blankoscheck und kann widerrufen werden.',
        'Außerdem muss über die Verarbeitung informiert werden, zum Beispiel über den Verantwortlichen, Zwecke, Empfänger und Rechte nach Art. 13 und 14 DSGVO.'
      ],
      quiz: [
        { q: 'Worauf braucht jede Verarbeitung eine Stütze?', options: ['Auf eine Rechtsgrundlage', 'Auf gute Absichten', 'Auf einen mündlichen Zuruf'], correct: 0 },
        { q: 'Welche Antwort nennt eine echte Rechtsgrundlage?', options: ['Einwilligung', 'Neugier', 'Gewohnheit'], correct: 0 },
        { q: 'Welche Aussage über Einwilligungen stimmt?', options: ['Sie müssen freiwillig und informiert sein', 'Sie gelten automatisch für immer', 'Sie ersetzen alle anderen Pflichten'], correct: 0 }
      ]
    },
    {
      id: 'rechte',
      speaker: 'Bär Bruno',
      title: 'Welche Rechte haben Betroffene?',
      pages: [
        'Betroffene Personen haben Informationsrechte. Sie sollen wissen, wer ihre Daten verarbeitet, zu welchen Zwecken, an wen Daten gehen und wie lange sie gespeichert werden.',
        'Es gibt ein Recht auf Auskunft über Verarbeitungszwecke, Datenkategorien, Empfänger und bestehende Rechte.',
        'Dazu kommen je nach Fall Rechte auf Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit.',
        'Wichtig sind auch das Widerspruchsrecht und das Recht, keiner ausschließlich automatisierten Entscheidung unterworfen zu sein.'
      ],
      quiz: [
        { q: 'Welches Recht gehört zu den Betroffenenrechten?', options: ['Recht auf Auskunft', 'Recht auf Geheimhaltung vor sich selbst', 'Recht auf grenzenlose Datensammlung'], correct: 0 },
        { q: 'Was bedeutet das Recht auf Berichtigung?', options: ['Falsche Daten korrigieren lassen', 'Daten drucken', 'Daten verkaufen'], correct: 0 },
        { q: 'Was erlaubt das Widerspruchsrecht?', options: ['Bestimmte Verarbeitungen ablehnen', 'Immer alles löschen', 'Passwörter ändern'], correct: 0 }
      ]
    },
    {
      id: 'unternehmen',
      speaker: 'Hase Hanna',
      title: 'Datenschutz im Unternehmen',
      pages: [
        'Im Unternehmen beurteilen Geschäftsführung und anordnungsbefugte Stellen, ob eine Verarbeitung durchgeführt werden darf. Mitarbeitende verarbeiten Daten nur im Rahmen gültiger Anordnungen.',
        'Zugriff auf personenbezogene Daten gibt es nur, wenn er für die jeweilige Aufgabe erforderlich ist. Das Rollenkonzept ist also mehr als eine Formalität.',
        'Mitarbeitende müssen auf Stillschweigen und Vertraulichkeit verpflichtet werden. Datengeheimnis ist gelebter Alltag, nicht nur ein Satz auf Papier.',
        'Wenn ein Auftragsverarbeiter eingesetzt wird, braucht es eine Auftragsverarbeitungsvereinbarung. Prozesse müssen feststehen: Wer wird beauftragt, welche Daten fließen, wer entscheidet und wie wird dokumentiert?',
        'Zu den Aufgaben zählen ein Verarbeitungsverzeichnis, eine Übersicht über Auftragsverarbeiter und Verträge sowie klare Prozesse und Datenschutzrichtlinien für Mitarbeitende.',
        'Eine Datenschutzverletzung liegt vor, wenn Verfügbarkeit, Vertraulichkeit oder Richtigkeit personenbezogener Daten beeinträchtigt werden. Beispiele sind falsche Empfänger, offene CC-Listen oder Hackingangriffe.',
        'Als Auftragsverarbeiter gelten zusätzliche Pflichten: nur schriftliche Aufträge befolgen, sichere TOMs, Unterstützung bei Betroffenenanfragen und Data Breaches, Löschung nach Ende der Zusammenarbeit und kein Einsatz der Daten zu eigenen Zwecken.'
      ],
      quiz: [
        { q: 'Wer soll im Unternehmen Zugriff auf personenbezogene Daten haben?', options: ['Nur berechtigte Personen im Rahmen ihrer Aufgabe', 'Alle Mitarbeitenden', 'Nur externe Dienstleister'], correct: 0 },
        { q: 'Was braucht man vor dem Einsatz eines Auftragsverarbeiters?', options: ['Eine Auftragsverarbeitungsvereinbarung', 'Nur einen Handschlag', 'Gar nichts'], correct: 0 },
        { q: 'Was ist ein Beispiel für eine Datenschutzverletzung?', options: ['Newsletter mit allen Empfängern im CC', 'Ordentliche Dokumentation', 'Ein genehmigter Vertrag'], correct: 0 }
      ]
    },
    {
      id: 'werbung',
      speaker: 'Adler Amir',
      title: 'TKG, Direktwerbung und Double-Opt-in',
      pages: [
        'Das Telekommunikationsgesetz spielt bei Direktwerbung eine wichtige Rolle. Es gilt im B2C-Bereich und nach ständiger Rechtsprechung auch im B2B-Bereich.',
        'Anrufe oder E-Mails zu Werbezwecken ohne vorherige Einwilligung sind grundsätzlich unzulässig. Nur in bestimmten gesetzlich geregelten Ausnahmefällen ist Werbung ohne vorherige Einwilligung möglich.',
        'Bei Registrierungen oder der Abgabe einer E-Mail-Adresse muss sichergestellt werden, dass die Adresse nicht unberechtigt verwendet wurde. Ein klassisches Mittel dafür ist das Double-Opt-in.',
        'Fehlt diese Absicherung, kann das eine Verletzung des Grundrechts auf Geheimhaltung bedeuten. Auch Marketingprozesse brauchen also saubere Datenschutzlogik.'
      ],
      quiz: [
        { q: 'Was gilt für Werbe-E-Mails grundsätzlich?', options: ['Vorherige Einwilligung ist in der Regel nötig', 'Sie sind immer erlaubt', 'Sie sind nur an Privatpersonen verboten'], correct: 0 },
        { q: 'Wozu dient Double-Opt-in?', options: ['Zur Bestätigung, dass die E-Mail-Adresse wirklich der Person gehört', 'Zum schnelleren Versand', 'Zum Speichern von Passwörtern'], correct: 0 },
        { q: 'Gilt das TKG nur für B2C?', options: ['Nein, auch B2B kann erfasst sein', 'Ja, ausschließlich', 'Nur für Social Media'], correct: 0 }
      ]
    },
    {
      id: 'sicherheit',
      speaker: 'Dachs Daria',
      title: 'Datensicherheit im Alltag',
      pages: [
        'Datensicherheit beginnt mit dem Datengeheimnis: Personenbezogene Daten und zugeordnete Merkmale, die im Arbeitsverhältnis bekannt werden, sind geheim zu halten. Unbefugte dürfen weder Einsicht erhalten noch Daten verwenden.',
        'Unbekannte oder geschenkte USB-Sticks sind riskant. Sie können mit Schadsoftware infiziert sein und gehören nicht ungeprüft an Firmenrechner.',
        'Bei E-Mails ist Vorsicht nötig: Phishing arbeitet mit falschen Absendern, Druck, ungewöhnlichen Links und Anhängen. Lieber einmal mehr nachfragen und im Zweifel die IT einschalten.',
        'Passwörter gehören nicht auf Post-its, in unverschlüsselte Dateien oder unverschlüsselt per E-Mail. Gute Passwörter sind lang und möglichst einzigartig.',
        'Offen liegende Notizen, Notebooks und Smartphones laden zu Shoulder Surfing ein. Besonders auf Reisen oder in der Öffentlichkeit hilft Aufräumen, Sichtschutz und bei Bedarf eine Webcam-Abdeckung.',
        'Apps und Programme sollten nur aus vertrauenswürdigen Quellen stammen oder nach Rücksprache mit der IT installiert werden. Updates schließen bekannte Sicherheitslücken.',
        'Beim Surfen auf HTTPS achten, nur vertrauenswürdige Netzwerke verwenden und öffentliche Netze meiden. Ohne HTTPS können Daten im Klartext mitgelesen werden.',
        'Clean Desk und Clean Screen zählen ebenfalls: Dokumente wegräumen, Bildschirm sperren, Whiteboards reinigen, Besucher begleiten und Ausdrucke sofort vom Drucker holen.',
        'Wenn ein Sicherheitsvorfall vermutet wird, ein Konto kompromittiert scheint oder unklar ist, ob eine Nachricht Phishing ist, sofort die IT kontaktieren.'
      ],
      quiz: [
        { q: 'Was ist bei einem gefundenen USB-Stick richtig?', options: ['Nicht einstecken und Rücksprache halten', 'Einfach testen', 'An den Drucker anschließen'], correct: 0 },
        { q: 'Was ist eine gute Sicherheitsroutine?', options: ['Bildschirm sperren und Dokumente wegräumen', 'Passwort aufschreiben', 'Öffentliche WLANs bevorzugen'], correct: 0 },
        { q: 'Was sollte man bei Verdacht auf Phishing oder einen Vorfall tun?', options: ['Die IT kontaktieren', 'Ignorieren', 'Den Link trotzdem anklicken'], correct: 0 }
      ]
    }
  ];

  const boss = {
    pages: [
      { speaker: 'Jörg', title: 'Bosskampf', body: 'So, kleine Maus. Die Tiere haben dir viel erzählt. Jetzt will ich sehen, ob du die Zusammenhänge wirklich verstanden hast.' },
      { speaker: 'Jörg', title: 'Bosskampf', body: 'Die nächsten fünf Fragen sind schwerer. Es geht nicht nur um einzelne Begriffe, sondern um gutes Urteilsvermögen im Alltag.' }
    ],
    quiz: [
      { q: 'Warum ist die Kombination aus Name, Anschrift, Hobbys und E-Mail-Adresse besonders heikel?', options: ['Weil sie Identifizierung, Kontaktaufnahme und glaubwürdige Täuschung erleichtert', 'Weil Hobbys automatisch sensible Daten sind', 'Weil Anschriften nie gespeichert werden dürfen'], correct: 0 },
      { q: 'Welche Aussage trifft die Rolle des Verantwortlichen am besten?', options: ['Er trägt die Verantwortung für Zwecke, Mittel und Organisation der Verarbeitung', 'Er ist nur technischer Helfer', 'Er ist immer ein externer Dienstleister'], correct: 0 },
      { q: 'Warum reicht eine gute Absicht nie als Grundlage für Verarbeitung aus?', options: ['Weil eine konkrete Rechtsgrundlage und Information der Betroffenen nötig sind', 'Weil nur Verträge zählen', 'Weil Datenschutz nur für Behörden gilt'], correct: 0 },
      { q: 'Was verbindet Datenschutz und Datensicherheit im Arbeitsalltag am stärksten?', options: ['Nur notwendige Daten verarbeiten und sie organisatorisch wie technisch schützen', 'Möglichst viele Daten sammeln, damit man flexibel bleibt', 'Sensible Daten nur intern offen weitergeben'], correct: 0 },
      { q: 'Warum ist schnelles Melden von Datenschutzverletzungen wichtig?', options: ['Weil Schäden begrenzt, Pflichten erfüllt und Gegenmaßnahmen gestartet werden können', 'Weil sonst automatisch alle Daten gelöscht werden', 'Weil Meldungen nur aus Höflichkeit erfolgen'], correct: 0 }
    ]
  };

  const introPages = [
    { speaker: 'Katze', title: 'Ein Käse. Ein Tausch. Ein Fehler.', body: '„Na, kleine Maus? Für dieses Stück Käse brauche ich nur ein paar harmlose Infos: Vor- und Nachname, Anschrift, Hobbys und deine E-Mail-Adresse.“' },
    { speaker: 'Maus', title: 'Zu schnell vertraut', body: '„Nur dafür? Klingt doch harmlos ...“\n\nDie Maus plaudert los. Die Katze bekommt alles, was sie wollte, und der Käse wirkt plötzlich sehr teuer.' },
    { speaker: 'Erzählstimme', title: 'Was diese Daten wert sind', body: 'Schon diese Kombination reicht oft aus, um Menschen gezielt anzusprechen, glaubwürdige Phishing-Nachrichten zu schreiben, Profile zu bilden oder weitere Informationen zu erschleichen.' },
    { speaker: 'Erzählstimme', title: 'Die Schulung beginnt', body: 'Hilf der Maus jetzt dabei, Wissen aufzubauen, Risiken zu erkennen und sich die Kontrolle über ihre Daten zurückzuholen.' }
  ];

  const outroPages = [
    { speaker: 'Maus', title: 'Der Bescheid', body: '„Hier ist der Bescheid der Datenschutzbehörde. Daten sind kein Spielzeug – und schon gar nicht meine.“' },
    { speaker: 'Katze', title: 'Erwischt', body: 'Die Katze lässt den Kopf hängen. Ihr Grinsen ist verschwunden. Der schnelle Vorteil ist dahin.' },
    { speaker: 'Erzählstimme', title: 'Kontrolle zurückgewonnen', body: 'Die Maus hat verstanden, dass Datenschutz, Datensicherheit und klare Regeln zusammengehören. Wissen schützt – im Unternehmen ebenso wie im Alltag.' },
    { speaker: 'Maus', title: 'Geschafft', body: 'Die Kontrolle über die Daten ist zurück. Jetzt wartet dein Abschlussbildschirm.' }
  ];

  const el = {
    lives: document.getElementById('lives'),
    timer: document.getElementById('timer'),
    progress: document.getElementById('progress'),
    hint: document.getElementById('hint'),
    world: document.getElementById('world'),
    worldSign: document.getElementById('world-sign'),
    stations: Array.from(document.querySelectorAll('.station')),
    mouse: document.getElementById('mouse'),
    startScreen: document.getElementById('start-screen'),
    startBtn: document.getElementById('start-btn'),
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
    resultScreen: document.getElementById('result-screen'),
    resultText: document.getElementById('result-text'),
    bestTime: document.getElementById('best-time'),
    finalTime: document.getElementById('final-time'),
    finalLives: document.getElementById('final-lives'),
    finalScore: document.getElementById('final-score'),
    retryBtn: document.getElementById('retry-btn')
  };

  const state = {
    seconds: 0,
    timerId: null,
    lives: 3,
    score: 0,
    completed: new Set(),
    started: false,
    mouseX: 8,
    mouseY: 78,
    bestTime: window.localStorage.getItem('dq_best_time_v10') || '',
    bossDone: false,
    inBoss: false
  };

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
    el.progress.textContent = state.completed.size + ' / 8';
    el.bestTime.textContent = state.bestTime || '--:--';
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

  function openBubble(config) {
    el.bubbleLayer.classList.remove('hidden');
    el.bubbleSpeaker.textContent = config.speaker || '';
    el.bubbleTitle.textContent = config.title || '';
    el.bubbleBody.textContent = config.body || '';
    el.choiceStatus.textContent = '';
    el.bubbleChoices.innerHTML = '';
    el.bubbleChoices.classList.add('hidden');
    el.bubble.classList.remove('bubble-left', 'bubble-right', 'bubble-center');
    if (el.bubbleLayer.classList.contains('cutscene-mode')) {
      if (config.speaker === 'Katze' || config.speaker === 'Jörg') {
        el.bubble.classList.add('bubble-right');
      } else if (config.speaker === 'Erzählstimme') {
        el.bubble.classList.add('bubble-center');
      } else {
        el.bubble.classList.add('bubble-left');
      }
    }
    el.bubbleActions.innerHTML = '';
    (config.actions || []).forEach(function (action) {
      const button = document.createElement('button');
      button.className = action.primary ? 'primary' : 'secondary';
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      el.bubbleActions.appendChild(button);
    });
  }

  function closeBubble() {
    el.bubbleLayer.classList.add('hidden');
    el.bubbleChoices.innerHTML = '';
    el.bubbleActions.innerHTML = '';
    el.choiceStatus.textContent = '';
  }

  function showPagedDialog(pages, done, onPage) {
    let index = 0;
    function nextPage() {
      if (typeof onPage === 'function') onPage(index);
      const page = pages[index];
      openBubble({
        speaker: page.speaker,
        title: page.title,
        body: page.body,
        actions: [{
          label: index === pages.length - 1 ? 'Weiter' : 'Nächste Seite',
          primary: true,
          onClick: function () {
            playTone(640, 0.07, 'triangle', 0.02);
            index += 1;
            if (index >= pages.length) {
              closeBubble();
              if (done) done();
            } else {
              nextPage();
            }
          }
        }]
      });
    }
    nextPage();
  }

  function shuffledQuestion(question) {
    const entries = question.options.map(function (option, idx) {
      return { text: option, originalIndex: idx };
    });
    for (let i = entries.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = entries[i];
      entries[i] = entries[j];
      entries[j] = tmp;
    }
    return {
      q: question.q,
      options: entries.map(function (entry) { return entry.text; }),
      correct: entries.findIndex(function (entry) { return entry.originalIndex === question.correct; })
    };
  }

  function showQuiz(questionSet, onComplete) {
    let questionIndex = 0;
    function renderQuestion() {
      const question = shuffledQuestion(questionSet[questionIndex]);
      openBubble({ speaker: 'Quiz', title: question.q, body: 'Wähle genau eine Antwort aus und bestätige sie.', actions: [] });
      el.bubbleChoices.classList.remove('hidden');
      const name = 'question_' + questionIndex;
      question.options.forEach(function (option, idx) {
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

      const confirm = document.createElement('button');
      confirm.className = 'confirm-btn primary';
      confirm.textContent = 'Antwort bestätigen';
      confirm.addEventListener('click', function () {
        const selected = el.bubbleChoices.querySelector('input:checked');
        if (!selected) {
          el.choiceStatus.textContent = 'Bitte wähle zuerst eine Antwort aus.';
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
          el.choiceStatus.textContent = 'Richtig!';
          questionIndex += 1;
          window.setTimeout(function () {
            if (questionIndex >= questionSet.length) {
              closeBubble();
              onComplete(true);
            } else {
              renderQuestion();
            }
          }, 700);
        } else {
          state.lives -= 1;
          updateHud();
          playTone(190, 0.18, 'sawtooth', 0.03);
          el.choiceStatus.textContent = 'Leider falsch. Du verlierst ein Leben und musst diese Station wiederholen.';
          window.setTimeout(function () {
            closeBubble();
            onComplete(false);
          }, 1100);
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
    }, duration + 30);
  }

  function stationById(id) {
    return stations.find(function (station) { return station.id === id; });
  }

  function openStation(id, button) {
    const station = stationById(id);
    if (!station || state.completed.has(id) || state.inBoss) return;
    const x = parseFloat(button.style.left);
    const y = parseFloat(button.style.top) + 5;
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
            el.hint.textContent = station.speaker + ' ist abgeschlossen.';
            if (state.completed.size === stations.length) {
              window.setTimeout(showBossScreen, 300);
            }
          } else if (state.lives <= 0) {
            gameOver();
          } else {
            el.hint.textContent = 'Diese Station ist noch nicht geschafft.';
          }
        });
      });
    });
  }

  function setCutsceneStep(type, stepIndex) {
    el.cutsceneStage.className = 'cutscene-stage ' + type + '-step-' + (stepIndex + 1);
    if (type === 'intro') {
      el.cutNotice.classList.add('hidden');
    } else {
      el.cutNotice.classList.remove('hidden');
    }
  }

  function playCutscene(type, pages, onDone) {
    el.cutsceneScreen.classList.remove('hidden');
    if (type === 'intro') el.cutNotice.classList.add('hidden');
    if (type === 'outro') el.cutNotice.classList.remove('hidden');
    el.bubbleLayer.classList.add('cutscene-mode');
    showPagedDialog(pages, function () {
      el.cutsceneScreen.classList.add('hidden');
      el.cutsceneStage.className = 'cutscene-stage';
      el.bubbleLayer.classList.remove('cutscene-mode');
      el.bubble.classList.remove('bubble-left', 'bubble-right', 'bubble-center');
      if (onDone) onDone();
    }, function (index) {
      setCutsceneStep(type, index);
    });
  }

  function showBossScreen() {
    state.inBoss = true;
    el.worldSign.textContent = 'Alle Tiere sind geschafft';
    el.hint.textContent = 'Jörg wartet auf einem eigenen Screen.';
    el.bossScreen.classList.remove('hidden');
  }

  function launchBoss() {
    el.bossScreen.classList.add('hidden');
    showPagedDialog(boss.pages, function () {
      showQuiz(boss.quiz, function (ok) {
        if (ok) {
          state.score += 250;
          state.bossDone = true;
          playCutscene('outro', outroPages, finishGame);
        } else if (state.lives <= 0) {
          gameOver();
        } else {
          el.bossScreen.classList.remove('hidden');
          el.hint.textContent = 'Jörg wartet noch. Versuche es erneut.';
        }
      });
    });
  }

  function finishGame() {
    stopTimer();
    const current = formatTime(state.seconds);
    if (!state.bestTime || state.seconds < parseTime(state.bestTime)) {
      state.bestTime = current;
      window.localStorage.setItem('dq_best_time_v10', current);
    }
    el.resultText.textContent = 'Die Maus hat alle Themen verstanden, Jörg besiegt und sich mit dem Bescheid der Datenschutzbehörde die Kontrolle über ihre Daten zurückgeholt.';
    el.finalTime.textContent = current;
    el.finalLives.textContent = String(state.lives);
    el.finalScore.textContent = String(state.score);
    updateHud();
    el.resultScreen.classList.remove('hidden');
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
    el.worldSign.textContent = 'Datenschutzpfad';
    el.hint.textContent = 'Sprich mit den Tieren und sammle alle Themen ein.';
    el.stations.forEach(function (button) { button.classList.remove('completed'); });
    updateHud();
  }

  function gameOver() {
    stopTimer();
    showPagedDialog([
      { speaker: 'Erzählstimme', title: 'Alle Leben verloren', body: 'Die Maus braucht einen neuen Anlauf. Die Schulung startet komplett von vorn.' }
    ], resetGame);
  }

  function bindEvents() {
    el.startBtn.addEventListener('click', function () {
      unlockAudio();
      playTone(520, 0.1, 'triangle', 0.03);
      el.startScreen.classList.add('hidden');
      state.started = true;
      state.seconds = 0;
      updateHud();
      startTimer();
      playCutscene('intro', introPages, function () {
        el.hint.textContent = 'Sprich mit den Tieren in beliebiger Reihenfolge und sammle alle Themen ein.';
      });
    });

    el.stations.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        if (!state.started || !el.bubbleLayer.classList.contains('hidden') || !el.cutsceneScreen.classList.contains('hidden') || !el.bossScreen.classList.contains('hidden')) return;
        openStation(button.dataset.id, button);
      });
    });

    el.world.addEventListener('click', function (event) {
      if (!state.started || !el.bubbleLayer.classList.contains('hidden') || !el.cutsceneScreen.classList.contains('hidden') || !el.bossScreen.classList.contains('hidden')) return;
      if (event.target.closest('.station')) return;
      const rect = el.world.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      moveMouseTo(Math.max(6, Math.min(94, x)), Math.max(24, Math.min(84, y)));
    });

    el.bossBtn.addEventListener('click', function () {
      unlockAudio();
      launchBoss();
    });

    el.retryBtn.addEventListener('click', resetGame);
  }

  bindEvents();
  updateHud();
})();
