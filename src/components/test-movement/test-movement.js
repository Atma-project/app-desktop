import './test-movement.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'

import Graph from './graph/graph'
import MovementManager from 'helpers/movements/movement-manager'

Vue.component('TestMovement', {
    template: require('./test-movement.html'),

    data() {
        return {
            'movements': {
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
                'dgamma': null
            }
        }
    },

    ready() {
        new Graph({
            debug: true,
            postProcessing: true,
            container: this.$el
        })

        this.getMovements()
        this.getReferencePosition()
    },

    methods: {
        getMovements() {
            MovementManager.init()

            MovementManager.socket.on('motion', (data) => {
                this.movements.aX = data.aX
                this.movements.aY = data.aY
                this.movements.aZ = data.aZ

                this.movements.aGravityX = data.aGravityX
                this.movements.aGravityY = data.aGravityY
                this.movements.aGravityZ = data.aGravityZ
            })

            MovementManager.socket.on('motion-dif', (data) => {
                this.movements.daX = data.daX
                this.movements.daY = data.daY
                this.movements.daZ = data.daZ

                this.movements.daGravityY = data.dgaY
            })

            MovementManager.socket.on('rotation', (data) => {
                this.movements.alpha = data.alpha
                this.movements.beta = data.beta
                this.movements.gamma = data.gamma
            })

            MovementManager.socket.on('rotation-dif', (data) => {
                this.movements.dalpha = data.da
                this.movements.dbeta = data.db
                this.movements.dgamma = data.dg
            })
        },

        getReferencePosition() {
            MovementManager.socket.on('referencePosition', (data) => {
                this.movements.raX = data.ax
                this.movements.raY = data.ay
                this.movements.raZ = data.az

                this.movements.raGravityY = data.agy

                this.movements.ralpha = data.a
                this.movements.rbeta = data.b
                this.movements.rgamma = data.g
            })
        }
    }
})
