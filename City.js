import { Protagonista } from './Protagonista.js';

export class CityScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CityScene' });
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

    // Criar o protagonista (sem física)
    this.protagonista = new Protagonista(this, 400, 1200);

    // Criar o NPC apenas como sprite (sem física)
    this.npc_rei = this.add.sprite(1020, 340, "NPC_Rei", 1);

    // Câmera
    this.cameras.main.startFollow(this.protagonista.getSprite());
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // HUD fixo
    this.add.text(16, 16, "Cidade antiga!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);

    this.add.text(16, 50, "Setas para movimentar, encontre o rei!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);

    this.dialogoMostrado = false;
    this.cenaMudou = false;
  }

  update() {
    this.protagonista.update();

    const { x, y } = this.protagonista.getSprite();

    // Verifica se o jogador chegou na área do Rei
    if (!this.dialogoMostrado && Phaser.Math.Distance.Between(x, y, this.npc_rei.x, this.npc_rei.y) < 50) {
      this.dialogoMostrado = true;

      const mensagem = this.add.text(x - 100, y - 100,
        "Vá atrás da princesa, por favor me ajude", {
          font: "20px Arial",
          fill: "#ffffff",
          backgroundColor: "#000000",
          padding: { x: 10, y: 5 },
          wordWrap: { width: 300 }
        });

      this.time.delayedCall(3000, () => {
        mensagem.destroy();
        this.scene.start("SecondScene");
      });
    }

    // Alternativamente, troca de cena se entrar em área específica (sem precisar do NPC)
    if (!this.cenaMudou && x > 1500 && x < 1600 && y > 300 && y < 400) {
      this.cenaMudou = true;
      this.scene.start("SecondScene");
    }
  }
}
