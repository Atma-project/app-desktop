import THREE from 'three'
import gui from 'helpers/app/gui'

const LENGTH = 50

export default class Seaweed extends THREE.Line {
    constructor(world) {

        let geometry = new THREE.Geometry()
        let index = LENGTH
        while (index--) {
            let y = 1 - index / LENGTH
            let ratio = Math.pow(y, 2)
            let v = new THREE.Vector3(0, ratio * 10, 0)

            geometry.vertices.push(v)
        }

        let material = new THREE.LineBasicMaterial({
            color: 0x000ff,
            linewidth: 10.0
        })

        super(geometry, material)
        console.log(this)
        this.vLength = this.geometry.vertices.length
    }

    wave(frame) {

        for(let i = 1; i < this.geometry.vertices.length; i++) {
            this.vertice = this.geometry.vertices[i]
            this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            this.vertice.z = Math.pow(i / this.vLength, 5) * (5 * Math.cos(frame / 2))
            this.vertice.y = Math.pow(i / this.vLength, 5) * (5 * Math.cos(frame / 2))
            // this.vertice.y = i / this.vLength
            // this.vertice = this.geometry.vertices[i]
            // this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            // this.vertice.x = (Math.cos(i / this.vLength * (frame / 2)))
            // this.vertice.y = (Math.sin(i / this.vLength * (frame / 2)))
        }
        this.geometry.verticesNeedUpdate = true
    }

    update(frame) {
        this.wave(frame)
        // for (var i = 0; i < this.geometry.vertices.length; i++) {
        //
        //     let vertice = this.geometry.vertices[i]
        //     vertice.y = i * 30
        // }
    }
}
