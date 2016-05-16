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

            'aGravityX': null,
            'aGravityY': null,
            'aGravityZ': null,

            'alpha': null,
            'beta': null,
            'gamma': null,

            'raX': null,
            'raY': null,
            'raZ': null,

            'raGravityY': null,

            'ralpha': null,
            'rbeta': null,
            'rgamma': null,

            'daX': null,
            'daY': null,
            'daZ': null,

            'daGravityY': null,

            'dalpha': null,
            'dbeta': null,
            'dgamma': null,
        }
    },

    ready() {
        this.getMovements()
        this.getReferencePosition()
    },

    methods: {
        getMovements() {
            MovementManager.init()

            MovementManager.socket.on('motion', (data) => {
                this.aX = data.aX
                this.aY = data.aY
                this.aZ = data.aZ

                this.aGravityX = data.aGravityX
                this.aGravityY = data.aGravityY
                this.aGravityZ = data.aGravityZ
            })

            MovementManager.socket.on('rotation', (data) => {
                this.alpha = data.alpha
                this.beta = data.beta
                this.gamma = data.gamma
            })
        },

        getReferencePosition() {
            MovementManager.socket.on('referencePosition', (data) => {
                this.raX = data.ax
                this.raY = data.ay
                this.raZ = data.az

                this.raGravityY = data.agy

                this.ralpha = data.a
                this.rbeta = data.b
                this.rgamma = data.g
            })
        }
    }
})
