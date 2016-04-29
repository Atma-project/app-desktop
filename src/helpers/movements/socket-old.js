import io from 'socket.io-client';
import Cube from './objects/cube';
let cube = new Cube();

export default class Socket {
  constructor() {
    console.log('socket');

    // this.host = 'http://169.254.128.122:3000';
    this.host = 'http://172.18.34.209:3000';
    this.socket = io( this.host );

    this.init();
  }

  init(){
    this.socket.on('newConnection', (data) => {
      console.log('Connected');
    });

    this.socket.on('event', (data) => {
      console.log('event');
    });

    this.socket.on('disconnect',() => {
      console.log('disconnect');
    });

    this.socket.on('click', function(data){
      //console.log(data);
      cube.getClick(data);
    });

    this.socket.on('acceleration', function(data){
      // console.log(data);
      cube.getAccel(data);
    });

    this.socket.on('orientation', function(data){
      // console.log(data);
      cube.getCoord(data);
    });
  }
}
