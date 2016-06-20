import './worlds-map.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
// import WorldsScene from './worldsScene'
import 'helpers/gsap/SplitText'
import 'gsap'
import Sound from 'helpers/sound/sound'


import SocketReciever from 'helpers/movements/movement-manager'

Vue.component('WorldsMap', {
    template: require('./worlds-map.html'),

    data() {
        return {

        }
    },

    props: ['worlds'],

    created() {

    },

    ready() {
        // this.worldsScene = new WorldsScene($.getSelector('.worlds-map canvas'), this.worlds)
        TweenMax.staggerFromTo('.world', 2, {
            opacity: 0,
        }, {
            opacity: 1,
        }, 0.4)

        this.sound = new Sound()
        this.sound.playMap()

        // document.addEventListener('click', () => {
        //     TweenMax.to('.worlds', 0.6, {
        //         opacity: 0,
        //         onComplete: () => {
        //             this.$route.router.go('/atlantis')
        //         }
        //     })
        // });

        this.animateWorlds()
        if (SocketReciever.listening) {
            console.log('ok')
            SocketReciever.socket.on('changed-current-world', (data) => {
                console.log('recieved event')
                this.selectWorld(data)
            })
            SocketReciever.socket.on('go-to-experience', () => {
                TweenMax.to('.worlds', 0.6, {
                    opacity: 0,
                    onComplete: () => {
                        this.$route.router.go('/atlantis')
                    }
                })
            })
        } else {
            console.log('not ok')
            SocketReciever.init()
            SocketReciever.socket.on('changed-current-world', (data) => {
                this.selectWorld(data)
            })
            SocketReciever.socket.on('go-to-experience', () => {
                TweenMax.to('.worlds', 0.6, {
                    opacity: 0,
                    onComplete: () => {
                        this.$route.router.go('/atlantis')
                    }
                })
            })
        }
    },

    methods: {
        selectWorld(data) {
            let worldsTab = $.getSelectorAll('.active')
            if(worldsTab.length) {
                for( let i = 0; i < worldsTab.length; i++ ) {
                    $.getSelectorAll('.active')[i].classList.remove('active')
                }
            }

            $.getSelector(data.id).classList.add('active')
            let splitText = new SplitText('.world.active div', {type:"chars"})
            TweenMax.staggerFromTo(splitText.chars, 0.4, {
                opacity: 0,
                y: 60,
                scale: 0
            }, {
                opacity: 1,
                y: 0,
                scale: 1
            }, 0.1, () => {
                splitText.revert()
            })
        },

        animateWorlds() {

            TweenMax.from('.world:nth-child(2)', 2, {
                y: -20,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.world:nth-child(1)', 2.5, {
                y: -20,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.world:nth-child(3)', 2.5, {
                y: 20,
                x: -30,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.world:nth-child(4)', 1.5, {
                y: 20,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.world:nth-child(5)', 3, {
                y: 10,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })
        }
    }
})
