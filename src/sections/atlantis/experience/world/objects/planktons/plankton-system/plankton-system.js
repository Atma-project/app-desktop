import THREE from 'three'

const M_2_PI = Math.PI * 2

export default class PlanktonSystem extends THREE.Points {
    constructor({
        systemRadius,
        nbParticles,
        out,
        particleSize,
        particleRadius,
        lit,
    }) {

        let bufferGeometry = new THREE.BufferGeometry()
        let positions      = new Float32Array(nbParticles * 3)
        let offsets        = new Float32Array(nbParticles)
        let alphas         = new Float32Array(nbParticles)

        for(let i = 0, i3 = 0; i < nbParticles; i++, i3 += 3) {
            positions[i3]     = (Math.random() * 2 - 1) * systemRadius
            positions[i3 + 1] = (Math.random() * 2 - 1) * systemRadius
            positions[i3 + 2] = (Math.random() * 2 - 1) * systemRadius

            offsets[i] = Math.random() * M_2_PI

            alphas[i] = 1.0
        }

        bufferGeometry.addAttribute('initial', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('pos', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('offset', new THREE.BufferAttribute(offsets, 1))
        bufferGeometry.addAttribute('alpha', new THREE.BufferAttribute(positions, 1))
        bufferGeometry.attributes.pos.needsUpdate = true

        let uniforms = {
            frame: {
                type: 'f',
                value: 0
            },
            time: {
                type: 'f',
                value: 2.0
            },
            speedCoef: {
                type: 'f',
                value: 0.0
            },
            radius: {
                type: 'f',
                value: particleRadius
            },
            size: {
                type: 'f',
                value: particleSize
            },
            scale: {
                type: 'f',
                value: window.innerHeight / 2
            },
            intensity: {
                type: 'f',
                value: lit.intensity
            },
            hue: {
                type: 'f',
                value: lit.hue
            },
            saturation: {
                type: 'f',
                value: lit.saturation
            },
            lightness: {
                type: 'f',
                value: lit.lightness
            }
        }

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true
        })
        // material.uniforms.time.needsUpdate = true
        // bufferGeometry.vertices.needsUpdate = true

        //call the constructor
        super(bufferGeometry, material)

        console.log(this)

        this.start = Date.now()
        this.noiseSpeed = 0.05

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        this.litSaturation  = lit.saturation
        this.litHue         = lit.hue
        this.litLightness   = lit.lightness
        this.litIntensity   = lit.intensity
        this.outSaturation  = out.saturation
        this.outHue         = out.hue
        this.outLightness   = out.lightness
        this.outIntensity   = out.intensity

    }

    update(frame) {
        this.material.uniforms.frame.value = this.noiseSpeed * ( Date.now() - this.start )
        this.material.uniforms.time.value = this.noiseSpeed * ( Date.now() - this.start )

    }
}
