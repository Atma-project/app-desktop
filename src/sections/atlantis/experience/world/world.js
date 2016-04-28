import $ from 'chirashi-imports'
import gui from 'helpers/app/gui'

import THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)

import WAGNER from '@alex_toudic/wagner'
import FXAAPass from '@alex_toudic/wagner/src/passes/fxaa/FXAAPass'
import MultiPassBloomPass from '@alex_toudic/wagner/src/passes/bloom/MultiPassBloomPass'
import ToonPass from '@alex_toudic/wagner/src/passes/toon/ToonPass'

import Noise from '@alex_toudic/wagner/src/passes/dof/DOFPass'

//soul tests
// import Soul from './objects/soul/soul'
// import Soul2 from './objects/soul2/soul2'
// import Soul3 from './objects/soul3/soul3'
// import Soul4 from './objects/soul4/soul4'

//seaweeds tests
// import Seaweed from './objects/seaweed/seaweed'

//world tests
import Floor from './objects/floor/floor'

// Plankton tests
// import Planktons from './objects/planktons/planktons'

export class World {
    constructor(width, height, postProcessing, data, debug) {
        this.width = width
        this.height = height

        window.three = THREE

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
        //this.scene.add( this.camera )

        //init renderer
        this.renderer = new THREE.WebGLRenderer({antialisaing: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000)

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
            blurAmount: 2.4,
            applyZoomBlur: true
        })
        this.multiPassBloomPass.enabled = false
        this.passes.push(this.multiPassBloomPass)

        this.toonPass = new ToonPass()
        this.toonPass.enabled = false
        this.passes.push(this.toonPass)

        this.noise = new Noise()
        this.noise.enabled = false
        this.passes.push(this.noise)

        console.log(this.noise);

        this.passes.push()
    }

    initScene() {
        this.scene = new THREE.Scene()
        this.initGUI(gui)

        // LIGHTS
        // this.light = new THREE.AmbientLight( 0xffffff )
        // this.scene.add( this.light )

        this.pointLight = new THREE.PointLight( 0xffffff, 5.0, 100.0, 10.0 )
        this.pointLight.position.set( 0.0, 1.0, 8.0 )
        this.scene.add( this.pointLight )

        this.path = "./assets/images/";
        this.urls = [
            this.path + 'px.jpg',
            this.path + 'nx.jpg',
            this.path + 'py.jpg',
            this.path + 'ny.jpg',
            this.path + 'pz.jpg',
            this.path + 'nz.jpg'
        ]

        this.cubemap = THREE.ImageUtils.loadTextureCube(this.urls)
        this.cubemap.format = THREE.RGBFormat

        this.shader = THREE.ShaderLib['cube']
        this.shader.uniforms['tCube'].value = this.cubemap

        // create shader material
        this.skyBoxMaterial = new THREE.ShaderMaterial( {
            fragmentShader: this.shader.fragmentShader,
            vertexShader: this.shader.vertexShader,
            uniforms: this.shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        })

        this.skybox = new THREE.Mesh(
            new THREE.CubeGeometry(1000, 1000, 1000),
            this.skyBoxMaterial
        )

        //this.scene.add(this.skybox)

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


        this.floor = new Floor()
        this.scene.add(this.floor)
        // this.floor.scale.set(20, 20, 20)


        // this.seaweed = new Seaweed()
        // this.scene.add(this.seaweed)


        this.planktons = new Planktons()
        this.scene.add(this.planktons)
    }

    initGUI(gui) {
        let postProcessingGroup = gui.addFolder('Post Processing')
        postProcessingGroup.add(this, 'postProcessing').name('postProce')
        postProcessingGroup.add(this.fxaaPass, 'enabled').name('fxaa')
        postProcessingGroup.add(this.multiPassBloomPass, 'enabled').name('bloom')
        postProcessingGroup.add(this.toonPass, 'enabled').name('toon')
        postProcessingGroup.add(this.noise, 'enabled').name('noise')

        postProcessingGroup.add(this.multiPassBloomPass.params, 'blurAmount', -10, 10).step(0.01)
        postProcessingGroup.add(this.multiPassBloomPass.params, 'blendMode', -10, 10).step(0.01)
        postProcessingGroup.add(this.multiPassBloomPass.params, 'zoomBlurStrength', -10, 10).step(0.01)
<<<<<<< HEAD
=======

        postProcessingGroup.add(this.noise.params, 'aperture', -1, 1).step(0.001)
        postProcessingGroup.add(this.noise.params, 'blurAmount', -10, 10).step(0.01)
        postProcessingGroup.add(this.noise.params, 'focalDistance', -1, 1).step(0.001)
>>>>>>> cafcff18f985427dba8aad449f2195c12e716f10
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

        // this.seaweed.update(frame)

        this.floor.update(frame)

        this.planktons.update(frame)
    }
}

export default World
