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

    }

    animate() {
        let scaleCoef = 1.5
        let initialCoef = 1
        let tlCore = new TimelineMax()
        let tlAura = new TimelineMax({yoyo: true, repeat: -1})

        tlCore.fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 2.5,
            y: 2.5,
            z: 2.5,
        }, {
            x: 4.5,
            y: 4.5,
            z: 4.5,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 2).fromTo(this.core.scale, 1,{
            x: 4.5,
            y: 4.5,
            z: 4.5,
        }, {
            x: 6.5,
            y: 6.5,
            z: 6.5,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 4).fromTo(this.core.scale, 1,{
            x: 6.5,
            y: 6.5,
            z: 6.5,
        }, {
            x: 8.5,
            y: 8.5,
            z: 8.5,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 6).fromTo(this.core.scale, 1,{
            x: 8.5,
            y: 8.5,
            z: 8.5,
        }, {
            x: 10.5,
            y: 10.5,
            z: 10.5,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 10).fromTo(this.core.scale, 1,{
            x: 10.5,
            y: 10.5,
            z: 10.5,
        }, {
            x: 12.5,
            y: 12.5,
            z: 12.5,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 12).fromTo(this.core.scale, 1,{
            x: 12.5,
            y: 12.5,
            z: 12.5,
        }, {
            x: 14.5,
            y: 14.5,
            z: 14.5,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 15).fromTo(this.core.scale, 1,{
            x: 14.5,
            y: 14.5,
            z: 14.5,
        }, {
            x: 16.5,
            y: 16.5,
            z: 16.5,
            ease: Elastic.easeOut.config(1, 0.4)
        }, 17)

        // tlAura.fromTo(this.aura.material.uniforms.speed, 1,
        //     {value: 20},
        //     {value: 10}
        //
        // ).fromTo(this.aura.material.uniforms.noiseSmoothing, 1,
        //     {value: 0.5},
        //     {value: 0.19}, 0
        //
        // ).fromTo(this.aura.scale, 1,
        //     {x: 1, y: 1, z: 1},
        //     {x: scaleCoef, y: scaleCoef, z: scaleCoef}, 0
        //
        // ).fromTo(this.aura.uniforms.amplitude, 1,
        //     {value: 0.1},
        //     {value: 0.4}, 0
        // )
    }

    update(frame) {
        this.core.update(frame)
        this.aura.update(frame)
    }
}
