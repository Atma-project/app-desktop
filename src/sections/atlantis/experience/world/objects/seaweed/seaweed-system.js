import THREE from 'three'
import gui from 'helpers/app/gui'
import Seaweed from './seaweed'

const NB_SEAWEEDS = 500

export default class SeaweedSystem extends THREE.Object3D {
    constructor(camera) {
        super()

        this.camera = camera
        this.seaweeds = []
        this.parameters = {
            speed: 0
        }

        for ( let i = 0; i < NB_SEAWEEDS; i ++ ) {
            let seaweed = new Seaweed()

            seaweed.position.y = 0.5
            seaweed.position.x = Math.random() * (5 - -5) + -5
            seaweed.position.z = Math.random() * (20 - -20) + -20

            seaweed.scale.y = Math.random() + 1

            // seaweed.castShadow = true

            this.seaweeds.push(seaweed)

            this.add(seaweed)
        }
    }

    speedSeaweeds(){
        this.parameters.speed = 0.02
    }

    move() {
        for ( let i = 0; i < NB_SEAWEEDS; i ++ ) {
            this.seaweeds[i].position.z += this.parameters.speed
            if(this.camera.position.z - this.seaweeds[i].position.z <= 2) {
              if (this.seaweeds[i].position.x > 0) {
                this.seaweeds[i].rotation.z -= 0.005
              } else {
                this.seaweeds[i].rotation.z += 0.005
              }
            }
        }
    }

    update(frame) {
        for(let i = 0; i < NB_SEAWEEDS; i++) {
            this.seaweeds[i].update(frame)
        }
        this.move()
    }
}
