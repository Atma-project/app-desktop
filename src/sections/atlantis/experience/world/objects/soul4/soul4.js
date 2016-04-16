import THREE from 'three'

import Texture from './texture'

const M_PI = Math.PI
const M_2_PI = 2 * M_PI

const RADIUS = 30
const WIDTH = 30
const HEIGHT = 30

export default class Soul4 extends THREE.Mesh {
    constructor(world, debug) {

        //set the geometry and its vertices
        let texture = new Texture(world, debug)
        let geometry  = new THREE.SphereGeometry(RADIUS, WIDTH, HEIGHT)
        let material = new THREE.MeshBasicMaterial({
            map: texture,
            // wireframe: true,
            transparent: true
        })

        //call the constructor
        super(geometry, material)
        this.position.x = 400
        //init GUI
        this.initGUI(world.soul4Folder)
    }

    initGUI(gui) {

    }

    update(frame) {
        // this.rotation.y = (frame / 200) % M_2_PI

        this.material.map.update(frame)
        this.material.needsUpdate = true
    }
}
