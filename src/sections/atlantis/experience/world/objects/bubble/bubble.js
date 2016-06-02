import THREE from 'three'

import forEach from 'lodash.foreach'

import bubbleSystemsConfig from './bubble-config'
import BubbleSystem from './bubble-system/bubble-system'

export default class Bubble extends THREE.Object3D {
    constructor() {
        super()

        this.systems = []


        forEach (bubbleSystemsConfig, (config, value) => {
            let bubbleSystem = new BubbleSystem(config)
            this.add(bubbleSystem)

            this.systems.push(bubbleSystem)
        })

        this.systems[0].position.z = 2
        this.systems[0].position.y = 0.2

        this.systems[1].position.y = 0.4

        this.systems[2].position.y = 2.0


    }

    update(frame) {
        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
