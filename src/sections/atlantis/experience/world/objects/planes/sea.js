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

        // !crappy!
        document.querySelector('.main').addEventListener('click', function(){
            setTimeout(function(){
                TweenMax.to(this.systems[2].options, 4, {elevation: -3.4, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 4, {perlin_passes: 3.0, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 4, {noise_range: 1.7, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 2, {intensity: 1.5, ease: Power2.easeOut})
                TweenMax.to(this.systems[2].options, 2, {minIntensity: 0.1, ease: Power2.easeOut})
            }.bind(this), 35000)
        }.bind(this))
        // to remove later
    }

    fakeLight(){
        let t = new TimelineMax()
        console.log('ok');

        t.to(this.systems[2].options, 2, {
            minIntensity: 10.1
        }, '-=4')
        t.fromTo(this.systems[2].options, 2, {
            minIntensity: 10.1
        }, {
            minIntensity: 0.1
        }, '-=6')
    }

    update(frame) {

        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
