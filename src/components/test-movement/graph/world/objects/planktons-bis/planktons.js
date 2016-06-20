import THREE from 'three'

import forEach from 'lodash.foreach'
import throttle from 'lodash.throttle'

import planktonSystemsConfig from './planktons-config'
import PlanktonSystem from './plankton-system/plankton-system'

import MovementManager from 'helpers/movements/movement-manager'

const MIN_PLANKTON_SIZE = 10.0

export default class Planktons extends THREE.Object3D {
    constructor() {
        super()

        forEach (planktonSystemsConfig, (config, value) => {
            this.planktonSystem = new PlanktonSystem(config)
            this.add(this.planktonSystem)
        })
    }

    listenToUserMotion() {
        MovementManager.init()
    }

    animateOnUserMotion() {
        let t
        let ta
        let rawData
        let size

        MovementManager.socket.on('delta-motion', throttle((data) => {
            rawData = Math.trunc(Math.abs((data.y / 1000) + (data.x / 1000) + (data.z / 1000)) / 3)

            if(rawData < MIN_PLANKTON_SIZE) {
                size = 0
            } else {
                size = rawData * 2
            }

            if (ta && ta.progress() < 1) {
                ta = TweenMax.to(this.leftSystems[0].geometry.getAttribute('size').array[10], 1, {
                    value: size,
                    ease:Power1.easeOut
                }, '-=1')
                ta = TweenMax.to(this.leftSystems[1].geometry.getAttribute('size').array[10], 1, {
                    value: size,
                    ease:Power1.easeOut
                }, '-=2')
            } else {
                ta = TweenMax.to(this.leftSystems[0].geometry.getAttribute('size').array[10], 1, {
                    value: size,
                    ease:Power1.easeOut
                }, '-=1')
                ta = TweenMax.to(this.leftSystems[1].geometry.getAttribute('size').array[10], 1, {
                    value: size,
                    ease:Power1.easeOut
                }, '-=2')
            }
        }, 100))
    }

    update(frame) {
        this.planktonSystem.update()
        // this.planktonSystem.rotation.z += 0.01
    }
}
