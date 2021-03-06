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
import Seaweed from './objects/seaweed-old/seaweed'

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

        // init sounds
        this.sound = new Sound()

        // enable control for debug
        gui.add(this.controls, 'enabled').name('control')

        this.initEvents()
    }


    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 1000)
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
      var goUp = new Event('goUp')

      // List all timing
      var firstStep = 24000
      var secondStep = 27000
      var thirdStep = 27000
      var fourthStep = 30000
      var fifthStep = 35000

      document.addEventListener('manageVideo',  () => {
        this.sound.playIntro()
        this.floor.manageVideo(24)
        setTimeout(function(){
            document.dispatchEvent(goDown);
        }.bind(this), firstStep)

        setTimeout(function () {
            this.sound.playTing()
        }.bind(this), 15000)

        var timing = [7.5, 19, 29, 46, 54, 76, 84, 122, 130, 152, 158, 174]

        for (var key in timing) {
            setTimeout(function () {
                this.sound.playOnOff()
            }.bind(this), timing[key] * 1000)
        }
      }, false)

      /*
      29 - on
      46 - off
      54 - on
      1.16 - off
      1.24 - on
      2.02 - off
      2.10 - on
      2.32 - off
      2.38 - on
      2.54 - off
      */

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
        this.bubble.speedBubble()

        setTimeout(function () {
            this.sound.full()
        }.bind(this), 700);

        setTimeout(function () {
            this.sound.playTransition()
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
          TweenMax.to(this.multiPassBloomPass.params, 2, {blendMode: 8.4, ease: Power2.easeOut})
          TweenMax.to(this.planktons.scale, 1, {x: 1, y: 1, z: 1, delay: 0.8, ease: Power2.easeOut})
          TweenMax.to(this.planktons.position, 0, {y: -8, delay: 0.8, ease: Power2.easeOut})
          this.sea.fakeLight()
          this.planktons.movePlanktons()

          setTimeout(function () {
             this.planktons.fakeAnimate()
         }.bind(this), 7000);

          setTimeout(function(){
            document.dispatchEvent(blobScene)
          }.bind(this), thirdStep)

          setTimeout(function(){
              this.sound.playAlmost()
          }.bind(this), (thirdStep - 3000))

        }.bind(this), secondStep)
      }, false)

      document.addEventListener('blobScene', () => {
          this.sea.blobScene()
          this.floor.changeColor()
          TweenMax.to(this.blob.scale, 2, {x: 1.0, y: 1.0, z: 1.0, ease: Elastic.easeOut.config(1, 0.3)})
          TweenMax.to(this.multiPassBloomPass.params, 0.1, {blurAmount: 0.0, zoomBlurStrength: 0.0, ease: Power2.easeOut})

          setTimeout(function(){
              this.sound.playEnergy()
          }.bind(this), (fourthStep - 3000))

          setTimeout(() => {
              this.blob.animate()
          }, 14750)

          setTimeout(function(){
              document.dispatchEvent(explodeBlob)
          }.bind(this), fourthStep)

      }, false)

      document.addEventListener('explodeBlob', () => {

        TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 11.2, ease: Power2.easeOut})
        TweenMax.to(this.multiPassBloomPass.params, 4, {delay: 4, blurAmount: 0, zoomBlurStrength: 15, ease: Power2.easeOut})

        setTimeout(function () {
            //document.body.classList.add('explode')
        }, 5000);

        TweenMax.to(this.blob.position, 4, {delay: 4, z: -5 ,ease: Power2.easeOut})
        TweenMax.to(this.blob.scale, 4, {delay: 3, x: 15, y: 15, z: 15, ease: Elastic.easeInOut.config(1, 0.3), onComplete: () => {
            TweenMax.to(this.blob.scale, 0, {x: 0.001, y: 0.001, z: 0.001, ease: Power2.easeOut})
            // TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 9.2, ease: Power2.easeOut})
            TweenMax.to(this.multiPassBloomPass.params, 2, {delay: 1, blendMode: 8.4, blurAmount: 0, zoomBlurStrength: 0, ease: Power2.easeOut})
            this.line.scale.set(1, 1, 1)

            setTimeout(function () {
                this.line.moveLine()
            }.bind(this), 9500);

            this.sound.playWahou()
        }})

        setTimeout(function(){
            document.dispatchEvent(growLine)
        }.bind(this), 7000)

      }, false)

      document.addEventListener('growLine', () => {

        setTimeout(() => {
            document.body.classList.remove('explode')
            console.log('aller on remonte');
            document.dispatchEvent(goUp)
        }, fifthStep)

      }, false)


      document.addEventListener('goUp', () => {
          document.body.classList.add('fade')
          document.querySelector('.header-app').classList.add('fade')

          this.endVideo = document.getElementById('fin')

          setTimeout(function () {
            this.endVideo.play()
          }.bind(this), 33250);

          TweenMax.to(this.camera.position, (fifthStep / 1000), {y: 10.0, ease: Power4.easeIn, onComplete: () => {
              setTimeout(() => {
                if(!SocketReciever.listening) {
                    console.log('ended wrong');
                    SocketReciever.init()
                    SocketReciever.socket.emit('end-experience')
                    console.log('end xp');
                } else {
                    console.log('ended good');
                   SocketReciever.socket.emit('end-experience')
                   console.log('end xp');
                }
              }, 1000)
          }})
        //   TweenMax.to(this.line.position, fifthStep, {y: 10.0, ease: Power2.easeOut})
      }, false)

      document.querySelector('.close-button').addEventListener('click', function(){
        document.dispatchEvent(manageVideo);
      }.bind(this))

      // listen phone emit to start the app
      if (SocketReciever.listening) {
          console.log('start-experience');
          SocketReciever.socket.on('start-experience', () => {
            this.sound.stopMap()
            document.dispatchEvent(manageVideo);
          })
      } else {
          console.log('start-experience');
          SocketReciever.init()
          SocketReciever.socket.on('start-experience', () => {
            this.sound.stopMap()
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
        this.planktons.position.set(0, -11, 0)

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
        this.line.frustumCulled = false

        this.line.position.set( 0, -8, -8);
        this.line.scale.set(0.001,0.001,0.001)
        this.camera.add( this.line )
        this.scene.add( this.camera );

        this.blob = new Blob(this)
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
