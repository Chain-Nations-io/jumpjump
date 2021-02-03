'use strict';

import { basketMap } from '../maps/basket';
import { player } from '../player/player';
// import { currentState } from '../../states/state';
// import { statesObject } from '../../contants/statesObject';

const { Scene3D } = ENABLE3D;

class gamemode1 extends Scene3D {
  constructor() {
    // define the key and if you want it to be an WebXR scene or not
    super({ key: 'gamemode1', enableXR: false });
  }

  async preload() {
    await this.load.preload('basket', '/src/assets/glb/basket.glb')
  }

  async init() {
    this.allObjects = []
  }

  async create() {

    this.warpSpeed('-camera', 'sky', 'grid', 'ground', 'light', '-orbitControls')
    this.camera.position.set(0, 10, 20);

    // Debug.
    this.physics.debug.enable()

    // Resize.
    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      this.renderer.setSize(newWidth, newHeight);
      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();
    }

    window.onresize = resize;
    resize();

    // Add Counter.
    const countdown = () => {
      let timeleft = 5;
      const downloadTimer = setInterval(() => {
        if (timeleft <= 0) {
          clearInterval(downloadTimer);
          document.querySelector('.countdown-container').innerHTML = `<span class='text-white' style="font-size: 15em;">GO</span>`
          this.startGame = true
          setTimeout(() => {
            document.querySelector('.countdown-container').style = `display: none;`
            document.querySelector('#gamemode_1').style = `display: block;`
            getConnection().get('data').find({ id: 1 }).assign({ score: 0 }).write();
            const dbscore = getConnection().get('data').find({ id: 1 }).value();
            this.score = document.querySelector('.score_map_1');
            this.score.innerHTML = `<h2 class='text-white'>${dbscore.score}</h2>`;
            document.getElementById("alarmGo").play();
          }, 300);
        } else {
          document.querySelector(".countdown-container").innerHTML = `<span class='text-white' style="font-size: 15em;"> ${timeleft} </span>`
          document.getElementById("alarm").play();
        }
        timeleft -= 1;
      }, 1000);
    };
    // countdown();

    // Add Player .
    await player(this);

    let i = 0;
    let sum = 5

    // Add basketMap.
    await basketMap(this, 0, 0);
    // Add basketMap's x 10.
    while (i < 10) {
      let ry = Math.floor(Math.random() * 10) // Rotation Y Axis.
      await basketMap(this, sum, ry);
      i++;
      sum += 5;
    }

    // Check collisions.
    this.canjump = false
    this.player.body.on.collision((otherObject, event) => {
      if (otherObject.name === 'basket' && event === 'start') this.canjump = true
      if (otherObject.name === 'ground' && event === 'start') this.canjump = true
    });

    // Check if the user is moving the mouse/touch.
    this.mouseDown = false
    this.mouseMove = false
    this.position = { x: 0, y: 0 }
    this.movement = { x: 0, y: 0 }

    const down = (x, y) => {
      this.position = { x, y }
      this.movement = { x, y }
      this.mouseDown = true
    }

    const up = () => {
      this.position = { x: 0, y: 0 }
      this.movement = { x: 0, y: 0 }
      this.mouseDown = false
      this.mouseMove = false
    }

    const move = (x, y) => {
      if (this.mouseDown) {
        this.mouseMove = true
        this.movement = { x: x - this.position.x, y: y - this.position.y }
        this.position = { x: x, y: y }
      }
    }

    window.addEventListener('mousedown', e => down(e.clientX, e.clientY))
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY))

    window.addEventListener('touchstart', e => down(e.touches[0].clientX, e.touches[0].clientY))
    window.addEventListener('touchend', up)
    window.addEventListener('touchmove', e => move(e.touches[0].clientX, e.touches[0].clientY))

  }

  async update() {
    // Destructuring the current position of the Player.
    const { x, y, z } = this.player.position

    // The camera will follow the player according to his movement on the Y axis.
    this.camera.position.set(0, y, 15);

    // Iterate the array of 3d objects "Basket's".
    this.allObjects.map(e => {
      e.body.needUpdate = true
      const speed = -0.1

      // Change the value of 'e.position.z' to positive.
      this.positiveNumber = Math.abs(e.position.z) + 10

      // Updates the rotation of the Z Axis according to the movement of the mouse.
      if (this.mouseMove) {
        e.rotation.z += this.movement.x * speed
        setTimeout(() => this.mouseMove = false, 50);
      }
      /*  
        Check if the player's position on the Y axis is greater than the position of the Basket on the Z axis.
        If the position is higher. This updates the Array of 3d Objects "Baskets" and will remove the "Basket" from the array.
      */
      if (y > this.positiveNumber) {
        this.currenObjects = this.allObjects.filter(item => item.uuid !== e.uuid);
        this.allObjects = this.currenObjects;
        // Destroy physics and object.
        this.destroy(e); 
        e.visible = false
      }

    })
    
    // Add gravity.
    if (!this.canjump) this.player.body.setGravity(0, -30, 0)

    // It propels the player towards the Y axis if the player collides with the basket.
    if (this.canjump) {
      // document.querySelector('#jumpSound').play()
      this.player.body.setVelocity(0, 20, 0)
      this.canjump = false
    }

  };

};

export {
  gamemode1
};
