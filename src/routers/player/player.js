'use strict';

const { ExtendedObject3D } = ENABLE3D

const player = async state => {
    // state === this
    state.player = state.physics.add.sphere({ x: 0, y: 5, z: 2, radius: 0.5, bufferGeometry: true }, { lambert: { color: 0xffff00 } })
    state.player.body.setLinearFactor(0, 1, 0)
    state.player.body.setAngularFactor(0, 0, 0)
    state.player.body.setBounciness(0.2)
    // state.player.body.setFriction(0)
}

// const player = async state => {
//   const object = await state.load.gltf('sphere')
//   const scene = object.scenes[0]

//   const floor = new ExtendedObject3D()
//   floor.add(scene)
//   state.add.existing(floor)

//   floor.traverse((child) => {
//     if (child.isMesh) {
//       state.player = child
//       // state.player.name = 'sphere'
//       state.player.position.set(0, 5, 2)
//       // state.player.body.setLinearFactor(0, 1, 0)
//       // state.player.body.setAngularFactor(0, 0, 0)
//       state.physics.add.existing(child, {
//         shape: 'concave',
//         mass: 50,
//         collisionFlags: 0,
//         autoCenter: false
//       })
//     }
//   })
// }

export {
  player
};
