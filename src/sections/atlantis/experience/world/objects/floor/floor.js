import THREE from 'three';

export default class Floor extends THREE.Object3D {
    constructor(gui) {
        super()
        this.gui = gui

        this.clock = new THREE.Clock(true);

        this.options = {
          elevation: 1,
          noise_range: 2.14,
          sombrero_amplitude: 0.6,
          sombrero_frequency: 10.0,
          speed: 0.8,
          segments: 324,
          wireframe_color: '#3a90b3',
          perlin_passes: 1,
          wireframe: false,
          floor_visible: true
        };

        this.init()

        this.gui.values = {};
        this.fieldConfig = gui.addFolder('Field')
        this.fieldConfig.open()

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
        this.uniforms = {
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
            }
        }
        this.buildPlanes(this.options.segments)
    }

    buildPlanes(segments) {
        this.plane_geometry = new THREE.PlaneBufferGeometry(20, 20, segments, segments);
        this.plane_material = new THREE.ShaderMaterial({
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            wireframe: this.options.wireframe,
            wireframeLinewidth: 1,
            transparent: false,
            uniforms: this.uniforms
        })

        this.texture = new THREE.TextureLoader().load( './assets/images/textures/noise.png')
        this.groundMaterial = new THREE.MeshLambertMaterial({
            color: 0x0b1457,
            specular: 0x050505,
            emissive: 0x022B3A,
            emissiveMap: this.texture,
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

    update(frame) {
        //this.plane_material.uniforms['time'].value = this.clock.getElapsedTime()

        this.plane_material.uniforms.speed.value = this.options.speed
        this.plane_material.uniforms.perlin_passes.value = this.options.perlin_passes
        this.plane_material.uniforms.elevation.value = this.options.elevation
        this.plane_material.uniforms.noise_range.value = this.options.noise_range
        this.plane_material.uniforms.sombrero_amplitude.value = this.options.sombrero_amplitude
        this.plane_material.uniforms.sombrero_frequency.value = this.options.sombrero_frequency
        this.plane_material.uniforms.line_color.value = new THREE.Color(this.options.wireframe_color)
    }
}
