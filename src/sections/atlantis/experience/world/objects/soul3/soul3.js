import THREE from 'three'

import Core from './core/core'
// import Dust from './dust/dust'

export default class Soul3 extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.core = new Core(world, debug)
        this.add(this.core)

        this.position.x = 145

        this.initGUI(world.soul3Folder)
    }

    initGUI(gui) {

    }

    update(frame) {
        this.core.update(frame)
    }
}
