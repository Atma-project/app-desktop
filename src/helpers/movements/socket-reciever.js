import io from 'socket.io-client'

export default class SocketReciever {
    constructor() {

        this.host = 'http://172.18.33.150:3000'
        // this.host = 'http://192.168.1.83:3000'

        this.listeningMovements = false
        this.listeningRemote = false
    }

    init() {
        this.socket = io(this.host)
    }
}
