export class BattleScene extends Phaser.Scene{
    constructor(){
      super({ key: 'BattleScene'});
    }
  
    preload(){
      this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
      this.load.spritesheet("Vilao", "assets/Vilao-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
      this.load.spritesheet("Cura", "assets/heal.png", {frameWidth: 128, frameHeight: 130});
      this.load.image('Ataque1', 'assets/attack_frame1.png', { frameWidth: 45, frameHeight: 50 });
      this.load.image('Ataque2', 'assets/attack_frame2.png', { frameWidth: 45, frameHeight: 50 });
      this.load.image('Ataque3', 'assets/attack_frame3.png', { frameWidth: 45, frameHeight: 50 });
      this.load.image('Ataque4', 'assets/attack_frame4.png', { frameWidth: 45, frameHeight: 50 });
      this.load.image('Ataque5', 'assets/attack_frame5.png', { frameWidth: 45, frameHeight: 50 });
    }
  
    create(){
  
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
      
      this.anims.create({
        key: 'cura',
        frames: [
          // First row (frames 0-4)
          { key: 'Cura', frame: 0 },
          { key: 'Cura', frame: 1 },
          { key: 'Cura', frame: 2 },
          { key: 'Cura', frame: 3 },
          { key: 'Cura', frame: 4 },
          
          // Second row (frames 5-9)
          { key: 'Cura', frame: 5 },
          { key: 'Cura', frame: 6 },
          { key: 'Cura', frame: 7 },
          { key: 'Cura', frame: 8 },
          { key: 'Cura', frame: 9 },
          
          // Final frame (frame 10)
          { key: 'Cura', frame: 10 }
      ],
        
        frameRate: 10,
        repeat: 0
      });
      this.player = this.add.sprite(150,300,"Cara",0);
      this.player.hp = 100;
  
      this.enemy = this.add.sprite(650,300,"Vilao",0);
      this.enemy.hp = 100;
  
      // Texto de status
      this.statusText = this.add.text(150, 500, '', { font: "20px monospace", fill: "#fff" });
  
      // Turno: 'player' ou 'enemy'
      this.currentTurn = 'player';
  
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
  
      this.updateStatus();
  
    }
  
    attack(attacker, target) {
      const attackEffect = this.add.sprite(
        target.x,
        target.y,
        'Ataque1'
      )
      .setDepth(10)
      .setScale(0.1) 
      .setOrigin(0.5)
      attackEffect.anims.play('ataque');
      const damage = Phaser.Math.Between(10, 25);
      target.hp = Math.max(0, target.hp - damage);
      if (damage > 20) { // Critical hit
        this.cameras.main.shake(300, 0.02);
        this.cameras.main.flash(200, 255, 0, 0);
        this.actionText.setText(`${attacker.texture.key} causou um acerto crítio em ${target.texture.key}!`);
    }
  
      this.actionText.setText(`${attacker.texture.key} causou ${damage} de dano em ${target.texture.key}!`);
      
      if(!this.checkBattleResult()){
      this.nextTurn();
      }
    }
  
    defend(character) {
      const healingSprite = this.add.sprite(
        character.x, 
        character.y,  
        "Cura"
      )
      .setDepth(1);
      healingSprite.anims.play('cura');
      const heal = Phaser.Math.Between(5, 15);
      healingSprite.on('animationcomplete', () => {
        healingSprite.destroy();
      });
      character.hp += heal;
      if (character.hp > 100) character.hp = 100;
  
      this.actionText.setText(`${character.texture.key} defendeu e recuperou ${heal} de HP!`);
  
      if(!this.checkBattleResult()){
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
        const damage = Phaser.Math.Between(10, 20);
        this.player.hp -= damage;
        this.actionText.setText(`Vilao atacou e causou ${damage} de dano!`);
        if(!this.checkBattleResult()){
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
      this.add.graphics().clear(); // Limpar canvas anterior se quiser
  
      const text = `Turno: ${this.currentTurn.toUpperCase()}
  Player HP: ${this.player.hp}
  Vilao HP: ${this.enemy.hp}
  [A] Atacar   [D] Defender   [ESC] Sair`;
      this.statusText.setText(text);
    }
  }
  