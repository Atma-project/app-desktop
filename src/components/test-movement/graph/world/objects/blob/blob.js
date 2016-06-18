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

        window.addEventListener('click', ::this.animate)
    }

    animate() {
        let tlCore = new TimelineMax()

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
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 2.36).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 4.56).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 6.8).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 16.52).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 18.8).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease:  Elastic.easeOut.config(1, 0.4)
        }, 21.04).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        }).fromTo(this.core.scale, 1,{
            x: 1,
            y: 1,
            z: 1,
        }, {
            x: 2,
            y: 2,
            z: 2,
            ease: Elastic.easeOut.config(1, 0.4)
        }, 23.28).fromTo(this.core.scale, 1,{
            x: 2,
            y: 2,
            z: 2,
        }, {
            x: 1,
            y: 1,
            z: 1,
            ease:  Elastic.easeOut.config(1, 0.4)
        })
    }

    update(frame) {
        this.core.update(frame)
        this.aura.update(frame)
    }
}
