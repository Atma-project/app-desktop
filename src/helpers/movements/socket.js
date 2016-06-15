import io from 'socket.io-client'

export default class Socket {
    constructor() {

      this.host = 'http://172.18.33.23:3000'
    //   this.host = 'http://192.168.1.84:3000'  //appart

      this.listening = false
    }

    init() {
        this.socket = io(this.host)
        this.listening = true
    }
}
