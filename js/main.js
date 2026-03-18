(() => {
  'use strict';

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const menuEl = document.getElementById('menu');
  const dialogEl = document.getElementById('dialog');
  const quizEl = document.getElementById('quiz');
  const scoreEl = document.getElementById('score');
  const hudEl = document.getElementById('hud');
  const hudLives = document.getElementById('hud-lives');
  const hudTime = document.getElementById('hud-time');
  const hudProgress = document.getElementById('hud-progress');
  const hudHint = document.getElementById('hud-hint');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogPage = document.getElementById('dialog-page');
  const dialogPageIndicator = document.getElementById('dialog-pageIndicator');
  const dialogNextBtn = document.getElementById('dialog-nextBtn');
  const quizTitle = document.getElementById('quiz-title');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');
  const quizNextBtn = document.getElementById('quiz-nextBtn');
  const scoreText = document.getElementById('score-text');

  const W = 1280;
  const H = 720;
  const WORLD_WIDTH = 8800;
  const GROUND_Y = 610;
  const GRAVITY = 0.62;
  const PLAYER_SPEED = 5.2;
  const JUMP_SPEED = -12.8;

  const keys = new Set();
  let state = 'menu';
  let startTime = 0;
  let elapsedMs = 0;
  let bestTime = Number(localStorage.getItem('dq-best-time')) || 0;
  let cameraX = 0;
  let interactionLock = false;
  let audioReady = false;

  const player = {
    x: 180,
    y: GROUND_Y - 54,
    w: 52,
    h: 54,
    vx: 0,
    vy: 0,
    onGround: false,
    dir: 1,
    coyote: 0,
    jumpBuffer: 0,
  };

  const game = {
    lives: 3,
    progress: 0,
    score: 0,
    activeStation: null,
    stationIndex: 0,
    bossUnlocked: false,
    bossDone: false,
    completedStationIds: new Set(),
  };

  const platforms = [
    { x: 0, y: 640, w: WORLD_WIDTH, h: 80, kind: 'ground' },
    { x: 620, y: 540, w: 200, h: 22, kind: 'leaf' },
    { x: 960, y: 470, w: 210, h: 22, kind: 'leaf' },
    { x: 1500, y: 520, w: 220, h: 22, kind: 'leaf' },
    { x: 1840, y: 460, w: 220, h: 22, kind: 'leaf' },
    { x: 2550, y: 510, w: 240, h: 22, kind: 'leaf' },
    { x: 2920, y: 430, w: 210, h: 22, kind: 'leaf' },
    { x: 3600, y: 500, w: 240, h: 22, kind: 'leaf' },
    { x: 3980, y: 420, w: 220, h: 22, kind: 'leaf' },
    { x: 4700, y: 500, w: 220, h: 22, kind: 'leaf' },
    { x: 5070, y: 430, w: 220, h: 22, kind: 'leaf' },
    { x: 5790, y: 510, w: 240, h: 22, kind: 'leaf' },
    { x: 6150, y: 430, w: 220, h: 22, kind: 'leaf' },
    { x: 6920, y: 510, w: 230, h: 22, kind: 'leaf' },
    { x: 7270, y: 430, w: 200, h: 22, kind: 'leaf' },
    { x: 8040, y: 520, w: 160, h: 22, kind: 'boss' }
  ];

  const stations = [
    {
      id: 'grundrechte', x: 790, y: 474, zone: 0,
      title: 'Station 1 – Ursprung & Grundrechte',
      short: 'Grundrechte',
      pages: [
        'Datenschutz schützt nicht nur Dateien, sondern Menschen. Das Recht auf informationelle Selbstbestimmung bedeutet: Jede Person soll selbst entscheiden können, wer was über sie weiß.',
        'Die DSGVO fiel nicht vom Himmel. Ihre Wurzeln liegen im Schutz des Privatlebens, etwa in Art. 8 EMRK und in der EU-Grundrechtecharta.',
        'Datenschutz ist deshalb kein Bürokratie-Zusatz, sondern ein Grundrechtsschutz für Freiheit, Würde und Kontrolle über personenbezogene Daten.'
      ],
      questions: [
        { q: 'Was schützt die informationelle Selbstbestimmung?', a: ['Nur staatliche Register', 'Die Kontrolle über eigene personenbezogene Daten', 'Nur Gesundheitsakten'], correct: 1 },
        { q: 'Warum gibt es die DSGVO?', a: ['Um Datenhandel zu fördern', 'Um Menschen und ihre Persönlichkeitsrechte zu schützen', 'Damit jede Datenverarbeitung erlaubt ist'], correct: 1 },
        { q: 'Welche Aussage passt?', a: ['Datenschutz ist nur Technik', 'Datenschutz ist ein Grundrechtsschutz', 'Datenschutz betrifft nur Behörden'], correct: 1 }
      ]
    },
    {
      id: 'personenbezogene-daten', x: 1885, y: 394, zone: 1,
      title: 'Station 2 – Personenbezogene Daten', short: 'Personenbezogene Daten',
      pages: [
        'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen. Dazu zählen auch indirekte Merkmale wie eine IP-Adresse oder eine Kennnummer.',
        'Schon Name, Anschrift, Hobbys und E-Mail reichen oft, um eine Person zuzuordnen, anzusprechen oder ein Profil zu erstellen.',
        'Besonders sensible Daten – etwa Gesundheitsdaten, biometrische Daten oder politische Meinungen – stehen unter erhöhtem Schutz.'
      ],
      questions: [
        { q: 'Was sind personenbezogene Daten?', a: ['Nur Name und Adresse', 'Alle Infos über eine identifizierbare Person', 'Nur sensible Daten'], correct: 1 },
        { q: 'Welche Angabe ist personenbezogen?', a: ['Wetterbericht', 'IP-Adresse', 'Postfach eines Unternehmens ohne Personenbezug'], correct: 1 },
        { q: 'Welche Daten sind besonders sensibel?', a: ['Gesundheitsdaten', 'Lieblingsfarbe', 'Schuhgröße'], correct: 0 }
      ]
    },
    {
      id: 'rollen', x: 2930, y: 354, zone: 2,
      title: 'Station 3 – Rollen in der DSGVO', short: 'Rollen',
      pages: [
        'Der Verantwortliche entscheidet über Zweck und Mittel der Verarbeitung. Er ist rechtlich dafür verantwortlich, dass die Verarbeitung zulässig und sauber organisiert ist.',
        'Ein Auftragsverarbeiter verarbeitet Daten nur im Auftrag und nach Weisung des Verantwortlichen. Er darf die Daten nicht für eigene Zwecke nutzen.',
        'Wenn weitere Dienstleister eingeschaltet werden, spricht man von Subauftragsverarbeitern. Auch das muss geregelt und nachvollziehbar sein.'
      ],
      questions: [
        { q: 'Wer entscheidet über Zweck und Mittel der Verarbeitung?', a: ['Auftragsverarbeiter', 'Verantwortlicher', 'Betroffene Person'], correct: 1 },
        { q: 'Was darf ein Auftragsverarbeiter tun?', a: ['Daten frei weiterverkaufen', 'Nur nach Weisung im Auftrag verarbeiten', 'Selbst neue Zwecke festlegen'], correct: 1 },
        { q: 'Was ist ein Subauftragsverarbeiter?', a: ['Ein weiterer eingebundener Dienstleister', 'Die Datenschutzbehörde', 'Jede betroffene Person'], correct: 0 }
      ]
    },
    {
      id: 'rechtsgrundlagen', x: 4000, y: 344, zone: 3,
      title: 'Station 4 – Rechtsgrundlagen', short: 'Rechtsgrundlagen',
      pages: [
        'Datenverarbeitung ist nicht einfach so erlaubt. Sie braucht eine Rechtsgrundlage. Ein typischer Merksatz lautet: Verboten, außer es gibt eine tragfähige Grundlage.',
        'Zu den wichtigsten Grundlagen zählen Einwilligung, Vertragserfüllung, rechtliche Verpflichtung, lebenswichtige Interessen, öffentliche Aufgabe und berechtigte Interessen.',
        'Einwilligungen müssen informiert und freiwillig sein. Und auch bei einer Rechtsgrundlage gilt: Betroffene müssen transparent informiert werden.'
      ],
      questions: [
        { q: 'Wann ist Datenverarbeitung erlaubt?', a: ['Immer, wenn sie praktisch ist', 'Nur mit einer gültigen Rechtsgrundlage', 'Nur mit IT-Freigabe'], correct: 1 },
        { q: 'Welche Antwort nennt eine gültige Rechtsgrundlage?', a: ['Neugier', 'Einwilligung', 'Bequemlichkeit'], correct: 1 },
        { q: 'Welche Eigenschaft braucht eine Einwilligung?', a: ['Sie muss freiwillig und informiert sein', 'Sie muss geheim bleiben', 'Sie gilt immer unbegrenzt'], correct: 0 }
      ]
    },
    {
      id: 'betroffenenrechte', x: 5090, y: 354, zone: 4,
      title: 'Station 5 – Betroffenenrechte', short: 'Betroffenenrechte',
      pages: [
        'Betroffene Personen können gegenüber dem Verantwortlichen Rechte geltend machen. Dazu zählen Informationspflichten, Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.',
        'Diese Rechte sorgen dafür, dass Menschen nicht bloß Objekte einer Datenverarbeitung sind. Sie können nachfragen, korrigieren, begrenzen und widersprechen.',
        'Auch automatisierte Entscheidungen sind nicht grenzenlos zulässig. Menschen sollen nicht schutzlos nur nach Algorithmen behandelt werden.'
      ],
      questions: [
        { q: 'Welches Recht gehört zu den Betroffenenrechten?', a: ['Recht auf Auskunft', 'Recht auf Datenverkauf', 'Recht auf geheime Profile'], correct: 0 },
        { q: 'Was bedeutet Recht auf Löschung?', a: ['Daten in ein anderes Archiv legen', 'Unter Voraussetzungen die Löschung verlangen können', 'Daten heimlich verändern'], correct: 1 },
        { q: 'Wofür steht das Widerspruchsrecht?', a: ['Datenverarbeitung widersprechen können', 'Verträge kündigen', 'Jede E-Mail löschen'], correct: 0 }
      ]
    },
    {
      id: 'unternehmen', x: 6160, y: 354, zone: 5,
      title: 'Station 6 – Datenschutz im Unternehmen', short: 'Unternehmen',
      pages: [
        'Im Unternehmen dürfen Mitarbeitende personenbezogene Daten nur dann sehen oder nutzen, wenn das für ihre Aufgaben erforderlich ist. Rollen und Zugriffe müssen klar geregelt sein.',
        'Wer mit Daten arbeitet, muss auf Vertraulichkeit verpflichtet sein. Werden Dienstleister eingesetzt, braucht es Auftragsverarbeitungsvereinbarungen und klare Prozesse.',
        'Eine Datenschutzverletzung liegt vor, wenn Verfügbarkeit, Vertraulichkeit oder Richtigkeit personenbezogener Daten beeinträchtigt werden. Solche Vorfälle müssen gemeldet werden.'
      ],
      questions: [
        { q: 'Wer darf auf personenbezogene Daten zugreifen?', a: ['Alle im Unternehmen', 'Nur berechtigte Personen für ihre Aufgabe', 'Nur die Geschäftsführung'], correct: 1 },
        { q: 'Was ist eine Datenschutzverletzung?', a: ['Jede Sicherungskopie', 'Eine Beeinträchtigung von Verfügbarkeit, Vertraulichkeit oder Richtigkeit', 'Jede Besprechung'], correct: 1 },
        { q: 'Was ist bei eingesetzten Dienstleistern wichtig?', a: ['Mündliche Absprachen reichen', 'Auftragsverarbeitungsvereinbarung und klare Regeln', 'Keine Dokumentation'], correct: 1 }
      ]
    },
    {
      id: 'datensicherheit', x: 7280, y: 354, zone: 6,
      title: 'Station 7 – Datensicherheit im Alltag', short: 'Datensicherheit',
      pages: [
        'Datensicherheit beginnt im Alltag: unbekannte USB-Sticks nicht verwenden, auf Phishing achten, Passwörter nicht offen liegen lassen und sensible Inhalte nicht unverschlüsselt versenden.',
        'Ebenso wichtig sind Clean Desk, gesperrte Bildschirme, sichere HTTPS-Verbindungen, Updates und der vorsichtige Umgang mit Besuchern, Druckern und öffentlichen Netzwerken.',
        'Wer einen Sicherheitsvorfall vermutet oder sich bei einer verdächtigen E-Mail unsicher ist, sollte nicht rätseln, sondern die IT kontaktieren.'
      ],
      questions: [
        { q: 'Woran erkennt man Phishing eher?', a: ['Dringlichkeit, ungewöhnliche Links oder Anhänge', 'An einem netten Gruß', 'Am Firmenlogo'], correct: 0 },
        { q: 'Was ist ein gutes Passwortverhalten?', a: ['Auf Post-it schreiben', 'Langes, starkes Passwort und nicht offen teilen', 'Unverschlüsselt per E-Mail versenden'], correct: 1 },
        { q: 'Was ist bei Verdacht auf Sicherheitsvorfall richtig?', a: ['Abwarten', 'Die IT informieren', 'Öffentliche WLANs testen'], correct: 1 }
      ]
    }
  ];

  const boss = {
    x: 8220, y: 452,
    title: 'Bosskampf – Jörg, der Datenschutzboss',
    pages: [
      'Bevor die Maus die Katze erreicht, stellt sich Jörg in den Weg. Er prüft, ob du die Schulung wirklich verstanden hast. Jetzt kommen fünf schwerere Fragen.',
      'Hier zählt Präzision: Erst wenn alle fünf Fragen korrekt beantwortet sind, öffnet sich der Weg zum Finale.'
    ],
    questions: [
      { q: 'Welche Kombination beschreibt eine Datenschutzverletzung im Sinne der Folien am besten?', a: ['Nur Hackerangriffe', 'Beeinträchtigung von Verfügbarkeit, Vertraulichkeit oder Richtigkeit personenbezogener Daten', 'Nur versehentliche Löschung von Backups'], correct: 1 },
      { q: 'Warum reicht ein Passwortschutz für Word-, Excel- oder PDF-Dokumente laut Schulung nicht für Profis aus?', a: ['Weil Passwörter generell verboten sind', 'Weil solcher Schutz allein keinen umfassenden Sicherheitsstandard ersetzt', 'Weil nur Papierdokumente geschützt werden dürfen'], correct: 1 },
      { q: 'Welche Aussage trifft das TKG-/Direktwerbungs-Thema aus den Folien am besten?', a: ['Werbe-E-Mails sind immer erlaubt, wenn eine Adresse bekannt ist', 'Werbeanrufe oder Werbe-E-Mails ohne vorherige Einwilligung sind grundsätzlich unzulässig, mit engen Ausnahmen', 'B2B-Kommunikation ist immer ausgenommen'], correct: 1 },
      { q: 'Warum sind Besucher ohne Begleitung im Büro riskant?', a: ['Sie könnten Einsicht in interne Dokumente oder Bildschirme erhalten', 'Weil sie WLAN verbrauchen', 'Nur wegen Brandschutz'], correct: 0 },
      { q: 'Welche Aussage passt zur Rolle des Auftragsverarbeiters?', a: ['Er darf Daten auch zu eigenen Zwecken nutzen, solange sie im Unternehmen bleiben', 'Er verarbeitet nur im Auftrag, nach Weisung und nicht zu eigenen Zwecken', 'Er ersetzt automatisch den Verantwortlichen'], correct: 1 }
    ]
  };

  const finalePages = [
    'Die Maus erreicht die Katze und drückt ihr einen Bescheid der Datenschutzbehörde in die Pfote. Die Katze wird kleinlaut – Daten gegen Käse war keine gute Idee.',
    'Die Maus freut sich: Wer seine Rechte kennt, Risiken erkennt und sauber mit Daten umgeht, schützt Menschen und Unternehmen zugleich.'
  ];

  const introPages = [
    'Für ein kleines Stück Käse verrät die Maus Vor- und Nachnamen, ihre postalische Anschrift, Hobbys und E-Mail-Adressen. Was harmlos wirkt, ist in Wahrheit wertvoll.',
    'Diese Daten reichen oft aus, um eine Person zu identifizieren, glaubwürdige Phishing-Nachrichten zu schreiben, Profile zu bilden oder Vertrauen für Betrugsversuche auszunutzen.',
    'Darum ist das Recht auf informationelle Selbstbestimmung so wichtig: Menschen sollen selbst entscheiden können, wer was über sie weiß und wofür diese Informationen verwendet werden.',
    'Die DSGVO fiel nicht vom Himmel. Sie knüpft an Grundrechte an und schützt Privatleben, personenbezogene Daten und die Kontrolle durch unabhängige Stellen.'
  ];

  const zoneStyles = [
    { name: 'Grundrechte', sky: ['#bde7ff', '#eaf6ff'], hill: '#8fd16d', accent: '#f8d56d', deco: 'stars' },
    { name: 'Daten', sky: ['#caecff', '#eef8ff'], hill: '#7ecf7c', accent: '#7dd3fc', deco: 'city' },
    { name: 'Rollen', sky: ['#d5efff', '#f4fbff'], hill: '#88cb79', accent: '#c6a3ff', deco: 'factory' },
    { name: 'Rechtsgrundlagen', sky: ['#d7eafe', '#f6fbff'], hill: '#9ed07b', accent: '#ffd166', deco: 'columns' },
    { name: 'Rechte', sky: ['#d3f0ff', '#f7fdff'], hill: '#86d293', accent: '#7cc6ff', deco: 'archive' },
    { name: 'Unternehmen', sky: ['#d5ecff', '#f7fbff'], hill: '#8fd18a', accent: '#6ee7b7', deco: 'office' },
    { name: 'Sicherheit', sky: ['#d1e9ff', '#f4fbff'], hill: '#95d175', accent: '#ffb86b', deco: 'shield' },
    { name: 'Boss', sky: ['#dfe7ff', '#f6f7ff'], hill: '#8ec16a', accent: '#ff8b8b', deco: 'boss' }
  ];

  let activeDialog = null;
  let activeQuiz = null;
  let frameHandle = 0;
  let lastFrame = performance.now();

  function resetGame() {
    game.lives = 3;
    game.progress = 0;
    game.score = 0;
    game.activeStation = null;
    game.stationIndex = 0;
    game.bossUnlocked = false;
    game.bossDone = false;
    game.completedStationIds = new Set();
    player.x = 180;
    player.y = GROUND_Y - player.h;
    player.vx = 0;
    player.vy = 0;
    player.onGround = false;
    cameraX = 0;
    startTime = performance.now();
    elapsedMs = 0;
    updateHud();
  }

  function formatTime(ms) {
    const total = Math.floor(ms / 1000);
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateHud() {
    hudLives.textContent = '❤'.repeat(game.lives) + '♡'.repeat(Math.max(0, 3 - game.lives));
    hudTime.textContent = formatTime(elapsedMs);
    hudProgress.textContent = `${game.progress} / 7`;
    const next = stations.find((st) => !game.completedStationIds.has(st.id));
    hudHint.textContent = next ? `Nächste Station: ${next.short} · E interagieren` : (game.bossDone ? 'Zur Katze laufen!' : 'Bossbereich freigeschaltet');
  }

  function playTone(freq = 440, duration = 0.08, type = 'sine', gain = 0.03) {
    if (!audioReady) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!playTone.ctx) playTone.ctx = new AudioContext();
    const ac = playTone.ctx;
    if (ac.state === 'suspended') ac.resume();
    const osc = ac.createOscillator();
    const amp = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    amp.gain.value = gain;
    osc.connect(amp).connect(ac.destination);
    osc.start();
    amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
    osc.stop(ac.currentTime + duration);
  }

  function startGame(skipIntro) {
    audioReady = true;
    menuEl.classList.add('hidden');
    hudEl.classList.remove('hidden');
    resetGame();
    state = 'playing';
    if (!skipIntro) {
      state = 'cutscene';
      openDialog('Ein Käse. Ein Tausch. Ein Fehler.', introPages, () => { state = 'playing'; });
    }
    playTone(523, 0.1, 'triangle');
  }

  function openDialog(title, pages, onDone) {
    interactionLock = true;
    activeDialog = { title, pages, index: 0, onDone };
    dialogTitle.textContent = title;
    dialogPage.textContent = pages[0];
    dialogPageIndicator.textContent = `Seite 1 / ${pages.length}`;
    dialogNextBtn.textContent = pages.length > 1 ? 'Weiter' : 'Zur Frage';
    dialogEl.classList.remove('hidden');
  }

  dialogNextBtn.addEventListener('click', () => {
    if (!activeDialog) return;
    activeDialog.index += 1;
    playTone(660, 0.06, 'triangle', 0.02);
    if (activeDialog.index >= activeDialog.pages.length) {
      dialogEl.classList.add('hidden');
      const done = activeDialog.onDone;
      activeDialog = null;
      interactionLock = false;
      if (typeof done === 'function') done();
      return;
    }
    dialogPage.textContent = activeDialog.pages[activeDialog.index];
    dialogPageIndicator.textContent = `Seite ${activeDialog.index + 1} / ${activeDialog.pages.length}`;
    dialogNextBtn.textContent = activeDialog.index === activeDialog.pages.length - 1 ? 'Zur Frage' : 'Weiter';
  });

  function openQuiz(title, questions, onComplete, onFail, introNote = '') {
    interactionLock = true;
    activeQuiz = { title, questions, index: 0, onComplete, onFail, introNote };
    quizEl.classList.remove('hidden');
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    if (!activeQuiz) return;
    const item = activeQuiz.questions[activeQuiz.index];
    quizTitle.textContent = `${activeQuiz.title} – Frage ${activeQuiz.index + 1} / ${activeQuiz.questions.length}`;
    quizQuestion.textContent = activeQuiz.introNote && activeQuiz.index === 0 ? `${activeQuiz.introNote}\n\n${item.q}` : item.q;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    quizNextBtn.classList.add('hidden');
    item.a.forEach((answer, idx) => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
      quizOptions.appendChild(btn);
    });
  }

  function handleQuizAnswer(idx, button) {
    if (!activeQuiz) return;
    const item = activeQuiz.questions[activeQuiz.index];
    Array.from(quizOptions.children).forEach((btn, i) => {
      btn.disabled = true;
      if (i === item.correct) btn.classList.add('correct');
    });
    if (idx === item.correct) {
      quizFeedback.textContent = 'Richtig – weiter so.';
      quizFeedback.style.color = '#0f9f6e';
      playTone(880, 0.12, 'triangle', 0.03);
      activeQuiz.index += 1;
      if (activeQuiz.index >= activeQuiz.questions.length) {
        quizNextBtn.textContent = 'Abschließen';
      } else {
        quizNextBtn.textContent = 'Nächste Frage';
      }
      quizNextBtn.classList.remove('hidden');
    } else {
      button.classList.add('wrong');
      quizFeedback.textContent = 'Leider falsch – ein Leben geht verloren und die Station startet erneut.';
      quizFeedback.style.color = '#b91c1c';
      playTone(220, 0.2, 'sawtooth', 0.03);
      game.lives -= 1;
      updateHud();
      quizNextBtn.textContent = 'Station neu starten';
      quizNextBtn.classList.remove('hidden');
      activeQuiz.failed = true;
    }
  }

  quizNextBtn.addEventListener('click', () => {
    if (!activeQuiz) return;
    if (activeQuiz.failed) {
      const fail = activeQuiz.onFail;
      activeQuiz = null;
      quizEl.classList.add('hidden');
      interactionLock = false;
      if (game.lives <= 0) {
        state = 'cutscene';
        openDialog('Alle Leben verloren', [
          'Die Maus hat alle Leben verloren. Die gesamte Schulung startet von vorne – diesmal mit mehr Vorsicht und besserem Datenschutzwissen.'
        ], () => { state = 'playing'; resetGame(); });
        return;
      }
      if (typeof fail === 'function') fail();
      return;
    }

    if (activeQuiz.index >= activeQuiz.questions.length) {
      const complete = activeQuiz.onComplete;
      activeQuiz = null;
      quizEl.classList.add('hidden');
      interactionLock = false;
      if (typeof complete === 'function') complete();
      return;
    }
    renderQuizQuestion();
  });

  function triggerStation(station) {
    if (game.completedStationIds.has(station.id)) return;
    game.activeStation = station;
    state = 'cutscene';
    openDialog(station.title, station.pages, () => {
      openQuiz(station.title, station.questions,
        () => {
          game.completedStationIds.add(station.id);
          game.progress = game.completedStationIds.size;
          game.score += 100;
          playTone(990, 0.14, 'triangle');
          updateHud();
          state = 'playing';
          if (game.progress === stations.length) game.bossUnlocked = true;
        },
        () => { state = 'playing'; },
        'Beantworte jetzt drei Kontrollfragen. Bei einer falschen Antwort verlierst du ein Leben.'
      );
    });
  }

  function triggerBoss() {
    if (!game.bossUnlocked || game.bossDone) return;
    state = 'cutscene';
    openDialog(boss.title, boss.pages, () => {
      openQuiz(boss.title, boss.questions,
        () => {
          game.bossDone = true;
          game.score += 300;
          updateHud();
          state = 'playing';
        },
        () => { state = 'playing'; },
        'Bossprüfung: Diese Fragen sind schwieriger und prüfen vernetztes Verständnis.'
      );
    });
  }

  function triggerFinale() {
    state = 'cutscene';
    openDialog('Finale – Bescheid der Datenschutzbehörde', finalePages, () => {
      elapsedMs = performance.now() - startTime;
      if (!bestTime || elapsedMs < bestTime) {
        bestTime = elapsedMs;
        localStorage.setItem('dq-best-time', String(bestTime));
      }
      scoreText.textContent = `Zeit: ${formatTime(elapsedMs)} · Bestzeit: ${bestTime ? formatTime(bestTime) : '-'} · Punkte: ${game.score} · Verbleibende Leben: ${game.lives}`;
      scoreEl.classList.remove('hidden');
      hudEl.classList.add('hidden');
      state = 'score';
    });
  }

  document.getElementById('startIntroBtn').addEventListener('click', () => startGame(false));
  document.getElementById('skipIntroBtn').addEventListener('click', () => startGame(true));
  document.getElementById('retryBtn').addEventListener('click', () => {
    scoreEl.classList.add('hidden');
    menuEl.classList.remove('hidden');
    state = 'menu';
  });

  window.addEventListener('keydown', (e) => {
    if (['ArrowLeft','ArrowRight','Space','KeyE'].includes(e.code)) e.preventDefault();
    keys.add(e.code);
    if (e.code === 'Space') player.jumpBuffer = 8;
    if (e.code === 'KeyE' && state === 'playing' && !interactionLock) handleInteraction();
  });
  window.addEventListener('keyup', (e) => keys.delete(e.code));

  function nearestOpenStation() {
    return stations.find((st) => !game.completedStationIds.has(st.id) && Math.abs(player.x - st.x) < 90 && Math.abs(player.y - st.y) < 120);
  }

  function handleInteraction() {
    const station = nearestOpenStation();
    if (station) {
      triggerStation(station);
      return;
    }
    if (game.bossUnlocked && !game.bossDone && Math.abs(player.x - boss.x) < 90) {
      triggerBoss();
      return;
    }
    if (game.bossDone && Math.abs(player.x - 8610) < 120) {
      triggerFinale();
    }
  }

  function updatePlayer() {
    if (interactionLock || state !== 'playing') return;

    const left = keys.has('ArrowLeft') || keys.has('KeyA');
    const right = keys.has('ArrowRight') || keys.has('KeyD');
    player.vx = 0;
    if (left) { player.vx = -PLAYER_SPEED; player.dir = -1; }
    if (right) { player.vx = PLAYER_SPEED; player.dir = 1; }

    player.jumpBuffer = Math.max(0, player.jumpBuffer - 1);
    player.coyote = player.onGround ? 6 : Math.max(0, player.coyote - 1);
    if (player.jumpBuffer > 0 && player.coyote > 0) {
      player.vy = JUMP_SPEED;
      player.onGround = false;
      player.jumpBuffer = 0;
      player.coyote = 0;
      playTone(500, 0.05, 'square', 0.02);
    }

    player.vy += GRAVITY;
    player.x += player.vx;
    player.x = Math.max(20, Math.min(WORLD_WIDTH - player.w - 20, player.x));

    const prevBottom = player.y + player.h;
    player.y += player.vy;
    player.onGround = false;

    for (const p of platforms) {
      const overlapX = player.x + player.w > p.x && player.x < p.x + p.w;
      const landing = prevBottom <= p.y && player.y + player.h >= p.y;
      if (overlapX && landing && player.vy >= 0) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }

    if (player.y + player.h > H + 200) {
      player.x = Math.max(120, player.x - 120);
      player.y = GROUND_Y - player.h;
      player.vy = 0;
      game.lives -= 1;
      updateHud();
      playTone(180, 0.2, 'sawtooth', 0.03);
      if (game.lives <= 0) {
        state = 'cutscene';
        openDialog('Alle Leben verloren', ['Die Maus ist zu oft gefallen. Die Schulung startet neu.'], () => { state = 'playing'; resetGame(); });
      }
    }

    cameraX = Math.max(0, Math.min(player.x - W * 0.35, WORLD_WIDTH - W));
  }

  function drawRoundedRect(x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.lineWidth = 3; ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  function drawParallax() {
    const zoneWidth = WORLD_WIDTH / 8;
    const zone = Math.min(7, Math.floor((cameraX + W / 2) / zoneWidth));
    const style = zoneStyles[zone];
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, style.sky[0]);
    grad.addColorStop(1, style.sky[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Clouds
    for (let i = 0; i < 7; i++) {
      const x = ((i * 280) - (cameraX * 0.25) % 1700) - 100;
      const y = 90 + (i % 3) * 70;
      ctx.fillStyle = 'rgba(255,255,255,0.32)';
      ctx.beginPath();
      ctx.ellipse(x + 60, y, 80, 28, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 130, y + 12, 60, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Far hills
    ctx.fillStyle = style.hill;
    for (let i = 0; i < 5; i++) {
      const baseX = (i * 380) - (cameraX * 0.45 % 1900) - 120;
      ctx.beginPath();
      ctx.moveTo(baseX, 630);
      ctx.quadraticCurveTo(baseX + 140, 520, baseX + 300, 630);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = '#74b85b';
    ctx.fillRect(0, 610, W, 110);
  }

  function drawZoneDecorations() {
    const zoneWidth = 1100;
    for (let i = 0; i < 8; i++) {
      const sx = i * zoneWidth - cameraX;
      if (sx > W + 200 || sx < -zoneWidth) continue;
      const style = zoneStyles[i];
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = style.accent;
      if (style.deco === 'stars') {
        for (let n = 0; n < 6; n++) {
          const x = sx + 120 + n * 120;
          const y = 160 + (n % 2) * 60;
          ctx.beginPath();
          for (let k = 0; k < 5; k++) {
            const a = -Math.PI / 2 + k * Math.PI * 2 / 5;
            const r1 = 18, r2 = 8;
            ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1);
            ctx.lineTo(x + Math.cos(a + Math.PI / 5) * r2, y + Math.sin(a + Math.PI / 5) * r2);
          }
          ctx.closePath();
          ctx.fill();
        }
      } else if (style.deco === 'city') {
        for (let n = 0; n < 4; n++) ctx.fillRect(sx + 100 + n * 140, 280 - n * 20, 80, 180 + n * 20);
      } else if (style.deco === 'factory') {
        ctx.fillRect(sx + 140, 330, 220, 130); ctx.fillRect(sx + 190, 260, 44, 70); ctx.fillRect(sx + 280, 220, 44, 110);
      } else if (style.deco === 'columns') {
        for (let n = 0; n < 4; n++) ctx.fillRect(sx + 150 + n * 80, 260, 36, 210);
      } else if (style.deco === 'archive') {
        for (let n = 0; n < 4; n++) ctx.fillRect(sx + 130, 250 + n * 55, 240, 34);
      } else if (style.deco === 'office') {
        ctx.fillRect(sx + 120, 280, 270, 180); ctx.clearRect(sx + 160, 320, 70, 70); ctx.clearRect(sx + 280, 320, 70, 70);
      } else if (style.deco === 'shield') {
        ctx.beginPath(); ctx.moveTo(sx + 240, 190); ctx.lineTo(sx + 340, 230); ctx.lineTo(sx + 320, 350); ctx.lineTo(sx + 240, 420); ctx.lineTo(sx + 160, 350); ctx.lineTo(sx + 140, 230); ctx.closePath(); ctx.fill();
      } else if (style.deco === 'boss') {
        ctx.beginPath(); ctx.arc(sx + 250, 260, 120, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawPlatforms() {
    platforms.forEach((p) => {
      const x = p.x - cameraX;
      if (x > W + 100 || x + p.w < -100) return;
      if (p.kind === 'ground') return;
      drawRoundedRect(x, p.y, p.w, p.h, 12, p.kind === 'boss' ? '#db83a7' : '#89c567', '#4c6e4f');
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(x + 14, p.y + 4, p.w * 0.65, 6);
    });
  }

  function drawStation(station) {
    const x = station.x - cameraX;
    const y = station.y;
    const pulse = 0.5 + Math.sin(performance.now() * 0.004 + station.x) * 0.5;
    ctx.save();
    ctx.globalAlpha = 0.35 + pulse * 0.2;
    ctx.fillStyle = '#ffe082';
    ctx.beginPath();
    ctx.arc(x + 20, y + 34, 42 + pulse * 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawRoundedRect(x - 8, y + 58, 56, 80, 14, '#7dd3fc', '#36537a');
    drawRoundedRect(x - 24, y + 16, 88, 56, 16, '#fff4bc', '#36537a');
    ctx.fillStyle = '#23395b';
    ctx.font = 'bold 24px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(String(game.completedStationIds.has(station.id) ? '✓' : 'E'), x + 20, y + 52);

    drawRoundedRect(x - 70, y + 100, 180, 56, 18, 'rgba(255,255,255,0.88)', '#36537a');
    ctx.fillStyle = '#23395b';
    ctx.font = 'bold 15px system-ui';
    wrapCanvasText(station.short, x + 20, y + 122, 150, 18);
  }

  function drawBoss() {
    const x = boss.x - cameraX;
    const pulse = 0.7 + Math.sin(performance.now() * 0.005) * 0.3;
    ctx.save();
    ctx.globalAlpha = 0.22 + pulse * 0.16;
    ctx.fillStyle = '#ff7f7f';
    ctx.beginPath(); ctx.arc(x, boss.y + 18, 70 + pulse * 16, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // Jörg
    ctx.fillStyle = '#283d5e';
    ctx.beginPath(); ctx.arc(x, boss.y - 20, 28, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(x - 24, boss.y + 6, 48, 68);
    ctx.fillStyle = '#fff'; ctx.fillRect(x - 20, boss.y + 16, 40, 12);
    ctx.fillStyle = '#f9c0a7'; ctx.beginPath(); ctx.arc(x, boss.y - 22, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#23395b'; ctx.lineWidth = 3; ctx.strokeRect(x - 16, boss.y - 26, 14, 10); ctx.strokeRect(x + 2, boss.y - 26, 14, 10); ctx.beginPath(); ctx.moveTo(x - 2, boss.y - 21); ctx.lineTo(x + 2, boss.y - 21); ctx.stroke();
    drawRoundedRect(x - 115, boss.y + 86, 230, 60, 18, 'rgba(255,255,255,0.92)', '#425c80');
    ctx.fillStyle = '#23395b'; ctx.font = 'bold 20px system-ui'; ctx.textAlign = 'center'; ctx.fillText('Jörg, der Datenschutzboss', x, boss.y + 123);
  }

  function drawCatAndFinalGate() {
    const x = 8610 - cameraX;
    // podium
    drawRoundedRect(x - 40, 520, 220, 22, 10, '#c3a36a', '#6b5031');
    // cat
    ctx.fillStyle = '#da8d43';
    ctx.beginPath(); ctx.ellipse(x + 70, 470, 52, 48, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 68, 420, 34, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + 46, 392); ctx.lineTo(x + 60, 360); ctx.lineTo(x + 72, 392); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + 88, 392); ctx.lineTo(x + 104, 360); ctx.lineTo(x + 114, 392); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 58, 418, 10, 0, Math.PI * 2); ctx.arc(x + 82, 418, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x + 59, 420, 4, 0, Math.PI * 2); ctx.arc(x + 81, 420, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#7b4a1d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 92, 432); ctx.lineTo(x + 122, 426); ctx.moveTo(x + 90, 438); ctx.lineTo(x + 122, 438); ctx.moveTo(x + 90, 444); ctx.lineTo(x + 122, 450); ctx.stroke();
    drawRoundedRect(x - 26, 540, 260, 72, 18, 'rgba(255,255,255,0.92)', '#425c80');
    ctx.fillStyle = '#23395b'; ctx.font = 'bold 20px system-ui'; ctx.fillText(game.bossDone ? 'Finale: Zur Katze!' : 'Erst Jörg besiegen', x + 104, 585);
  }

  function drawPlayer() {
    const x = player.x - cameraX;
    const bob = Math.sin(performance.now() * 0.015) * (player.onGround ? 1 : 0);
    // tail
    ctx.strokeStyle = '#3a475c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 40, player.y + 36); ctx.quadraticCurveTo(x + 60, player.y + 18 + bob, x + 72, player.y + 28); ctx.stroke();
    // body
    ctx.fillStyle = '#8b8f9b';
    ctx.beginPath(); ctx.ellipse(x + 26, player.y + 36, 22, 24, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 26, player.y + 18 + bob, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f7b8c6'; ctx.beginPath(); ctx.arc(x + 16, player.y + 8 + bob, 8, 0, Math.PI * 2); ctx.arc(x + 36, player.y + 8 + bob, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 22, player.y + 18 + bob, 5, 0, Math.PI * 2); ctx.arc(x + 31, player.y + 18 + bob, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x + 22, player.y + 19 + bob, 2.5, 0, Math.PI * 2); ctx.arc(x + 31, player.y + 19 + bob, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f6a6b2'; ctx.beginPath(); ctx.arc(x + 27, player.y + 26 + bob, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#23395b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 34, player.y + 24 + bob); ctx.lineTo(x + 47, player.y + 20 + bob); ctx.moveTo(x + 34, player.y + 28 + bob); ctx.lineTo(x + 47, player.y + 28 + bob); ctx.moveTo(x + 34, player.y + 32 + bob); ctx.lineTo(x + 47, player.y + 36 + bob); ctx.stroke();
  }

  function wrapCanvasText(text, x, y, maxWidth, lineHeight) {
    const words = String(text).split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  }

  function drawZoneTitle() {
    const zoneWidth = WORLD_WIDTH / 8;
    const zone = Math.min(7, Math.floor((player.x + 200) / zoneWidth));
    const style = zoneStyles[zone];
    drawRoundedRect(410, 34, 460, 72, 18, 'rgba(255,255,255,0.68)', 'rgba(255,255,255,0.45)');
    ctx.fillStyle = '#23395b';
    ctx.font = 'bold 24px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(style.name, 640, 78);
  }

  function drawInteractionPrompt() {
    const station = nearestOpenStation();
    if (station) {
      drawRoundedRect(430, 560, 420, 58, 18, 'rgba(255,255,255,0.94)', '#425c80');
      ctx.fillStyle = '#23395b'; ctx.font = 'bold 22px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`E drücken: ${station.title}`, 640, 598);
      return;
    }
    if (game.bossUnlocked && !game.bossDone && Math.abs(player.x - boss.x) < 100) {
      drawRoundedRect(430, 560, 420, 58, 18, 'rgba(255,255,255,0.94)', '#425c80');
      ctx.fillStyle = '#23395b'; ctx.font = 'bold 22px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('E drücken: Bosskampf starten', 640, 598);
      return;
    }
    if (game.bossDone && Math.abs(player.x - 8610) < 120) {
      drawRoundedRect(430, 560, 420, 58, 18, 'rgba(255,255,255,0.94)', '#425c80');
      ctx.fillStyle = '#23395b'; ctx.font = 'bold 22px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('E drücken: Finale auslösen', 640, 598);
    }
  }

  function drawProgressRail() {
    const railX = 70, railY = 680, railW = 1140;
    drawRoundedRect(railX, railY, railW, 16, 8, 'rgba(255,255,255,0.55)', null);
    drawRoundedRect(railX, railY, railW * (game.progress / stations.length), 16, 8, '#ffd166', null);
    stations.forEach((st, idx) => {
      const x = railX + (idx / (stations.length - 1)) * railW;
      ctx.beginPath();
      ctx.fillStyle = game.completedStationIds.has(st.id) ? '#10b981' : '#cbd5e1';
      ctx.arc(x, railY + 8, 8, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    drawParallax();
    drawZoneDecorations();
    drawPlatforms();
    stations.forEach(drawStation);
    if (game.bossUnlocked) drawBoss();
    drawCatAndFinalGate();
    drawPlayer();
    drawZoneTitle();
    drawProgressRail();
    drawInteractionPrompt();
  }

  function frame(now) {
    const dt = Math.min(32, now - lastFrame);
    lastFrame = now;
    if (state === 'playing') {
      elapsedMs = now - startTime;
      updatePlayer();
      updateHud();
    }
    render();
    frameHandle = requestAnimationFrame(frame);
  }

  function init() {
    cancelAnimationFrame(frameHandle);
    frameHandle = requestAnimationFrame(frame);
  }

  init();
})();
