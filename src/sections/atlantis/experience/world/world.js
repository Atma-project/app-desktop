//------------------------------------------------------------------------------
//LIBRARIES
//------------------------------------------------------------------------------
import $     from 'chirashi-imports'
import THREE from 'three'
import TWEEN from 'tween.js'

//------------------------------------------------------------------------------
//OBJECTS
//------------------------------------------------------------------------------
//soul tests
import Soul  from './objects/soul/soul'

//seaweeds tests
import Seaweed from './objects/seaweed/seaweed'
// import Seaweed from './objects/seaweed-new/seaweed'

//world
import Floor from './objects/floor/floor'

//bubble
import Bubble from './objects/bubble/bubble'

import Sea from './objects/planes/sea'

// Plankton tests
import Planktons from './objects/planktons/planktons'


//------------------------------------------------------------------------------
//OTHERS
//------------------------------------------------------------------------------
var OrbitControls =       require('three-orbit-controls')(THREE)
import gui                from 'helpers/app/gui'
import WAGNER             from '@alex_toudic/wagner'
import FXAAPass           from '@alex_toudic/wagner/src/passes/fxaa/FXAAPass'
import MultiPassBloomPass from '@alex_toudic/wagner/src/passes/bloom/MultiPassBloomPass'
import ToonPass           from '@alex_toudic/wagner/src/passes/toon/ToonPass'
import NoisePass          from '@alex_toudic/wagner/src/passes/noise/noise'

export class World {
    constructor(width, height, postProcessing, debug) {
        //init attributes
        this.width          = width
        this.height         = height
        this.debug          = debug
        this.postProcessing = postProcessing


        this.initCamera()

        //init renderer
        this.initRenderer()

        //debug attributes
        if (this.debug) {
            this.controls = new OrbitControls(this.camera)
            window.three = THREE
            // this.controls.target.set(0, 10, 0)
        }

        gui.add(this.controls, 'enabled').name('control')
    }


    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 8000)
        // this.camera.position.set(0, 12, 10)
        this.camera.position.set(0, 0.5, 10)
        // this.camera.rotation.set(20, 0, 0)

        document.addEventListener('click', function(){
            tween.start()
        }.bind(this))

        var coords = {
            x: 0,
            y: -0.5,
            z: 0
        }
        var tween = new TWEEN.Tween(coords)
        tween.to({ x: 0, y: -9.5, z: 0 }, 2000)
        tween.onUpdate(function() {
            this.camera.position.y = coords.y
            // this.camera.rotation.x = - (coords.y / 60)
        }.bind(this))


        tween.onComplete(function() {
        }.bind(this))

        tween.easing(TWEEN.Easing.Quadratic.Out)
    }

    initRenderer() {
        //antialias: true,
        this.renderer = new THREE.WebGLRenderer({alpha: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000, 0)

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMapSoft = true

        this.renderer.shadowCameraNear = 3
        this.renderer.shadowCameraFar = this.camera.far
        this.renderer.shadowCameraFov = 50

        this.renderer.shadowMapBias = 0.0039
        this.renderer.shadowMapDarkness = 0.5
        this.renderer.shadowMapWidth = 1024
        this.renderer.shadowMapHeight = 1024

        gui.add(this.renderer, 'shadowCameraNear')
        gui.add(this.renderer, 'shadowCameraFov')
        gui.add(this.renderer, 'shadowMapBias')
        gui.add(this.renderer, 'shadowCameraFar')

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
        this.multiPassBloomPass.enabled = true
        this.passes.push(this.multiPassBloomPass)

        //TOONPASS
        this.toonPass = new ToonPass()
        this.toonPass.enabled = false
        this.passes.push(this.toonPass)

        //NOISEPASS
        this.noisePass = new NoisePass({
            amount: 0.04
        })
        this.noisePass.enabled = true
        this.passes.push(this.noisePass)
    }

    initScene() {
        //SCENE
        this.scene = new THREE.Scene()
        this.initGUI(gui)

        //LIGHTS
        this.pointLight = new THREE.PointLight(0xffffff, 1.2, 70.0, 10.0)
        this.pointLight.position.set(0.0, -9.0, 10.0)
        this.scene.add(this.pointLight)
        // this.pointLight.castShadow = true

        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
        this.directionalLight.position.set( 0, -10.0, 8.0 )
        // this.scene.add( this.directionalLight )
        this.directionalLight.castShadow = true

        this.lightHelper = new THREE.DirectionalLightHelper( this.directionalLight )
        // this.scene.add( this.lightHelper )

        this.ambient = new THREE.AmbientLight(0x404040)
        this.scene.add(this.ambient)

        //OBJECTS
        this.soul = new Soul()
        this.scene.add(this.soul)
        // this.soul.position.set(0, 0, 0)

        this.seaweed = new Seaweed(this.camera)
        this.scene.add(this.seaweed)
        this.seaweed.position.set(0, -10, 0)

        this.planktons = new Planktons()
        // this.scene.add(this.planktons)
        // !crappy!
        document.querySelector('.main').addEventListener('click', function(){
          setTimeout(function(){
            this.scene.add(this.planktons)
            this.planktons.fakeAnimate()
          }.bind(this), 28000)
        }.bind(this))
        // to remove later

        this.floor = new Floor()
        this.scene.add(this.floor)
        this.floor.position.set(0, -10, 0)

        this.bubble = new Bubble()
        this.scene.add(this.bubble)
        this.bubble.position.set(0, -10, 0)

        this.sea = new Sea()
        this.scene.add(this.sea)

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

    resize(width, height) {
        this.width = width
        this.height = height

        if(this.composer) this.composer.setSize(this.width, this.height)

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.width, this.height)
    }

    render() {
        this.postProcessing = false

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

        TWEEN.update()

        this.soul.update(frame)

        this.seaweed.update(frame)

        this.floor.update(frame)

        this.bubble.update(frame)

        this.planktons.update(frame)

        this.sea.update(frame)

    }
}

export default World
