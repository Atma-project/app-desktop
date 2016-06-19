import THREE from 'three'
import gui from 'helpers/app/gui'
import Seaweed from './seaweed'

const NB_SEAWEEDS = 500

export default class SeaweedSystem extends THREE.Object3D {
    constructor() {
        super()

        this.seaweeds = []

        for ( let i = 0; i < NB_SEAWEEDS; i ++ ) {
            let seaweed = new Seaweed()

            seaweed.rotation.x = - Math.PI / 2 * Math.random()
            seaweed.position.y = 0
            seaweed.position.x = Math.random() * (5 - -5) + -5
            seaweed.position.z = Math.random() * (20 - -20) + -20

            seaweed.scale.y = Math.random() + 1

            // seaweed.castShadow = true

            this.seaweeds.push(seaweed)

            this.add(seaweed)
        }

        this.initGUI(gui)
    }

    initGUI(gui) {
        let seaweeds = gui.addFolder('Seaweeds')

        // seaweeds.add(this.core.material.uniforms.noiseSmoothing, 'value', 0, 1).name('nSmoothing').step(0.01)
        // seaweeds.add(this.core.material.uniforms.speed, 'value', 0, 30).name('speed').step(0.1)
        // seaweeds.add(this.core.material.uniforms.amplitude, 'value', 0, 2).name('amplitude').step(0.01)
        // seaweeds.addColor(this.colorOptions, 'topColor')
        // seaweeds.addColor(this.colorOptions, 'bottomColor')
    }

    update(frame) {
      for(let i = 0; i < NB_SEAWEEDS; i++) {
          this.seaweeds[i].update(frame)
      }
    }
}
