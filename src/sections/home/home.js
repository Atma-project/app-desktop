import './home.scss'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'

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
