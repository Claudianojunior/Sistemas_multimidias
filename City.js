import { Protagonista } from './Protagonista.js';


export class CityScene extends Phaser.Scene {
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

    // Criar o protagonista
    this.protagonista = new Protagonista(this, 400, 1200);

    // Criar NPC
    this.npc_rei = this.add.sprite(1020, 340, "NPC_Rei", 1);

    // Câmera
    this.cameras.main.startFollow(this.protagonista.getSprite());
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Textos
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

    // Tecla Enter para mudar de cena
    this.input.keyboard.on('keydown-ENTER', () => {
      console.log("Tecla Enter pressionada! Trocando de cena...");
      this.scene.start("SecondScene");
    });
  }

  update() {
    this.protagonista.update();
  }
}
