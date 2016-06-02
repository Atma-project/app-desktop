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

        TweenMax.to(this.aura.position, 2, {y: 0.4, repeat: -1, yoyo:true, ease:Linear.easeNone})
        TweenMax.to(this.core.position, 2, {y: 0.4, repeat: -1, yoyo:true, ease:Linear.easeNone})
    }

    listenToUserMotion() {
        MovementManager.init()
    }

    animateOnUserMotion() {
        let t
        let rawData

        MovementManager.socket.on('delta-motion', throttle((data) => {
            rawData = Math.trunc(Math.abs((data.y / 1000) + (data.x / 1000) + (data.z / 1000)) / 3)
            console.log(rawData);
            // if (t && t.progress() < 1) {
            //     // t.kill()
            //     t = TweenMax.staggerTo(this.leftStaggerValues, 1, {
            //         value: size,
            //         ease:Power1.easeOut
            //     }, 0.5)
            // } else {
            //     t = TweenMax.staggerTo(this.leftStaggerValues, 1, {
            //         value: size,
            //         ease:Power1.easeOut
            //     }, 0.5)
            // }
        }, 100))
    }

    update(frame) {
        this.core.update(frame)
        this.aura.update(frame)
    }
}
