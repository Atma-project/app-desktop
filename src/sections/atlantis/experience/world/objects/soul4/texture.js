import config from 'config'

import THREE from 'three'
import PIXI from 'pixi.js'
import $ from 'chirashi-imports'

import ZebraScene from './scenes/zebra-scene'

const WIDTH = 1024
const HEIGHT = 1024

const WIDTH_2 = 512
const HEIGHT_2 = 512

export class Texture extends THREE.Texture {
    constructor(world, debug) {
        let renderer = new PIXI.WebGLRenderer(WIDTH, HEIGHT, {
            background: 0x3C8FEE,
            transparent: true
        })

        // if (debug) {
        //     $.append(document.body, renderer.view)
        //     $.style(renderer.view, {
        //         zIndex: 9999,
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         transformOrigin: '0 0',
        //         transform: 'scale(0.25)',
        //         opacity: 1
        //     })
        // }

        super(renderer.view)

        this.world = world
        this.debug = debug
        this.renderer = renderer
        this.init()
    }

    init() {
        this.stage = new PIXI.Container()

        this.scenes = []

        let zebraScene = new ZebraScene(this.world, WIDTH, HEIGHT)
        this.stage.addChild(zebraScene)
        this.scenes.push(zebraScene)

        this.currentScene = this.scenes[0]

        this.stage.addChild(this.currentScene)
    }

    update(frame) {
        this.currentScene.update(frame)

        this.render()
    }

    render() {
        this.renderer.render(this.stage)
        this.needsUpdate = true
    }
}

export default Texture
