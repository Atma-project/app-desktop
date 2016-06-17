import SocketReciever from 'helpers/movements/movement-manager'

export default class Events {
    constructor() {
        var manageVideo = new Event('manageVideo')
        var goDown = new Event('goDown')
        var hideBlackPlane = new Event('hideBlackPlane')
        var moveSeaweeds = new Event('moveSeaweeds')
        var moveBubble = new Event('moveBubble')
        var showCave = new Event('showCave')
        var showPlanktons = new Event('showPlanktons')
        var blobScene = new Event('blobScene')
        var explodeBlob = new Event('explodeBlob')
        var growLine = new Event('growLine')

        var firstStep = 240
        var secondStep = 270
        var thirdStep = 270
        var fourthStep = 300

        document.addEventListener('manageVideo',  () => {
          this.sound.playIntro()
          this.floor.manageVideo(4)
          setTimeout(function(){
              document.dispatchEvent(goDown);
          }.bind(this), firstStep)

          setTimeout(function () {
              this.sound.playTing()
          }.bind(this), 15000)

          setTimeout(function () {
              this.sound.playOnOff()
          }.bind(this), 7500)

          setTimeout(function () {
              this.sound.playOnOff()
          }.bind(this), 19500)
        }, false)

        document.addEventListener('goDown',  () => {
          this.tween.play()
          document.dispatchEvent(hideBlackPlane)
        }, false)

        document.addEventListener('hideBlackPlane', () => {
          this.sea.hideSea()
          document.dispatchEvent(moveSeaweeds)
          document.dispatchEvent(moveBubble)
        }, false)

        document.addEventListener('moveSeaweeds', () => {
          this.seaweed.speedSeaweeds()
          document.dispatchEvent(showCave)
          this.bubbleEmitter.speed = 0.001
          this.bubble.speedBubble()

          setTimeout(function () {
              this.sound.full()
          }.bind(this), 700);

          setTimeout(function () {
              this.sound.playTransition()
              // this.sound.full()
          }.bind(this), 5000);
        }, false)

        document.addEventListener('moveBubble', () => {
          // todo
        }, false)

        document.addEventListener('showCave', () => {
          document.dispatchEvent(showPlanktons)

          setTimeout(function(){
              this.sea.showCave()
          }.bind(this), secondStep)

        }, false)

        document.addEventListener('showPlanktons', () => {
          setTimeout(function(){
            this.planktons.fakeAnimate()
            TweenMax.to(this.multiPassBloomPass.params, 2, {blendMode: 8.4, ease: Power2.easeOut})
            TweenMax.to(this.planktons.scale, 0, {x: 1, y: 1, z: 1, delay: 0.8, ease: Power2.easeOut})
            this.sea.fakeLight()
            this.planktons.movePlanktons()

            setTimeout(function(){
              document.dispatchEvent(blobScene)
            }.bind(this), thirdStep)

            setTimeout(function(){
                this.sound.playEndPlankton()
            }.bind(this), (thirdStep / 2))

          }.bind(this), secondStep)
        }, false)

        document.addEventListener('blobScene', () => {
            this.sea.blobScene()
            this.floor.changeColor()
            TweenMax.to(this.blob.scale, 2, {x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.3)})
            TweenMax.to(this.multiPassBloomPass.params, 0.1, {blurAmount: 0.0, zoomBlurStrength: 0.0, ease: Power2.easeOut})

            setTimeout(function(){
                this.sound.playSendEnergy()
            }.bind(this), (fourthStep / 2))

            setTimeout(function(){
                document.dispatchEvent(explodeBlob)
            }.bind(this), fourthStep)

        }, false)

        document.addEventListener('explodeBlob', () => {

          TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 11.2, ease: Power2.easeOut})
          TweenMax.to(this.multiPassBloomPass.params, 4, {delay: 4, blurAmount: 0, zoomBlurStrength: 15, ease: Power2.easeOut})

          TweenMax.to(this.blob.scale, 4, {delay: 3, x: 10, y: 10, z: 10, ease: Elastic.easeInOut.config(1, 0.3), onComplete: () => {
              TweenMax.to(this.blob.scale, 2, {x: 0.001, y: 0.001, z: 0.001, ease: Power2.easeOut})
              // TweenMax.to(this.multiPassBloomPass.params, 0, {delay: 4, blendMode: 9.2, ease: Power2.easeOut})
              TweenMax.to(this.multiPassBloomPass.params, 2, {delay: 1, blendMode: 8.4, blurAmount: 0, zoomBlurStrength: 0, ease: Power2.easeOut})
              this.scene.add(this.line)
              this.sound.playExplosion()
          }})

          setTimeout(function(){
              document.dispatchEvent(growLine)
          }.bind(this), 7000)

        }, false)

        document.addEventListener('growLine', () => {
          TweenMax.to(this.line.position, this.fourthStep, {y: -4, ease: Power2.easeOut, onComplete: () => {
            setTimeout(function () {
              if(!SocketReciever.listening) {
                console.log('not listening');
                  SocketReciever.init()
                  SocketReciever.socket.emit('end-app')
              } else {
                console.log('listening');
                 SocketReciever.socket.emit('end-app')
              }
            }, 1000);
          }})
        }, false)

        document.querySelector('.close-button').addEventListener('click', function(){
          document.dispatchEvent(manageVideo);
        }.bind(this))

        // if(!SocketReciever.listening) {
        //   console.log('not listening');
        //     SocketReciever.init()
        //     SocketReciever.socket.emit('test')
        // } else {
        //   console.log('listening');
        //    SocketReciever.socket.emit('test')
        // }

        if (SocketReciever.listening) {
            SocketReciever.socket.on('start-app', () => {
              document.dispatchEvent(manageVideo);
            })
        } else {
            SocketReciever.init()
            SocketReciever.socket.on('start-app', () => {
              document.dispatchEvent(manageVideo);
            })
        }

        // tmp
        setTimeout(function () {
            //document.dispatchEvent(manageVideo);
        }, 1500);
    }
}
