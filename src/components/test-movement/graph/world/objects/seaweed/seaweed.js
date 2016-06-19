import THREE from 'three'
import gui from 'helpers/app/gui'

import SeaweedMaterial from './seaweedMaterial'

const SEAWEED_RADIUS = 0.2
const NB_RADIUS_SEGS = 20

const SEAWEED_HEIGHT = 0.2
const NB_HEIGHT_SEGS = 50

const SEAWEED_SCALE = 0.01

export default class Seaweed extends THREE.Object3D {
    constructor() {
        super()

        this.texture = new THREE.TextureLoader().load('./assets/images/textures/seaweed.png')

        this.geometry = new THREE.CylinderGeometry( SEAWEED_RADIUS, SEAWEED_RADIUS, NB_RADIUS_SEGS, SEAWEED_HEIGHT, NB_HEIGHT_SEGS )
        this.geometry.scale(SEAWEED_SCALE, SEAWEED_SCALE, SEAWEED_SCALE)
        this.material = new SeaweedMaterial({texture: this.texture})
        this.seaweed = new THREE.Mesh(this.geometry, this.material)

        this.seaweed.material.uniforms.random.value = this.randomizeBending(0.0001, 0.001)

        this.seaweed.geometry.computeBoundingSphere()

        this.add(this.seaweed)
    }

    randomizeBending(min, max) {
        return Math.random() * (max - min) + min
    }

    update(frame) {
        this.seaweed.material.update(frame)
        this.seaweed.material.uniforms.frame.needsUpdate = true
    }
}
