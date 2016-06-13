import THREE from 'three';
import gui from 'helpers/app/gui'

import 'gsap'

import vert from './video.vert'
import frag from './video.frag'

export default class Floor extends THREE.Object3D {
    constructor() {
        super()
        this.gui = gui

        this.video = null
        this.circle = null

        this.init()
    }

    init() {
        this.buildPlane()
        this.addVideo()
    }

    buildPlane() {

        this.plane_geometry = new THREE.PlaneBufferGeometry(20, 20, 324, 324 )

        this.texture = new THREE.TextureLoader().load( './assets/images/textures/noise.png')
        this.groundMaterial = new THREE.MeshLambertMaterial({
            color: 0x17183B,
            //specular: 0x050505,
            emissive: 0x022B3A,
            //emissiveMap: this.texture,
            // emissiveIntensity: 0.4,
            // fog: true,
        })

        this.plane_mesh_bottom = new THREE.Mesh(this.plane_geometry, this.groundMaterial)

        this.plane_mesh_bottom.castShadow = true
        this.plane_mesh_bottom.receiveShadow = true

        this.plane_mesh_bottom.rotation.x = -Math.PI / 2

        this.add(this.plane_mesh_bottom)
    }

    addVideo(){

        this.video = document.getElementById( 'video' )

        this.video.pause()
        this.videoTexture = new THREE.Texture( this.video )
        this.videoTexture.minFilter = THREE.LinearFilter
        this.videoTexture.magFilter = THREE.LinearFilter

        this.sunGeometry = new THREE.PlaneBufferGeometry(5.33, 3, 20, 20 )
        this.keyColorObject = new THREE.Color( 0x000000 )

        this.sunMaterial = new THREE.ShaderMaterial({
            uniforms: {
            	texture: {
            		type: "t",
            		value: this.videoTexture
            	},
            	color: {
            		type: "c",
            		value: this.keyColorObject
            	}
            },
            vertexShader: require('./video.vert'),
            fragmentShader: require('./video.frag'),
            transparent: true,
            blending: THREE.AdditiveBlending
        })

        this.circle = new THREE.Mesh( this.sunGeometry, this.sunMaterial )
        this.circle.scale.set(0.8, 0.8, 0.8)
        // this.circle.position.set(0, 1, 4)
        this.circle.position.set(0, 11, 4)
        this.add( this.circle )

        document.onkeypress = function(e) {
            if ( (e || window.event).keyCode === 13) {
                this.video.paused ? this.video.play() : this.video.pause()
            }
        }.bind(this)
    }

    manageVideo(time) {
      this.video.play()
      TweenMax.to(this.circle.position, 2, {y: 1, delay: time, ease: Power2.easeOut})
    }

    update(frame) {
        this.videoTexture.needsUpdate = true
    }
}
