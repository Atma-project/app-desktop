import io from 'socket.io-client'

export default class Socket {
    constructor() {

        // this.host = 'http://172.18.34.209:3000'
        this.host = 'http://192.168.1.83:3000'
    }

    init(data) {
        this.socket = io(this.host)

        this.socket.on('newConnection', (data) => {
            console.log('connected')

        })

        this.socket.on('disconnect', (data) => {
            console.log('disconnected')
            this.socket.emit('user-disconnected', data)
        })
    }

    sendDeviceOrientation() {
        window.addEventListener('deviceorientation', (event) => {
            this.socket.emit('orientation', {
                'alpha': event.alpha,
                'beta': event.beta,
                'gamma': event.gamma,
                'timeStamp': event.orientationTs
            })
        })
    }

    sendDeviceMotion() {
        window.addEventListener('devicemotion', (event) {
            this.socket.emit('acceleration', {
                'aX': event.acceleration.x,
                'aY': event.acceleration.y,
                'aZ': event.acceleration.z,

                'aGravityX': event.accelerationIncludingGravity.x,
                'aGravityY': event.accelerationIncludingGravity.y,
                'aGravityZ': event.accelerationIncludingGravity.z,

                'rRateX': event.rotationRate.beta,
                'rRateY': event.rotationRate.gamma,
                'rRateZ': event.rotationRate.alpha,

                'interval': event.interval,
                'timeStamp': event.accelerationTs
            })
        })
    }

    pauseGame() {
        this.socket.emit('game-paused')
    }

    activateCoach() {
        this.socket.emit('coach-acvtivated')
    }

    deactivateCoach() {
        this.socket.emit('coach-deactivated')
    }
}