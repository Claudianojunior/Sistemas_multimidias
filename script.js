/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/

/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/
let controls;
let player;
let cursors;

class BattleScene extends Phaser.Scene{
  constructor(){
    super({ key: 'BattleScene'});
  }

  preload(){
    this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
    this.load.spritesheet("Vilao", "assets/Vilao-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
  }

  create(){
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
    const damage = Phaser.Math.Between(10, 25);
    target.hp = Math.max(0, target.hp - damage);

    this.actionText.setText(`${attacker.texture.key} causou ${damage} de dano em ${target.texture.key}!`);
    
    if(!this.checkBattleResult()){
    this.nextTurn();
    }
  }

  defend(character) {
    const heal = Phaser.Math.Between(5, 15);
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

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image("tiles", "assets/chinese_tileset.png");
    this.load.tilemapTiledJSON("map", "assets/Chinese_map.json");
    this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
    this.load.spritesheet("NPC_Rei", "assets/Rei-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("Chinese_map", "tiles");

    map.createLayer("Camada de Blocos 1", tileset, 0, 0);
    map.createLayer("Camada de Blocos 2", tileset, 0, 0);
    map.createLayer("Camada de Blocos 3", tileset, 0, 0);
    map.createLayer("Camada de Blocos 4", tileset, 0, 0);

    // Player
    this.player = this.add.sprite(400, 1200, "Cara");

    // NPC Rei
    this.npc_rei = this.add.sprite(1020, 340, "NPC_Rei", 1);

    // Animações
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('Cara', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('Cara', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('Cara', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('Cara', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    // Câmera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Teclado
    this.cursors = this.input.keyboard.createCursorKeys();
  
    this.add.text(16, 16, "Cidade antiga!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);
    
    this.add.text(16, 50, "Setas para movimentar, Enter para mudar de fase!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x -= 2;
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.x += 2;
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.y -= 2;
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.y += 2;
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }

    this.input.keyboard.on('keydown-ENTER', () => {
      console.log("Tecla Enter pressionada! Trocando de cena...");
      this.scene.start("SecondScene");  // Troca para a SecondScene
    });
  }
}

class SecondScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SecondScene' });
  }

  preload() {
    this.load.image("tiles_forest", "assets/light_forest_tileset_0-removebg-preview.png");
    this.load.tilemapTiledJSON("map_forest", "assets/Floresta.json");
    this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
    this.load.spritesheet("NPC_Vilao", "assets/Vilao-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
  }
  
    create() {
      const map = this.make.tilemap({ key: "map_forest" });
      const tileset = map.addTilesetImage("Floresta", "tiles_forest");
  
      const camada1 = map.createLayer("Camada de Blocos 1", tileset, 0, 0);
      const camada2 = map.createLayer("Camada de Blocos 2", tileset, 0, 0);
      
      this.battleKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

      this.player = this.add.sprite(100, 650, "Cara");

      this.npc_vilao = this.add.sprite(900, 550, "NPC_Vilao");

      // Animações
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('Cara', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('Cara', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('Cara', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('Cara', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    // Câmera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Teclado
    this.cursors = this.input.keyboard.createCursorKeys();
  

      this.add.text(16, 16, "Floresta antiga!", {
        font: "24px monospace",
        fill: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 20, y: 10 },
      }).setScrollFactor(0);

      this.add.text(16, 50, "Aperte B para iniciar a batalha!", {
        font: "24px monospace",
        fill: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 20, y: 10 },
      }).setScrollFactor(0);
    }
    update() {
      if (this.cursors.left.isDown) {
        this.player.x -= 2;
        this.player.anims.play("left", true);
      } else if (this.cursors.right.isDown) {
        this.player.x += 2;
        this.player.anims.play("right", true);
      } else if (this.cursors.up.isDown) {
        this.player.y -= 2;
        this.player.anims.play("up", true);
      } else if (this.cursors.down.isDown) {
        this.player.y += 2;
        this.player.anims.play("down", true);
      } else {
        this.player.anims.stop();
      }
      
      if (Phaser.Input.Keyboard.JustDown(this.battleKey)) {
        console.log("Tecla B pressionada! Iniciando batalha...");
        this.scene.start("BattleScene");
      }

      this.input.keyboard.on('keydown-ENTER', () => {
        console.log("Tecla Enter pressionada! Trocando de cena...");
        this.scene.start("MainScene");  // Troca para a SecondScene
      });
    }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: [MainScene, SecondScene, BattleScene],
  activeScene: 'MainScene'
};

const game = new Phaser.Game(config);