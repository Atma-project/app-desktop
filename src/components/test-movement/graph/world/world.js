//------------------------------------------------------------------------------
//LIBRARIES
//------------------------------------------------------------------------------
import $           from 'chirashi-imports'
import THREE       from 'three'
import TimeLineMax from 'gsap'

//------------------------------------------------------------------------------
//OBJECTS
//------------------------------------------------------------------------------
import Planktons  from './objects/planktons/planktons'
import Seaweed    from './objects/seaweed/seaweed'
import SeaweedOld from './objects/seaweed/seaweed-old'

//------------------------------------------------------------------------------
//OTHERS
//------------------------------------------------------------------------------
var OrbitControls =       require('three-orbit-controls')(THREE)
import gui                from 'helpers/app/gui'

export class World {
    constructor(width, height, postProcessing, debug) {
        //init attributes
        this.width          = width
        this.height         = height
        this.debug          = debug

        //init world camera
        this.initCamera()

        //init renderer
        this.initRenderer()

        //debug attributes
        if (this.debug) {
            this.controls = new OrbitControls(this.camera)
            window.three = THREE
        }
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 8000)
        this.camera.position.set(0, 0, -50)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialisaing: true, alpha: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000, 0)

        this.initScene()

        this.view = this.renderer.domElement
    }

    initScene() {
        //SCENE
        this.scene = new THREE.Scene()

        //LIGHTS
        this.pointLight = new THREE.PointLight(0xffffff, 5.0, 100.0, 10.0)
        this.pointLight.position.set(0.0, 1.0, 8.0)
        this.scene.add(this.pointLight)

        this.planktons = new Planktons()
        this.scene.add(this.planktons)
        this.planktons.listenToUserMotion()
        this.planktons.animateOnUserMotion()
    }

    resize(width, height) {
        this.width = width
        this.height = height

        if(this.composer) this.composer.setSize(this.width, this.height)

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.width, this.height)
    }

    render() {

        this.renderer.render(this.scene, this.camera)
    }

    update(frame) {
        this.render()
        this.planktons.update(frame)
    }
}

export default World
