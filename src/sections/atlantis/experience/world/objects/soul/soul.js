import THREE from 'three'

import Core from './core/core'
// import Dust from './dust/dust'

export default class Soul extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.core = new Core(world, debug)
        this.add(this.core)
    }

    update(frame) {
        this.core.update(frame)
    }
}
