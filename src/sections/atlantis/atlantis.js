import './atlantis.scss'

import $ from 'chirashi-imports'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'

import Experience from './experience/experience'
import SocketReciever from 'helpers/movements/movement-manager'

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
            container: this.$el
        })

        var canvas = document.querySelector('#experience')
        TweenMax.to(canvas, 2, {alpha: 1, ease: Power2.easeOut})


        if(!SocketReciever.listening) {
            SocketReciever.init()
            // SocketReciever.socket.on('go-back-to-worlds', () => {
            SocketReciever.socket.on('end-experience', () => {
                document.body.classList.add('unlocked')
                setTimeout(function () {
                    this.$route.router.go('/worlds')
                }.bind(this), 2000);
            })
        } else {
            // SocketReciever.socket.on('go-back-to-worlds', () => {
            SocketReciever.socket.on('end-experience', () => {
                document.body.classList.add('unlocked')
                setTimeout(function () {
                    this.$route.router.go('/worlds')
                }.bind(this), 2000);
            })
        }

    }
})
