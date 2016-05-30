import THREE from 'three'

import forEach from 'lodash.foreach'
import throttle from 'lodash.throttle'

import planktonSystemsConfig from './planktons-config'
import PlanktonSystem from './plankton-system/plankton-system'

import MovementManager from 'helpers/movements/movement-manager'

export default class Planktons extends THREE.Object3D {
    constructor() {
        super()

        this.systems = []

        forEach (planktonSystemsConfig, (config, value) => {
            let planktonSystem = new PlanktonSystem(config)
            this.add(planktonSystem)

            this.systems.push(planktonSystem)
        })

        this.systems[0].position.z = 5
        this.systems[1].position.z = 0
    }

    listenToUserMotion() {
        MovementManager.init()
    }

    animateOnUserMotion() {
        let t
        let size = 1.0
        // MovementManager.init()
        // MovementManager.socket.on('motion', throttle((data) => {
        //
        //     size = Math.trunc(Math.abs((data.y / 1000) + (data.x / 1000) + (data.z / 1000)) / 3)
        //     console.log(size)
        //     if (t && t.progress() < 1) {
        //         t.updateTo({
        //             value: size
        //         })
        //     } else {
        //         t = TweenMax.to(this.planktons.systems[0].material.uniforms.size, 0.5, {
        //             value: size,
        //             ease:Power1.easeOut
        //         })
        //     }
        // }, 600))

        MovementManager.socket.on('delta-rotation', throttle((data) => {

            size = Math.trunc(Math.abs(data.alpha + data.beta + data.gamma) / 3)
            console.log(size)
            if (t && t.progress() < 1) {
                t.updateTo({
                    value: size
                })
            } else {
                t = TweenMax.to(this.planktons.systems[0].material.uniforms.size, 0.5, {
                    value: size,
                    ease:Power1.easeOut
                })
            }
        }, 600))
    }

    // animateOnUserMotion() {
    //     let t
    //     let motionIntensity = 1.0
    //     let motionIntensityX = 1.0
    //     let motionIntensityY = 1.0
    //     let motionIntensityZ = 1.0
    //     let size = 1.0
    //
    //     MovementManager.socket.on('delta-motion', (data) => {
    //
    //         motionIntensityX = Math.trunc(Math.abs((data.x / 1000)))
    //         motionIntensityY = Math.trunc(Math.abs((data.y / 1000)))
    //         motionIntensityZ = Math.trunc(Math.abs((data.z / 1000)))
    //         motionIntensity = Math.trunc(Math.abs((data.y / 1000) + (data.z / 1000)) / 2)
    //
    //         console.log('y: ', motionIntensityY)
    //         console.log('z: ', motionIntensityZ)
    //         console.log('average: ', motionIntensity)
    //
    //         if (motionIntensity > 55) {
    //             this.systems[0].material.uniforms.size.value += 0.1
    //         } else if (motionIntensity < 45) {
    //             this.systems[0].material.uniforms.size.value -= 0.01
    //         } else {
    //             size -= 0.1
    //         }
    //
    //     })
    // }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
