import THREE from 'three'
import gui from 'helpers/app/gui'

export default class Seaweed extends THREE.Object3D {
    constructor() {
        super()
        this.gui = gui
        this.init()

        this.parameters = {
            size: 4,
            magnitude: 1
        }

        let seaConfig = gui.addFolder('Algue')
        seaConfig
            .add(this.parameters, 'size', -5, 10)
            .name('Taille')
        seaConfig
            .add(this.parameters, 'magnitude', -5, 5)
            .name('Magnitude')
    }

    init() {
        this.geometry = new THREE.PlaneGeometry( 1, 30, 1, 15 )
        this.texture = new THREE.TextureLoader().load( './assets/images/textures/noise.png')

        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( 2, 2 );

        this.material = new THREE.MeshBasicMaterial({
            color: 0xC6DABF,
            side: THREE.DoubleSide,
            shading:THREE.SmoothShading,
            //map: this.texture
        })
        this.plane = new THREE.Mesh( this.geometry, this.material )
        this.add( this.plane )
    }

    wave(frame) {
        for(let i = 0; i < this.plane.geometry.vertices.length / 1.2; i++) {
            this.vertice = this.plane.geometry.vertices[i]
            this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            this.vertice.z = Math.sin(this.distance.length() / this.parameters.size + (frame / 2)) * this.parameters.magnitude
        }
        this.plane.geometry.verticesNeedUpdate = true
    }

    update(frame) {
        //this.plane.rotation.x(45 * Math.PI / 180)

        this.wave(frame)
    }
}

//------------------------------------------------------------------------------

//if it is multiple objects forming one object use different
// export default class CocoonCore extends THREE.Mesh {
//     constructor() {
//
//     }
//
//     update(frame) {
//
//     }
// }
//
// //and put them in a
// export default class Cube extends THREE.Object3D {
//     constructor() {
//         super();
//
//     }
//
//     update(frame) {
//
//     }
// }
