import THREE from 'three'
import 'gsap'

import Core from './core/core'

export default class Soul extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.core = new Core(world, debug)
        this.add(this.core)
        this.position.x = -10
        this.position.y = -9.5
    }

    update(frame) {
        this.core.update(frame)
    }
}
