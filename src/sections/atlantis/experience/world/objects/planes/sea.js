import THREE from 'three'

import 'gsap'

import forEach from 'lodash.foreach'

import seaSystemsConfig from './sea-config'
import SeaSystem from './sea-system/sea-system'

export default class Sea extends THREE.Object3D {
    constructor() {
        super()

        this.systems = []

        forEach (seaSystemsConfig, (config, value) => {
            let seaSystem = new SeaSystem(config)
            this.add(seaSystem)

            this.systems.push(seaSystem)
        })

        this.systems[0].position.set(0, 0, 0)
        this.systems[0].rotation.set(0.05, 0, 0)

        this.systems[1].position.set(0, -10, 0)
        this.systems[2].position.set(0, -10, 0)

        this.systems[3].position.set(0, -6.45, 0)
        this.systems[3].rotation.x = -Math.PI / 1.8
        this.systems[3].scale.set(1, 1, 0.6)

        // !crappy!
        document.querySelector('.main').addEventListener('click', function(){
            setTimeout(function(){
                TweenMax.to(this.systems[2].options, 4, {elevation: -3.4, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 4, {perlin_passes: 3.0, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 4, {noise_range: 1.7, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 2, {intensity: 1.5, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 2, {minIntensity: 0.1, ease: Power2.easeOut})
            }.bind(this), 55000)

            setTimeout(function(){
                TweenMax.to(this.systems[3].options, 4, {alpha: 0.0, ease: Power2.easeOut})
            }.bind(this), 26000)

        }.bind(this))
        // to remove later
    }

    fakeLight(){
      TweenMax.to(this.systems[2].options, 2, {minIntensity: 0.4, repeat: -1, yoyo:true, ease:Linear.easeNone});
    }

    update(frame) {

        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
