import THREE from 'three'
import gui from 'helpers/app/gui'
import seaVert from './vertices.vert'
import seaFrag from './fragments.frag'

const M_2_PI = Math.PI * 2

export default class Seaweed extends THREE.Object3D {
    constructor() {
        super()
        this.gui = gui
        this.init()

        this.parameters = {
            size: -0.02,
            magnitude: -0.01
        }

        let seaConfig = gui.addFolder('Algue')
        seaConfig
            .add(this.parameters, 'size', -5, 10)
            .name('Taille')
        seaConfig
            .add(this.parameters, 'magnitude', -5, 5)
            .name('Magnitude')
    }

    init() {
        this.geometry = new THREE.PlaneGeometry( 3, 80, 1, 15 )
        this.geometry.scale(0.01, 0.01, 0.01)

        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            shading:THREE.SmoothShading,
            color: 0x8C84DA,
            vertexColors: THREE.VertexColors
        })

    	var color, face, numberOfSides, vertexIndex, point
        var size = 0.5
        var test = 1.0
    	var faceIndices = [ 'a', 'b', 'c', 'd' ]


    	for ( var i = 0; i < this.geometry.faces.length; i++ )
    	{
    		face  = this.geometry.faces[ i ]
    		numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4
    		for( var j = 0; j < numberOfSides; j++ )
    		{
    			vertexIndex = face[ faceIndices[ j ] ]
                point = this.geometry.vertices[ vertexIndex ]

    			color = new THREE.Color( 0xffffff )
    			color.setRGB( test + point.x / size, test + point.y / size, test + point.z / size )
    			face.vertexColors[ j ] = color
    		}
    	}

        for ( var i = 0; i < 400; i ++ ) {
            this.plane = new THREE.Mesh( this.geometry, this.material )
            this.plane.rotation.y = - Math.PI / 3 * Math.random()
            this.plane.position.y = 0.35
            this.plane.position.x = Math.random() * (2 - -2) + -2;
            this.plane.position.z = Math.random() * (-10 - 10) + 10;

            this.plane.scale.y = Math.random() + 1

            this.add( this.plane )
        }

        // this.plane = new THREE.Mesh( this.geometry, this.material )
        // this.plane.rotation.y = -Math.PI / 3
        // this.plane.position.y = -0.35
        // this.add( this.plane )
    }

    wave(frame) {
        for(let i = 0; i < this.plane.geometry.vertices.length - 2; i++) {
            this.vertice = this.plane.geometry.vertices[i]
            this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            this.vertice.z = Math.sin(this.distance.length() / this.parameters.size + (frame / 2)) * this.parameters.magnitude
        }
        this.plane.geometry.verticesNeedUpdate = true
    }

    update(frame) {
        this.wave(frame)
    }
}
