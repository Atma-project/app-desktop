import THREE from 'three'
import 'gsap'

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

        this.systems[0].position.set(1.5, -9, 1)
        this.systems[1].position.set(1.5, -8, 2)
        this.systems[2].position.set(-1.5, -8, 2)
        this.systems[3].position.set(-1.5, -9, 1)

        this.systems[4].position.set(0, -9, 0)
    }

    fakeAnimate() {

        TweenMax.to(this.systems[0].material.uniforms.size, 2, {value: 40, repeat: -1, yoyo:true, ease:Linear.easeNone});
        TweenMax.to(this.systems[1].material.uniforms.size, 2, {value: 40, repeat: -1, yoyo:true, ease:Linear.easeNone});
        TweenMax.to(this.systems[2].material.uniforms.size, 2, {value: 40, repeat: -1, yoyo:true, ease:Linear.easeNone});
        TweenMax.to(this.systems[3].material.uniforms.size, 2, {value: 40, repeat: -1, yoyo:true, ease:Linear.easeNone});
    }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
            this.systems[i].position.z += 0.001
            this.systems[i].rotation.z += 0.001
        }
    }
}
