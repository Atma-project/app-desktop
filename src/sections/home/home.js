import './home.scss'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'

import MovementManager from 'helpers/movement-manager'

export default Vue.extend({
    template: require('./home.html'),

    data() {
        return {
            gui: null
        }
    },

    ready() {
        new MovementManager({
            debug: true
        })
    }
})
