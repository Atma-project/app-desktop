import SocketReciever from './socket-reciever'
let socket = null

export default (function() {
    return socket != null ? socket : socket = new SocketReciever()
})()
