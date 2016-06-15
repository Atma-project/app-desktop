import "./worlds.scss"

import Vue from 'vue'
import worldsData from 'helpers/app/worlds'

export default Vue.extend({
    template: require('./worlds.html'),

    data() {
        return {
            mapDisplay: true,
            sliderDisplay: false,
            worlds : worldsData
        }
    },

    created() {

    },

    ready() {

    },

    methods: {

    }
})
