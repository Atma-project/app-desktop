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
            this.aX = (1 / 0.15) * data.aX + (1.0 - (1 / 0.15)) * data.prevAX
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

        MovementManager.socket.on('orientation', (data) => {
            this.alpha = data.alpha
            this.beta = data.beta
            this.gamma = data.gamma
        })
    }
})
