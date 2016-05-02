import THREE from 'three'

import forEach from 'lodash.foreach'

import planktonSystemsConfig from './planktons-config'
import PlanktonSystem from './plankton-system/plankton-system'

export default class Planktons extends THREE.Object3D {
    constructor() {
        super()

        this.systems = []

        forEach (planktonSystemsConfig, (config, value) => {
            let planktonSystem = new PlanktonSystem(config)
            this.add(planktonSystem)

            this.systems.push(planktonSystem)
        })

        this.systems[0].position.z = 4
        this.systems[1].position.z = 0
    }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
