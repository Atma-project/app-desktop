import THREE from 'three'

export default class Sea extends THREE.Object3D {
    constructor() {
        super()

        this.clock = new THREE.Clock(true)

        this.uniforms = {
            tDis: {
                type: 't',
                value: new THREE.TextureLoader().load('./assets/images/textures/perlin.jpg')
            },
            disScale: {
                type: 'f',
                value: 40.0
            },
            disBias: {
                type: 'f',
                value: 20.0
            },
            disPostScale: {
                type: 'f',
                value: 20.0
            },
            time: {
                type: 'f',
                value: 0.0
            }
        }

        this.init()
    }

    init() {
        this.geometry = new THREE.THREE.PlaneBufferGeometry(40, 40, 400, 400)

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true,
        })

        this.seaMesh = new THREE.Mesh(this.geometry, this.material)
        this.add(this.seaMesh)

        this.geometry.attributes.position.needsUpdate = true

        this.seaMesh.rotation.x = -Math.PI / 2
        this.seaMesh.position.y = -0.5
    }

    update(frame) {
        this.material.uniforms['time'].value = this.clock.getElapsedTime()
    }
}
