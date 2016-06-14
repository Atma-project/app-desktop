import io from 'socket.io-client'

export default class SocketReciever {
    constructor() {

        // this.host = 'http://172.18.33.102:3000' //ecole
        // this.host = 'http://192.168.1.84:3000'  //appart
        this.host = 'http://192.168.0.33:3000'  // maison

    }

    init() {
        this.socket = io(this.host)
    }
}
