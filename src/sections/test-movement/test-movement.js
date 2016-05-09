import './test-movement.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'

import MovementManager from 'helpers/movements/movement-manager'

export default Vue.extend({
    template: require('./test-movement.html'),

    data() {
        return {
            'aX': null,
            'aY': null,
            'aZ': null,

            'prevAX': null,
            'prevAY': null,
            'prevAZ': null,

            'aGravityX': null,
            'aGravityY': null,
            'aGravityZ': null,

            'rRateX': null,
            'rRateY': null,
            'rRateZ': null,

            'interval': null,
            'timeStamp': null,

            'alpha': null,
            'beta': null,
            'gamma': null,

            'reference': null
        }
    },

    ready() {

        MovementManager.init()

        MovementManager.socket.on('orientation', (data) => {
            this.alpha = data.alpha
            this.beta = data.beta
            this.gamma = data.gamma
        })

        MovementManager.socket.on('acceleration', (data) => {
            this.aX = data.aX
            this.aY = data.aY
            this.aZ = data.aZ

            this.aGravityX = data.aGravityX
            this.aGravityY = data.aGravityY
            this.aGravityZ = data.aGravityZ

            this.rRateX = data.rRateX
            this.rRateY = data.rRateY
            this.rRateZ = data.rRateZ

            this.interval = data.interval
            this.timeStamp = data.timeStamp

        })

        if(!this.reference) {
            console.log('ok')
            let timeOut = window.setTimeout(() => {
                if(this.aX < 1 && this.aY < 1 && this.aZ < 1 && this.alpha > 1 && this.beta > 1 && this.gamma > 1) {
                    console.log('okok')
                    this.reference = {
                        ax: this.aX,
                        ay: this.aY,
                        az: this.aZ,
                        a: this.alpha,
                        b: this.beta,
                        g: this.gamma
                    }
                    console.log(this.reference)
                }
            }, 1000)
        }
    }
})
