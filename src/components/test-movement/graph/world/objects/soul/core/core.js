import THREE from 'three'
import gui from 'helpers/app/gui'

const M_PI = Math.PI
const M_2_PI = 2 * M_PI

const HEIGHT = 300
const RADIUS = 100

let material

export default class SoulCore extends THREE.Points {
    constructor(world, debug) {

        //set the geometry and its vertices
        let geometry  = new THREE.BufferGeometry()
        let positions = new Float32Array(3)
        let offsets = new Float32Array(1)
        let sizes = new Float32Array(1)

        positions[0] = 10
        positions[1] = 10
        positions[2] = 0
        offsets[0] = Math.random() * M_2_PI
        sizes[0] = 100

        //set the shader's attributes and uniforms
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.addAttribute('initial', new THREE.BufferAttribute(positions, 3))
        geometry.addAttribute('offset', new THREE.BufferAttribute(offsets, 1))
        geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1))

        geometry.attributes.position.needsUpdate = true
        geometry.attributes.initial.needsUpdate = true
        geometry.attributes.size.needsUpdate = true

        geometry.computeBoundingSphere()

        let uniforms = {
            frame: {
                type: 'f',
                value: 0.0
            },
            size: {
                type: 'f',
                value: 100.0
            },
            speedCoef: {
                type: 'f',
                value: 10.0
            },
            time: {
                type: 'f',
                value: 2.0
            },
            intensity: {
                type: 'f',
                value: 1.6
            },
            hue: {
                type: 'f',
                value: 0.1
            },
            saturation: {
                type: 'f',
                value: 0.7
            },
            lightness: {
                type: 'f',
                value: 0.45
            }
        }

        //set the material
        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            sizeAttenuation: true,
            transparent: true
        })
        material.uniforms.time.needsUpdate = true

        //call the constructor
        super(geometry, material)

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        //init GUI
        this.initGUI(gui)
    }

    initGUI(gui) {
        this.souf = gui.addFolder('Soul')

        this.souf.add(this.material.uniforms.intensity, 'value', 0, 5).name('intensity')
        this.souf.add(this.material.uniforms.hue, 'value', 0, 1).name('hue')
        this.souf.add(this.material.uniforms.saturation, 'value', 0, 1).name('saturation')
        this.souf.add(this.material.uniforms.lightness, 'value', 0, 1).name('lightness')
        this.souf.add(this.material.uniforms.size, 'value', 0, 1000).name('size').listen()
        this.souf.add(this.material.uniforms.speedCoef, 'value', 0, 100).name('speed')
    }

    update(frame) {
        this.material.uniforms.frame.value = frame
        this.material.uniforms.time.value = Math.sin(frame)
    }
}
