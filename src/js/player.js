import Phaser from 'phaser'
/**
 * A Class that wrap mario style player logic.
 */
export default class Player {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y) {

    this.sprite = scene.physics.add.sprite(100, 100, 'dude');

    const anims = scene.anims;
    // Set animation
    anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.sprite.setPosition(x, y);
    this.sprite.setBounce(0);
    this.sprite.setCollideWorldBounds(true);

    // Initialize input
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-160);

      this.sprite.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(160);

      this.sprite.anims.play('right', true);
    }
    else {
      this.sprite.setVelocityX(0);

      this.sprite.anims.play('turn');
    }
    console.log(this.sprite.body.onSlope())
    if ((this.cursors.up.isDown || this.cursors.space.isDown)
      && (this.sprite.body.onSlope() || this.sprite.body.onFloor())
      ) {
      this.sprite.setVelocityY(-250);

      this.isTouchSlope = false;
    }
  }
}
