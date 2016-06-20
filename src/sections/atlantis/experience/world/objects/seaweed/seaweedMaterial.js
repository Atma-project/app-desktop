import THREE from 'three'
import shaderParse from 'helpers/app/shaderParse'

import vert from './vertices.vert'
import frag from './fragments.frag'

export default class SeaweedMaterial extends THREE.ShaderMaterial {
    constructor({texture, ...options}) {
        super(options)

        this.vertexShader = shaderParse(vert)
        this.fragmentShader = shaderParse(frag)

        this.seaweedTexture = texture
        this.seaweedTexture.magFilter = this.seaweedTexture.minFilter = THREE.LinearFilter

        this.transparent = true
        this.fog = true

        this.uniforms = {
            ...THREE.UniformsLib['fog'],
            frame: {
                type: 'f',
                value: 0.0
            },
            texture: {
                type: 't',
                value: this.seaweedTexture
            },
            random: {
                type: 'f',
                value: 1.0
            },
            seaweedHeight: {
                type: 'f',
                value: 10.0,
            },
            waveLength: {
                type: 'f',
                value: 1.5
            },
            speed: {
                type: 'f',
                value: 0.2
            },
            bendFactor: {
                type: 'f',
                value: 20.0
            },
            ooffset: {
                type: 'f',
                value: 1.0
            }
        }
    }

    randomize(min, max) {
        return Math.random() * (max - min) + min
    }

    update(frame) {
        this.uniforms.frame.value = frame
        this.uniforms.frame.needsUpdate = true
    }
}
