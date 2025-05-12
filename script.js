/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let controls;
let player;
let cursors;

function preload() {
  this.load.image("tiles", "assets/chinese_tileset.png");
  this.load.tilemapTiledJSON("map", "assets/Chinese_map.json");
  this.load.spritesheet("Cara", "assets/Marduk_clean_tranparent.png", { frameWidth: 45, frameHeight: 50 });
  this.load.spritesheet("Pessoas1", "assets/NPCS1.jpeg", { frameWidth: 32, frameHeight: 48 });
  this.load.spritesheet("Pessoas2", "assets/NPCS2.jpeg", { frameWidth: 32, frameHeight: 48 });
  this.load.spritesheet("NPC_Rei", "assets/Rei-removebg-preview.png", { frameWidth: 45, frameHeight: 50 });
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("Chinese_map", "tiles");

  const camada1 = map.createLayer("Camada de Blocos 1", tileset, 0, 0);
  const camada2 = map.createLayer("Camada de Blocos 2", tileset, 0, 0);
  const camada3 = map.createLayer("Camada de Blocos 3", tileset, 0, 0);
  const camada4 = map.createLayer("Camada de Blocos 4", tileset, 0, 0);

  /*camada2.setCollisionByProperty({ Collides: true });
  camada3.setCollisionByProperty({ Collides: true });
  camada4.setCollisionByProperty({ Collides: true });*/

  // Criação do personagem jogador
  player = this.add.sprite(410, 1200, "Cara");
  /*this.player.body.gravity.y = 0;
  this.physics.world.gravity.y = 0;*/
  
  //Criação npc rei
  npc_rei = this.add.sprite(1020, 340,"NPC_Rei",1);

  //Adicionando colisao entre player e layers
  /*this.physics.add.collider(this.player, camada2);
  this.physics.add.collider(this.player, camada3);
  this.physics.add.collider(this.player, camada4);*/
  
  // Animações do personagem
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

  // Camera
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Teclas
  cursors = this.input.keyboard.createCursorKeys();

  this.add
    .text(16, 16, "Setas para mover", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000",
    })
    .setScrollFactor(0);
}

function update() {
  if (cursors.left.isDown) {
    player.x -= 2;
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.x += 2;
    player.anims.play("right", true);
  } else {
    player.anims.stop();
  }

  if (cursors.up.isDown) {
    player.y -= 2;
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.y += 2;
    player.anims.play("down", true);
  }
}
