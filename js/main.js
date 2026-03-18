import { introOverlayText, stations, bossFight } from './content.js';

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const WORLD_WIDTH = 8600;
const WORLD_HEIGHT = 720;

const state = {
  maxLives: 3,
  lives: 3,
  currentStation: 0,
  startTime: 0,
  elapsedMs: 0,
  bestTimeMs: Number(localStorage.getItem('dataQuestBestTimeMs') || 0),
  score: 0,
  stationStars: 0,
  bossDefeated: false,
  runStarted: false,
};

function resetRun() {
  state.lives = state.maxLives;
  state.currentStation = 0;
  state.startTime = 0;
  state.elapsedMs = 0;
  state.score = 0;
  state.stationStars = 0;
  state.bossDefeated = false;
  state.runStarted = false;
}

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function splitIntoPages(text, maxChars = 380) {
  const paragraphs = String(text)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (!paragraphs.length) return [''];

  const pages = [];
  let current = '';
  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (!current || candidate.length <= maxChars) {
      current = candidate;
    } else {
      pages.push(current);
      current = paragraph;
    }
  }
  if (current) pages.push(current);
  return pages;
}

class BaseScene extends Phaser.Scene {
  makeButton(x, y, width, height, label, onClick, options = {}) {
    const fill = options.fill ?? 0xffc857;
    const fontSize = options.fontSize ?? 26;
    const container = this.add.container(x, y).setScrollFactor(0);
    const shadow = this.add.rectangle(6, 8, width, height, 0x000000, 0.18).setOrigin(0.5);
    const bg = this.add.rectangle(0, 0, width, height, fill, 1).setOrigin(0.5).setStrokeStyle(4, 0x2b3b55);
    const text = this.add.text(0, 0, label, {
      fontFamily: 'Arial',
      fontSize: `${fontSize}px`,
      color: '#213047',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: width - 24 }
    }).setOrigin(0.5);
    container.add([shadow, bg, text]);

    bg.setInteractive({ useHandCursor: true });
    bg.on('pointerover', () => this.tweens.add({ targets: container, scaleX: 1.03, scaleY: 1.03, duration: 100 }));
    bg.on('pointerout', () => this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 100 }));
    bg.on('pointerdown', () => {
      this.playClick();
      this.tweens.add({ targets: container, y: y + 3, yoyo: true, duration: 80, onComplete: onClick });
    });

    return container;
  }

  playClick() {
    const ctx = this.sound?.context;
    if (!ctx || ctx.state !== 'running') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 420;
    gain.gain.value = 0.02;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  makeDialog({ title, pages, onFinish, nextLabel = 'Weiter', finishLabel = 'Weiter', width = 920, height = 420 }) {
    if (this.activeDialog) this.activeDialog.destroy(true);

    const depth = 1000;
    const root = this.add.container(0, 0).setDepth(depth).setScrollFactor(0);
    const dim = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.45)
      .setOrigin(0.5)
      .setInteractive();

    const shadow = this.add.rectangle(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 10, width, height, 0x000000, 0.24).setOrigin(0.5);
    const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, width, height, 0xfffcf2, 0.985)
      .setOrigin(0.5)
      .setStrokeStyle(6, 0x355070);
    const header = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - height / 2 + 42, width - 18, 62, 0x8ecae6, 1)
      .setOrigin(0.5);
    const titleText = this.add.text(GAME_WIDTH / 2 - width / 2 + 28, GAME_HEIGHT / 2 - height / 2 + 12, title, {
      fontFamily: 'Arial',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#213047',
      wordWrap: { width: width - 56 }
    });

    const textX = GAME_WIDTH / 2 - width / 2 + 32;
    const textY = GAME_HEIGHT / 2 - height / 2 + 92;
    const textWidth = width - 64;
    const textHeight = height - 180;

    const bodyText = this.add.text(textX, textY, '', {
      fontFamily: 'Arial',
      fontSize: '23px',
      color: '#213047',
      wordWrap: { width: textWidth },
      lineSpacing: 8,
      maxLines: 9
    });

    const pageIndicator = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + height / 2 - 62, '', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#355070',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const button = this.makeButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + height / 2 - 28, 280, 58, nextLabel, () => {
      if (pageIndex < safePages.length - 1) {
        pageIndex += 1;
        renderPage();
      } else {
        root.destroy(true);
        this.activeDialog = null;
        if (onFinish) onFinish();
      }
    }, { fill: 0x8ecae6 });
    button.setDepth(depth + 1);

    root.add([dim, shadow, bg, header, titleText, bodyText, pageIndicator]);

    const safePages = Array.isArray(pages) && pages.length ? pages : [''];
    let pageIndex = 0;
    const renderPage = () => {
      bodyText.setText(safePages[pageIndex]);
      pageIndicator.setText(`Seite ${pageIndex + 1} / ${safePages.length}`);
      button.list[2].setText(pageIndex === safePages.length - 1 ? finishLabel : nextLabel);
    };

    const maskShape = this.make.graphics().setScrollFactor(0).setDepth(depth + 1);
    maskShape.fillStyle(0xffffff, 1);
    maskShape.fillRect(textX, textY, textWidth, textHeight);
    bodyText.setMask(maskShape.createGeometryMask());
    root.add(maskShape);

    renderPage();
    this.activeDialog = root;
    root.add(button);
    return root;
  }

  makeQuestionDialog(questionData, index, total, onAnswer) {
    if (this.activeDialog) this.activeDialog.destroy(true);

    const width = 980;
    const height = 520;
    const depth = 1100;
    const root = this.add.container(0, 0).setDepth(depth).setScrollFactor(0);

    const dim = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.48)
      .setOrigin(0.5)
      .setInteractive();
    const shadow = this.add.rectangle(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 10, width, height, 0x000000, 0.24).setOrigin(0.5);
    const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, width, height, 0xfffcf2, 0.985)
      .setOrigin(0.5)
      .setStrokeStyle(6, 0x355070);
    const header = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - height / 2 + 42, width - 18, 62, 0xfcbf49, 1)
      .setOrigin(0.5);
    const title = this.add.text(GAME_WIDTH / 2 - width / 2 + 28, GAME_HEIGHT / 2 - height / 2 + 12, `Kontrollfrage ${index + 1} / ${total}`, {
      fontFamily: 'Arial',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#213047'
    });
    const question = this.add.text(GAME_WIDTH / 2 - width / 2 + 34, GAME_HEIGHT / 2 - height / 2 + 96, questionData.question, {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#213047',
      fontStyle: 'bold',
      wordWrap: { width: width - 68 },
      lineSpacing: 8
    });

    root.add([dim, shadow, bg, header, title, question]);

    questionData.options.forEach((option, i) => {
      const btn = this.makeButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40 + i * 92, 820, 70, option, () => {
        root.destroy(true);
        this.activeDialog = null;
        onAnswer(i === questionData.correct, questionData.explanation);
      }, { fill: 0xe9f5db, fontSize: 22 });
      btn.setDepth(depth + 1);
      root.add(btn);
    });

    this.activeDialog = root;
    return root;
  }
}

class BootScene extends BaseScene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.createTextures();
  }

  createTextures() {
    const g = this.add.graphics();

    g.clear();
    g.fillStyle(0x7e7e7e, 1);
    g.fillEllipse(32, 42, 40, 54);
    g.fillCircle(18, 26, 12);
    g.fillCircle(44, 24, 11);
    g.fillStyle(0xffc2d1, 1);
    g.fillCircle(18, 24, 5);
    g.fillCircle(44, 23, 5);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(26, 34, 5);
    g.fillCircle(37, 34, 5);
    g.fillStyle(0x000000, 1);
    g.fillCircle(27, 35, 2);
    g.fillCircle(38, 35, 2);
    g.fillStyle(0xff9aa2, 1);
    g.fillCircle(33, 42, 4);
    g.lineStyle(2, 0x3a3a3a, 1);
    g.beginPath(); g.moveTo(48, 42); g.lineTo(62, 38); g.moveTo(48, 44); g.lineTo(63, 44); g.moveTo(48, 46); g.lineTo(62, 50); g.strokePath();
    g.generateTexture('mouse', 72, 72);

    g.clear();
    g.fillStyle(0xc97a39, 1);
    g.fillEllipse(54, 62, 88, 72);
    g.fillCircle(62, 30, 34);
    g.fillTriangle(40, 10, 52, -14, 64, 10);
    g.fillTriangle(66, 10, 80, -14, 92, 10);
    g.fillStyle(0xffd7a1, 1);
    g.fillEllipse(64, 68, 48, 36);
    g.fillCircle(58, 32, 8);
    g.fillCircle(76, 32, 8);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(58, 38, 8);
    g.fillCircle(76, 38, 8);
    g.fillStyle(0x000000, 1);
    g.fillCircle(60, 40, 3);
    g.fillCircle(78, 40, 3);
    g.fillStyle(0xff9aa2, 1);
    g.fillCircle(90, 58, 7);
    g.lineStyle(3, 0x6f3e16, 1);
    g.beginPath(); g.moveTo(84, 58); g.lineTo(108, 52); g.moveTo(84, 60); g.lineTo(108, 60); g.moveTo(84, 62); g.lineTo(108, 68); g.strokePath();
    g.generateTexture('cat', 120, 110);

    g.clear();
    g.fillStyle(0xf4d35e, 1);
    g.fillTriangle(0, 54, 60, 0, 60, 108);
    g.lineStyle(3, 0xd4a017, 1);
    for (let y = 20; y < 96; y += 22) {
      g.beginPath();
      g.moveTo(20, y);
      g.lineTo(40, y + 10);
      g.strokePath();
    }
    g.generateTexture('cheese', 60, 108);

    g.clear();
    g.fillStyle(0x5aa469, 1);
    g.fillRoundedRect(0, 0, 180, 24, 10);
    g.generateTexture('platform', 180, 24);

    g.clear();
    g.fillStyle(0x7fb069, 1);
    g.fillRoundedRect(0, 0, 260, 26, 10);
    g.generateTexture('platform2', 260, 26);

    g.clear();
    g.fillStyle(0x8ecae6, 1);
    g.fillRoundedRect(0, 0, 74, 96, 10);
    g.fillStyle(0xfff3b0, 1);
    g.fillRoundedRect(8, 10, 58, 40, 8);
    g.fillStyle(0x355070, 1);
    g.fillRect(32, 96, 10, 56);
    g.generateTexture('station', 74, 152);

    g.clear();
    g.fillStyle(0xef476f, 1);
    g.fillRoundedRect(0, 0, 90, 120, 12);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(45, 36, 14);
    g.fillRect(40, 54, 10, 34);
    g.fillRect(22, 68, 46, 10);
    g.generateTexture('boss', 90, 120);

    g.destroy();
  }

  create() {
    this.scene.start('StartScene');
  }
}

class StartScene extends BaseScene {
  constructor() {
    super('StartScene');
  }

  create() {
    resetRun();
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x8fd3ff, 0x8fd3ff, 0xd9f1ff, 0xd9f1ff, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.fillStyle(0x9ad06d, 1);
    bg.fillEllipse(240, 640, 500, 180);
    bg.fillEllipse(1040, 650, 620, 200);
    bg.fillStyle(0xffffff, 0.85);
    bg.fillCircle(140, 110, 26);
    bg.fillCircle(176, 112, 30);
    bg.fillCircle(1210, 160, 28);
    bg.fillCircle(1245, 160, 22);

    this.add.image(1020, 505, 'cat').setScale(1.6);
    this.add.image(230, 540, 'mouse').setScale(1.6);
    this.add.image(620, 525, 'cheese').setScale(0.9).setRotation(-0.2);

    this.add.text(86, 82, 'Data Quest – Die Maus und das Geheimnis der Daten', {
      fontFamily: 'Arial', fontSize: '46px', fontStyle: 'bold', color: '#213047', wordWrap: { width: 1100 }
    });
    this.add.text(88, 152, 'DSGVO- und Datensicherheits-Schulung als 2D Jump\'n\'Run', {
      fontFamily: 'Arial', fontSize: '26px', color: '#213047'
    });

    this.add.text(88, 220, 'Lerne die Grundlagen, beantworte Fragen und stelle am Ende die Katze.', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047', wordWrap: { width: 860 }
    });

    this.makeButton(330, 430, 320, 72, 'Spiel starten', async () => {
      try { await this.sound.context.resume(); } catch (e) { /* ignore */ }
      this.scene.start('IntroScene');
    });
    this.makeButton(330, 525, 320, 64, 'Direkt zur Schulung', async () => {
      try { await this.sound.context.resume(); } catch (e) { /* ignore */ }
      this.scene.start('GameScene');
    }, { fill: 0x90e0ef, fontSize: 24 });
  }
}

class IntroScene extends BaseScene {
  constructor() {
    super('IntroScene');
  }

  create() {
    const sky = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xbde7ff).setOrigin(0.5);
    const hill1 = this.add.ellipse(300, 690, 720, 250, 0x8ecf68).setOrigin(0.5);
    const hill2 = this.add.ellipse(990, 710, 820, 260, 0x9ad06d).setOrigin(0.5);
    const desk = this.add.rectangle(640, 610, 1180, 170, 0xe9c46a).setStrokeStyle(5, 0x7f5539);
    const monitor = this.add.rectangle(640, 270, 860, 360, 0xf1faee).setStrokeStyle(8, 0x355070);
    const screen = this.add.rectangle(640, 270, 790, 290, 0xffffff).setStrokeStyle(2, 0x9bb1c8);
    const stand = this.add.rectangle(640, 460, 120, 28, 0x355070);
    const base = this.add.rectangle(640, 520, 260, 24, 0x355070);
    void sky; void hill1; void hill2; void desk; void monitor; void screen; void stand; void base;

    const mouse = this.add.image(420, 430, 'mouse').setScale(1.5);
    const cat = this.add.image(980, 440, 'cat').setScale(1.5).setFlipX(true);
    const cheese = this.add.image(850, 392, 'cheese').setScale(0.62).setVisible(false);

    const speech = this.add.text(640, 120, '', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047', backgroundColor: '#fff8', padding: { left: 14, right: 14, top: 10, bottom: 10 },
      wordWrap: { width: 860 }, align: 'center'
    }).setOrigin(0.5).setDepth(20);

    this.tweens.add({ targets: cat, x: 760, duration: 1600, ease: 'Sine.InOut' });

    this.time.delayedCall(500, () => speech.setText('Katze: „Ein Stück Käse gegen ein paar kleine Infos?“'));
    this.time.delayedCall(1800, () => {
      speech.setText('Maus: „Klar! Was willst du wissen?“');
      cheese.setVisible(true);
    });
    this.time.delayedCall(3000, () => speech.setText('Katze: „Name, Adresse, Hobbys und E-Mail reichen schon.“'));
    this.time.delayedCall(4300, () => {
      speech.setText('Die Maus willigt ein – und bekommt den Käse.');
      this.tweens.add({ targets: cheese, x: 500, y: 400, duration: 500, onComplete: () => mouse.setTint(0xfff2b2) });
    });
    this.time.delayedCall(5600, () => {
      speech.setText('Die Katze dreht sich weg und grinst hämisch.');
      cat.setFlipX(false);
      this.tweens.add({ targets: cat, x: 980, duration: 1300, ease: 'Sine.InOut' });
    });
    this.time.delayedCall(7300, () => {
      speech.destroy();
      this.makeDialog({
        title: introOverlayText.title,
        pages: splitIntoPages(introOverlayText.body, 500),
        finishLabel: 'Zur Schulung',
        onFinish: () => this.scene.start('GameScene')
      });
    });
  }
}

class GameScene extends BaseScene {
  constructor() {
    super('GameScene');
    this.stationSprites = [];
    this.stationText = [];
    this.busy = false;
    this.keys = null;
  }

  create() {
    this.busy = false;
    this.createWorld();
    this.createPlayer();
    this.createStations();
    this.createBossAndFinale();
    this.createHud();
    this.setupCamera();
    this.setupInput();

    if (!state.runStarted) {
      state.startTime = this.time.now;
      state.runStarted = true;
    }

    this.makeDialog({
      title: 'Willkommen zur Schulung',
      pages: [
        'Springe mit A/D oder den Pfeiltasten. Mit Leertaste, W oder Pfeil nach oben springst du.',
        'An jeder Station erhältst du die Inhalte in kurzen Dialogfenstern. Danach beantwortest du drei Fragen.',
        'Du hast drei Leben. Bei einer falschen Antwort verlierst du ein Leben und wiederholst die aktuelle Station. Sind alle Leben weg, beginnt die Schulung von vorn.'
      ],
      finishLabel: 'Los geht’s',
      onFinish: () => { this.busy = false; }
    });
    this.busy = true;
  }

  createWorld() {
    this.add.rectangle(WORLD_WIDTH / 2, 280, WORLD_WIDTH, 560, 0x8fd3ff).setOrigin(0.5);
    this.add.rectangle(WORLD_WIDTH / 2, 640, WORLD_WIDTH, 160, 0x9bd06e).setOrigin(0.5);

    const deco = this.add.graphics();
    for (let i = 0; i < 8; i += 1) {
      const x = 500 + i * 1000;
      deco.fillStyle(0xffffff, 0.18);
      deco.fillEllipse(x, 170, 250, 70);
      deco.fillStyle(0x7ebc59, 1);
      deco.fillEllipse(x, 660, 700, 160);
    }

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(WORLD_WIDTH / 2, 690, 'platform2').setScale(WORLD_WIDTH / 260, 1).refreshBody();

    const platformData = [
      [500, 575, 'platform2'], [900, 485, 'platform'], [1320, 430, 'platform2'],
      [1760, 535, 'platform2'], [2200, 470, 'platform'], [2580, 400, 'platform2'],
      [3100, 540, 'platform2'], [3500, 445, 'platform'], [3920, 385, 'platform2'],
      [4420, 525, 'platform2'], [4820, 455, 'platform'], [5200, 395, 'platform2'],
      [5740, 535, 'platform2'], [6180, 455, 'platform'], [6600, 395, 'platform2'],
      [7140, 535, 'platform2'], [7520, 455, 'platform'], [7900, 390, 'platform2']
    ];
    platformData.forEach(([x, y, key]) => this.platforms.create(x, y, key));

    // Themed zone labels in the background.
    stations.forEach((station) => {
      this.add.rectangle(station.x, 135, 520, 92, station.color, 0.22).setStrokeStyle(3, 0xffffff, 0.45);
      this.add.text(station.x, 134, station.theme, {
        fontFamily: 'Arial', fontSize: '28px', color: '#1d3557', fontStyle: 'bold', align: 'center',
        wordWrap: { width: 460 }
      }).setOrigin(0.5);
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(120, 610, 'mouse').setScale(1).setCollideWorldBounds(true);
    this.player.body.setSize(40, 54).setOffset(16, 10);
    this.player.body.setGravityY(850);
    this.physics.add.collider(this.player, this.platforms);
  }

  createStations() {
    this.stationGroup = this.physics.add.staticGroup();

    stations.forEach((station, index) => {
      const sign = this.stationGroup.create(station.x, 560, 'station');
      sign.stationIndex = index;
      sign.refreshBody();
      this.stationSprites.push(sign);

      const badge = this.add.rectangle(station.x, 515, 260, 42, station.color, 0.95).setStrokeStyle(3, 0x355070);
      const label = this.add.text(station.x, 515, station.title, {
        fontFamily: 'Arial', fontSize: '20px', color: '#213047', fontStyle: 'bold', align: 'center',
        wordWrap: { width: 240 }
      }).setOrigin(0.5);
      this.stationText.push({ badge, label });
    });

    this.physics.add.overlap(this.player, this.stationGroup, (_, sign) => {
      if (this.busy) return;
      const stationIndex = sign.stationIndex;
      if (stationIndex !== state.currentStation) return;
      this.openStation(stations[stationIndex]);
    });
  }

  createBossAndFinale() {
    this.boss = this.physics.add.staticSprite(8150, 542, 'boss');
    this.boss.visible = true;
    this.add.text(8150, 472, 'Jörg – Datenschutzboss', {
      fontFamily: 'Arial', fontSize: '24px', color: '#7f1d1d', fontStyle: 'bold', backgroundColor: '#fff8', padding: { left: 8, right: 8, top: 6, bottom: 6 }
    }).setOrigin(0.5);

    this.finalCat = this.physics.add.staticSprite(8450, 575, 'cat').setScale(1.4);
    this.add.text(8450, 470, 'Die Katze wartet …', {
      fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold', backgroundColor: '#fff8', padding: { left: 8, right: 8, top: 6, bottom: 6 }
    }).setOrigin(0.5);

    this.physics.add.overlap(this.player, this.boss, () => {
      if (this.busy || state.currentStation < stations.length || state.bossDefeated) return;
      this.openBossFight();
    });

    this.physics.add.overlap(this.player, this.finalCat, () => {
      if (this.busy || !state.bossDefeated) return;
      this.finishGame();
    });
  }

  createHud() {
    this.hudBg = this.add.rectangle(GAME_WIDTH / 2, 34, GAME_WIDTH - 40, 56, 0xffffff, 0.88)
      .setScrollFactor(0)
      .setStrokeStyle(3, 0x355070)
      .setDepth(500);

    this.livesText = this.add.text(30, 18, '', { fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold' })
      .setScrollFactor(0).setDepth(501);
    this.timerText = this.add.text(430, 18, '', { fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold' })
      .setScrollFactor(0).setDepth(501);
    this.progressText = this.add.text(770, 18, '', { fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold' })
      .setScrollFactor(0).setDepth(501);
    this.helpText = this.add.text(1110, 18, 'E = Station öffnen', { fontFamily: 'Arial', fontSize: '22px', color: '#355070', fontStyle: 'bold' })
      .setScrollFactor(0).setDepth(501);

    this.updateHud();
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(220, 120);
  }

  setupInput() {
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      e: Phaser.Input.Keyboard.KeyCodes.E
    });
  }

  update() {
    if (!this.player || this.busy) {
      this.updateHud();
      return;
    }

    const left = this.keys.left.isDown || this.keys.a.isDown;
    const right = this.keys.right.isDown || this.keys.d.isDown;
    const jump = Phaser.Input.Keyboard.JustDown(this.keys.space) || Phaser.Input.Keyboard.JustDown(this.keys.up) || Phaser.Input.Keyboard.JustDown(this.keys.w);
    const interact = Phaser.Input.Keyboard.JustDown(this.keys.e);

    if (left) {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
    } else if (right) {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (jump && this.player.body.blocked.down) {
      this.player.setVelocityY(-520);
    }

    if (interact) {
      const current = stations[state.currentStation];
      if (current && Phaser.Math.Distance.Between(this.player.x, this.player.y, current.x, 560) < 160) {
        this.openStation(current);
      } else if (state.currentStation >= stations.length && !state.bossDefeated && Phaser.Math.Distance.Between(this.player.x, this.player.y, this.boss.x, this.boss.y) < 170) {
        this.openBossFight();
      }
    }

    if (this.player.y > 760) {
      this.player.setPosition(Math.max(120, stations[Math.max(0, state.currentStation - 1)]?.x - 220 || 120), 540);
      this.player.setVelocity(0, 0);
    }

    this.updateHud();
  }

  updateHud() {
    const elapsed = state.runStarted ? state.elapsedMs + (this.time.now - state.startTime) : state.elapsedMs;
    this.livesText.setText(`Leben: ${'❤'.repeat(state.lives)}${'♡'.repeat(state.maxLives - state.lives)}`);
    this.timerText.setText(`Zeit: ${formatTime(elapsed)}`);
    const progress = state.bossDefeated ? 'Boss besiegt' : `Fortschritt: ${Math.min(state.currentStation, stations.length)} / ${stations.length}`;
    this.progressText.setText(progress);
  }

  openStation(station) {
    if (this.busy) return;
    this.busy = true;
    this.player.setVelocity(0, 0);
    this.makeDialog({
      title: station.title,
      pages: splitIntoPages(station.lesson, 440),
      finishLabel: 'Zu den Fragen',
      onFinish: () => this.runQuestions(station, 0)
    });
  }

  runQuestions(station, questionIndex) {
    const total = station.questions.length;
    this.makeQuestionDialog(station.questions[questionIndex], questionIndex, total, (correct, explanation) => {
      if (!correct) {
        state.lives -= 1;
        if (state.lives <= 0) {
          this.makeDialog({
            title: 'Keine Leben mehr',
            pages: ['Alle Leben sind verbraucht. Die Schulung startet nun von vorn.'],
            finishLabel: 'Neustart',
            onFinish: () => {
              resetRun();
              this.scene.restart();
            }
          });
          return;
        }
        this.makeDialog({
          title: 'Leider falsch',
          pages: [`${explanation}\n\nDu verlierst ein Leben und wiederholst diese Station.`],
          finishLabel: 'Station wiederholen',
          onFinish: () => this.openStation(station)
        });
        return;
      }

      if (questionIndex < total - 1) {
        this.makeDialog({
          title: 'Richtig',
          pages: [explanation],
          finishLabel: 'Nächste Frage',
          onFinish: () => this.runQuestions(station, questionIndex + 1)
        });
        return;
      }

      state.score += 300;
      state.stationStars += 1;
      state.currentStation += 1;
      const stationIdx = stations.indexOf(station);
      if (stationIdx >= 0 && this.stationText[stationIdx]) {
        this.stationText[stationIdx].badge.setFillStyle(0xb7e4c7, 1);
      }
      this.makeDialog({
        title: 'Station geschafft',
        pages: [`${explanation}\n\nGut gemacht. Die nächste Station ist nun freigeschaltet.`],
        finishLabel: state.currentStation >= stations.length ? 'Zum Bossbereich' : 'Weiter',
        onFinish: () => {
          this.busy = false;
        }
      });
    });
  }

  openBossFight() {
    if (this.busy) return;
    this.busy = true;
    this.makeDialog({
      title: bossFight.title,
      pages: splitIntoPages(bossFight.intro, 440),
      finishLabel: 'Bosskampf starten',
      onFinish: () => this.runBossQuestion(0)
    });
  }

  runBossQuestion(index) {
    this.makeQuestionDialog(bossFight.questions[index], index, bossFight.questions.length, (correct, explanation) => {
      if (!correct) {
        state.lives -= 1;
        if (state.lives <= 0) {
          this.makeDialog({
            title: 'Bosskampf verloren',
            pages: ['Jörg war zu stark. Alle Leben sind aufgebraucht – die Schulung beginnt wieder von vorn.'],
            finishLabel: 'Neustart',
            onFinish: () => {
              resetRun();
              this.scene.restart();
            }
          });
          return;
        }
        this.makeDialog({
          title: 'Nicht ganz',
          pages: [`${explanation}\n\nDu verlierst ein Leben und beginnst den Bosskampf erneut.`],
          finishLabel: 'Bosskampf wiederholen',
          onFinish: () => this.openBossFight()
        });
        return;
      }

      if (index < bossFight.questions.length - 1) {
        this.makeDialog({
          title: 'Richtig',
          pages: [explanation],
          finishLabel: 'Weiter',
          onFinish: () => this.runBossQuestion(index + 1)
        });
        return;
      }

      state.bossDefeated = true;
      state.score += 1000;
      this.boss.setVisible(false);
      this.makeDialog({
        title: 'Boss besiegt',
        pages: ['Jörg nickt respektvoll. Der Weg zur Katze ist frei. Hole dir jetzt die Kontrolle über die Daten zurück!'],
        finishLabel: 'Zum Finale',
        onFinish: () => { this.busy = false; }
      });
    });
  }

  finishGame() {
    this.busy = true;
    state.elapsedMs += this.time.now - state.startTime;
    state.runStarted = false;
    if (!state.bestTimeMs || state.elapsedMs < state.bestTimeMs) {
      state.bestTimeMs = state.elapsedMs;
      localStorage.setItem('dataQuestBestTimeMs', String(state.bestTimeMs));
    }
    this.makeDialog({
      title: 'Finale',
      pages: [
        'Die Maus erreicht die Katze und drückt ihr einen Bescheid der Datenschutzbehörde in die Hand.',
        'Die Katze ist geknickt. Die Maus freut sich: Wissen, Aufmerksamkeit und Datenschutz haben gesiegt.'
      ],
      finishLabel: 'Zum Ergebnis',
      onFinish: () => this.scene.start('ScoreScene')
    });
  }
}

class ScoreScene extends BaseScene {
  constructor() {
    super('ScoreScene');
  }

  create() {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xbde7ff).setOrigin(0.5);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 920, 520, 0xfffcf2).setStrokeStyle(6, 0x355070);
    this.add.text(GAME_WIDTH / 2, 150, 'Zertifikat', {
      fontFamily: 'Arial', fontSize: '50px', fontStyle: 'bold', color: '#213047'
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 230, 'Die Maus hat die Schulung erfolgreich absolviert.', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047'
    }).setOrigin(0.5);

    const lines = [
      `Zeit: ${formatTime(state.elapsedMs)}`,
      `Bestzeit: ${state.bestTimeMs ? formatTime(state.bestTimeMs) : '—'}`,
      `Punkte: ${state.score}`,
      `Verbleibende Leben: ${state.lives}`,
      `Gemeisterte Stationen: ${stations.length} + Boss`
    ];

    lines.forEach((line, i) => {
      this.add.text(GAME_WIDTH / 2, 310 + i * 42, line, {
        fontFamily: 'Arial', fontSize: '28px', color: '#213047', fontStyle: 'bold'
      }).setOrigin(0.5);
    });

    this.makeButton(GAME_WIDTH / 2, 570, 280, 70, 'Erneut spielen', () => {
      resetRun();
      this.scene.start('StartScene');
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#bde7ff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, StartScene, IntroScene, GameScene, ScoreScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
});

void game;
