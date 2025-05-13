/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/

/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/
let controls;
let player;
let cursors;

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
    this.load.spritesheet("NPC_Rei", "assets/Rei-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
  }
  
    create() {
      const map = this.make.tilemap({ key: "map_forest" });
      const tileset = map.addTilesetImage("Floresta", "tiles_forest");
  
      const camada1 = map.createLayer("Camada de Blocos 1", tileset, 0, 0);
      const camada2 = map.createLayer("Camada de Blocos 2", tileset, 0, 0);
      
      this.player = this.add.sprite(400, 300, "Cara");

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
      });
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
  scene: [MainScene, SecondScene],
  activeScene: 'MainScene'
};

const game = new Phaser.Game(config);