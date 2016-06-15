//------------------------------------------------------------------------------
//LIBRARIES
//------------------------------------------------------------------------------
import $     from 'chirashi-imports'
import THREE from 'three'
import 'gsap'

//------------------------------------------------------------------------------
//OBJECTS
//------------------------------------------------------------------------------

//seaweeds tests
import Seaweed from './objects/seaweed/seaweed'
// import Seaweed from './objects/seaweed-new/seaweed'

//world
import Floor from './objects/floor/floor'

//bubble
import Bubble from './objects/bubble/bubble'

// Sea
import Sea from './objects/planes/sea'

// Plankton tests
import Planktons from './objects/planktons/planktons'

//bubble emitter
import BubbleEmitter from './objects/bubble-emitter/bubble-emitter'

//Blob
import Blob from './objects/blob/blob'


import Line from './objects/line/line'


//------------------------------------------------------------------------------
//OTHERS
//------------------------------------------------------------------------------
var OrbitControls =       require('three-orbit-controls')(THREE)
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
        this.postProcessing = postProcessing

        this.tween = null

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

        this.initEvents()
    }


    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000)
        // this.camera.position.set(0, 12, 10)
        this.camera.position.set(0, 0.5, 10)
        // this.camera.rotation.set(20, 0, 0)

        this.tween = TweenMax.to(this.camera.position, 2.5, {y: -9.5, ease: Power4.easeInOut})
        this.tween.pause()
    }

    initEvents() {
      var manageVideo = new Event('manageVideo')
      var goDown = new Event('goDown')
      var hideBlackPlane = new Event('hideBlackPlane')
      var moveSeaweeds = new Event('moveSeaweeds')
      var moveBubble = new Event('moveBubble')
      var showCave = new Event('showCave')
      var showPlanktons = new Event('showPlanktons')
      var blobScene = new Event('blobScene')
      var explodeBlob = new Event('explodeBlob')

      var firstStep = 26000
      var secondStep = 29000
      var thirdStep = 30000
      var fourthStep = 30000

      document.addEventListener('manageVideo',  () => {
        this.floor.manageVideo(26)
        setTimeout(function(){
            document.dispatchEvent(goDown);
        }.bind(this), firstStep)
      }, false)

      document.addEventListener('goDown',  () => {
        this.tween.play()
        document.dispatchEvent(hideBlackPlane)
      }, false)

      document.addEventListener('hideBlackPlane', () => {
        this.sea.hideSea()
        document.dispatchEvent(moveSeaweeds)
        document.dispatchEvent(moveBubble)
      }, false)

      document.addEventListener('moveSeaweeds', () => {
        this.seaweed.speedSeaweeds()
        document.dispatchEvent(showCave)
        document.dispatchEvent(showPlanktons)
        this.bubbleEmitter.speed = 0.001
        this.bubble.speedBubble()
      }, false)

      document.addEventListener('moveBubble', () => {
        // todo
      }, false)

      document.addEventListener('showCave', () => {
        setTimeout(function(){
          this.sea.showCave()

          setTimeout(function(){
            document.dispatchEvent(blobScene)
          }.bind(this), thirdStep)

        }.bind(this), secondStep)
      }, false)

      document.addEventListener('showPlanktons', () => {
        setTimeout(function(){
          this.planktons.fakeAnimate()
          TweenMax.to(this.multiPassBloomPass.params, 2, {blendMode: 8.4, ease: Power2.easeOut})
          TweenMax.to(this.planktons.scale, 0, {x: 1, y: 1, z: 1, delay: 0.8, ease: Power2.easeOut})
          this.sea.fakeLight()
          this.planktons.movePlanktons()
        }.bind(this), secondStep)
      }, false)

      document.addEventListener('blobScene', () => {
          this.sea.blobScene()
          this.floor.changeColor()
          TweenMax.to(this.blob.scale, 2, {x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.3)})

          setTimeout(function(){
              TweenMax.to(this.multiPassBloomPass.params, 0.1, {blurAmount: 0.0, zoomBlurStrength: 0.0, ease: Power2.easeOut})

              setTimeout(function(){
                  document.dispatchEvent(explodeBlob);
              }.bind(this), this.fourthStep)

          }.bind(this), 1000)
      }, false)

      document.addEventListener('explodeBlob', () => {
        // setTimeout(function(){
        //   this.planktons.fakeAnimate()
        //   TweenMax.to(this.multiPassBloomPass.params, 2, {blendMode: 8.4, ease: Power2.easeOut})
        //   TweenMax.to(this.planktons.scale, 0, {x: 1, y: 1, z: 1, delay: 0.8, ease: Power2.easeOut})
        //   this.sea.fakeLight()
        //   this.planktons.movePlanktons()
        // }.bind(this), secondStep)


        // TweenMax.to(this.blob.scale, 4, {delay: 3, x: 8, y: 8, z: 8, ease: Elastic.easeInOut.config(1, 0.3), onComplete: () => {
        //     TweenMax.to(this.blob.children[0].material, 2, {delay: 2, opacity: 0, ease: Power2.easeOut})
        //     TweenMax.to(this.blob.children[1].material, 2, {delay: 2, opacity: 0, ease: Power2.easeOut})
        // }})
        //
        //
        // TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 11.2, ease: Power2.easeOut})
        // TweenMax.to(this.multiPassBloomPass.params, 4, {delay: 4, blurAmount: 0, zoomBlurStrength: 15, ease: Power2.easeOut})

      }, false)

      document.querySelector('.close-button').addEventListener('click', function(){
        document.dispatchEvent(manageVideo);
      }.bind(this))
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

        // gui.add(this.renderer, 'shadowCameraNear')
        // gui.add(this.renderer, 'shadowCameraFov')
        // gui.add(this.renderer, 'shadowMapBias')
        // gui.add(this.renderer, 'shadowCameraFar')

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
            blurAmount: 15,
            zoomBlurStrength: 3.8,
            applyZoomBlur: true
        })
        this.multiPassBloomPass.enabled = true
        this.passes.push(this.multiPassBloomPass)

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


        this.scene.fog = new THREE.Fog(0x000000, 0.015, 20)

        //LIGHTS
        this.pointLight = new THREE.PointLight(0xffffff, 1.2, 70.0, 10.0)
        this.pointLight.position.set(0.0, -9.0, 10.0)
        this.scene.add(this.pointLight)
        // this.pointLight.castShadow = true

        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
        this.directionalLight.position.set( 0, -10.0, 8.0 )
        // this.scene.add( this.directionalLight )
        // this.directionalLight.castShadow = true

        this.lightHelper = new THREE.DirectionalLightHelper( this.directionalLight )
        // this.scene.add( this.lightHelper )

        this.ambient = new THREE.AmbientLight(0x404040)
        this.scene.add(this.ambient)

        //OBJECTS
        this.seaweed = new Seaweed(this.camera)
        this.scene.add(this.seaweed)
        this.seaweed.position.set(0, -10, 0)

        this.planktons = new Planktons()
        // this.scene.add(this.planktons)
        this.planktons.scale.set(0.0, 0.0, 0.0)


        this.floor = new Floor()
        this.scene.add(this.floor)
        this.floor.position.set(0, -10, 0)

        this.bubble = new Bubble()
        this.scene.add(this.bubble)
        this.bubble.position.set(0, -10, 0)

        this.sea = new Sea()
        this.scene.add(this.sea)

        this.bubbleEmitter = new BubbleEmitter()
        this.scene.add(this.bubbleEmitter)
        this.bubbleEmitter.position.set(0, -10, 0)
        this.bubbleEmitter.scale.set(0.2, 0.2, 0.2)

        this.line = new Line()
        // this.scene.add(this.line)
        this.line.position.set(0, -10, 0)


        this.blob = new Blob()
        this.scene.add(this.blob)
        this.blob.position.set(0, -8, 0)
        this.blob.scale.set(0, 0, 0)
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
        }
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
        // Needed if I want to keep my laptop alive
        // this.postProcessing = false

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

        this.seaweed.update(frame)

        this.floor.update(frame)

        this.bubble.update(frame)

        this.planktons.update(frame)

        this.sea.update(frame)

        this.bubbleEmitter.update(frame)

        this.blob.update(frame)

        this.line.update(frame)

    }
}

export default World
