import THREE from 'three'
import 'gsap'

import forEach from 'lodash.foreach'

import planktonSystemsConfig from './planktons-config'
import PlanktonSystem from './plankton-system/plankton-system'

export default class Planktons extends THREE.Object3D {
    constructor() {
        super()

        this.speed = 0.0

        this.systems = []

        forEach (planktonSystemsConfig, (config, value) => {
            let planktonSystem = new PlanktonSystem(config)
            this.add(planktonSystem)

            this.systems.push(planktonSystem)
        })

        this.systems[0].position.set(1.5, -1, 1)
        this.systems[1].position.set(1.5, 0, 2)
        this.systems[2].position.set(-1.5, 0, 2)
        this.systems[3].position.set(-1.5, -1, 1)
        this.systems[4].position.set(0, 1, 0)
        this.systems[5].position.set(0, 1.5, 0)

    }

    fakeAnimate() {
        let tlRight = new TimelineMax({delay: 3, repeat: 4, repeatDelay: 3})
        let tlLeft = new TimelineMax({repeat: 4, repeatDelay: 3})

        tlRight.fromTo(this.systems[0].material.uniforms.size, 1,
            {value: 10, ease:Power0.easeIn},
            {value: 100, ease:Power0.easeIn}

        ).fromTo(this.systems[0].material.uniforms.size, 1,
            {value: 100, ease:Power0.easeIn},
            {value: 10, ease:Power0.easeIn}

        ).fromTo(this.systems[1].material.uniforms.size, 1,
            {value: 10, ease:Power0.easeIn },
            {value: 100, ease:Power0.easeIn}, 0

        ).fromTo(this.systems[1].material.uniforms.size, 1,
            {value: 100, ease:Power0.easeIn },
            {value: 10, ease:Power0.easeIn}, 1
        )

        tlLeft.fromTo(this.systems[2].material.uniforms.size, 1,
            {value: 10, ease:Power0.easeIn},
            {value: 100, ease:Power0.easeIn}

        ).fromTo(this.systems[2].material.uniforms.size, 1,
            {value: 100, ease:Power0.easeIn},
            {value: 10, ease:Power0.easeIn}

        ).fromTo(this.systems[3].material.uniforms.size, 1,
            {value: 10, ease:Power0.easeIn },
            {value: 100, ease:Power0.easeIn}, 0

        ).fromTo(this.systems[3].material.uniforms.size, 1,
            {value: 100, ease:Power0.easeIn },
            {value: 10, ease:Power0.easeIn}, 1
        )
    }

    movePlanktons() {
        this.speed = 0.0050
    }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
            this.systems[i].position.z += this.speed
            // this.systems[i].rotation.z += 0.001
        }

        this.systems[0].rotation.x -= 0.01
        this.systems[1].rotation.x -= 0.01
        this.systems[2].rotation.x -= 0.01
        this.systems[3].rotation.x -= 0.01
    }
}
