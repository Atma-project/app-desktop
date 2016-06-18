import './header-app.scss'
import Tweenmax from 'gsap'

import Vue from 'vue'
import $ from 'chirashi-imports'

Vue.component('HeaderApp', {
    template: require('./header-app.html'),

    data() {
        return {

        }
    },

    ready() {
        var counter = { var: 0 };
        var tal = document.getElementById("counter");

        var tween = TweenMax.to(counter, 180, {
            var: 90000,
            onUpdate: function () {
                tal.innerHTML = Math.ceil(counter.var);
            },
            ease:Circ.easeOut
        });
        tween.pause()

        document.querySelector('.close-button').addEventListener('click', function(){
            document.querySelector('.header-app').classList.add('move', 'reset')
            tween.play()
        }.bind(this))
    },

    methods: {

    }
})
