'use strict';
import { gamemode1 } from './gamemode1';
import { currentState } from '../../states/state';
import { statesObject } from '../../contants/statesObject';

const { Project, PhysicsLoader, THREE } = ENABLE3D;

const game = () => {
  PhysicsLoader(
    '/src/lib',
    () =>
      new Project({
        anisotropy: 1, // https://threejs.org/docs/#api/en/textures/Texture.anisotropy
        antialias: false, // false by default
        fixedTimeStep: 1 / 60,
        gravity: { x: 0, y: -9.81, z: 0 }, // the default gravity for all scenes
        maxSubSteps: 1,
        parent: 'gamemode1',
        width: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),
        height: window.innerHeight * Math.max(1, window.devicePixelRatio / 2),
        renderer: new THREE.WebGLRenderer({ antialias: true }), // add a custom renderer if you want
        scenes: [gamemode1]
      })
  )
}


const win = (divElement) => {
//   divElement.querySelector('#menu').addEventListener('click', () => currentState(statesObject.menu))
//   divElement.querySelector('#next').addEventListener('click', () => currentState(statesObject.gamemode2))
} 

const fail = (divElement) => {
//   divElement.querySelector('#menu').addEventListener('click', () => currentState(statesObject.menu))
//   divElement.querySelector('#restart').addEventListener('click', () => currentState(statesObject.gamemode1))
}

export {
  game,
  win,
  fail
};