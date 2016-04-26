import $ from 'chirashi-imports'
import gui from 'helpers/app/gui'

import THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)

import WAGNER from '@alex_toudic/wagner'
import FXAAPass from '@alex_toudic/wagner/src/passes/fxaa/FXAAPass'
import MultiPassBloomPass from '@alex_toudic/wagner/src/passes/bloom/MultiPassBloomPass'

//soul tests
// import Soul from './objects/soul/soul'
// import Soul2 from './objects/soul2/soul2'
// import Soul3 from './objects/soul3/soul3'
// import Soul4 from './objects/soul4/soul4'

//seaweeds tests
import Seaweed from './objects/seaweed/seaweed'

//world tests
// import Floor from './objects/floor/floor'

export class World {
    constructor(width, height, postProcessing, data, debug) {
        this.width = width
        this.height = height

        this.debug = debug
        this.postProcessing = postProcessing
        this.data = data

        //init world camera
        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 8000)
        this.camera.position.z = 8

        //orbit control
        //if (debug)
        this.controls = new OrbitControls(this.camera)

        this.scene = new THREE.Scene()
		this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 )

        //init renderer
        this.renderer = new THREE.WebGLRenderer({antialisaing: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x114B5F)

        this.initPostProcessing()
        this.initScene()

        this.view = this.renderer.domElement
    }

    initPostProcessing() {
        this.composer = new WAGNER.Composer(this.renderer)

        this.passes = []

        this.fxaaPass = new FXAAPass()
        this.fxaaPass.enabled = true
        this.passes.push(this.fxaaPass)

        this.multiPassBloomPass = new MultiPassBloomPass({
            blurAmount: 1.2,
            applyZoomBlur: true
        })
        this.multiPassBloomPass.enabled = false
        this.passes.push(this.multiPassBloomPass)

        this.passes.push()
    }

    initScene() {
        this.scene = new THREE.Scene()
        this.initGUI(gui)

        // LIGHTS
        this.light = new THREE.AmbientLight( 0xffffff )
        this.scene.add( this.light )

        this.pointLight = new THREE.PointLight( 0xffffff, 5, 100, 10 );
        this.pointLight.position.set( 0, 1, 8 );
        this.scene.add( this.pointLight );

        this.PointLightHelper = new THREE.PointLightHelper( this.pointLight, 1 );
        this.scene.add( this.PointLightHelper );

        //OBJECTS
        // this.soul = new Soul(this, this.debug)
        // this.scene.add(this.soul)
        //
        // this.soul2 = new Soul2(this, this.debug)
        // this.scene.add(this.soul2)
        //
        // this.soul3 = new Soul3(this, this.debug)
        // this.scene.add(this.soul3)
        //
        // this.soul4 = new Soul4(this, this.debug)
        // this.scene.add(this.soul4)

        this.seaweed = new Seaweed(this.gui)
        this.scene.add(this.seaweed)

        // this.floor = new Floor(this.gui)
        // this.scene.add(this.floor)
    }

    initGUI(gui) {
        let postProcessingGroup = gui.addFolder('Post Processing')
        postProcessingGroup.add(this, 'postProcessing').name('postProce')
        postProcessingGroup.add(this.fxaaPass, 'enabled').name('fxaa')
        postProcessingGroup.add(this.multiPassBloomPass, 'enabled').name('bloom')

        console.log(this.multiPassBloomPass)
        postProcessingGroup.add(this.multiPassBloomPass.params, 'blurAmount', -10, 10).step(0.01)
        postProcessingGroup.add(this.multiPassBloomPass.params, 'blendMode', -10, 10).step(0.01)
        postProcessingGroup.add(this.multiPassBloomPass.params, 'zoomBlurStrength', -10, 10).step(0.01)

        // this.soul1Folder = gui.addFolder('Soul1')
    }

    resize() {
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

        this.seaweed.update(frame)

        // this.floor.update(frame)
    }
}

export default World
