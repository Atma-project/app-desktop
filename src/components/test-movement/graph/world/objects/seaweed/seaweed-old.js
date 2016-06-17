import THREE from 'three'
import gui from 'helpers/app/gui'
import MeshLine from 'helpers/graphics/Meshline-new.js'
// import Maf from 'helpers/maths/maf'

const LENGTH = 8

export default class Seaweed extends THREE.Mesh {
    constructor(world) {

        let geometry = new THREE.Geometry()
        let i = LENGTH

        while (i--) {
            let y = 1 - i / LENGTH
            let ratio = Math.pow(y, 2)
            let v = new THREE.Vector3(0, ratio * 10, 0)

            geometry.vertices.push(v)
        }

        let line = new THREE.MeshLine()
        line.setGeometry( geometry, function( p ) { return 1 * Maf.parabola( p, 1 ) } )
        let material = new THREE.MeshLineMaterial()

        super(line.geometry, material)
        this.line = line
    }

    wave(frame) {
        for(let i = 0; i < this.line.geometry.vertices.length - 2; i++) {
            this.vertice = this.line.geometry.vertices[i]
            this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            this.vertice.z = Math.sin(this.distance.length() / 10 + (frame / 2)) * 10
        }
        this.plane.geometry.verticesNeedUpdate = true
    }

    update(frame) {
        this.material.uniforms.time.value = frame
        this.line.update(frame)
    }
}
