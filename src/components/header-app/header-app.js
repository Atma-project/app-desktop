import './header-app.scss'
import Tweenmax from 'gsap'

import Vue from 'vue'
import $ from 'chirashi-imports'

import SocketReciever from 'helpers/movements/movement-manager'


Vue.component('HeaderApp', {
    template: require('./header-app.html'),

    data() {
        return {

        }
    },

    ready() {
        var counter = { var: 0 }
        var tal = document.getElementById("counter")

        var tween = new TimelineMax({ onUpdate: function(){
          tal.innerHTML = Math.ceil(counter.var)
        }, ease:Circ.easeOut});
        tween.pause()

        //0.30 - 0.46
        tween.to(counter, 16, {var: 19500, delay: 30})
        tween.to(counter, 8, {var: 20000})

        //0.54 - 1.16
        tween.to(counter, 22, {var: 39500})
        tween.to(counter, 8, {var: 40000})

        //1.24 - 2.02
        tween.to(counter, 38, {var: 59500})
        tween.to(counter, 8, {var: 60000})

        //2.10 - 2.32
        tween.to(counter, 22, {var: 79500})
        tween.to(counter, 8, {var: 80000})

        //2.40 - 2.54
        tween.to(counter, 14, {var: 90000})


        if (SocketReciever.listening) {
            console.log('start-experience');
            SocketReciever.socket.on('start-experience', () => {
                setTimeout(function () {
                    document.querySelector('.header-app').classList.add('move', 'reset')
                }.bind(this), 30000);
                tween.play()
            })
        } else {
            console.log('start-experience');
            SocketReciever.init()
            SocketReciever.socket.on('start-experience', () => {
                setTimeout(function () {
                    document.querySelector('.header-app').classList.add('move', 'reset')
                }.bind(this), 30000);
                tween.play()
            })
        }

        document.querySelector('.close-button').addEventListener('click', function(){
            setTimeout(function () {
                document.querySelector('.header-app').classList.add('move', 'reset')
            }.bind(this), 30000);
            tween.play()
        }.bind(this))
    },

    methods: {

    }
})
