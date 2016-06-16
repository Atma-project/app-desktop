import THREE from 'three'
import 'gsap'

import forEach from 'lodash.foreach'

import LineSystemsConfig from './line-config'
import LineSystem from './line-system/line-system'

export default class Line extends THREE.Object3D {
    constructor() {
        super()

        this.speed = 0.0

        this.systems = []

        forEach (LineSystemsConfig, (config, value) => {
            let lineSystem = new LineSystem(config)
            this.add(lineSystem)

            this.systems.push(lineSystem)
        })
        this.systems[0].position.set(0, 0, 0)
        this.systems[0].rotateX(Math.PI / 2)
        this.systems[0].rotateZ(Math.PI / 2)
    }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
            // this.systems[i].rotation.z += 0.001
        }
    }
}
