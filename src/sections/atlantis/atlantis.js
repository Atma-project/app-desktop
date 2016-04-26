import './atlantis.scss'

import $ from 'chirashi-imports'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'

import dat from 'dat-gui'
import Experience from './experience/experience'

export default Vue.extend({
    template: require('./atlantis.html'),

    data() {
        return {
            gui: null
        }
    },

    created() {
        if (config.gui)
            this.gui = new dat.GUI()
    },

    ready() {
        new Experience({
            debug: true,
            gui: this.gui,
            postProcessing: true,
            container: this.$el,
            data: null
        })
    }
})


//

// export default new dat.GUI();


// import gui from 'superguigui.js'
