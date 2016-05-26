//------------------------------------------------------------------------------
//LIBRARIES
//------------------------------------------------------------------------------
import $     from 'chirashi-imports'
import THREE from 'three'

//------------------------------------------------------------------------------
//OBJECTS
//------------------------------------------------------------------------------

//movement manager
import MovementManager from 'helpers/movements/movement-manager'

//------------------------------------------------------------------------------
//OTHERS
//------------------------------------------------------------------------------
var OrbitControls =       require('three-orbit-controls')(THREE)
import gui                from 'helpers/app/gui'

export class World {
    constructor(width, height, postProcessing, debug) {
        //init attributes
        this.width          = width
        this.height         = height
        this.debug          = debug

        //init world camera
        this.initCamera()

        //init renderer
        this.initRenderer()

        //debug attributes
        if (this.debug) {
            this.controls = new OrbitControls(this.camera)
            window.three = THREE
        }

        MovementManager.init()
        MovementManager.socket.on('motion', (data) => {
            console.log(data);
        })
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 8000)
        this.camera.position.set(0, 0, 10)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialisaing: true, alpha: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000, 0)

        this.initScene()

        this.view = this.renderer.domElement
    }

    initScene() {
        //SCENE
        this.scene = new THREE.Scene()
        this.initGUI(gui)

        //LIGHTS
        this.pointLight = new THREE.PointLight(0xffffff, 5.0, 100.0, 10.0)
        this.pointLight.position.set(0.0, 1.0, 8.0)
        this.scene.add(this.pointLight)

        //coordinates
        let cubeGeometry = new THREE.BoxGeometry( 360, 360, 360 );
        let cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
        let cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
        this.scene.add( cube )
        cube.position.set(0,0,0)

        let material = new THREE.LineBasicMaterial({
           color: 0xa0b0ff
        })

       let geometry = new THREE.Geometry();
       geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
       geometry.vertices.push(new THREE.Vector3(0, 10, 0));

       let line = new THREE.Line(geometry, material);

        this.scene.add(line);
    }

    initGUI(gui) {


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

        this.renderer.render(this.scene, this.camera)
    }

    update(frame) {
        this.render()

    }
}

export default World
