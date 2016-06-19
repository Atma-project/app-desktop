import THREE from 'three'
import gui from 'helpers/app/gui'

const M_2_PI = Math.PI * 2

export default class PlanktonSystem extends THREE.Points {
    constructor(options) {

        let bufferGeometry = new THREE.BufferGeometry()
        let positions      = new Float32Array(options.nbParticles * 3)
        let particlesData  = []
        // let offsets        = new Float32Array(options.nbParticles)
        // let alphas         = new Float32Array(options.nbParticles)

        for(let i = 0; i < options.nbParticles; i++) {
            positions[i * 3]     = Math.random() * options.systemRadius - options.systemRadius / 2
            positions[i * 3 + 1] = Math.random() * options.systemRadius - options.systemRadius / 2
            positions[i * 3 + 2] = Math.random() * options.systemRadius - options.systemRadius / 2

            particlesData.push({
                velocity: new THREE.Vector3(Math.random() * 0.005, Math.random() * 0.005, Math.random() * 0.005)
            })
        }

        bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true))
        bufferGeometry.attributes.position.needsUpdate = true

        let uniforms = {
            frame: {
                type: 'f',
                value: 0
            },
            time: {
                type: 'f',
                value: 2.0
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
                type: '3f',
                value: new THREE.Vector3(Math.random() * 0.05, Math.random() * 0.05, Math.random() * 0.05)
            },
            radius: {
                type: 'f',
                value: options.systemRadius
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

        // this.start = Date.now()

        // this.castShadow = true
        // this.reciveShadow = true
        // this.dynamic = true

        this.options = options
        this.uniforms = uniforms
        this.positions = positions
        this.particleData = particlesData
        this.rHalf = this.options.systemRadius / 2

        this.initGUI(gui)

    }

    initGUI(gui) {
        let planktons = gui.addFolder('Planctons' + this.options.index)

        planktons.add(this.material.uniforms.radius, 'value', 0, 100).name('radius')
        planktons.add(this.options, 'size', 1, 500)
        planktons.addColor(this.options, 'color')
    }

    update(frame) {
        this.material.uniforms.frame.value = frame
        this.material.uniforms.size.value = this.options.size
        this.material.uniforms.color.value = new THREE.Color(this.options.color)

        for (let i = 0; i < this.options.nbParticles; i++) {
            let particleData = this.particleData[i]

            this.positions[i * 3] += particleData.velocity.x
            this.positions[i * 3 + 1] += particleData.velocity.y
            this.positions[i * 3 + 2] += particleData.velocity.z

            if ( this.positions[ i * 3 + 1 ] < -this.rHalf / 2 || this.positions[ i * 3 + 1 ] > this.rHalf / 2 )
				particleData.velocity.y = -particleData.velocity.y
			if ( this.positions[ i * 3 ] < -this.rHalf / 2 || this.positions[ i * 3 ] > this.rHalf / 2 )
				particleData.velocity.x = -particleData.velocity.x
			if ( this.positions[ i * 3 + 2 ] < -this.rHalf / 2 || this.positions[ i * 3 + 2 ] > this.rHalf / 2 )
				particleData.velocity.z = -particleData.velocity.z

        }
        this.geometry.attributes.position.needsUpdate = true
    }
}
