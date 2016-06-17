//------------------------------------------------------------------------------
//LIBRARIES
//------------------------------------------------------------------------------
import $ from 'chirashi-imports'
import THREE from 'three'
import 'gsap'
import SocketReciever from 'helpers/movements/movement-manager'
import Sound from 'helpers/sound/sound'


//------------------------------------------------------------------------------
//OBJECTS
//------------------------------------------------------------------------------

//seaweeds tests
import Seaweed from './objects/seaweed/seaweed'

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

//Line
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
        }

        // enable control for debug
        gui.add(this.controls, 'enabled').name('control')

        // init sounds
        this.sound = new Sound()

        this.initEvents()
    }


    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000)
        this.camera.position.set(0, 0.5, 10)

        // prepare camera for diving
        this.tween = TweenMax.to(this.camera.position, 2.5, {y: -9.5, ease: Power4.easeInOut})
        this.tween.pause()
    }

    initEvents() {
      // List all events
      var manageVideo = new Event('manageVideo')
      var goDown = new Event('goDown')
      var hideBlackPlane = new Event('hideBlackPlane')
      var moveSeaweeds = new Event('moveSeaweeds')
      var moveBubble = new Event('moveBubble')
      var showCave = new Event('showCave')
      var showPlanktons = new Event('showPlanktons')
      var blobScene = new Event('blobScene')
      var explodeBlob = new Event('explodeBlob')
      var growLine = new Event('growLine')

      // List all timing
      var firstStep = 240
      var secondStep = 270
      var thirdStep = 270
      var fourthStep = 300

      document.addEventListener('manageVideo',  () => {
        this.sound.playIntro()
        this.floor.manageVideo(24)
        setTimeout(function(){
            document.dispatchEvent(goDown);
        }.bind(this), firstStep)

        setTimeout(function () {
            this.sound.playTing()
        }.bind(this), 15000)

        setTimeout(function () {
            this.sound.playOnOff()
        }.bind(this), 7500)

        setTimeout(function () {
            this.sound.playOnOff()
        }.bind(this), 19500)
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
        this.bubbleEmitter.speed = 0.001
        this.bubble.speedBubble()

        setTimeout(function () {
            this.sound.full()
        }.bind(this), 700);

        setTimeout(function () {
            this.sound.playTransition()
            // this.sound.full()
        }.bind(this), 5000);
      }, false)

      document.addEventListener('moveBubble', () => {
        // todo
      }, false)

      document.addEventListener('showCave', () => {
        document.dispatchEvent(showPlanktons)

        setTimeout(function(){
            this.sea.showCave()
        }.bind(this), secondStep)

      }, false)

      document.addEventListener('showPlanktons', () => {
        setTimeout(function(){
          this.planktons.fakeAnimate()
          TweenMax.to(this.multiPassBloomPass.params, 2, {blendMode: 8.4, ease: Power2.easeOut})
          TweenMax.to(this.planktons.scale, 0, {x: 1, y: 1, z: 1, delay: 0.8, ease: Power2.easeOut})
          this.sea.fakeLight()
          this.planktons.movePlanktons()

          setTimeout(function(){
            document.dispatchEvent(blobScene)
          }.bind(this), thirdStep)

          setTimeout(function(){
              this.sound.playEndPlankton()
          }.bind(this), (thirdStep / 2))

        }.bind(this), secondStep)
      }, false)

      document.addEventListener('blobScene', () => {
          this.sea.blobScene()
          this.floor.changeColor()
          TweenMax.to(this.blob.scale, 2, {x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.3)})
          TweenMax.to(this.multiPassBloomPass.params, 0.1, {blurAmount: 0.0, zoomBlurStrength: 0.0, ease: Power2.easeOut})

          setTimeout(function(){
              this.sound.playSendEnergy()
          }.bind(this), (fourthStep / 2))

          setTimeout(function(){
              //document.dispatchEvent(explodeBlob)
          }.bind(this), fourthStep)

      }, false)

      document.addEventListener('explodeBlob', () => {

        TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 11.2, ease: Power2.easeOut})
        TweenMax.to(this.multiPassBloomPass.params, 4, {delay: 4, blurAmount: 0, zoomBlurStrength: 15, ease: Power2.easeOut})

        TweenMax.to(this.blob.scale, 4, {delay: 3, x: 10, y: 10, z: 10, ease: Elastic.easeInOut.config(1, 0.3), onComplete: () => {
            TweenMax.to(this.blob.scale, 2, {x: 0.001, y: 0.001, z: 0.001, ease: Power2.easeOut})
            // TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 9.2, ease: Power2.easeOut})
            TweenMax.to(this.multiPassBloomPass.params, 2, {delay: 1, blendMode: 8.4, blurAmount: 0, zoomBlurStrength: 0, ease: Power2.easeOut})
            this.scene.add(this.line)
            this.sound.playExplosion()
        }})

        setTimeout(function(){
            document.dispatchEvent(growLine)
        }.bind(this), 7000)

      }, false)

      document.addEventListener('growLine', () => {
        TweenMax.to(this.line.position, this.fourthStep, {y: -4, ease: Power2.easeOut, onComplete: () => {
          setTimeout(function () {
            if(!SocketReciever.listening) {
              console.log('not listening');
                SocketReciever.init()
                SocketReciever.socket.emit('end-app')
            } else {
              console.log('listening');
               SocketReciever.socket.emit('end-app')
            }
          }, 1000);
        }})
      }, false)

      document.querySelector('.close-button').addEventListener('click', function(){
        document.dispatchEvent(manageVideo);
      }.bind(this))

      // listen phone emit to start the app
      if (SocketReciever.listening) {
          SocketReciever.socket.on('start-app', () => {
            document.dispatchEvent(manageVideo);
          })
      } else {
          SocketReciever.init()
          SocketReciever.socket.on('start-app', () => {
            document.dispatchEvent(manageVideo);
          })
      }
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({alpha: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000, 0)

        // setting for shadow
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMapSoft = true
        this.renderer.shadowCameraNear = 3
        this.renderer.shadowCameraFar = this.camera.far
        this.renderer.shadowCameraFov = 50
        this.renderer.shadowMapBias = 0.0039
        this.renderer.shadowMapDarkness = 0.5
        this.renderer.shadowMapWidth = 1024
        this.renderer.shadowMapHeight = 1024

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
        this.passes.push(this.multiPassBloomPass)

        //NOISEPASS
        this.noisePass = new NoisePass({
            amount: 0.04
        })
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

        this.ambient = new THREE.AmbientLight(0x404040)
        this.scene.add(this.ambient)

        //OBJECTS
        this.seaweed = new Seaweed(this.camera)
        this.scene.add(this.seaweed)
        this.seaweed.position.set(0, -10, 0)

        this.planktons = new Planktons()
        this.scene.add(this.planktons)
        // scale to 0.001 to hide the object, not 0.0 because it cause issues.
        this.planktons.scale.set(0.001, 0.001, 0.001)
        this.planktons.position.set(0, -10, 0)

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
        this.line.renderOrder = 9999
        this.line.position.set(0, -12, -6)

        this.blob = new Blob()
        this.scene.add(this.blob)
        this.blob.position.set(0, -8, 0)
        // scale to 0.001 to hide the object, not 0.0 because it cause issues.
        this.blob.scale.set(0.001, 0.001, 0.001)
    }

    initGUI(gui) {

        // function to list all the passes without add them manually
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
