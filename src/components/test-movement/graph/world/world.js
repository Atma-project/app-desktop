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
// import SeaweedOld from './objects/seaweed/seaweed-old'
import Blob       from './objects/blob/blob'
import Sea        from './objects/planes/sea'
import Floor from './objects/floor/floor'

//------------------------------------------------------------------------------
//OTHERS
//------------------------------------------------------------------------------
let OrbitControls =       require('three-orbit-controls')(THREE)
import gui                from 'helpers/app/gui'
import WAGNER             from '@alex_toudic/wagner'
import FXAAPass           from '@alex_toudic/wagner/src/passes/fxaa/FXAAPass'
import MultiPassBloomPass from '@alex_toudic/wagner/src/passes/bloom/MultiPassBloomPass'
import NoisePass          from '@alex_toudic/wagner/src/passes/noise/noise'

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

        gui.add(this.controls, 'enabled').name('control')
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 8000)
        this.camera.position.set(0, 0.5, 10)
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
            blurAmount: 8,
            zoomBlurStrength: 1.8,
            applyZoomBlur: true,
            blendMode: 14
        })
        this.multiPassBloomPass.enabled = true
        // this.passes.push(this.multiPassBloomPass)

        //NOISEPASS
        this.noisePass = new NoisePass({
            amount: 0.04
        })
        this.noisePass.enabled = true
        this.passes.push(this.noisePass)
    }

    initGUI(gui) {

        this.postProcessingMainFolder = gui.addFolder('post processing')
        for (let i = 0; i < this.passes.length; i++) {
          const pass = this.passes[i]
          if (pass.enabled!= undefined) {
          } else {
            pass.enabled = true
          }
          let containsNumber = false
          for (const key of Object.keys(pass.params)) {
            if (typeof pass.params[key] === 'number') {
              containsNumber = true
            }
          }
          const name = pass.constructor.name.concat(i)
          const folder = this.postProcessingMainFolder.addFolder(name);
          folder.add(pass, 'enabled')
          if (containsNumber) {
            for (const key of Object.keys(pass.params)) {
              if (typeof pass.params[key] === 'number') {
                folder.add(pass.params, key)
              }
            }
          }
          //folder.open()
        }
        // this.postProcessingMainFolder.open();

        // this.postProcessingGroupCamera = gui.addFolder('camera')
        // this.postProcessingGroupCamera.add(this.camera.position, 'x', -100, 100).step(0.1).name('position x')
        // this.postProcessingGroupCamera.add(this.camera.position, 'y', -100, 100).step(0.1).name('position y')
        // this.postProcessingGroupCamera.add(this.camera.position, 'z', -100, 100).step(0.1).name('position z')
        //
        // this.postProcessingGroupCamera.add(this.camera.rotation, 'x', -100, 100).step(0.1).name('rotation x')
        // this.postProcessingGroupCamera.add(this.camera.rotation, 'y', -100, 100).step(0.1).name('rotation y')
        // this.postProcessingGroupCamera.add(this.camera.rotation, 'z', -100, 100).step(0.1).name('rotation z')
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

    initScene() {
        //SCENE
        this.scene = new THREE.Scene()
        this.initGUI(gui)

        //LIGHTS
        this.pointLight = new THREE.PointLight(0xffffff, 5.0, 100.0, 10.0)
        this.pointLight.position.set(0.0, 1.0, 8.0)
        this.scene.add(this.pointLight)

        // this.floor = new Floor()
        // this.scene.add(this.floor)
        // this.floor.position.set(0, -10, 0)

        // this.planktons = new Planktons()
        // this.scene.add(this.planktons)

        this.sea = new Sea()
        this.scene.add(this.sea)

        this.blob = new Blob()
        this.scene.add(this.blob)
        // this.blob.position.set(0, -8, 0)
        this.blob.position.set(0, 0, 0)
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

        this.postProcessing = true

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
        this.planktons.update(frame)
        this.blob.update(frame)
        this.sea.update(frame)
    }
}

export default World
