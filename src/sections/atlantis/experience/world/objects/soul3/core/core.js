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
            lightRatio: {
                type: 'f',
                value: 1.0
            },
            sepiaRatio: {
                type: 'f',
                value: 1.0
            },
            noiseRatio: {
                type: 'f',
                value: 1.0
            },
            texture: {
                type: 't',
                value: new THREE.TextureLoader().load('./assets/images/textures/testSoul.png')
            },
            uPatch: {
                type: 'f',
                value: 0.0
            },
            baseGlow: {
                type: 'f',
                value: 0.5
            },
            amount: {
                type: 'f',
                value: 2.0
            },
            uTime: {
                type: 'f',
                value: 2.0
            }
        }

        //set the material
        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true
        })
        material.uniforms.uTime.needsUpdate = true

        //call the constructor
        super(geometry, material)

        this.start = Date.now()
        this.noiseSpeed = 0.05
        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        //init GUI
        this.initGUI(gui)
    }

    initGUI(gui) {
        this.soul3Folder = gui.addFolder('Soul3')
        gui.add(this.material.uniforms.uPatch, 'value', 0, 1).name('uPatch')
        gui.add(this.material.uniforms.baseGlow, 'value', 0, 1).name('baseGlow')
        gui.add(this.material.uniforms.amount, 'value', 0, 5).name('amount')
        gui.add(this.material.uniforms.sepiaRatio, 'value', 0, 10).name('sepia')
        gui.add(this.material.uniforms.noiseRatio, 'value', 0, 10).name('noiseRatio')
        gui.add(this.material.uniforms.lightRatio, 'value', 0, 10).name('lightRatio')
        gui.add(this, 'noiseSpeed', 0, 0.5).step(0.05)
    }

    update(frame) {
        this.material.uniforms.uTime.value = this.noiseSpeed * ( Date.now() - this.start )
    }
}
