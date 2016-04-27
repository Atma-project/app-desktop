import THREE from 'three'

import forEach from 'lodash.foreach'

import planktonSystemsConfig from './planktons-config'
import PlanktonSystem from './plankton-system/plankton-system'

export default class Planktons extends THREE.Object3D {
    constructor() {
        super()

        forEach (planktonSystemsConfig, (config, value) => {
            this.planktonSystem = new PlanktonSystem(config)
            this.add(this.planktonSystem)
        })
    }

    update(frame) {
        this.planktonSystem.update(frame)
    }
}
