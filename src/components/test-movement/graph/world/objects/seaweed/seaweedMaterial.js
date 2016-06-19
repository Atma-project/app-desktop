import THREE from 'three'
import shaderParse from 'helpers/app/shaderParse'

import vert from './vertices.vert'
import frag from './fragments.frag'

export default class SeaweedMaterial extends THREE.ShaderMaterial {
    constructor({texture, ...options}) {
        super(options)

        this.vertexShader = vert
        this.fragmentShader = frag

        this.seaweedTexture = texture
        // this.seaweedTexture.magFilter = this.seaweedTexture.minFilter = THREE.LinearFilter

        this.transparent = true
        this.fog = true

        this.uniforms = {
            ...THREE.UniformsLib['fog'],
            frame: {
                type: 'f',
                value: 0.0
            },
            gradientTexture: {
                type: 't',
                value: this.seaweedTexture
            },
            opacity: {
                type: 'f',
                value: 0.9
            },
            random: {
                type: 'f',
                value: 1.0
            },
            luminanceSteps: {
                type: 'i',
                value: 10.0
            },
            luminanceBoost: {
                type: 'f',
                value: 0.5
            },
            useWave: {
                type: 'f',
                value: true
            },
            modelLength: {
                type: 'f',
                value: 650.0,
            },
            waveLength: {
                type: 'f',
                value: 3.0
            },
            waveSpeed: {
                type: 'f',
                value: 2.5
            },
            waveBendAmount: {
                type: 'f',
                value: 10.0
            },
            waveOffset: {
                type: 'f',
                value: 1.0
            }
        }
    }

    update(frame) {
        this.uniforms.frame.value = frame
    }
}
