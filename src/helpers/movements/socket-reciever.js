import io from 'socket.io-client'

export default class SocketReciever {
    constructor() {

        // this.host = 'http://172.18.33.102:3000'
        this.host = 'http://192.168.0.12:3000'

    }

    init() {
        this.socket = io(this.host)
    }
}
