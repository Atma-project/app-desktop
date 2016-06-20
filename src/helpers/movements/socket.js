import io from 'socket.io-client'

export default class Socket {
    constructor() {

    //   this.host = 'http://172.18.33.23:4000'
    //   this.host = 'http://172.18.33.112:4000'
    //   this.host = 'http://192.168.0.12:4000'  //appart de Robin
    //   this.host = 'http://172.18.33.149:4000'
    this.host = 'http://192.168.1.84:4000'  //appart

      this.listening = false
    }

    init() {
        this.socket = io(this.host)
        this.listening = true
    }
}
