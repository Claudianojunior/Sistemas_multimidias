export class Protagonista {
  constructor(scene, x, y, enableControls = true) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, "Cara");
    
    this.createAnimations();

    // Só cria os controles se for cena de movimento
    if (enableControls) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  }

  createAnimations() {
    // Evita recriar animações se já existem (Phaser compartilha globalmente)
    if (this.scene.anims.exists('down')) return;

    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers('Cara', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('Cara', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('Cara', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers('Cara', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    if (!this.cursors) return; // Se não há controles (ex: batalha), não atualiza

    if (this.cursors.left.isDown) {
      this.sprite.x -= 2;
      this.sprite.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.sprite.x += 2;
      this.sprite.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.sprite.y -= 2;
      this.sprite.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.sprite.y += 2;
      this.sprite.anims.play("down", true);
    } else {
      this.sprite.anims.stop();
    }
  }

  getSprite() {
    return this.sprite;
  }
}
