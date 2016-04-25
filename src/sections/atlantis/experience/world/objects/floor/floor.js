import THREE from 'three';

//------------------------------------------------------------------------------

//if it is only one object
export default class Floor extends THREE.Object3D {
    constructor(gui) {
        super()
        this.gui = gui
        this.init()
    }

    init() {
        this.geometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 )
        this.material = new THREE.ShaderMaterial( {
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag')
        });

        this.floor = new THREE.Mesh( this.geometry, this.material )
        this.floor.geometry.verticesNeedUpdate = true
        this.floor.rotation.x = 110 * Math.PI / 180
        this.add( this.floor )
    }

    update(frame) {

    }
}
