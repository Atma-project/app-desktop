import './header-app.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'

Vue.component('HeaderApp', {
    template: require('./header-app.html'),

    data() {
        return {

        }
    },

    ready() {
        document.querySelector('.close-button').addEventListener('click', function(){
            document.querySelector('.header-app').classList.add('move', 'reset')
        }.bind(this))
    },

    methods: {

    }
})
