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
import {ForestScene} from  "./Forest.js"
import { BattleScene } from "./BattleScene.js";
import { FinalScene } from "./FinalScene.js";
import { BattleScene_final } from "./BattleScene_final.js";
import { MainScene } from "./Mainscene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: [  MainScene, CityScene, ForestScene, BattleScene, FinalScene, BattleScene_final]
};

const game = new Phaser.Game(config);
game.scene.start('MainScene');