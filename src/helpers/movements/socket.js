import io from 'socket.io-client'

export default class SocketReciever {
    constructor() {

        this.host = 'http://172.18.34.209:3000'
        // this.host = 'http://192.168.1.83:3000'

        this.listening = false
        this.sending = false
    }

    init(data) {

    }
}
