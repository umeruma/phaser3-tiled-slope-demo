import Phaser from 'phaser'
import Phaser3TiledSlope from 'phaser3-tiled-slope'

import TilemapScene from './tilemap-scene'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: '100%',
  height: '100%',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  },
  scene: TilemapScene,
  scale: {
    parent: 'slopeDemo',
    width: 400,
    height: 350
  },
  plugins: {
    scene: [
      {
        plugin: Phaser3TiledSlope,
        key: "tilemapsat",
        mapping: "tilemapSat"
      }
    ]
  }
};

const game = new Phaser.Game(config);
