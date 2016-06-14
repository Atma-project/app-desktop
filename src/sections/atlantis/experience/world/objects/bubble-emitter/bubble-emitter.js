import THREE from 'three'
import gui from 'helpers/app/gui'

import SPE from 'shader-particle-engine'

export default class BubbleEmitter extends THREE.Object3D {
    constructor(camera) {
        super()
        this.gui = gui
        this.camera = camera

        this.emitter
        this.particleGroup
        this.clock = new THREE.Clock()

        this.parameters = {
            age: 2,
            size: 10,
            particleCount: 20,
        }

        this.init()
        this.initGUI()
    }

    init() {

        this.particleGroup = new SPE.Group({
            texture: {
                value: THREE.ImageUtils.loadTexture('./assets/images/textures/bubble.png')
            }
        })

        this.emitter = new SPE.Emitter({
            maxAge: {
                value: this.parameters.age,
                spread: 1
            },

            position: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3( 0, 0, 0 )
            },

            acceleration: {
                value: new THREE.Vector3( 0, 3.0, 0 ),
                spread: new THREE.Vector3( 1.5, 1.5, 1.5 ),
                randomise: true
            },

            velocity: {
                value: new THREE.Vector3(0, 5.0, 0),
                spread: new THREE.Vector3(1.0, 0.75, 1.0)
            },

            color: {
                value: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3648a7' ), new THREE.Color( '#606fc7' ) ],
                spread: [ new THREE.Color( '#202020' ), new THREE.Color( '#ea6e32' ), new THREE.Color( '#e8b0bc' ) ]
            },

            size: {
                value: [ 0, 1, 0 ],
                spread: [ 0, 3, 0 ],
                randomise: true
            },

            particleCount: this.parameters.particleCount
        })

        this.particleGroup.addEmitter( this.emitter )
        this.add( this.particleGroup.mesh )

    }

    initGUI() {
        this.bubbleEmitter = gui.addFolder('Bubble emitter')
        this.bubbleEmitter.add(this.parameters, 'age', 0, 200).step(1).name('Age')
        this.bubbleEmitter.add(this.parameters, 'size', 0, 200).step(1).name('Taille')
        this.bubbleEmitter.add(this.parameters, 'particleCount', 0, 200).step(1).name('Nombre')
    }

    update(frame) {

        this.particleGroup.tick(this.clock.getDelta())

        // this.particleGroup.mesh.needsUpdate = true
        // this.emitter.size = this.parameters.size
    }
}
