import $ from 'chirashi-imports'

import THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)

import WAGNER from '@alex_toudic/wagner'
import FXAAPass from '@alex_toudic/wagner/src/passes/fxaa/FXAAPass'

import Soul from './objects/soul/soul'
import Seaweed from './objects/seaweed/seaweed'

export class World {
    constructor(width, height, postProcessing, data, gui, debug) {
        this.width = width
        this.height = height

        this.debug = debug
        this.postProcessing = postProcessing
        this.data = data
        this.gui = gui

        //init world camera
        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 8000)
        this.camera.position.z = 80

        //orbit control
        //if (debug)
        this.controls = new OrbitControls(this.camera)

        //init renderer
        this.renderer = new THREE.WebGLRenderer({antialisaing: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x114B5F)

        this.initPostProcessing()
        this.initScene()

        this.initGUI(this.gui)

        this.view = this.renderer.domElement

        this.initGUI(gui)
    }

    initPostProcessing() {
        this.composer = new WAGNER.Composer(this.renderer)

        this.passes = []

        this.fxaaPass = new FXAAPass()
        this.fxaaPass.enabled = true

        this.passes.push(this.fxaaPass)
    }

    initScene() {
        this.scene = new THREE.Scene()

        // LIGHTS
        this.light = new THREE.AmbientLight( 0xffffff )
        this.scene.add( this.light )

        //OBJECTS
        this.soul = new Soul(this, this.debug)
        this.scene.add(this.soul)

        this.seaweed = new Seaweed(this.gui)
        this.scene.add(this.seaweed)
    }

    initGUI(gui) {
        //let postProcessingGroup = gui.addFolder('Post Processing')
        //postProcessingGroup
            //.add(this, 'postProcessing')
            //.name('Enabled')

        //let world = gui.addFolder('World')

        //let light = gui.addFolder('Light')
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

        this.soul.update(frame)
        this.seaweed.update(frame)
    }
}

export default World
