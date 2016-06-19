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
        if(!SocketReciever.listening) {
            SocketReciever.init()
            SocketReciever.socket.on('go-back-to-worlds', () => {
                document.body.classList.add('unlocked')
                this.$route.router.go('/worlds')
            })
        } else {
            SocketReciever.socket.on('go-back-to-worlds', () => {
                document.body.classList.add('unlocked')
                this.$route.router.go('/worlds')
            })
        }

    }
})
