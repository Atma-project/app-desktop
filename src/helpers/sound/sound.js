import {Howl} from 'howler'

export default class Sound {
    constructor() {
    }

    full() {
      this.sound = new Howl({
        urls: ['./assets/sounds/full.mp3'],
        volume: 0.3,
        buffer: true
      }).play();
    }

    playIntro() {
      this.intro = new Howl({
        urls: ['./assets/sounds/1_ATMA_intro.mp3'],
        onend: () => { this.playFollow() }
      }).play();
    }

    playTing() {
      this.intro = new Howl({
        urls: ['./assets/sounds/ting.wav']
      }).play();
    }

    playOnOff() {
      this.intro = new Howl({
        urls: ['./assets/sounds/ATMA_DISPARITION.wav'],
        volume: 0.5,
      }).play();
    }

    playFollow() {
      this.intro = new Howl({
        urls: ['./assets/sounds/2_ATMA_positionnes_toi.mp3']
      }).play();
    }

    playTransition() {
      this.intro = new Howl({
        urls: ['./assets/sounds/3_ATMA_suis_mes_pas.mp3']
      }).play();
    }

    playEnergy() {
      this.intro = new Howl({
        urls: ['./assets/sounds/4_ATMA_ton_energie.mp3']
      }).play();
    }

    playAlmost() {
      this.intro = new Howl({
        urls: ['./assets/sounds/5_ATMA_continues_on_y_est_presque.mp3']
      }).play();
    }

    playWahou() {
      this.intro = new Howl({
        urls: ['./assets/sounds/6_ATMA_wahou.mp3']
      }).play();
    }
}
