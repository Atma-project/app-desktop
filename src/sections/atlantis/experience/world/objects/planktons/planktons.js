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
        let tlRight = new TimelineMax()
        let tlLeft = new TimelineMax()

        // tlRight.to(this.systems[0].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, '+=2').fromTo(this.systems[0].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, {
        //     value: 5.0
        // }).to(this.systems[1].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, '-=3.5').fromTo(this.systems[1].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, {
        //     value: 5.0
        // }, '-=5')
        //
        // tlLeft.to(this.systems[2].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, '+=4').fromTo(this.systems[2].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, {
        //     value: 5.0
        // }).to(this.systems[3].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, '-=6').fromTo(this.systems[3].material.uniforms.size, 1.5, {
        //     value: 40.0
        // }, {
        //     value: 5.0
        // }, '-=8')

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
