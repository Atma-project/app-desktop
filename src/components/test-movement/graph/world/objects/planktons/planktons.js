import THREE from 'three'

import forEach from 'lodash.foreach'
import throttle from 'lodash.throttle'

import planktonSystemsConfig from './planktons-config'
import PlanktonSystem from './plankton-system/plankton-system'

import MovementManager from 'helpers/movements/movement-manager'

const MIN_PLANKTON_SIZE = 5.0

export default class Planktons extends THREE.Object3D {
    constructor() {
        super()

        this.rightSystems       = []
        this.rightStaggerValues = []

        this.leftSystems        = []
        this.leftStaggerValues  = []

        this.centralSystems     = []

        forEach (planktonSystemsConfig, (config, value) => {
            let planktonSystem = new PlanktonSystem(config)
            this.add(planktonSystem)

            if(config.position == 'left') {
                this.leftSystems.push(planktonSystem)
                this.leftStaggerValues.push(planktonSystem.material.uniforms.size)

            } else if(config.position == 'right') {
                this.rightSystems.push(planktonSystem)

            } else {
                this.centralSystems.push(planktonSystem)
            }
        })

        this.rightSystems[0].position.set(1.5, -9, 1)
        this.rightSystems[1].position.set(1.5, -8, 2)

        this.leftSystems[0].position.set(-1.5, -8, 2)
        this.leftSystems[1].position.set(-1.5, -9, 1)

        this.centralSystems[0].position.set(0, -9, 0)
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
                size = MIN_PLANKTON_SIZE
            } else {
                size = rawData
            }
            
            if (t && t.progress() < 1) {
                // t.kill()
                t = TweenMax.staggerTo(this.leftStaggerValues, 1, {
                    value: size,
                    ease:Power1.easeOut
                }, 0.5)
            } else {
                t = TweenMax.staggerTo(this.leftStaggerValues, 1, {
                    value: size,
                    ease:Power1.easeOut
                }, 0.5)
            }

            // if (ta && ta.progress() < 1) {
            //     ta = TweenMax.to(this.leftSystems[0].material.uniforms.size, 1, {
            //         value: size,
            //         ease:Power1.easeOut
            //     }, '-=1')
            // } else {
            //     ta = TweenMax.to(this.leftSystems[0].material.uniforms.size, 1, {
            //         value: size,
            //         ease:Power1.easeOut
            //     }, '-=1')
            // }
        }, 100))
    }

    update(frame) {
        for(let i = 0; i < this.rightSystems.length; i++) {
            this.rightSystems[i].update(frame)
        }
        for(let i = 0; i < this.leftSystems.length; i++) {
            this.leftSystems[i].update(frame)
        }
        for(let i = 0; i < this.centralSystems.length; i++) {
            this.centralSystems[i].update(frame)
        }
    }
}
