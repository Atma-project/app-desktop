import THREE from 'three'
import gui from 'helpers/app/gui'

import SeaweedMaterial from './seaweedMaterial'

export default class Seaweed extends THREE.Object3D {
    constructor() {
        super()

        this.texture = new THREE.TextureLoader().load( './assets/images/textures/seaweed.png')

        this.geometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 20, 50 )

        // this.material = new SeaweedMaterial({texture: this.texture})
        this.material = new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide,
            color: 0x8C84DA,
            emissive: 0x000000,
            vertexColors: THREE.VertexColors
        })
        this.seaweed = new THREE.Mesh(this.geometry, this.material)

        // this.seaweed.material.uniforms.random.value = Math.random() * (1 - 0.1) + 0.1

        this.seaweed.geometry.computeBoundingSphere()

        this.add(this.seaweed)
    }

    update(frame) {
        // this.seaweed.material.update(frame)
        // this.seaweed.material.uniforms.frame.needsUpdate = true
    }
}
