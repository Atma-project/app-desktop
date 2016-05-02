import $ from 'chirashi-imports'
import Tweenmax from 'gsap'
import World from './world/world.js'

export class Experience {
    constructor(options) {
        this.frame = 0
        this.options = options

        this.world = new World($.width(options.container), $.height(options.container), options.postProcessing, options.data, options.debug)
        $.append(options.container, this.world.view)

        $.resize(this.resize.bind(this))

        Tweenmax.ticker.addEventListener('tick', ::this.update)
    }

    update() {
        this.frame += 0.1
        this.world.update(this.frame)
    }

    resize() {
        this. world.resize( $.width(this.options.container), $.height(this.options.container) )
    }

    kill() {
        Tweenmax.ticker.removeEventListener('tick', ::this.update)
    }
}

export default Experience
