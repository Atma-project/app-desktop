import THREE from 'three';
import gui from 'helpers/app/gui'
import vert from './vertices.vert'
import frag from './fragments.frag'

export default class Floor extends THREE.Object3D {
    constructor() {
        super()
        this.gui = gui

        this.clock = new THREE.Clock(true);

        this.options = {
          elevation: 1,
          noise_range: 1,
          sombrero_amplitude: 0,
          sombrero_frequency: 66,
          speed: 0,
          segments: 324,
          wireframe_color: '#224acd',
          perlin_passes: 3,
          wireframe: false,
          floor_visible: true
        };

        this.init()

        this.gui.values = {};
        this.fieldConfig = gui.addFolder('Field')
        //this.fieldConfig.open()

        this.fieldConfig.add(this.options, 'speed', -5, 5).step(0.01)
        this.fieldConfig.add(this.options, 'perlin_passes', 1, 3).step(1)
        this.fieldConfig.add(this.options, 'elevation', -10, 10).step(0.01)
        this.fieldConfig.add(this.options, 'noise_range', -10, 10).step(0.01)
        this.fieldConfig.add(this.options, 'sombrero_amplitude', -5, 5).step(0.1)
        this.fieldConfig.add(this.options, 'sombrero_frequency', 0, 100).step(0.1)
        this.fieldConfig.addColor(this.options, 'wireframe_color')
        this.gui.values.wireframe =  this.fieldConfig.add(this.options, 'wireframe')
        this.gui.values.floor_visible =  this.fieldConfig.add(this.options, 'floor_visible')

        this.gui.values.wireframe.onChange(function(value) {
            this.plane_material.wireframe = value
        }.bind(this))

        this.gui.values.floor_visible.onChange(function(value) {
            this.groundMaterial.visible = value
        }.bind(this))
    }

    init() {
        console.log(THREE.UniformsLib);

        this.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights'],
            {
                time: {
                    type: "f",
                    value: 0.0
                },
                speed: {
                    type: "f",
                    value: this.options.speed
                },
                elevation: {
                    type: "f",
                    value: this.options.elevation
                },
                noise_range: {
                    type: "f",
                    value: this.options.noise_range
                },
                offset: {
                    type: "f",
                    value: this.options.elevation
                },
                perlin_passes: {
                    type: "f",
                    value: this.options.perlin_passes
                },
                sombrero_amplitude: {
                    type: "f",
                    value: this.options.sombrero_amplitude
                },
                sombrero_frequency: {
                    type: "f",
                    value: this.options.sombrero_frequency
                },
                line_color: {
                    type: "c",
                    value: new THREE.Color(this.options.wireframe_color)
                },
            }
        ]),

        // this.uniforms = {
        //     time: {
        //         type: "f",
        //         value: 0.0
        //     },
        //     speed: {
        //         type: "f",
        //         value: this.options.speed
        //     },
        //     elevation: {
        //         type: "f",
        //         value: this.options.elevation
        //     },
        //     noise_range: {
        //         type: "f",
        //         value: this.options.noise_range
        //     },
        //     offset: {
        //         type: "f",
        //         value: this.options.elevation
        //     },
        //     perlin_passes: {
        //         type: "f",
        //         value: this.options.perlin_passes
        //     },
        //     sombrero_amplitude: {
        //         type: "f",
        //         value: this.options.sombrero_amplitude
        //     },
        //     sombrero_frequency: {
        //         type: "f",
        //         value: this.options.sombrero_frequency
        //     },
        //     line_color: {
        //         type: "c",
        //         value: new THREE.Color(this.options.wireframe_color)
        //     },
        //     light: {
        //         position: [0.0, 0.0, 0.0, 1.0],
        //         color: [1.0, 1.0, 1.0],
        //         intensity: 1,
        //         radius: 20.0,
        //         ambient: 1.0,
        //         visible: true
        //     }
        // }

        this.buildPlanes(this.options.segments)
        this.buildSun()
    }

    buildPlanes(segments) {
        this.plane_geometry = new THREE.PlaneBufferGeometry(20, 20, segments, segments);
        this.plane_material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            lights: true,
            wireframe: this.options.wireframe,
            wireframeLinewidth: 1,
            transparent: false
        })

        this.texture = new THREE.TextureLoader().load( './assets/images/textures/noise.png')
        this.groundMaterial = new THREE.MeshLambertMaterial({
            color: 0x0b1457,
            //specular: 0x050505,
            emissive: 0x022B3A,
            //emissiveMap: this.texture,
            emissiveIntensity: 0.4,
            fog: true,
        })

        // this.groundMaterial = new THREE.MeshStandardMaterial({
        //     color: 0x0b1457,
        //     emissive: 0x022B3A,
        //     roughness: 0.5,
        //     metalness: 0.5,
        //     metalnessMap: this.texture
        // })

        this.materials = [this.groundMaterial, this.plane_material]
        this.plane_mesh = THREE.SceneUtils.createMultiMaterialObject(this.plane_geometry, this.materials)
        this.plane_mesh.rotation.x = -Math.PI / 2

        this.add(this.plane_mesh)

        return this.plane_mesh.position.y = -0.5
    }

    buildSun(){
        this.sunGeometry = new THREE.CircleGeometry( 3, 20 )
        this.sunMaterial = new THREE.MeshPhongMaterial( {
            color: 0xFFA552,
            emissive: 0xFF6558,
            //specular: 0x000000,
         } )
        this.circle = new THREE.Mesh( this.sunGeometry, this.sunMaterial )
        this.circle.position.set(0, 0, -12)
        //this.add( this.circle )
    }

    update(frame) {
        this.plane_material.uniforms['time'].value = this.clock.getElapsedTime()

        this.plane_material.uniforms.speed.value = this.options.speed
        this.plane_material.uniforms.perlin_passes.value = this.options.perlin_passes
        this.plane_material.uniforms.elevation.value = this.options.elevation
        this.plane_material.uniforms.noise_range.value = this.options.noise_range
        this.plane_material.uniforms.sombrero_amplitude.value = this.options.sombrero_amplitude
        this.plane_material.uniforms.sombrero_frequency.value = this.options.sombrero_frequency
        this.plane_material.uniforms.line_color.value = new THREE.Color(this.options.wireframe_color)
    }
}
