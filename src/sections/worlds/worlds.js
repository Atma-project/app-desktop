import "./worlds.scss"

import Vue from 'vue'
import worldsData from 'helpers/app/worlds'
import worldsNewData from 'helpers/app/worlds-new'

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
        if (document.body.classList.contains('unlocked')) {

            this.worlds = worldsNewData
        }
    },

    ready() {

    },

    methods: {

    }
})
