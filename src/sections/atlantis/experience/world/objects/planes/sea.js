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

        console.log(this.systems[2])

        // this.systems[2].options.elevation = -3.4

        // !crappy!
        document.querySelector('.main').addEventListener('click', function(){
          setTimeout(function(){
            TweenMax.to(this.systems[2].options, 2, {elevation: -3.4, ease: Power2.easeOut})
            TweenMax.to(this.systems[2].options, 2, {intensity: 1.5, ease: Power2.easeOut})
            TweenMax.to(this.systems[2].options, 2, {minIntensity: 0.1, ease: Power2.easeOut})
          }.bind(this), 28000)
        }.bind(this))
        // to remove later
    }

    update(frame) {

        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
