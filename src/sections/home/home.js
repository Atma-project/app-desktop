import './home.scss'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'

import MovementManager from 'helpers/movements/movement-manager'

export default Vue.extend({
    template: require('./home.html'),

    data() {
        return {
        }
    },

    ready() {
        new MovementManager({
            debug: true
        })
    }
})
