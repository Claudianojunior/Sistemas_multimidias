export class ForestScene extends Phaser.Scene {
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
  