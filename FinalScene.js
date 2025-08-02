import { Protagonista } from './Protagonista.js';

export class FinalScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FinalScene' });
  }

  preload() {
    console.log("🟡 Preloading FinalScene assets...");
    // Carrega os assets necessários
    this.load.image("tiles", "assets/chinese_tileset.png");
    // CORREÇÃO: Usando a chave única "finalMap" para o mapa
    this.load.tilemapTiledJSON("finalMap", "assets/Final_city.json");
    this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
    this.load.spritesheet("Vilao_final", "assets/Vilao_final-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
  }

  create() {
    // Adiciona um fundo simples para que a tela não fique preta.
    this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(-1);

    // Cria o mapa
    // CORREÇÃO: Usando a chave "finalMap"
    const map = this.make.tilemap({ key: "finalMap" });
    if (!map) {
        console.error("❌ Erro: O mapa não foi criado. Verifique o nome da chave 'finalMap'!");
        return; 
    }
    console.log("✅ Mapa carregado:", map);
    console.log("Nomes das camadas no mapa Tiled:", map.layers.map(layer => layer.name));

    // Pega o nome do tileset diretamente do objeto map para evitar erros de digitação.
    const tiledTilesetName = map.tilesets[0].name;
    const tileset = map.addTilesetImage(tiledTilesetName, "tiles");

    if (!tileset) {
        console.error("❌ Erro: O tileset não foi carregado. Verifique se o nome do tileset no seu arquivo Tiled e a chave ('tiles') estão corretos!");
    } else {
        console.log("✅ Tileset carregado:", tileset);
    }

    // Tenta criar as camadas do mapa
    const layer1 = map.createLayer("Camada de Blocos 1", tileset, 0, 0);
    const layer2 = map.createLayer("Camada de Blocos 2", tileset, 0, 0);
    const layer3 = map.createLayer("Camada de Blocos 3", tileset, 0, 0);

    if (layer1 && layer2 && layer3) {
      console.log("✅ Camadas do mapa criadas com sucesso!");
    } else {
      console.error("❌ Erro: Uma ou mais camadas do mapa não foram encontradas. Verifique os nomes das camadas no seu arquivo .json!");
    }

    // Criar o protagonista (sem física)
    this.protagonista = new Protagonista(this, 50, 800);
    if (!this.protagonista.getSprite()) {
        console.error("❌ Erro: Protagonista não foi criado!");
    } else {
        console.log("✅ Protagonista criado com sucesso!");
    }

    // Criar o NPC
    this.Vilao_final = this.add.sprite(1020, 440, "Vilao_final", 1);
    if (!this.Vilao_final) {
        console.error("❌ Erro: Vilão não foi criado!");
    } else {
        console.log("✅ Vilão criado com sucesso!");
    }

    // Câmera segue o protagonista
    this.cameras.main.startFollow(this.protagonista.getSprite());
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // HUD fixo
    this.add.text(16, 16, "Cidade Inimiga!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);

    this.add.text(16, 50, "Encontre o vilão!", {
      font: "24px monospace",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    }).setScrollFactor(0);

    this.cenaMudou = false;
  }

  update() {
    this.protagonista.update();
  
    const player = this.protagonista.getSprite();
    const Vilao_final = this.Vilao_final;
  
    const distancia = Phaser.Math.Distance.Between(player.x, player.y, Vilao_final.x, Vilao_final.y);
  
    if (distancia < 50 && !this.cenaMudou) {
      console.log("Proximidade com o vilão detectada. Iniciando batalha...");
      this.cenaMudou = true; 
      this.scene.start("BattleScene_final");
    }
  }
}


