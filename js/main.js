import { introOverlayText, stations, bossFight } from './content.js';

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const WORLD_WIDTH = 8600;

const state = {
  lives: 3,
  maxLives: 3,
  startTime: 0,
  elapsedMs: 0,
  bestTimeMs: Number(localStorage.getItem('dataQuestBestTimeMs') || 0),
  currentStation: 0,
  lastCheckpointX: 120,
  bossUnlocked: false,
  bossDefeated: false,
  audioEnabled: false,
  musicStarted: false,
  score: 0,
  stationStars: 0,
  cheesesCollected: 0,
  firstRunComplete: false,
  paused: false
};

function resetRun() {
  state.lives = state.maxLives;
  state.elapsedMs = 0;
  state.currentStation = 0;
  state.lastCheckpointX = 120;
  state.bossUnlocked = false;
  state.bossDefeated = false;
  state.startTime = 0;
  state.score = 0;
  state.stationStars = 0;
  state.cheesesCollected = 0;
  state.paused = false;
}

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const minutes = String(Math.floor(total / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

async function enableAudio(scene) {
  try {
    await scene.sound.context.resume();
  } catch (e) {
    console.warn('Audio context resume failed', e);
  }
  state.audioEnabled = true;
}

class BaseScene extends Phaser.Scene {
  createButton(x, y, w, h, label, onClick, fill = 0xffc857, fontSize = 24) {
    const container = this.add.container(x, y).setScrollFactor(0);
    const shadow = this.add.rectangle(4, 6, w, h, 0x000000, 0.18).setOrigin(0.5);
    const bg = this.add.rectangle(0, 0, w, h, fill).setStrokeStyle(4, 0x213047).setOrigin(0.5);
    const shine = this.add.rectangle(0, -h * 0.18, w - 12, h * 0.34, 0xffffff, 0.18).setOrigin(0.5);
    const text = this.add.text(0, 0, label, {
      fontFamily: 'Arial', fontSize: `${fontSize}px`, color: '#213047', fontStyle: 'bold',
      align: 'center', wordWrap: { width: w - 26 }
    }).setOrigin(0.5);
    container.add([shadow, bg, shine, text]);
    bg.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.tweens.add({ targets: container, scaleX: 1.03, scaleY: 1.03, duration: 120 }))
      .on('pointerout', () => this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 120 }))
      .on('pointerdown', () => {
        this.playSfx('ok');
        this.tweens.add({ targets: container, y: y + 2, yoyo: true, duration: 80, onComplete: onClick });
      });
    return container;
  }

  panel(x, y, w, h, title, body, scrollable = false) {
    const container = this.add.container(x, y).setScrollFactor(0);
    const shadow = this.add.rectangle(10, 10, w, h, 0x000000, 0.22).setOrigin(0.5);
    const bg = this.add.rectangle(0, 0, w, h, 0xfffcf2, 0.98).setStrokeStyle(6, 0x355070).setOrigin(0.5);
    const header = this.add.rectangle(0, -h / 2 + 38, w - 18, 58, 0x8ecae6, 0.95).setOrigin(0.5);
    const titleText = this.add.text(-w / 2 + 28, -h / 2 + 14, title, {
      fontFamily: 'Arial', fontSize: '31px', color: '#213047', fontStyle: 'bold', wordWrap: { width: w - 56 }
    });
    const bodyText = this.add.text(-w / 2 + 28, -h / 2 + 78, body, {
      fontFamily: 'Arial', fontSize: '22px', color: '#213047', wordWrap: { width: w - 56 }, lineSpacing: 6
    });
    container.add([shadow, bg, header, titleText, bodyText]);
    if (scrollable) {
      container.setData('baseY', bodyText.y);
      bodyText.setInteractive(new Phaser.Geom.Rectangle(bodyText.x, bodyText.y, w - 56, h - 118), Phaser.Geom.Rectangle.Contains);
      const wheelHandler = (pointer, objects, dx, dy) => {
        if (!container.visible || !container.active) return;
        const minY = -Math.max(h * 0.95, bodyText.height - (h - 150));
        bodyText.y = Phaser.Math.Clamp(bodyText.y - dy * 0.3, minY, container.getData('baseY'));
      };
      this.input.on('wheel', wheelHandler);
      container.once('destroy', () => this.input.off('wheel', wheelHandler));
    }
    return container;
  }

  playSfx(key, config = {}) {
    if (!state.audioEnabled) return;
    const volumeMap = { music: 0.22, jump: 0.45, laugh: 0.55, wrong: 0.55, ok: 0.45, hit: 0.55, win: 0.62 };
    this.sound.play(key, { volume: volumeMap[key] || 0.5, ...config });
  }

  ensureMusic() {
    if (!state.audioEnabled || state.musicStarted) return;
    if (this.sound.get('music')) return;
    this.sound.play('music', { loop: true, volume: 0.22 });
    state.musicStarted = true;
  }

  stopMusic() {
    this.sound.stopByKey('music');
    state.musicStarted = false;
  }
}

class BootScene extends BaseScene {
  constructor() { super('BootScene'); }

  preload() {
    this.load.image('mouse', './assets/images/mouse.svg');
    this.load.image('cat', './assets/images/cat.svg');
    this.load.image('boss', './assets/images/boss.svg');
    this.load.image('cheese', './assets/images/cheese.svg');
    this.load.image('notice', './assets/images/notice.svg');
    this.load.image('sign', './assets/images/sign.svg');
    this.load.image('platform', './assets/images/platform.svg');
    this.load.image('bgSky', './assets/images/bg-sky.svg');
    this.load.image('bgHills', './assets/images/bg-hills.svg');
    this.load.image('bgCity', './assets/images/bg-city.svg');
    this.load.audio('jump', './assets/audio/jump.wav');
    this.load.audio('ok', './assets/audio/ok.wav');
    this.load.audio('wrong', './assets/audio/wrong.wav');
    this.load.audio('laugh', './assets/audio/laugh.wav');
    this.load.audio('win', './assets/audio/win.wav');
    this.load.audio('hit', './assets/audio/hit.wav');
    this.load.audio('music', './assets/audio/music-loop.wav');
    this.load.on('complete', () => this.createGeneratedAssets());
  }

  createGeneratedAssets() {
    const g = this.add.graphics();

    g.fillStyle(0xffffff).fillRoundedRect(0, 0, 920, 260, 26);
    g.lineStyle(6, 0x355070).strokeRoundedRect(0, 0, 920, 260, 26);
    g.generateTexture('speechWide', 920, 260);
    g.clear();

    g.fillStyle(0xffd166);
    g.beginPath();
    const pts = [20, 0, 26, 13, 40, 14, 29, 23, 34, 38, 20, 29, 6, 38, 11, 23, 0, 14, 14, 13];
    g.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
    g.closePath();
    g.fillPath();
    g.lineStyle(3, 0xd29d00).strokePath();
    g.generateTexture('star', 40, 40);
    g.clear();

    g.fillStyle(0xffffff, 0.2).fillEllipse(80, 28, 120, 22);
    g.fillStyle(0xffffff, 0.2).fillEllipse(250, 44, 160, 30);
    g.fillStyle(0xffffff, 0.22).fillEllipse(460, 36, 140, 24);
    g.generateTexture('mist', 600, 80);
    g.clear();

    g.fillStyle(0x6f1d1b).fillRoundedRect(0, 0, 120, 24, 10);
    g.fillStyle(0x99582a).fillRoundedRect(4, 2, 112, 18, 10);
    g.generateTexture('wood', 120, 24);
    g.clear();

    g.fillStyle(0xffffff, 0.95).fillCircle(44, 44, 44);
    g.fillStyle(0xdff2ff, 0.8).fillCircle(34, 34, 22);
    g.fillStyle(0xdff2ff, 0.8).fillCircle(58, 30, 18);
    g.generateTexture('cloudPuff', 88, 88);
    g.clear();

    g.fillStyle(0x4d908e).fillRoundedRect(0, 22, 110, 50, 18);
    g.fillStyle(0x90be6d).fillRoundedRect(6, 0, 98, 44, 16);
    g.lineStyle(4, 0x355070).strokeRoundedRect(6, 0, 98, 44, 16);
    g.fillStyle(0xffffff).fillCircle(24, 18, 8);
    g.fillStyle(0xffffff).fillCircle(50, 18, 8);
    g.fillStyle(0xffffff).fillCircle(76, 18, 8);
    g.generateTexture('movingPlatform', 110, 72);
    g.clear();

    g.fillStyle(0xe63946).fillCircle(24, 24, 22);
    g.fillStyle(0xffffff).fillRect(21, 10, 6, 18);
    g.fillRect(21, 32, 6, 6);
    g.generateTexture('alertDot', 48, 48);
    g.clear();

    g.fillStyle(0x2a9d8f).fillRoundedRect(0, 0, 86, 86, 20);
    g.lineStyle(5, 0xffffff).strokeRoundedRect(10, 18, 66, 46, 14);
    g.lineStyle(5, 0xffffff).strokeCircle(43, 38, 12);
    g.lineStyle(5, 0xffffff).strokeLineShape(new Phaser.Geom.Line(26, 62, 60, 62));
    g.generateTexture('shieldBadge', 86, 86);
    g.clear();

    g.fillStyle(0x264653).fillRoundedRect(0, 0, 340, 20, 10);
    g.generateTexture('progressBarBg', 340, 20);
    g.clear();

    g.fillStyle(0xffd166).fillRoundedRect(0, 0, 340, 20, 10);
    g.generateTexture('progressBarFill', 340, 20);
    g.clear();

    g.fillStyle(0xffffff, 0.8).fillCircle(6, 6, 6);
    g.generateTexture('spark', 12, 12);
    g.clear();

    g.fillStyle(0xe9c46a).fillRoundedRect(0, 0, 24, 34, 4);
    g.fillStyle(0xf4a261).fillRect(4, 4, 16, 4);
    g.fillRect(4, 12, 16, 4);
    g.fillRect(4, 20, 10, 4);
    g.generateTexture('paperTiny', 24, 34);
    g.clear();

    g.fillStyle(0xfff7d6).fillRoundedRect(0, 0, 760, 420, 24);
    g.lineStyle(8, 0x8b6f47).strokeRoundedRect(0, 0, 760, 420, 24);
    g.lineStyle(2, 0xc8b27b).strokeRoundedRect(20, 20, 720, 380, 18);
    g.fillStyle(0xf1e0a6).fillCircle(660, 90, 54);
    g.lineStyle(8, 0x8b6f47).strokeCircle(660, 90, 54);
    g.lineStyle(6, 0x8b6f47).strokeCircle(660, 90, 38);
    g.generateTexture('certificate', 760, 420);
    g.clear();

    g.fillStyle(0xffd166).fillCircle(46, 46, 44);
    g.lineStyle(6, 0xffffff).strokeCircle(46, 46, 30);
    g.lineStyle(6, 0xffffff).strokeLineShape(new Phaser.Geom.Line(46, 20, 46, 72));
    g.lineStyle(6, 0xffffff).strokeLineShape(new Phaser.Geom.Line(20, 46, 72, 46));
    g.generateTexture('seal', 92, 92);
    g.clear();

    g.lineStyle(6, 0xff6b6b, 0.85).strokeCircle(64, 64, 54);
    g.lineStyle(3, 0xffd166, 0.65).strokeCircle(64, 64, 38);
    g.generateTexture('auraRing', 128, 128);
    g.clear();

    g.fillStyle(0xffffff).fillCircle(10, 10, 10);
    g.generateTexture('confetti', 20, 20);
    g.clear();

    g.fillStyle(0xffffff, 0.95).fillRoundedRect(0, 0, 26, 120, 12);
    g.generateTexture('lightBeam', 26, 120);
    g.destroy();
  }

  create() {
    this.scene.start('IntroScene');
  }
}

class IntroScene extends BaseScene {
  constructor() { super('IntroScene'); }

  create() {
    resetRun();
    this.stopMusic();

    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'bgSky').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    this.add.image(GAME_WIDTH / 2, 380, 'bgHills').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    this.add.image(GAME_WIDTH / 2, 420, 'bgCity').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    this.add.rectangle(GAME_WIDTH / 2, 646, GAME_WIDTH, 176, 0xb7e57f);
    this.add.rectangle(GAME_WIDTH / 2, 602, GAME_WIDTH, 56, 0x7ac74f, 0.35);

    for (let i = 0; i < 10; i += 1) {
      const cloud = this.add.image(130 + i * 120, 110 + (i % 3) * 36, 'cloudPuff').setScale(0.55 + (i % 4) * 0.08).setAlpha(0.75);
      this.tweens.add({ targets: cloud, x: cloud.x + 34, duration: 4600 + i * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }

    this.add.text(38, 30, 'Data Quest – Die Maus und das Geheimnis der Daten', {
      fontFamily: 'Arial', fontSize: '42px', color: '#213047', fontStyle: 'bold'
    });
    this.add.text(38, 84, 'DSGVO- und Datensicherheitsschulung als Comic-Jump’n’Run', {
      fontFamily: 'Arial', fontSize: '24px', color: '#213047'
    });

    const titlePanel = this.panel(640, 344, 860, 210,
      'Startsequenz',
      'Die Maus wird mit Käse gelockt und verrät persönliche Daten. Danach beginnt die Schulung. Der Stil ist spielerisch, die Inhalte sind fachlich sauber. Mit aktiviertem Audio wirken Intro, Bosskampf und Finale deutlich lebendiger.');

    const mouse = this.add.image(224, 552, 'mouse').setScale(0.95).setDepth(4);
    const cat = this.add.image(1100, 534, 'cat').setScale(0.95).setFlipX(true).setDepth(4);
    const cheese = this.add.image(900, 500, 'cheese').setScale(0.72).setAlpha(0).setDepth(5);
    const mist = this.add.tileSprite(640, 520, 1280, 80, 'mist').setAlpha(0.35);

    this.tweens.add({ targets: mist, tilePositionX: 200, duration: 12000, repeat: -1, ease: 'Linear' });
    this.tweens.add({ targets: mouse, y: '+=10', duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: cat, angle: { from: -2, to: 2 }, duration: 250, yoyo: true, repeat: -1 });

    const speech = this.add.container(640, 210).setScrollFactor(0).setVisible(false).setDepth(20);
    const bubble = this.add.image(0, 0, 'speechWide').setDisplaySize(930, 240);
    const speechText = this.add.text(-404, -74, '', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047', wordWrap: { width: 810 }, lineSpacing: 8
    });
    speech.add([bubble, speechText]);

    const overlay = this.panel(640, 348, 1020, 560, introOverlayText.title, introOverlayText.body, true).setVisible(false).setDepth(30);
    const overlayBtn = this.createButton(640, 620, 300, 66, 'Zur Schulung', async () => {
      await enableAudio(this);
      this.ensureMusic();
      this.scene.start('PlayScene');
    }, 0x8ecae6).setVisible(false).setDepth(31);

    const introSequence = async () => {
      titlePanel.setVisible(false);
      await enableAudio(this);
      this.ensureMusic();
      this.tweens.add({ targets: cat, x: 804, duration: 2200, ease: 'Sine.easeInOut' });
      this.time.delayedCall(500, () => {
        speech.setVisible(true);
        speechText.setText('Katze: „Ein Stück Käse gegen ein paar kleine Infos? Vorname, Nachname, Anschrift, Hobbys und E-Mail genügen völlig.“');
      });
      this.time.delayedCall(2850, () => {
        speechText.setText('Maus: „Ein bisschen Käse dafür? Klingt fair …“');
        this.tweens.add({ targets: cheese, alpha: 1, y: 490, duration: 240 });
        this.playSfx('ok');
      });
      this.time.delayedCall(4400, () => {
        speechText.setText('Die Maus willigt ein. Die Katze sammelt die Daten ein und schiebt den Käse herüber.');
        this.tweens.add({ targets: cheese, x: 344, y: 500, angle: 12, duration: 420, ease: 'Back.easeOut' });
      });
      this.time.delayedCall(6200, () => {
        speechText.setText('Dann dreht sich die Katze weg, grinst hämisch und verschwindet mit den neuen Informationen.');
        cat.setFlipX(false);
        this.playSfx('laugh');
        this.cameras.main.shake(280, 0.003);
        this.tweens.add({ targets: cat, x: 1180, duration: 1650, ease: 'Quad.easeIn' });
      });
      this.time.delayedCall(8600, () => {
        speech.setVisible(false);
        overlay.setVisible(true);
        overlayBtn.setVisible(true);
      });
    };

    this.createButton(330, 620, 300, 66, 'Intro abspielen', introSequence);
    this.createButton(640, 620, 250, 66, state.audioEnabled ? 'Audio aktiv' : 'Audio aktivieren', async () => {
      await enableAudio(this);
      this.ensureMusic();
      this.scene.restart();
    }, 0x90be6d);
    this.createButton(950, 620, 320, 66, 'Direkt zum Spiel', async () => {
      await enableAudio(this);
      this.ensureMusic();
      this.scene.start('PlayScene');
    }, 0xffb703);
  }
}

class PlayScene extends BaseScene {
  constructor() {
    super('PlayScene');
  }

  create() {
    if (!state.startTime) state.startTime = this.time.now;
    else state.startTime = this.time.now - state.elapsedMs;

    this.finished = false;
    this.blockingOverlay = false;
    this.zoneLabels = [];
    this.triggeredStations = new Set();
    this.movingPlatforms = [];
    this.decorTweens = [];
    this.cheeseItems = [];
    this.zoneLights = [];
    this.zonePanels = [];
    this.bossHp = 5;
    this.coyoteUntil = 0;
    this.jumpBufferUntil = 0;
    this.lastSafeGroundX = state.lastCheckpointX;

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);

    this.add.image(WORLD_WIDTH / 2, GAME_HEIGHT / 2, 'bgSky').setDisplaySize(WORLD_WIDTH, GAME_HEIGHT).setScrollFactor(0.2);
    this.hills = this.add.tileSprite(WORLD_WIDTH / 2, 330, WORLD_WIDTH, GAME_HEIGHT, 'bgHills').setScrollFactor(0.35);
    this.city = this.add.tileSprite(WORLD_WIDTH / 2, 392, WORLD_WIDTH, GAME_HEIGHT, 'bgCity').setScrollFactor(0.55).setAlpha(0.85);
    this.cloudMist = this.add.tileSprite(WORLD_WIDTH / 2, 210, WORLD_WIDTH, 100, 'mist').setScrollFactor(0.15).setAlpha(0.32);

    this.add.rectangle(WORLD_WIDTH / 2, 646, WORLD_WIDTH, 176, 0xb6e075);
    this.add.rectangle(WORLD_WIDTH / 2, 600, WORLD_WIDTH, 58, 0x78c850, 0.28);

    this.drawZoneBands();
    this.drawThemedBackgrounds();
    this.drawDecorations();
    this.buildGround();
    this.buildPlatformLayout();
    this.buildMovingPlatforms();
    this.spawnCheeseCollectibles();

    this.player = this.physics.add.image(state.lastCheckpointX, 560, 'mouse').setScale(0.82).setDepth(5);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(94, 68).setOffset(30, 34);
    this.player.setBounce(0.02);

    this.physics.add.collider(this.player, this.platforms);
    this.movingPlatforms.forEach((platform) => {
      this.physics.add.collider(this.player, platform.sprite);
    });

    this.goalCat = this.physics.add.staticImage(8280, 554, 'cat').setScale(0.95).setFlipX(true).setDepth(5);
    this.notice = this.add.image(8210, 508, 'notice').setScale(0.8).setVisible(false).setDepth(6);
    this.bossAura = this.add.image(7820, 548, 'auraRing').setScale(0.8).setVisible(false).setDepth(4).setAlpha(0.75);
    this.bossAura2 = this.add.image(7820, 548, 'auraRing').setScale(1.1).setVisible(false).setDepth(4).setAlpha(0.35).setTint(0xffd166);
    this.boss = this.physics.add.staticImage(7820, 548, 'boss').setScale(0.9).setVisible(false).setDepth(5);
    this.bossBarrier = this.add.rectangle(7932, 540, 36, 230, 0xe63946, 0.42).setVisible(false).setDepth(4);
    this.bossLights = [
      this.add.image(7750, 468, 'lightBeam').setVisible(false).setDepth(3).setTint(0xff6b6b).setAlpha(0.6),
      this.add.image(7890, 468, 'lightBeam').setVisible(false).setDepth(3).setTint(0xffd166).setAlpha(0.6)
    ];

    this.stationGroup = this.physics.add.staticGroup();
    this.stationStars = [];
    this.stationFlags = [];
    stations.forEach((station, index) => {
      const sign = this.stationGroup.create(station.x, 610, 'sign').setScale(0.82);
      sign.stationIndex = index;
      this.add.text(station.x, 594, String(index + 1), {
        fontFamily: 'Arial', fontSize: '28px', color: '#213047', fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(6);
      this.add.text(station.x, 650, station.theme, {
        fontFamily: 'Arial', fontSize: '18px', color: '#213047', wordWrap: { width: 200 }, align: 'center'
      }).setOrigin(0.5).setDepth(6);
      const star = this.add.image(station.x, 534, 'star').setScale(0.9).setAlpha(0.25).setDepth(6);
      const flag = this.add.image(station.x + 72, 528, 'shieldBadge').setScale(0.52).setAlpha(0.18).setDepth(6);
      this.stationStars.push(star);
      this.stationFlags.push(flag);
      this.tweens.add({ targets: star, y: '+=10', duration: 900 + index * 80, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: flag, angle: { from: -5, to: 5 }, duration: 800 + index * 60, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });

    this.zoneLabels.forEach((label) => {
      this.tweens.add({ targets: label, y: '+=6', duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
    this.tweens.add({ targets: this.goalCat, angle: { from: -2, to: 2 }, duration: 300, repeat: -1, yoyo: true });

    this.physics.add.overlap(this.player, this.stationGroup, (_, sign) => this.handleStation(sign.stationIndex));
    this.physics.add.overlap(this.player, this.boss, () => this.handleBossFight());
    this.physics.add.overlap(this.player, this.goalCat, () => this.handleEnding());
    this.cheeseItems.forEach((item) => this.physics.add.overlap(this.player, item, () => this.collectCheese(item)));

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,D,SPACE,H,ESC,P');
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.createUi();
    this.ensureMusic();
    this.showObjectiveToast('Erreiche Station 1 und starte die Schulung.');
  }

  buildGround() {
    this.platforms = this.physics.add.staticGroup();
    for (let x = 0; x < WORLD_WIDTH; x += 64) {
      this.platforms.create(x, 682, 'platform').refreshBody();
    }
  }

  buildPlatformLayout() {
    const layout = [
      [280, 560, 2], [470, 500, 3], [720, 450, 2], [980, 410, 3], [1260, 468, 2],
      [1520, 530, 2], [1730, 470, 3], [1980, 410, 2], [2250, 365, 2], [2500, 430, 3],
      [2820, 495, 2], [3040, 555, 2], [3310, 505, 3], [3600, 445, 2], [3890, 392, 2],
      [4160, 450, 2], [4440, 510, 2], [4700, 560, 2], [4960, 500, 2], [5230, 430, 3],
      [5570, 382, 2], [5850, 445, 2], [6140, 505, 2], [6410, 560, 2], [6650, 500, 3],
      [6980, 430, 2], [7260, 374, 2], [7500, 432, 2], [7740, 500, 2], [8010, 420, 3],
      [7600, 564, 2], [7845, 564, 2], [8085, 564, 2]
    ];
    layout.forEach(([x, y, count]) => {
      for (let i = 0; i < count; i += 1) {
        this.platforms.create(x + i * 62, y, 'platform').refreshBody();
      }
    });
  }

  buildMovingPlatforms() {
    const defs = [
      { x: 1120, y: 330, dx: 180, dy: 0, duration: 2400 },
      { x: 2860, y: 350, dx: 0, dy: -120, duration: 2200 },
      { x: 4620, y: 360, dx: 160, dy: 0, duration: 2000 },
      { x: 6350, y: 350, dx: 0, dy: -110, duration: 1800 },
      { x: 7420, y: 300, dx: 160, dy: 0, duration: 1900 }
    ];
    defs.forEach((def) => {
      const sprite = this.physics.add.image(def.x, def.y, 'movingPlatform').setImmovable(true).setAllowGravity(false).setDepth(4);
      sprite.body.moves = false;
      this.movingPlatforms.push({ sprite, def });
      this.tweens.add({
        targets: sprite,
        x: def.x + def.dx,
        y: def.y + def.dy,
        duration: def.duration,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        onUpdate: () => sprite.body.updateFromGameObject()
      });
    });
  }

  spawnCheeseCollectibles() {
    const positions = [
      [530, 430], [1540, 450], [2260, 300], [3360, 440], [4170, 400], [5060, 450], [5900, 395], [6720, 450], [7520, 370]
    ];
    positions.forEach(([x, y]) => {
      const cheese = this.physics.add.image(x, y, 'cheese').setScale(0.32).setAllowGravity(false).setImmovable(true).setDepth(5);
      cheese.body.moves = false;
      cheese.setData('collected', false);
      this.tweens.add({ targets: cheese, y: y - 12, duration: 900 + x % 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: cheese, angle: { from: -8, to: 8 }, duration: 600 + x % 300, yoyo: true, repeat: -1 });
      this.cheeseItems.push(cheese);
    });
  }

  drawZoneBands() {
    const zones = [
      { x: 620, title: 'Grundrechte', color: 0xffd166 },
      { x: 1600, title: 'Personenbezogene Daten', color: 0xf28482 },
      { x: 2550, title: 'Rollen', color: 0x84a59d },
      { x: 3500, title: 'Rechtsgrundlagen', color: 0x90be6d },
      { x: 4460, title: 'Betroffenenrechte', color: 0xc77dff },
      { x: 5440, title: 'Unternehmen', color: 0x4cc9f0 },
      { x: 6460, title: 'Datensicherheit', color: 0x06d6a0 },
      { x: 7820, title: 'Bosskampf', color: 0xe63946 }
    ];
    zones.forEach((zone) => {
      const bar = this.add.rectangle(zone.x, 90, 320, 52, zone.color, 0.85).setStrokeStyle(4, 0x213047).setDepth(3);
      const text = this.add.text(zone.x, 90, zone.title, {
        fontFamily: 'Arial', fontSize: '28px', color: '#213047', fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(4);
      this.zoneLabels.push(bar, text);
    });
  }

  drawThemedBackgrounds() {
    const zones = [
      { start: 0, end: 1100, title: 'Grundrechte', color: 0xfff3bf, accent: 0xffd166, icon: 'star' },
      { start: 1100, end: 2050, title: 'Personenbezogene Daten', color: 0xffe5e5, accent: 0xf28482, icon: 'paperTiny' },
      { start: 2050, end: 3000, title: 'Rollen', color: 0xe7f4ef, accent: 0x84a59d, icon: 'shieldBadge' },
      { start: 3000, end: 3960, title: 'Rechtsgrundlagen', color: 0xf1f9e8, accent: 0x90be6d, icon: 'paperTiny' },
      { start: 3960, end: 4920, title: 'Betroffenenrechte', color: 0xf7ebff, accent: 0xc77dff, icon: 'star' },
      { start: 4920, end: 5880, title: 'Unternehmen', color: 0xe4f6ff, accent: 0x4cc9f0, icon: 'shieldBadge' },
      { start: 5880, end: 7140, title: 'Datensicherheit', color: 0xe2fbf2, accent: 0x06d6a0, icon: 'alertDot' },
      { start: 7140, end: WORLD_WIDTH, title: 'Finale', color: 0xffece6, accent: 0xe76f51, icon: 'seal' }
    ];

    zones.forEach((zone, idx) => {
      const width = zone.end - zone.start;
      const mid = zone.start + width / 2;
      const band = this.add.rectangle(mid, 284, width, 310, zone.color, 0.22).setDepth(0);
      const ridge = this.add.rectangle(mid, 490, width, 24, zone.accent, 0.12).setDepth(0);
      this.zonePanels.push(band, ridge);

      for (let i = 0; i < 4; i += 1) {
        const light = this.add.rectangle(zone.start + 120 + i * (width / 4), 522 - (i % 2) * 18, 120, 180, zone.accent, 0.09).setDepth(0);
        this.zoneLights.push(light);
        this.tweens.add({ targets: light, alpha: { from: 0.05, to: 0.16 }, duration: 1200 + i * 180, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      }

      const plaque = this.add.rectangle(mid, 154, Math.min(360, width - 100), 74, zone.accent, 0.22).setStrokeStyle(4, 0x355070, 0.5).setDepth(1);
      const title = this.add.text(mid, 154, zone.title, {
        fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(2);
      const icon = this.add.image(mid - plaque.width / 2 + 36, 154, zone.icon).setScale(zone.icon === 'paperTiny' ? 1.3 : 0.48).setDepth(2);
      this.zoneLabels.push(plaque, title, icon);

      for (let i = 0; i < 5; i += 1) {
        const propX = zone.start + 100 + i * (width / 5);
        const base = this.add.rectangle(propX, 618, 72, 96 + (i % 3) * 22, zone.accent, 0.18).setStrokeStyle(3, 0x355070, 0.3).setDepth(1);
        const cap = this.add.rectangle(propX, base.y - base.height / 2 - 12, 82, 16, 0xffffff, 0.3).setDepth(1);
        const token = this.add.image(propX, base.y - 18, zone.icon).setScale(zone.icon === 'paperTiny' ? 1.1 : 0.34).setDepth(2).setAlpha(0.85);
        this.tweens.add({ targets: [base, cap, token], y: '-=3', duration: 900 + i * 90, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      }
    });
  }

  drawDecorations() {
    this.add.text(160, 636, '→ zum ersten Schild', {
      fontFamily: 'Arial', fontSize: '22px', color: '#213047', fontStyle: 'bold'
    }).setDepth(6);

    const decor = [
      [330, 612, 0xffd166, 'Grundrechte'], [1450, 610, 0xf28482, 'Daten'], [2400, 610, 0x84a59d, 'Rollen'], [3380, 610, 0x90be6d, 'Recht'],
      [4340, 610, 0xc77dff, 'Rechte'], [5320, 610, 0x4cc9f0, 'Praxis'], [6320, 610, 0x06d6a0, 'Sicherheit'], [7600, 610, 0xe63946, 'Boss']
    ];
    decor.forEach(([x, y, color, label]) => {
      this.add.rectangle(x, y, 180, 124, color, 0.16).setStrokeStyle(4, 0x355070, 0.35).setDepth(1);
      this.add.image(x - 48, y - 2, 'wood').setScale(1.15).setDepth(2);
      this.add.image(x + 42, y - 20, 'star').setScale(0.45).setDepth(2).setTint(color);
      this.add.text(x + 28, y + 6, label, {
        fontFamily: 'Arial', fontSize: '22px', color: '#213047', fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(2);
      for (let i = 0; i < 3; i += 1) {
        const paper = this.add.image(x - 18 + i * 26, y + 38, 'paperTiny').setScale(1).setDepth(2).setAlpha(0.9);
        this.tweens.add({ targets: paper, y: paper.y + 4, duration: 700 + i * 120, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      }
    });

    const clouds = [420, 1380, 2210, 3110, 4210, 5480, 6680, 7600];
    clouds.forEach((x, idx) => {
      const cloud = this.add.image(x, 160 + (idx % 3) * 22, 'cloudPuff').setScale(0.64 + (idx % 2) * 0.15).setAlpha(0.72).setDepth(0);
      this.tweens.add({ targets: cloud, x: x + 55, duration: 5000 + idx * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
  }

  createUi() {
    this.add.rectangle(640, 44, 1212, 82, 0xfffcf2, 0.86).setStrokeStyle(4, 0x355070).setScrollFactor(0).setDepth(20);
    this.livesText = this.add.text(36, 22, '', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(21);
    this.timerText = this.add.text(1076, 20, '', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(21);
    this.progressText = this.add.text(386, 20, '', {
      fontFamily: 'Arial', fontSize: '28px', color: '#213047', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(21);
    this.scoreText = this.add.text(386, 52, '', {
      fontFamily: 'Arial', fontSize: '18px', color: '#213047', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(21);

    this.progressBarBg = this.add.image(930, 56, 'progressBarBg').setOrigin(0.5).setScrollFactor(0).setDepth(21).setScale(0.72, 1);
    this.progressBarFill = this.add.image(930 - 122, 56, 'progressBarFill').setOrigin(0, 0.5).setScrollFactor(0).setDepth(22).setScale(0, 1);
    this.progressBarMask = this.make.graphics({ x: 0, y: 0, add: false });
    this.progressBarMask.fillRect(0, 0, 340, 20);
    this.progressBarFill.setMask(this.progressBarMask.createGeometryMask());
    this.progressBarFill.mask.geometryMask.setPosition(808, 46);

    this.objectiveText = this.add.text(36, 54, '', {
      fontFamily: 'Arial', fontSize: '18px', color: '#355070', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(21);

    this.nextStationArrow = this.add.text(640, 106, '↓', {
      fontFamily: 'Arial', fontSize: '36px', color: '#e76f51', fontStyle: 'bold'
    }).setScrollFactor(0).setOrigin(0.5).setDepth(21);

    this.helpText = this.add.text(26, 694,
      'Steuerung: Pfeiltasten oder A/D + Leertaste. H zeigt Hilfe. ESC/P pausiert. Berühre jedes Schild und beantworte 3 Fragen.',
      { fontFamily: 'Arial', fontSize: '18px', color: '#213047' }
    ).setScrollFactor(0).setDepth(21).setOrigin(0, 1);

    this.audioButton = this.createButton(1166, 676, 168, 42, state.audioEnabled ? 'Ton an' : 'Ton aus', async () => {
      if (!state.audioEnabled) {
        await enableAudio(this);
        this.ensureMusic();
      } else {
        this.stopMusic();
        state.audioEnabled = false;
      }
      this.scene.restart();
    }, 0x90be6d, 18).setDepth(22);

    this.helpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.pauseKeyAlt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.refreshUi();
    const introPanel = this.panel(640, 295, 780, 210, 'Levelstart',
      'Die Maus muss alle Stationen absolvieren. Falsche Antworten und Abstürze kosten Leben. Vor dem Finale wartet Jörg, der Datenschutzboss, mit fünf schwereren Fragen.');
    const introBtn = this.createButton(640, 430, 260, 58, 'Los geht’s', () => {
      introPanel.destroy();
      introBtn.destroy();
    }, 0xffb703).setDepth(31);
    this.blockingOverlay = true;
    introPanel.once('destroy', () => { this.blockingOverlay = false; });
  }

  refreshUi() {
    this.livesText.setText(`Leben: ${'❤'.repeat(state.lives)}${'♡'.repeat(state.maxLives - state.lives)}`);
    this.timerText.setText(`Zeit: ${formatTime(state.elapsedMs)}`);
    this.progressText.setText(`Fortschritt: ${Math.min(state.currentStation, stations.length)}/${stations.length}`);
    this.scoreText.setText(`Punkte: ${state.score}  |  Sterne: ${state.stationStars}/${stations.length}  |  Käse: ${state.cheesesCollected}`);
    const pct = Phaser.Math.Clamp((state.currentStation + (state.bossDefeated ? 1 : 0)) / (stations.length + 1), 0, 1);
    this.progressBarFill.scaleX = pct;
    if (this.objectiveText) {
      if (state.currentStation < stations.length) this.objectiveText.setText(`Nächstes Ziel: ${stations[state.currentStation].theme}`);
      else if (!state.bossDefeated) this.objectiveText.setText('Nächstes Ziel: Bosskampf gegen Jörg');
      else this.objectiveText.setText('Nächstes Ziel: Zur Katze und das Verfahren beenden');
    }
  }

  collectCheese(item) {
    if (!item.active || item.getData('collected')) return;
    item.setData('collected', true);
    state.cheesesCollected += 1;
    state.score += 35;
    this.playSfx('ok', { detune: 250 });
    this.tweens.add({
      targets: item,
      y: item.y - 26,
      alpha: 0,
      scale: 0.5,
      duration: 260,
      onComplete: () => item.destroy()
    });
    const plus = this.add.text(item.x, item.y - 44, '+35', {
      fontFamily: 'Arial', fontSize: '22px', color: '#213047', fontStyle: 'bold'
    }).setDepth(25);
    this.tweens.add({ targets: plus, y: plus.y - 24, alpha: 0, duration: 500, onComplete: () => plus.destroy() });
  }

  showObjectiveToast(message) {
    const toast = this.add.rectangle(640, 114, 520, 46, 0xfffcf2, 0.92).setStrokeStyle(3, 0x355070).setScrollFactor(0).setDepth(29);
    const label = this.add.text(640, 114, message, {
      fontFamily: 'Arial', fontSize: '20px', color: '#213047', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(30);
    this.tweens.add({
      targets: [toast, label], y: '-=8', alpha: { from: 1, to: 0 }, duration: 2200, ease: 'Quad.easeOut',
      onComplete: () => { toast.destroy(); label.destroy(); }
    });
  }

  update() {
    if (this.finished) return;

    if (Phaser.Input.Keyboard.JustDown(this.helpKey) && !this.blockingOverlay && !state.paused) {
      this.openHelpOverlay();
    }
    if ((Phaser.Input.Keyboard.JustDown(this.pauseKey) || Phaser.Input.Keyboard.JustDown(this.pauseKeyAlt)) && !this.blockingOverlay) {
      this.togglePause();
      return;
    }

    if (this.blockingOverlay || state.paused) return;

    const onGround = this.player.body.blocked.down || this.player.body.touching.down;
    const left = this.cursors.left.isDown || this.wasd.A.isDown;
    const right = this.cursors.right.isDown || this.wasd.D.isDown;
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.wasd.W) || Phaser.Input.Keyboard.JustDown(this.wasd.SPACE);
    if (jump) this.jumpBufferUntil = this.time.now + 140;
    if (onGround) {
      this.coyoteUntil = this.time.now + 120;
      this.lastSafeGroundX = this.player.x;
    }

    if (left) {
      this.player.setVelocityX(-255);
      this.player.setFlipX(true);
      this.player.setAngle(-4);
    } else if (right) {
      this.player.setVelocityX(255);
      this.player.setFlipX(false);
      this.player.setAngle(4);
    } else {
      this.player.setVelocityX(0);
      this.player.setAngle(0);
    }

    if (this.jumpBufferUntil > this.time.now && this.coyoteUntil > this.time.now) {
      this.jumpBufferUntil = 0;
      this.coyoteUntil = 0;
      this.player.setVelocityY(-485);
      this.playSfx('jump');
      this.tweens.add({ targets: this.player, scaleX: 0.9, scaleY: 0.76, yoyo: true, duration: 120 });
      this.sparkleBurst(this.player.x, this.player.y + 18, 0xffffff, 5);
    }

    if (!onGround) {
      this.player.setScale(0.8, 0.9);
    } else if (Math.abs(this.player.body.velocity.x) > 0) {
      this.player.setScale(0.84 + Math.sin(this.time.now / 60) * 0.02, 0.8 - Math.sin(this.time.now / 60) * 0.02);
    } else {
      this.player.setScale(0.82, 0.82);
    }

    if (this.bossAura.visible) {
      this.bossAura.rotation += 0.015;
      this.bossAura2.rotation -= 0.009;
      this.bossAura.setScale(0.8 + Math.sin(this.time.now / 220) * 0.05);
      this.bossAura2.setScale(1.08 + Math.cos(this.time.now / 260) * 0.06);
      this.bossLights.forEach((l, idx) => { l.alpha = 0.35 + Math.sin(this.time.now / (160 + idx * 20)) * 0.18; });
    }

    this.cloudMist.tilePositionX += 0.18;
    this.hills.tilePositionX += 0.03;
    this.city.tilePositionX += 0.06;

    if (this.nextStationArrow) {
      let targetX = state.currentStation < stations.length ? stations[state.currentStation].x : (state.bossDefeated ? this.goalCat.x : this.boss.x);
      const screenPoint = targetX - this.cameras.main.scrollX;
      this.nextStationArrow.x = Phaser.Math.Clamp(screenPoint, 40, GAME_WIDTH - 40);
      this.nextStationArrow.y = 106 + Math.sin(this.time.now / 180) * 6;
      this.nextStationArrow.setVisible(!this.blockingOverlay);
    }

    if (this.player.y > 770) {
      const rescueX = Math.max(state.lastCheckpointX, this.lastSafeGroundX || state.lastCheckpointX);
      this.player.setPosition(rescueX, 560);
      this.loseLife('Die Maus ist abgestürzt.');
    }

    state.elapsedMs = this.time.now - state.startTime;
    this.refreshUi();

    if (state.currentStation >= stations.length && !state.bossUnlocked) {
      state.bossUnlocked = true;
      this.boss.setVisible(true);
      this.bossAura.setVisible(true);
      this.bossAura2.setVisible(true);
      this.bossBarrier.setVisible(true);
      this.bossLights.forEach((l, idx) => {
        l.setVisible(true);
        this.tweens.add({ targets: l, alpha: { from: 0.18, to: 0.72 }, scaleY: { from: 0.8, to: 1.1 }, duration: 260 + idx * 120, yoyo: true, repeat: 8 });
      });
      this.cameras.main.flash(250, 255, 240, 240);
      this.tweens.add({ targets: [this.boss, this.bossBarrier, this.bossAura, this.bossAura2], alpha: { from: 0.3, to: 1 }, duration: 600, yoyo: true, repeat: 3 });
      this.showObjectiveToast('Alle Stationen geschafft – jetzt wartet Jörg!');
    }
  }

  openHelpOverlay() {
    this.blockingOverlay = true;
    this.physics.world.pause();
    const panel = this.panel(640, 310, 880, 330, 'Hilfe',
      'Springe von Plattform zu Plattform und berühre jedes Stationenschild. Nach jeder Lernkarte folgen 3 Multiple-Choice-Fragen. Falsche Antworten kosten ein Leben. Vor dem Finale wartet Jörg mit 5 schwereren Prüfungsfragen. Käse-Symbole bringen Extrapunkte.');
    panel.setDepth(50);
    const btn = this.createButton(640, 500, 250, 58, 'Weiter', () => {
      panel.destroy();
      btn.destroy();
      this.physics.world.resume();
      this.blockingOverlay = false;
    }, 0x8ecae6).setDepth(51);
  }

  togglePause() {
    state.paused = !state.paused;
    if (state.paused) {
      this.physics.world.pause();
      this.pauseOverlay = this.panel(640, 310, 760, 250, 'Pause',
        'Das Spiel ist angehalten. Mit ESC oder P setzt du fort.');
      this.pauseOverlay.setDepth(60);
      this.pauseButton = this.createButton(640, 430, 230, 56, 'Fortsetzen', () => this.togglePause(), 0x8ecae6).setDepth(61);
    } else {
      this.physics.world.resume();
      if (this.pauseOverlay) this.pauseOverlay.destroy();
      if (this.pauseButton) this.pauseButton.destroy();
    }
  }

  handleStation(index) {
    if (this.finished || this.blockingOverlay || index !== state.currentStation || this.triggeredStations.has(index)) return;
    this.triggeredStations.add(index);
    this.blockingOverlay = true;
    this.physics.world.pause();
    this.player.body.setVelocity(0, 0);
    const station = stations[index];
    const panel = this.panel(640, 300, 1000, 450, station.title, station.lesson, true).setDepth(30);
    const hint = this.add.text(640, 490, 'Danach folgen 3 Multiple-Choice-Fragen.', {
      fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(31);
    const btn = this.createButton(640, 580, 280, 60, 'Fragen starten', () => {
      panel.destroy();
      hint.destroy();
      btn.destroy();
      this.askQuestions(station, 0, () => {
        state.currentStation += 1;
        state.lastCheckpointX = station.x + 100;
        state.score += 150;
        state.stationStars += 1;
        this.stationStars[index].setAlpha(1).setScale(1.05);
        this.stationFlags[index].setAlpha(1).setScale(0.58);
        this.tweens.add({ targets: [this.stationStars[index], this.stationFlags[index]], scale: '+=0.18', yoyo: true, duration: 260 });
        this.sparkleBurst(station.x, 520, station.color);
        this.showObjectiveToast(index + 1 < stations.length ? `Station geschafft – weiter zu ${stations[index + 1].theme}` : 'Alle Stationen gemeistert – ab zum Boss!');
        this.physics.world.resume();
        this.blockingOverlay = false;
      });
    }).setDepth(31);
  }

  askQuestions(station, questionIndex, onDone) {
    const q = station.questions[questionIndex];
    const blocker = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.42).setScrollFactor(0).setDepth(35);
    const panel = this.panel(640, 316, 960, 470, `${station.title} – Frage ${questionIndex + 1}/3`, q.question).setDepth(36);
    const buttons = [];
    q.options.forEach((opt, idx) => {
      const btn = this.createButton(640, 438 + idx * 78, 760, 60, `${String.fromCharCode(65 + idx)}) ${opt}`, () => {
        buttons.forEach((b) => b.destroy());
        const correct = idx === q.correct;
        if (correct) state.score += 50;
        const resultPanel = this.panel(640, 320, 820, 230, correct ? 'Richtig!' : 'Falsche Antwort', correct ? q.explanation : `Leider falsch. ${q.explanation}`).setDepth(38);
        const next = this.createButton(640, 440, 240, 56, correct ? 'Weiter' : 'Erneut', () => {
          blocker.destroy();
          panel.destroy();
          resultPanel.destroy();
          next.destroy();
          if (correct) {
            this.playSfx('ok');
            this.cameras.main.flash(100, 255, 255, 220, false);
            if (questionIndex + 1 < station.questions.length) this.askQuestions(station, questionIndex + 1, onDone);
            else onDone();
          } else {
            this.playSfx('wrong');
            this.cameras.main.shake(170, 0.006);
            this.loseLife('Falsche Antwort.', () => {
              this.triggeredStations.delete(state.currentStation);
              this.player.setPosition(state.lastCheckpointX, 560).setVelocity(0, 0);
              this.physics.world.resume();
              this.blockingOverlay = false;
            }, true);
          }
        }).setDepth(39);
      }, 0xffd166).setDepth(37);
      buttons.push(btn);
    });
  }

  handleBossFight() {
    if (!state.bossUnlocked || this.finished || this.blockingOverlay || state.bossDefeated) return;
    this.blockingOverlay = true;
    this.physics.world.pause();
    this.player.body.setVelocity(0, 0);
    this.bossHp = bossFight.questions.length;
    this.tweens.add({ targets: this.boss, scale: 0.95, duration: 180, yoyo: true, repeat: 4 });
    this.tweens.add({ targets: [this.bossAura, this.bossAura2], scale: '+=0.08', alpha: { from: 0.35, to: 0.9 }, duration: 420, yoyo: true, repeat: 4 });
    const intro = this.panel(640, 290, 1000, 360, bossFight.title, bossFight.intro, true).setDepth(40);
    const bossBarBg = this.add.rectangle(640, 176, 440, 24, 0x213047, 0.9).setScrollFactor(0).setDepth(41);
    const bossBarFill = this.add.rectangle(420, 176, 436, 18, 0xe63946, 1).setOrigin(0, 0.5).setScrollFactor(0).setDepth(42);
    const hpLabel = this.add.text(640, 448, `Jörgs Prüfungsenergie: ${this.bossHp}/5`, {
      fontFamily: 'Arial', fontSize: '24px', color: '#213047', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(41);
    const btn = this.createButton(640, 512, 300, 60, 'Bossfragen starten', () => {
      intro.destroy();
      hpLabel.destroy();
      bossBarBg.destroy();
      bossBarFill.destroy();
      btn.destroy();
      this.askBossQuestion(0);
    }, 0xe76f51).setDepth(41);
  }

  askBossQuestion(index) {
    const q = bossFight.questions[index];
    const blocker = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.54).setScrollFactor(0).setDepth(42);
    const panel = this.panel(640, 320, 980, 510, `Bosskampf – Frage ${index + 1}/5`, q.question).setDepth(43);
    const hp = this.add.text(640, 210, `Jörg hält noch ${this.bossHp} Prüfungsrunde(n) durch`, {
      fontFamily: 'Arial', fontSize: '24px', color: '#fffcf2', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(44);
    const buttons = [];
    q.options.forEach((opt, idx) => {
      const btn = this.createButton(640, 444 + idx * 78, 800, 58, `${String.fromCharCode(65 + idx)}) ${opt}`, () => {
        buttons.forEach((b) => b.destroy());
        const correct = idx === q.correct;
        if (correct) {
          state.score += 120;
          this.bossHp -= 1;
          this.tweens.add({ targets: [this.bossAura, this.bossAura2], angle: 180, duration: 240, yoyo: true });
        }
        const resultPanel = this.panel(640, 320, 850, 230, correct ? 'Treffer!' : 'Jörg kontert!', correct ? q.explanation : `Nicht ganz. ${q.explanation}`).setDepth(45);
        const next = this.createButton(640, 442, 240, 56, correct ? 'Weiter' : 'Nochmal', () => {
          blocker.destroy();
          panel.destroy();
          hp.destroy();
          resultPanel.destroy();
          next.destroy();
          if (correct) {
            this.playSfx(index + 1 < bossFight.questions.length ? 'ok' : 'win');
            this.cameras.main.flash(150, 255, 250, 220, false);
            this.sparkleBurst(this.boss.x, this.boss.y - 60, 0xe76f51, 10);
            if (index + 1 < bossFight.questions.length) {
              this.askBossQuestion(index + 1);
            } else {
              state.bossDefeated = true;
              this.blockingOverlay = false;
              this.physics.world.resume();
              this.notice.setVisible(true);
              this.bossBarrier.setVisible(false);
              this.bossLights.forEach((l) => this.tweens.add({ targets: l, alpha: 0, duration: 500, onComplete: () => l.setVisible(false) }));
              this.tweens.add({ targets: [this.boss, this.bossAura, this.bossAura2], alpha: 0.18, scale: '+=0.15', duration: 500, yoyo: true, repeat: 2, onComplete: () => {
                this.boss.destroy();
                this.bossAura.setVisible(false);
                this.bossAura2.setVisible(false);
              } });
            }
          } else {
            this.playSfx('hit');
            this.cameras.main.shake(220, 0.008);
            this.tweens.add({ targets: this.bossBarrier, alpha: { from: 0.5, to: 0.95 }, duration: 160, yoyo: true, repeat: 2 });
            this.loseLife('Bossfrage falsch beantwortet.', () => {
              this.physics.world.resume();
              this.blockingOverlay = false;
            }, true);
          }
        }).setDepth(46);
      }, 0xffc857).setDepth(44);
      buttons.push(btn);
    });
  }

  loseLife(reason, cb = null, skipRespawn = false) {
    state.lives -= 1;
    this.refreshUi();
    this.blockingOverlay = true;
    if (state.lives <= 0) {
      this.finished = true;
      const panel = this.panel(640, 300, 880, 280, 'Alle Leben verloren', `${reason}\n\nDie gesamte Schulung startet jetzt neu.`).setDepth(60);
      this.createButton(640, 430, 260, 60, 'Neu starten', () => {
        resetRun();
        this.stopMusic();
        this.scene.start('IntroScene');
      }).setDepth(61);
      return;
    }
    const panel = this.panel(640, 300, 860, 250, 'Ein Leben verloren', `${reason}\n\nVerbleibende Leben: ${state.lives}`).setDepth(60);
    const btn = this.createButton(640, 420, 260, 56, 'Weiter', () => {
      panel.destroy();
      btn.destroy();
      if (!skipRespawn) this.player.setPosition(state.lastCheckpointX, 560).setVelocity(0, 0);
      if (cb) cb();
      this.blockingOverlay = false;
    }).setDepth(61);
  }

  sparkleBurst(x, y, tint = 0xffd166, count = 8) {
    for (let i = 0; i < count; i += 1) {
      const spark = this.add.image(x, y, 'spark').setTint(tint).setDepth(24);
      const angle = Phaser.Math.DegToRad((360 / count) * i + Phaser.Math.Between(-12, 12));
      const distance = Phaser.Math.Between(28, 66);
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.2,
        duration: 420,
        ease: 'Quad.easeOut',
        onComplete: () => spark.destroy()
      });
    }
  }

  handleEnding() {
    if (this.finished || !this.notice.visible || this.blockingOverlay) return;
    this.finished = true;
    this.blockingOverlay = true;
    this.physics.world.pause();
    const finalTime = state.elapsedMs;
    if (!state.bestTimeMs || finalTime < state.bestTimeMs) {
      state.bestTimeMs = finalTime;
      localStorage.setItem('dataQuestBestTimeMs', String(finalTime));
    }
    state.firstRunComplete = true;

    const fade = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.22).setScrollFactor(0).setDepth(69);
    const caption = this.add.text(640, 118, 'Finale: Die Maus stellt die Katze zur Rede.', {
      fontFamily: 'Arial', fontSize: '32px', color: '#fffcf2', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(70);

    this.notice.setVisible(true).setScale(0.82).setAngle(-10);
    this.playSfx('win');
    this.tweens.add({ targets: this.notice, x: 8318, y: 520, angle: 8, duration: 850, ease: 'Cubic.easeOut' });
    this.tweens.add({ targets: this.goalCat, x: 8350, angle: -12, duration: 850, ease: 'Back.easeIn' });
    this.time.delayedCall(420, () => {
      this.sparkleBurst(8308, 520, 0xffd166, 12);
      this.cameras.main.flash(120, 255, 255, 255, false);
    });
    this.time.delayedCall(1200, () => {
      caption.setText('Die Katze ist geknickt. Die Maus hat ihre Datenhoheit zurückerobert.');
      this.tweens.add({ targets: this.player, x: 8140, y: 540, duration: 420, ease: 'Sine.easeOut' });
      this.tweens.add({ targets: this.goalCat, angle: -24, alpha: 0.7, duration: 500, ease: 'Sine.easeOut' });
    });

    this.time.delayedCall(2100, () => {
      fade.setAlpha(0.32);
      caption.destroy();
      const panel = this.panel(640, 316, 1040, 520, 'Zertifikat & Scorescreen',
        'Die Schulung ist abgeschlossen. Das Zertifikat bestätigt, dass die Maus die Grundlagen zu DSGVO, Betroffenenrechten und Datensicherheit erfolgreich durchlaufen hat.');
      panel.setDepth(70);
      const cert = this.add.image(640, 322, 'certificate').setScrollFactor(0).setDepth(71).setScale(0.98);
      const seal = this.add.image(905, 435, 'seal').setScrollFactor(0).setDepth(72);
      const certTitle = this.add.text(640, 220, 'Teilnahmezertifikat', {
        fontFamily: 'Arial', fontSize: '42px', color: '#5b4636', fontStyle: 'bold'
      }).setOrigin(0.5).setScrollFactor(0).setDepth(72);
      const certBody = this.add.text(640, 308,
        `Data Quest – Die Maus und das Geheimnis der Daten

Erfolgreich abgeschlossen in ${formatTime(finalTime)}
Bestzeit: ${state.bestTimeMs ? formatTime(state.bestTimeMs) : '--:--'}
Verbleibende Leben: ${state.lives}/${state.maxLives}
Punkte: ${state.score}
Stationssterne: ${state.stationStars}/${stations.length}   |   Käse-Boni: ${state.cheesesCollected}

Auszeichnung: ${state.lives === state.maxLives ? 'Fehlerfreier Datenschutzlauf' : 'Datenschutz kompetent gemeistert'}`,
        { fontFamily: 'Georgia, Times, serif', fontSize: '28px', color: '#5b4636', align: 'center', lineSpacing: 12 }
      ).setOrigin(0.5).setScrollFactor(0).setDepth(72);
      const hint = this.add.text(640, 522, 'Die Maus freut sich – und die Katze weiß jetzt: Daten haben einen Wert.', {
        fontFamily: 'Arial', fontSize: '22px', color: '#213047', fontStyle: 'bold'
      }).setOrigin(0.5).setScrollFactor(0).setDepth(72);

      for (let i = 0; i < 48; i += 1) {
        const conf = this.add.image(Phaser.Math.Between(80, 1200), Phaser.Math.Between(-20, 120), 'confetti')
          .setScrollFactor(0)
          .setDepth(73)
          .setTint(Phaser.Utils.Array.GetRandom([0xff6b6b, 0x4cc9f0, 0xffd166, 0x90be6d, 0xc77dff]));
        this.tweens.add({
          targets: conf,
          y: Phaser.Math.Between(420, 740),
          x: conf.x + Phaser.Math.Between(-90, 90),
          angle: Phaser.Math.Between(140, 420),
          alpha: { from: 1, to: 0.08 },
          duration: 1900 + i * 24,
          repeat: -1,
          ease: 'Sine.easeIn'
        });
      }

      this.createButton(476, 620, 250, 62, 'Retry', () => {
        resetRun();
        this.stopMusic();
        this.scene.start('IntroScene');
      }).setDepth(74);
      this.createButton(804, 620, 320, 62, 'Direkt neu starten', () => {
        resetRun();
        this.scene.start('PlayScene');
      }, 0x8ecae6).setDepth(74);
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#bde7ff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1100 },
      debug: false
    }
  },
  scene: [BootScene, IntroScene, PlayScene]
};

new Phaser.Game(config);
