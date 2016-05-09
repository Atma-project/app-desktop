//------------------------------------------------------------------------------
//LIBRARIES
//------------------------------------------------------------------------------
import $     from 'chirashi-imports'
import THREE from 'three'

//------------------------------------------------------------------------------
//OBJECTS
//------------------------------------------------------------------------------
//soul tests
// import Soul  from './objects/soul/soul'
// import Soul2 from './objects/soul2/soul2'
// import Soul3 from './objects/soul3/soul3'
// import Soul4 from './objects/soul4/soul4'

//seaweeds tests
// import Seaweed from './objects/seaweed/seaweed'

//world tests
// import Floor from './objects/floor/floor'

// Plankton tests
// import Planktons from './objects/planktons/planktons'

//sky
// import Skybox from './objects/skyboxes/skybox'

//sea
import Sea from './objects/sea/sea'

//------------------------------------------------------------------------------
//OTHERS
//------------------------------------------------------------------------------
var OrbitControls =       require('three-orbit-controls')(THREE)
import gui                from 'helpers/app/gui'
import WAGNER             from '@alex_toudic/wagner'
import FXAAPass           from '@alex_toudic/wagner/src/passes/fxaa/FXAAPass'
import MultiPassBloomPass from '@alex_toudic/wagner/src/passes/bloom/MultiPassBloomPass'
import ToonPass           from '@alex_toudic/wagner/src/passes/toon/ToonPass'

export class World {
    constructor(width, height, postProcessing, debug) {
        //init attributes
        this.width          = width
        this.height         = height
        this.debug          = debug
        this.postProcessing = postProcessing

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
        this.camera.position.z = 8
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialisaing: true, alpha: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000, 0)

        this.initPostProcessing()
        this.initScene()

        this.view = this.renderer.domElement
    }

    initPostProcessing() {
        this.parameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: false,
            useRGBA: true
        }

        this.composer = new WAGNER.Composer(this.renderer, this.parameters)
        this.passes = []

        //FXAA
        this.fxaaPass = new FXAAPass()
        this.fxaaPass.enabled = true
        this.passes.push(this.fxaaPass)

        //BLOOMPASS
        this.multiPassBloomPass = new MultiPassBloomPass({
            blurAmount: 5,
            zoomBlurStrength: 2.8,
            applyZoomBlur: true
        })
        this.multiPassBloomPass.enabled = false
        this.passes.push(this.multiPassBloomPass)

        //TOONPASS
        this.toonPass = new ToonPass()
        this.toonPass.enabled = false
        this.passes.push(this.toonPass)

        this.passes.push()
    }

    initScene() {
        //SCENE
        this.scene = new THREE.Scene()
        this.initGUI(gui)

        //LIGHTS
        this.pointLight = new THREE.PointLight(0xffffff, 5.0, 100.0, 10.0)
        this.pointLight.position.set(0.0, 1.0, 8.0)
        this.scene.add(this.pointLight)

        //SKY
        // this.skybox = new Skybox('./assets/images/textures/start-sky/', 1000, 1000, 1000)
        // this.scene.add(this.skybox)

        //OBJECTS
        // this.soul = new Soul(this, this.debug)
        // this.scene.add(this.soul)

        // this.soul2 = new Soul2(this, this.debug)
        // this.scene.add(this.soul2)

        // this.soul3 = new Soul3(this, this.debug)
        // this.scene.add(this.soul3)

        // this.soul4 = new Soul4(this, this.debug)
        // this.scene.add(this.soul4)

        // this.seaweed = new Seaweed()
        // this.scene.add(this.seaweed)

        // this.planktons = new Planktons()
        // this.scene.add(this.planktons)

        // this.floor = new Floor()
        // this.scene.add(this.floor)

        this.sea = new Sea()
        this.scene.add(this.sea)
    }

    initGUI(gui) {

        this.postProcessingGroup = gui.addFolder('Post Processing')
        this.postProcessingGroup.add(this, 'postProcessing').name('postProce')
        this.postProcessingGroup.add(this.fxaaPass, 'enabled').name('fxaa')
        this.postProcessingGroup.add(this.multiPassBloomPass, 'enabled').name('bloom')
        this.postProcessingGroup.add(this.toonPass, 'enabled').name('toon')

        this.postProcessingGroup.add(this.multiPassBloomPass.params, 'blurAmount', -10, 10).step(0.01)
        this.postProcessingGroup.add(this.multiPassBloomPass.params, 'blendMode', -10, 10).step(0.01)
        this.postProcessingGroup.add(this.multiPassBloomPass.params, 'zoomBlurStrength', -10, 10).step(0.01)

        this.postProcessingGroup.open()
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
        if(this.postProcessing) {
            this.renderer.autoClearColor = true
            this.composer.reset()
            this.composer.render(this.scene, this.camera)
            this.composer.setSize(this.width, this.height)

            for(let pass of this.passes) {
                if(pass && pass.enabled)
                    this.composer.pass(pass)
            }

            this.composer.toScreen()
        } else {
            this.renderer.render(this.scene, this.camera)
        }
    }

    update(frame) {
        this.render()

        // this.soul.update(frame)
        // this.soul2.update(frame)
        // this.soul3.update(frame)
        // this.soul4.update(frame)

        // this.seaweed.update(frame)

        // this.floor.update(frame)

        // this.planktons.update(frame)

        this.sea.update(frame)
    }
}

export default World
