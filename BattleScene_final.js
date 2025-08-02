import { Vilao_Final } from './Vilao_final.js';
import { Protagonista } from './Protagonista.js';

export class BattleScene_final extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene_final' });
  }

  preload() {
    console.log("🟡 Preloading BattleScene_final...");
    this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
    this.load.spritesheet("Vilao_final", "assets/Vilao_final-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
    this.load.spritesheet("Cura", "assets/heal.png", { frameWidth: 128, frameHeight: 130 });

    this.load.image('Ataque1', 'assets/attack_frame1.png');
    this.load.image('Ataque2', 'assets/attack_frame2.png');
    this.load.image('Ataque3', 'assets/attack_frame3.png');
    this.load.image('Ataque4', 'assets/attack_frame4.png');
    this.load.image('Ataque5', 'assets/attack_frame5.png');
  }

  create() {
    // Adiciona um fundo simples para que a tela não fique preta.
    // O setDepth(-1) garante que o fundo fique atrás de todos os outros objetos.
    this.add.rectangle(400, 300, 800, 600, 0x5a5a5a).setDepth(-1);

    // Animações de ataque
    console.log("✅ Cena BattleScene_final carregada com sucesso!");
    this.anims.create({
      key: 'ataque',
      frames: [
        { key: 'Ataque1' },
        { key: 'Ataque2' },
        { key: 'Ataque3' },
        { key: 'Ataque4' },
        { key: 'Ataque5' }
      ],
      frameRate: 8,
      repeat: 0
    });

    // Animação de cura
    this.anims.create({
      key: 'cura',
      frames: Array.from({ length: 11 }, (_, i) => ({ key: 'Cura', frame: i })),
      frameRate: 10,
      repeat: 0
    });

    // Protagonista (sem controles)
    this.protagonista = new Protagonista(this, 150, 300, false);
    this.player = this.protagonista.getSprite();
    this.player.hp = 100;

    // Inimigo
    // Corrige a capitalização do nome da classe para 'Vilao_Final' para corresponder ao import.
    this.Vilao_final = new Vilao_Final(this, 650, 300);
    this.enemy = this.Vilao_final.getSprite();
    this.enemy.hp = 100;

    // Turno inicial
    this.currentTurn = 'player';

    // Textos
    this.statusText = this.add.text(16, 16, '', {
      font: "20px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 },
    }).setScrollFactor(0);

    this.actionText = this.add.text(16, 150, '', {
      font: "20px monospace",
      fill: "#ffff00",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 },
    }).setScrollFactor(0);

    // Controles
    this.input.keyboard.on('keydown-A', () => {
      if (this.currentTurn === 'player') {
        this.attack(this.player, this.enemy);
      }
    });

    this.input.keyboard.on('keydown-D', () => {
      if (this.currentTurn === 'player') {
        this.defend(this.player);
      }
    });

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start("MainScene");
    });

    this.updateStatus();
  }

  // Método genérico para calcular dano
  calculateDamage(attacker, target) {
    // Exemplo básico, pode personalizar por personagem
    const minDmg = (attacker === this.player) ? 10 : 8;
    const maxDmg = (attacker === this.player) ? 30 : 20;
    return Phaser.Math.Between(minDmg, maxDmg);
  }

  attack(attacker, target) {
    const attackEffect = this.add.sprite(target.x, target.y, 'Ataque1')
      .setDepth(10)
      .setScale(0.1)
      .setOrigin(0.5);
    attackEffect.anims.play('ataque');

    const damage = this.calculateDamage(attacker, target);

    target.hp = Math.max(0, target.hp - damage);

    if (damage > 20) {
      this.cameras.main.shake(300, 0.02);
      this.cameras.main.flash(200, 255, 0, 0);
      this.actionText.setText(`${attacker.texture.key} causou um acerto crítico em ${target.texture.key}!`);
    } else {
      this.actionText.setText(`${attacker.texture.key} causou ${damage} de dano em ${target.texture.key}!`);
    }

    if (!this.checkBattleResult()) {
      this.nextTurn();
    }
  }

  defend(character) {
    const healingSprite = this.add.sprite(character.x, character.y, "Cura").setDepth(1);
    healingSprite.anims.play('cura');

    const heal = Phaser.Math.Between(5, 15);
    healingSprite.on('animationcomplete', () => healingSprite.destroy());

    character.hp = Math.min(character.hp + heal, 100);

    this.actionText.setText(`${character.texture.key} defendeu e recuperou ${heal} de HP!`);

    if (!this.checkBattleResult()) {
      this.nextTurn();
    }
  }

  nextTurn() {
    if (this.currentTurn === 'player') {
      this.currentTurn = 'enemy';
      this.time.delayedCall(1000, () => this.enemyTurn());
    } else {
      this.currentTurn = 'player';
    }

    this.updateStatus();
  }

  enemyTurn() {
    if (this.enemy.hp > 0) {
      const damage = this.calculateDamage(this.enemy, this.player);
      this.player.hp = Math.max(0, this.player.hp - damage);
      this.actionText.setText(`Vilao atacou e causou ${damage} de dano!`);
      if (!this.checkBattleResult()) {
        this.nextTurn();
      }
    }
  }

  checkBattleResult() {
    if (this.player.hp <= 0) {
      this.statusText.setText("Você foi derrotado!");
      this.time.delayedCall(2000, () => this.scene.start("SecondScene"));
      return true;
    } else if (this.enemy.hp <= 0) {
      this.statusText.setText("Você venceu a batalha!");
      this.time.delayedCall(2000, () => this.scene.start("SecondScene"));
      return true;
    }
    return false;
  }

  updateStatus() {
    const text = `Turno: ${this.currentTurn.toUpperCase()}
Player HP: ${this.player.hp}
Vilao HP: ${this.enemy.hp}
[A] Atacar   [D] Defender   [ESC] Sair`;
    this.statusText.setText(text);
  }
}