import THREE from 'three'

const M_PI = Math.PI
const M_2_PI = 2 * M_PI

const HEIGHT = 300
const RADIUS = 100

export default class SoulCore extends THREE.Mesh {
    constructor(world, debug) {
        //set the geometry and its vertices
        let geometry = new THREE.SphereGeometry(0.5, 50.0, 50.0)

        //set the material
        let uniforms = {
            bottomColor: {
                type: 'c',
                value: new THREE.Color(0x3bc7de)
            },
            topColor: {
                type: 'c',
                value: new THREE.Color(0xe9e58c)
            },
            offset: {
                type: 'f',
                value: 33.0
            },
            exponent: {
                type: 'f',
                value: 0.6
            }
        }
        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true
        })

        //call the constructor
        super(geometry, material)
        this.world = world
        this.castShadow = true
        this.reciveShadow = true
    }

    update(frame) {

    }
}
