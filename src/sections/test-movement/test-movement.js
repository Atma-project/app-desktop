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
            'gamma': null
        }
    },

    ready() {

        MovementManager.init()

        MovementManager.socket.on('acceleration', (data) => {
            this.aX = Math.trunc(data.aX)
            this.aY = Math.trunc(data.aY)
            this.aZ = Math.trunc(data.aZ)

            this.aGravityX = Math.trunc(data.aGravityX)
            this.aGravityY = Math.trunc(data.aGravityY)
            this.aGravityZ = Math.trunc(data.aGravityZ)

            this.rRateX = Math.trunc(data.rRateX)
            this.rRateY = Math.trunc(data.rRateY)
            this.rRateZ = Math.trunc(data.rRateZ)

            this.interval = data.interval
            this.timeStamp = data.timeStamp
        })

        MovementManager.socket.on('orientation', (data) => {
            this.alpha = Math.trunc(data.alpha)
            this.beta = Math.trunc(data.beta)
            this.gamma = Math.trunc(data.gamma)
        })
    }
})
