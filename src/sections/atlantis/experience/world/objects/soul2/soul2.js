import THREE from 'three'

import Core from './core/core'
import Aura from './aura/aura'

export default class Soul2 extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.core = new Core(world, debug)
        this.add(this.core)

        this.aura = new Aura(world, debug)
        this.add(this.aura)

        this.position.x = -100

        this.initGUI(world.soul2Folder)
    }

    initGUI(gui) {

    }

    update(frame) {
        this.core.update(frame)
        this.aura.update(frame)
    }
}
