import { Protagonista } from './Protagonista.js';

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

    map.createLayer("Camada de Blocos 1", tileset, 0, 0);
    map.createLayer("Camada de Blocos 2", tileset, 0, 0);

    // Criar protagonista usando a classe Protagonista
    this.protagonista = new Protagonista(this, 100, 650);

    // Vilão
    this.npc_vilao = this.add.sprite(900, 550, "NPC_Vilao");

    // Câmera segue o protagonista
    this.cameras.main.startFollow(this.protagonista.getSprite());
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Teclas adicionais
    this.battleKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

    // Textos na tela
    this.add.text(16, 16, "Floresta antiga!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);

    // Enter para voltar para MainScene
    this.input.keyboard.on('keydown-ENTER', () => {
      console.log("Tecla Enter pressionada! Trocando de cena...");
      this.scene.start("MainScene");
    });
  }

  update() {
    this.protagonista.update();
  
    const player = this.protagonista.getSprite();
    const vilao = this.npc_vilao;
  
    const distancia = Phaser.Math.Distance.Between(player.x, player.y, vilao.x, vilao.y);
  
    if (distancia < 50) { // distância mínima para iniciar a batalha
      console.log("Proximidade com o vilão detectada. Iniciando batalha...");
      this.scene.start("BattleScene");
    }
  }
}
