export class Vilao_Final {
    constructor(scene, x, y, texture = "Vilao_final") {
      this.scene = scene;
      this.sprite = scene.add.sprite(x, y, texture, 0);
      this.sprite.hp = 100;
    }
  
    getSprite() {
      return this.sprite;
    }
  
    takeDamage(amount) {
      this.sprite.hp = Math.max(0, this.sprite.hp - amount);
    }
  
    isAlive() {
      return this.sprite.hp > 0;
    }
  
    attack(target) {
      const damage = Phaser.Math.Between(10, 20);
      target.hp = Math.max(0, target.hp - damage);
      return damage;
    }
  }