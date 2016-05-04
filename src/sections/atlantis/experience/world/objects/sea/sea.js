import THREE from 'three'

export default class Sea extends THREE.Mesh {
    constructor() {

        let geometry = new THREE.THREE.PlaneBufferGeometry(100, 100, 1000, 1000)

        let uniforms = {
            tDis: {
                type: 't',
                value: new THREE.TextureLoader().load('./assets/images/textures/perlin.jpg')
            },
            disScale: {
                type: 'f',
                value: 20.0
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
                value: 20.0
            }
        }

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true,
        })

        super(geometry, material)
        console.log(this);
        this.geometry.attributes.position.needsUpdate = true
    }

    update(frame) {

    }
}
