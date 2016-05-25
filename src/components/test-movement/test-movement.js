import './test-movement.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'

import Graph from './graph/graph'
import MovementManager from 'helpers/movements/movement-manager'

Vue.component('TestMovement', {
    template: require('./test-movement.html'),

    data() {
        return {
            'x': null,
            'y': null,
            'z': null,
            'deltaX': null,
            'deltaY': null,
            'deltaZ': null,
            'refX': null,
            'refY': null,
            'refZ': null,

            'alpha': null,
            'beta': null,
            'gamma': null,
            'deltaAlpha': null,
            'deltaBeta': null,
            'deltaGamma': null,
            'refAlpha': null,
            'refBeta': null,
            'refGamma': null,
        }
    },

    ready() {
        new Graph({
            debug: true,
            postProcessing: true,
            container: this.$el
        })

        this.getMovements()
    },

    methods: {
        getMovements() {
            MovementManager.init()

            MovementManager.socket.on('motion', (data) => {
                this.x = data.x
                this.y = data.y
                this.z = data.z
            })

            MovementManager.socket.on('delta-motion', (data) => {
                this.deltaX = data.x
                this.deltaY = data.y
                this.deltaZ = data.z
            })

            MovementManager.socket.on('ref-motion', (data) => {
                this.refX = data.x
                this.refY = data.y
                this.refZ = data.z
            })

            MovementManager.socket.on('rotation', (data) => {
                this.alpha = data.alpha
                this.beta = data.beta
                this.gamma = data.gamma
            })

            MovementManager.socket.on('ref-rotation', (data) => {
                this.refAlpha = data.alpha
                this.refBeta = data.beta
                this.refGamma = data.gamma
            })
        }
    }
})
