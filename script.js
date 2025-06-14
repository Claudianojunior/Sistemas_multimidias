/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/

/*function preload() {
  this.load.image("player", "assets/repl.png");
}*/
let controls;
let player;
let cursors;
import { CityScene } from "./City.js";
import { BattleScene } from "./BattleScene.js";
import {ForestScene} from  "./Forest.js"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: [CityScene, ForestScene, BattleScene],
  activeScene: 'MainScene'
};

const game = new Phaser.Game(config);