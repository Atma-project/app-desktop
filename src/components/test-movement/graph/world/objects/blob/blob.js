import THREE from 'three'
import 'gsap'

import throttle from 'lodash.throttle'

import Core from './core/core'
import Aura from './aura/aura'

import MovementManager from 'helpers/movements/movement-manager'

export default class Blob extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.core = new Core(world, debug)
        this.add(this.core)

        this.aura = new Aura(world, debug)
        this.add(this.aura)

        TweenMax.to(this.aura.position, 2, {y: 0.4, repeat: -1, yoyo:true, ease:Sine.easeInOut})
        TweenMax.to(this.core.position, 2, {y: 0.4, repeat: -1, yoyo:true, ease:Sine.easeInOut})

        this.animate()
    }

    animate() {
        let scaleCoef = 2
        let tlCore = new TimelineMax({yoyo: true, repeat: -1})
        let tlAura = new TimelineMax({yoyo: true, repeat: -1})

        tlCore.fromTo(this.core.material.uniforms.speed, 1,
            {value: 20},
            {value: 10}

        ).fromTo(this.core.material.uniforms.noiseSmoothing, 1,
            {value: 0.5},
            {value: 0.19}, 0

        ).fromTo(this.core.scale, 1,
            {x: 1, y: 1, z: 1},
            {x: scaleCoef, y: scaleCoef, z: scaleCoef}, 0

        ).fromTo(this.core.uniforms.amplitude, 1,
            {value: 0.1},
            {value: 0.4}, 0
        )

        tlAura.fromTo(this.aura.material.uniforms.speed, 1,
            {value: 20},
            {value: 10}

        ).fromTo(this.aura.material.uniforms.noiseSmoothing, 1,
            {value: 0.5},
            {value: 0.19}, 0

        ).fromTo(this.aura.scale, 1,
            {x: 1, y: 1, z: 1},
            {x: scaleCoef, y: scaleCoef, z: scaleCoef}, 0

        ).fromTo(this.aura.uniforms.amplitude, 1,
            {value: 0.1},
            {value: 0.4}, 0
        )
    }

    update(frame) {
        this.core.update(frame)
        this.aura.update(frame)
    }
}
