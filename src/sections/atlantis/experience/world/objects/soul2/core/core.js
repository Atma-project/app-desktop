import THREE from 'three'

const M_PI = Math.PI
const M_2_PI = 2 * M_PI

const RADIUS = 25
const WIDTH = 25
const HEIGHT = 25

export default class Soul2Core extends THREE.Mesh {
    constructor(world, debug) {

        //set the geometry and its vertices
        let geometry  = new THREE.SphereGeometry(RADIUS, WIDTH, HEIGHT)

        let uniforms = {
            amplitude: {
                type: 'f',
                value: 10.0
            },
            speed: {
                type: 'f',
                value: 10.0
            },
            noiseSmoothing: {
                type: 'f',
                value: 100.0
            },
            frame: {
                type: 'f',
                value: 0.0
            },
            bottomColor: {
                type: 'c',
                value: new THREE.Color(0x3bc7de)
            },
            topColor: {
                type: 'c',
                value: new THREE.Color(0xe9e58c)
            },
            speedCoef: {
                type: 'f',
                value: 10.0
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

        //set the material
        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true
        })

        material.uniforms.bottomColor.needsUpdate = true
        material.uniforms.topColor.needsUpdate = true
        geometry.computeVertexNormals()

        //call the constructor
        super(geometry, material)
        material.uniforms.noiseSmoothing.needsUpdate = true
        material.uniforms.speed.needsUpdate = true

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        //init GUI
        this.initGUI(world.soul2Folder)
    }

    initGUI(gui) {
        let core = gui.addFolder('Core')
        core.add(this.material.uniforms.noiseSmoothing, 'value', 0, 200).name('nSmoothing')
        core.add(this.material.uniforms.speed, 'value', 0, 55).name('speed')
        core.add(this.material.uniforms.amplitude, 'value', 0, 150).name('amplitude')
    }

    update(frame) {
        this.material.uniforms.frame.value = frame
    }
}
