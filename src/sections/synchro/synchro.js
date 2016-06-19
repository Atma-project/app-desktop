import './synchro.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'

import SocketReciever from 'helpers/movements/movement-manager'

export default Vue.extend({
    template: require('./synchro.html'),

    data() {
        return {
        }
    },

    ready() {
        console.log(SocketReciever);
        this.buildWave(90, 60)
        TweenMax.to(this.$el, 1, {
            opacity: 1,
            onComplete: () => {
                this.listenForServer()
            }
        })
    },

    methods: {
        listenForServer() {
            //FAKE !!!!!!!!!!!!!!!!!!
            window.setTimeout(() => {
                SocketReciever.init()
                SocketReciever.socket.on('phone-connected-ok', () => {
                    console.log('connected')
                    this.animateOut()
                })
            }, 3000)
        },

        animateOut() {
            TweenMax.to(this.$el, 1.0, {
                opacity: 0,
                onComplete: () => {
                    this.$route.router.go('/worlds')
                }
            })
        },

        buildWave(w, h) {

            const path = document.querySelector('#wave')
            const m = 0.512286623256592433

            const a = h / 4
            const y = h / 2

            const pathData = [
            'M', w * 0, y + a / 2,
            'c',
              a * m, 0,
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,

            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a
            ].join(' ')

            path.setAttribute('d', pathData)
        }
    }
})
