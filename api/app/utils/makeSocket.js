/**
 * Created by PY-DEV on 3/3/2017.
 */
import express from 'express';
import socketIO from 'socket.io' ;
import http from 'http'
import DrawMap from './drawMap'



class makeSocket{
    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
        this.server.listen(3005);
        this.socket = "";
    }



    init(){
        this.data = "TEST";
        this.io.on(('connection'), (socket) => {
            this.socket = socket;
            console.log('Socket Connected');
            this.socket.on('socketid', (data) => {
                console.log(data)
            });
            this.socket.on('moveLeft', (data) =>{
              console.log('Moving Left...',data);
              // let newMap = new drawMap;
              // let room = newMap.createPreBuiltRoom();
              // newMap.buildRoom(room,data);

            });
            this.socket.on('moveRight', (data) =>{
              console.log('Moving Right...',data);
              let newMap = new drawMap;
              // let room = newMap.createPreBuiltRoom();
              // newMap.buildRoom(room,data);
              // return this.data = data;
            })
        });

        return this.data;
    }

    sendData(data) {
        this.io.on(('connection'), (socket) =>
        {
            socket.emit('test', {data: data});
            console.log('Data sent..');
            socket.on('test2', (data) =>{
                console.log('Data returned.. ',data);
                console.log("ID: ",socket.id);
            })
        })
    }

}

export default makeSocket;
