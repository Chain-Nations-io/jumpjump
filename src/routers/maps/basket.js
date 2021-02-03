'use strict';

const { ExtendedObject3D } = ENABLE3D

// state === this, py === Position Y Axis, ry === Rotation Y Axis. 
const basketMap = async (state, py ,ry) => {
  const object = await state.load.gltf('basket')
  const scene = object.scenes[0]

  const floor = new ExtendedObject3D()
  floor.add(scene)
  state.add.existing(floor)

  floor.traverse((child) => {
    if (child.isMesh) {
      state.basket = child
      state.allObjects.push(child)
      state.basket.name = 'basket'
      state.basket.position.set(0, 0, -py)
      state.basket.rotation.set(0, 0, ry)
      state.physics.add.existing(child, {
        shape: 'concave',
        mass: 10,
        collisionFlags: 2,
        autoCenter: false
      })
    }
  })
}

export {
  basketMap
};
