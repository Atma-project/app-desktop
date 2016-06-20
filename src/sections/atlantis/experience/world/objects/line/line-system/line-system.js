import THREE from 'three'
import gui from 'helpers/app/gui'

const M_2_PI = Math.PI * 2

export default class LineSystem extends THREE.Points {
    constructor(options) {

        let bufferGeometry = new THREE.BufferGeometry()
        let positions      = new Float32Array(options.nbParticles * 3)
        let offsets        = new Float32Array(options.nbParticles)
        let alphas         = new Float32Array(options.nbParticles)

        for(let i = 0, i3 = 0; i < options.nbParticles; i++, i3 += 3) {
            // positions[i3]     = (Math.random() * 2 - 1) * options.systemRadius
            // positions[i3 + 1] = (Math.random() * 2 - 1) * 0.1
            // positions[i3 + 2] = (Math.random() * 25 - 10) * options.systemRadius

            positions[i3]     = 0.0
            positions[i3 + 1] = (Math.random() * 0.8 - 0.2) * 0.1
            positions[i3 + 2] = 0.0

            offsets[i] = Math.random() * M_2_PI * 4
        }

        bufferGeometry.addAttribute('initial', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('offset', new THREE.BufferAttribute(offsets, 1))
        bufferGeometry.attributes.position.needsUpdate = true

        let uniforms = {
            frame: {
                type: 'f',
                value: 0
            },
            size: {
                type: 'f',
                value: options.size
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
                value: 1.0
            },
            radius: {
                type: 'f',
                value: 10.0
            },
            disform: {
                type: 'f',
                value: 1.4
            },
            speedLine: {
                type: 'f',
                value: 1.78
            },
        }

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            alphaTest: 0.5,
            blending: THREE.AdditiveBlending
        })

        //call the constructor
        super(bufferGeometry, material)

        this.start = new THREE.Clock()

        // this.castShadow = true
        // this.reciveShadow = true
        // this.dynamic = true

        this.options = options
        this.uniforms = uniforms

        // TweenMax.to(this.material.uniforms.speedCoef, 4, {value: 0.81, yoyo: true, repeat: -1, ease: Power4.easeInOut})

        this.initGUI(gui)

        // document.addEventListener( 'mousemove', function( e ) {
        //     material.uniforms.disform.value = (e.clientX / window.innerWidth) / 5
        // }.bind(this), false );

    }

    moveLine() {
        TweenMax.to(this.material.uniforms.speedLine, 4, {value: 1.8, ease: Power2.easeOut})
    }

    initGUI(gui) {
        let line = gui.addFolder('Line' + this.options.index)
        // line.open()

        line.add(this.material.uniforms.speedCoef, 'value', 0, 100).name('speed')
        line.add(this.material.uniforms.radius, 'value', 0, 100).name('radius')
        line.add(this.material.uniforms.disform, 'value', 0, 100).name('disform')
        line.add(this.material.uniforms.speedLine, 'value', 0, 10).name('vitesse ligne')
        line.add(this.options, 'size', 1, 500)
        line.addColor(this.options, 'color')
    }

    update(frame) {
        this.material.uniforms.frame.value = this.start.getElapsedTime()
        this.material.uniforms.size.value = this.options.size
        this.material.uniforms.color.value = new THREE.Color(this.options.color)
    }
}
