import THREE from 'three';
import gui from 'helpers/app/gui'
import vert from './verticesW.vert'
import frag from './fragmentsW.frag'
import vert_depth from './depth.vert'
import shaderParse from 'helpers/app/shaderParse'

export default class SeaSystem extends THREE.Object3D {
    constructor(options) {
        super()
        this.gui = gui
        this.o = options

        this.clock = new THREE.Clock(true)

        this.options = {
          elevation: this.o.elevation,
          noise_range: this.o.noise_range,
          sombrero_amplitude: this.o.sombrero_amplitude,
          sombrero_frequency: this.o.sombrero_frequency,
          speed: this.o.speed,
          segments: this.o.segments,
          wireframe_color: this.o.wireframe_color,
          perlin_passes: this.o.perlin_passes,
          wireframe: this.o.wireframe,
          floor_visible: this.o.floor_visible,
          minIntensity: this.o.minIntensity,
          intensity: this.o.intensity
        }

        this.lightOptions = {
            position: {
                x: this.o.position.x,
                y: this.o.position.y,
                z: this.o.position.z
            }
        }

        this.init()

        this.gui.values = {}
        this.fieldConfig = gui.addFolder('Water' + this.o.index)


        //Mountain
        this.fieldConfig.add(this.options, 'speed', -5, 5).step(0.01)
        this.fieldConfig.add(this.options, 'perlin_passes', 1, 3).step(1)
        this.fieldConfig.add(this.options, 'elevation', -10, 10).step(0.01)
        this.fieldConfig.add(this.options, 'noise_range', -10, 10).step(0.01)
        this.fieldConfig.add(this.options, 'sombrero_amplitude', -5, 5).step(0.1)
        this.fieldConfig.add(this.options, 'sombrero_frequency', 0, 100).step(0.1)
        this.fieldConfig.addColor(this.options, 'wireframe_color')
        this.gui.values.wireframe =  this.fieldConfig.add(this.options, 'wireframe')
        this.gui.values.floor_visible =  this.fieldConfig.add(this.options, 'floor_visible')

        //light
        this.fieldConfig.add(this.lightOptions.position, 'x', -100, 100).step(1)
        this.fieldConfig.add(this.lightOptions.position, 'y', -100, 100).step(1)
        this.fieldConfig.add(this.lightOptions.position, 'z', -100, 100).step(1)
        this.fieldConfig.add(this.options, 'minIntensity', 0, 1).step(0.1)
        this.fieldConfig.add(this.options, 'intensity', 0, 10).step(1.0)

        this.gui.values.wireframe.onChange(function(value) {
            this.plane_material.wireframe = value
        }.bind(this))

        this.gui.values.floor_visible.onChange(function(value) {
            this.groundMaterial.visible = value
        }.bind(this))
    }

    init() {

        this.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib[ "shadowmap" ],
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
                lightPosition: {
                    type: "v3",
                    value: new THREE.Vector3(this.lightOptions.position.x, this.lightOptions.position.y, this.lightOptions.position.z)
                },
                lightMinIntensity: {
                    type: "f",
                    value: this.options.minIntensity
                },
                lightIntensity: {
                    type: "f",
                    value: this.options.intensity
                }
            }
        ])

        this.buildPlanes(this.options.segments)
    }

    buildPlanes(segments) {

        this.plane_geometry = new THREE.PlaneBufferGeometry(20, 20, segments, segments );

        this.plane_material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shaderParse(vert),
            fragmentShader: shaderParse(frag),
            wireframe: this.options.wireframe,
            wireframeLinewidth: 1,
            transparent: false,
            // depthTest: true,
            // depthWrite: true,
            side: THREE.DoubleSide
        })

        this.plane_mesh = new THREE.Mesh(this.plane_geometry, this.plane_material)

        // this.plane_mesh.castShadow = true
        // this.plane_mesh.receiveShadow = true

        // this.plane_mesh.customDepthMaterial = new THREE.ShaderMaterial({
        //     vertexShader: shaderParse(vert_depth),
        //     fragmentShader: THREE.ShaderLib.depthRGBA.fragmentShader,
        //     uniforms: this.uniforms
        // });

        this.plane_mesh.rotation.x = -Math.PI / 2

        this.add(this.plane_mesh)
    }

    update(frame) {
        this.plane_material.needsUpdate = true

        this.plane_material.uniforms['time'].value = this.clock.getElapsedTime()

        this.plane_material.uniforms.speed.value = this.options.speed
        this.plane_material.uniforms.perlin_passes.value = this.options.perlin_passes
        this.plane_material.uniforms.elevation.value = this.options.elevation
        this.plane_material.uniforms.noise_range.value = this.options.noise_range
        this.plane_material.uniforms.sombrero_amplitude.value = this.options.sombrero_amplitude
        this.plane_material.uniforms.sombrero_frequency.value = this.options.sombrero_frequency
        this.plane_material.uniforms.line_color.value = new THREE.Color(this.options.wireframe_color)

        this.plane_material.uniforms.lightPosition.value = new THREE.Vector3(this.lightOptions.position.x, this.lightOptions.position.y, this.lightOptions.position.z)
        this.plane_material.uniforms.lightMinIntensity.value = this.options.minIntensity
        this.plane_material.uniforms.lightIntensity.value = this.options.intensity

    }
}
