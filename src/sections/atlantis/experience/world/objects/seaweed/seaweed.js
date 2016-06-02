import THREE from 'three'
import gui from 'helpers/app/gui'
import 'gsap'

const M_2_PI = Math.PI * 2

export default class Seaweed extends THREE.Object3D {
    constructor(camera) {
        super()
        this.gui = gui
        this.camera = camera

        this.parameters = {
            size: -0.02,
            magnitude: -0.01,
            speed: 0
        }


        // !crappy!
        document.querySelector('.main').addEventListener('click', function(){
            setTimeout(function(){
                this.parameters.speed = 0.02
            }.bind(this), 26000)
        }.bind(this))
        // to remove later

        this.planes = []

        this.init()
        this.initGUI()
    }

    init() {
        this.geometry = new THREE.PlaneGeometry( 1, 80, 1, 500 )
        this.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 40, 0 ) )
        this.geometry.scale(0.01, 0.01, 0.01)

        this.material = new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide,
            shading:THREE.SmoothShading,
            color: 0x8C84DA,
            emissive: 0x000000,
            vertexColors: THREE.VertexColors
        })

    	let color, face, numberOfSides, vertexIndex, point
        let size = 0.5
        let test = 1.0
    	let faceIndices = [ 'a', 'b', 'c', 'd' ]

    	for ( let i = 0; i < this.geometry.faces.length; i++ )
    	{
    		face  = this.geometry.faces[ i ]
    		numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4
    		for( let j = 0; j < numberOfSides; j++ )
    		{
    			vertexIndex = face[ faceIndices[ j ] ]
                point = this.geometry.vertices[ vertexIndex ]

    			color = new THREE.Color( 0xffffff )
    			color.setRGB( test + point.x / size, test + point.y / size, test + point.z / size )
    			face.vertexColors[ j ] = color
    		}
    	}

      for ( let i = 0; i < 400; i ++ ) {
          this.plane = new THREE.Mesh( this.geometry, this.material )
          this.plane.rotation.y = - Math.PI / 3 * Math.random()
          this.plane.position.y = 0
          this.plane.position.x = Math.random() * (5 - -5) + -5
          this.plane.position.z = Math.random() * (0 - 15)

          this.plane.scale.y = Math.random() + 1
          this.plane.scale.x = Math.random() + 4

          // this.plane.rotation.x = -0.5

          this.plane.castShadow = true

          this.planes.push(this.plane)

          this.add( this.plane )
      }
    }

    initGUI() {
        let seaConfig = gui.addFolder('Algue')
        seaConfig
            .add(this.parameters, 'size', -5, 10).step(0.01)
            .name('Taille')
        seaConfig
            .add(this.parameters, 'magnitude', -5, 5).step(0.01)
            .name('Magnitude')
        seaConfig
            .add(this.parameters, 'speed', -0.1, 0.1).step(0.01)
            .name('Vitesse')
    }

    wave(frame) {
        for(let i = 0; i < this.plane.geometry.vertices.length - 2; i++) {
            this.vertice = this.plane.geometry.vertices[i]
            this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            this.vertice.z = Math.sin(this.distance.length() / this.parameters.size + (frame / 2)) * this.parameters.magnitude
        }
        this.plane.geometry.verticesNeedUpdate = true
    }

    move() {
        for ( let i = 0; i < 400; i ++ ) {
            this.planes[i].position.z += this.parameters.speed
            // console.log(this.camera.position.z - this.planes[i].position.z)
            // console.log(this.camera.position.x - this.planes[i].position.x)
            if(this.camera.position.z - this.planes[i].position.z <= 2) {
              if (this.planes[i].position.x > 0) {
                this.planes[i].rotation.z -= 0.005
                // TweenMax.to(this.planes[i].rotation, 2, {z: -0.5, ease: Back.easeOut.config(1.7)})
              } else {
                this.planes[i].rotation.z += 0.005
                // TweenMax.to(this.planes[i].rotation, 2, {z: 0.5, ease: Back.easeOut.config(1.7)})
              }
            }
        }
    }

    update(frame) {
        this.move()
        this.wave(frame)
    }
}
