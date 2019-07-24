import Phaser from 'phaser'

import PhaserTiledSlope from 'phaser3-tiled-slope'
import Player from './player.js'

import mapJson from './../../tiled/slope_test_map.json'
import mapAtlas from './../../tiled/test_atlas.png'

export default class TilemapScene extends Phaser.Scene {

  preload() {
    this.plugins.installScenePlugin( 'PhaserTiledSlope', PhaserTiledSlope, 'tilemapslope', this)

    this.load.tilemapTiledJSON('map', mapJson)
    this.load.image('tiles1', mapAtlas)
    this.load.spritesheet('dude', 'https://labs.phaser.io/src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {

    // World boudns
    this.cameras.main.setBounds(0, 0, 70*70, 70*40)
    this.physics.world.setBounds(0, 0, 70*70, 70*40)

    // Create assets
    this.slopeMap = this.make.tilemap({ key: 'map' })
    const tileset = this.slopeMap.addTilesetImage('ijc_test', 'tiles1')
    this.layer = this.slopeMap.createDynamicLayer('Ground', tileset, 0, 0)

    // Add player
    this.player = new Player(this, 1700, 1600)
    this.player.sprite.slope.enableSlopeCollider()

    // Set tilemap collision
    this.layer.setCollisionBetween(0, 1)
    this.layer.setCollision(4)
    this.physics.add.collider(this.player.sprite, this.layer)

    // Create slope collision
    this.slopeMap.slope.enableObjectLayer('Collision')

    // Set camera
    this.cameras.main.startFollow(this.player.sprite, false, 0.08, 0.08)
  }

  update() {
    this.slopeMap.slope.collideWith(this.player.sprite)
    this.player.update()
  }
}
