import THREE from 'three'
import gui from 'helpers/app/gui'
import MovementManager from 'helpers/movements/movement-manager'
import throttle from 'lodash.debounce'

const M_2_PI = Math.PI * 2
const M_PI   = Math.PI
const MIN_PLANKTON_SIZE = 5.0

let ssize = []
let intensities = []

export default class PlanktonSystem extends THREE.Points {
    constructor(options) {

        let bufferGeometry = new THREE.BufferGeometry()
        let positions      = new Float32Array(options.nbParticles * 3)
        let offsets        = new Float32Array(options.nbParticles)
        let sizes          = new Float32Array(options.nbParticles)

        for(let i = 0, i3 = 0; i < options.nbParticles; i++, i3 += 3) {
            positions[i3]     = Math.cos(i3 / options.nbParticles * M_PI / 3) + Math.random() * options.maxSystemRadius
            positions[i3 + 1] = Math.sin((i3 + 1) / options.nbParticles * M_PI / 3) + Math.random() * options.maxSystemRadius
            positions[i3 + 2] = Math.sin((i3 + 1) / options.nbParticles * M_PI / 3) + Math.random() * options.maxSystemRadius

            offsets[i] = Math.random() * M_2_PI

            sizes[i] = options.size
            ssize[i] = 0
            intensities[i] = i / options.nbParticles
        }

        bufferGeometry.addAttribute('initial', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true))
        bufferGeometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1).setDynamic(true))
        bufferGeometry.addAttribute('offset', new THREE.BufferAttribute(offsets, 1))
        bufferGeometry.attributes.position.needsUpdate = true
        bufferGeometry.attributes.size.needsUpdate = true

        let uniforms = {
            accel: {
                type: "f",
                value: 0
            },
            frame: {
                type: 'f',
                value: 0
            },
            time: {
                type: 'f',
                value: 2.0
            },
            texture: {
                type: 't',
                value:  new THREE.TextureLoader().load(options.litTexturePath)
            },
            color: {
                type: 'c',
                value: new THREE.Color
            },
            speedCoef: {
                type: 'f',
                value: 10.0
            },
            radius: {
                type: 'f',
                value: 10.0
            },
        }

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        //call the constructor
        super(bufferGeometry, material)

        this.start = Date.now()

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        this.options = options

        this.initGUI(gui)
        this.animateOnUserMotion()

    }

    animateOnUserMotion() {
        if(!MovementManager.listening) {
            MovementManager.init()
        }

        let rawData
        let size
        let i = 500

        let count = 0

        MovementManager.socket.on('delta-motion', (data) => {

            count++
            if (count > 10) {
                count = 0
                // console.log('lets go')
            } else {
                return
            }

            rawData = Math.trunc(Math.abs((data.y / 5000) + (data.x / 5000) + (data.z / 5000)) / 3)

            if(rawData < MIN_PLANKTON_SIZE) {
                size = MIN_PLANKTON_SIZE
            } else {
                size = rawData
            }

            for(let j = 0; j < this.options.nbParticles; j++) {
                ssize[j] = size
            }
        })
    }

    initGUI(gui) {
        let planktons = gui.addFolder('Planctons' + this.options.index)
        planktons.open()

        planktons.add(this.material.uniforms.speedCoef, 'value', 0, 100).name('speed')
        planktons.add(this.material.uniforms.radius, 'value', 0, 100).name('radius')
        planktons.add(this.options, 'size', 1, 500)
        planktons.addColor(this.options, 'color')
    }

    update(frame) {
        this.material.uniforms.frame.value = frame

        for(let s = 0, i = 0; i < this.options.nbParticles; i++) {
            s = this.geometry.attributes.size.array[i]
            this.geometry.attributes.size.array[i] = s + (ssize[i] - s) * 0.05 //this.options.size
            this.geometry.attributes.size.array[i] = Math.min(this.geometry.attributes.size.array[i], 20 * (intensities[i]))
        }
        // console.log(ssize.length, ssize[0], this.geometry.attributes.size.array[0])
        this.geometry.attributes.position.needsUpdate = true
        this.geometry.attributes.size.needsUpdate = true
        this.material.uniforms.color.value = new THREE.Color(this.options.color)
    }
}
