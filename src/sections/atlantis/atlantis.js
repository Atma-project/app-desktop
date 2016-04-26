import './atlantis.scss'

import $ from 'chirashi-imports'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'

import Experience from './experience/experience'

export default Vue.extend({
    template: require('./atlantis.html'),

    data() {
        return {
        }
    },

    created() {

    },

    ready() {
        new Experience({
            debug: true,
            postProcessing: true,
            container: this.$el,
            data: null
        })
    }
})
