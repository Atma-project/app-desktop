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

        this.systems[0].position.set(1, -9, 1)
        this.systems[1].position.set(1, -8, 2)
        this.systems[2].position.set(-1, -8, 2)
        this.systems[3].position.set(-1, -9, 1)

        this.systems[4].position.set(0, -9, 0)
    }

    fakeAnimate() {
        let t = new TimelineMax()
        t.to(this.systems[0].material.uniforms.size, 2, {
            value: 20.0
        }, '+=2')
        t.fromTo(this.systems[0].material.uniforms.size, 2, {
            value: 20.0
        }, {
            value: 5.0
        })

        t.to(this.systems[1].material.uniforms.size, 2, {
            value: 20.0
        }, '-=4')
        t.fromTo(this.systems[1].material.uniforms.size, 2, {
            value: 20.0
        }, {
            value: 5.0
        }, '-=6')
    }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
