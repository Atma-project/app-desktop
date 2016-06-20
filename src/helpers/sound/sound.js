import {Howl} from 'howler'
let map

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
      this.sound = new Howl({
        urls: ['./assets/sounds/1_ATMA_intro.mp3'],
        onend: () => { this.playFollow() }
      }).play();
    }

    playTing() {
      this.sound = new Howl({
        urls: ['./assets/sounds/ting.wav'],
        buffer: true
      }).play();
    }

    playOnOff() {
      this.sound = new Howl({
        urls: ['./assets/sounds/ATMA_DISPARITION.wav'],
        buffer: true,
        volume: 0.5,
      }).play();
    }

    playFollow() {
      this.sound = new Howl({
        urls: ['./assets/sounds/2_ATMA_positionnes_toi.mp3']
      }).play();
    }

    playTransition() {
      this.sound = new Howl({
        urls: ['./assets/sounds/3_ATMA_suis_mes_pas.mp3']
      }).play();
    }

    playEnergy() {
      this.sound = new Howl({
        urls: ['./assets/sounds/4_ATMA_ton_energie.mp3']
      }).play();
    }

    playAlmost() {
      this.sound = new Howl({
        urls: ['./assets/sounds/5_ATMA_continues_on_y_est_presque.mp3']
      }).play();
    }

    playWahou() {
      this.sound = new Howl({
        urls: ['./assets/sounds/6_ATMA_wahou.mp3']
      }).play();
    }

    playMap() {
      map = new Howl({
        urls: ['./assets/sounds/map.wav'],
        buffer: true
      }).play();
    }

    stopMap() {
        map.stop()
    }
}
