import THREE from 'three'

export default class Skybox extends THREE.Mesh {
    constructor(path, width, height, depth) {

        let skyBoxGeometry = new THREE.CubeGeometry(width, height, depth)

        let urls = [
            path + 'px.jpg',
            path + 'nx.jpg',
            path + 'py.jpg',
            path + 'ny.jpg',
            path + 'pz.jpg',
            path + 'nz.jpg'
        ]

        let cubemap = THREE.ImageUtils.loadTextureCube(urls)
        cubemap.format = THREE.RGBFormat

        let shader = THREE.ShaderLib['cube']
        shader.uniforms['tCube'].value = cubemap

        let skyBoxMaterial = new THREE.ShaderMaterial( {
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        })

        super(skyBoxGeometry, skyBoxMaterial)
    }
}
