import THREE   from 'three'
import gui     from 'helpers/app/gui'

const PI     = Math.PI
const M_2_PI = PI * 2

const NB_VERT_HEIGHT = 80
const NB_VERT_WIDTH  = 1
const HEIGHT         = 80
const WIDTH          = 1


export default class Seaweed extends THREE.Mesh {
    constructor() {

        let parameters = {
            topColor: new THREE.Color(0x000000),
            bottomColor: new THREE.Color(0xffffff),
            offset: 33.0,
            exponent: 0.6,
            lightPosition: new THREE.Vector3(0, 700, 700),
            lightMinIntensity: 0.1,
            lightIntensity: 0.7,
            time: 0.0,
            displacement: 10.0
        }

        //set the geometry
        let geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, NB_VERT_WIDTH, NB_VERT_HEIGHT)
        geometry.scale(0.01, 0.01, 0.01)

        //set the material
        let uniforms = {
            topColor: {
                type: 'c',
                value: parameters.topColor
            },
            bottomColor: {
                type: 'c',
                value: parameters.bottomColor
            },
            offset: {
                type: 'f',
                value: parameters.offset
            },
            exponent: {
                type: 'f',
                value: parameters.exponent
            },
            lightPosition: {
                type: 'v3',
                value: parameters.lightPosition
            },
            lightMinIntensity: {
                type: 'f',
                value: parameters.lightMinIntensity
            },
            lightIntensity: {
                type: 'f',
                value: parameters.lightIntensity
            },
            time: {
                type: 'f',
                value: parameters.time
            },
            displacement: {
                type: 'f',
                value: parameters.displacement
            }
        }

        let material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag')
        })

        super(geometry, material)
    }

    initGUI() {

    }

    wave(frame) {

        this.plane.geometry.verticesNeedUpdate = true
    }

    move() {
        this.planes[i].position.z += this.parameters.speed
    }

    update(frame) {
        // this.move()
        // this.wave(frame)
    }
}
