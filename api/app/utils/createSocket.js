import express from 'express';
import socketIO from 'socket.io' ;
import http from 'http';
import Logger from 'color-logger';
import jsonfile from 'jsonfile';
import fs from 'graceful-fs';
import PlayerFile from './builders/setupPlayerFile';
import GameFiles from '../gamefiles/GameFiles';
import _ from 'lodash';
import moment from 'moment';
import GameLoop from './gameLoop';
import getRoomData from './getRoomData';
import updateMoveData from './updateMoveData';




class CreateSocket{
  constructor(){
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
    this.gameFiles = new GameFiles;
    this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
    this.players = 0
    this.chatMessages = [];
    this.playerInfo = "dewey";
    this.data = [];


  }


  userMessages(typeMessage, user, msg, ){
    switch(typeMessage){
    case 1:
      // connect
      return `<div style="margin: 5px; background-color: rgba(138, 118, 135, 0.74); padding: 2px;">${moment().format("MM/D hh:mm:ss")}
                              <span style="color:green">Server:</span>
                              <img class='chatAvatar' width=25 height=25 src="${user.avatar}"/>
                              <i>${user.name}</i> has connected
                            </div>`

      break;
    case 2:
      // disconnect

      return `<div class="disconnect"> ${moment().format("MM/D hh:mm:ss")}
                              <span style="color:green;"> Server: </span>
                              <img class='chatAvatar' width='25' height='25' src="${user.avatar}"/>
                                <i>${user.name}</i> has disconnected
                            </div>`
      break;
      // send message
    case 3:

      return  `<div style="color:black">${moment().format("MM/D hh:mm:ss")}
                              <span style="color:blue">
                                <i>${user.name}</i>
                                <img class='chatAvatar' width=25 height=25 src="${user.avatar}"/>
                              </span>: ${_.last(msg)}
                            </div>`
      break;
    }
  }

  playerSocket(){
    this.server.listen(3005);
    this.io.on(('connection'),(socket) => {
      socket.info = {stuff: 5}
      Logger.v('New Player Connected.. ')
      socket.broadcast.emit('user connected','System: A user has connected.');
      socket.emit('connection :: status','Connected')
      let id = socket.id;
      this.players +=1


      let playerFile = new PlayerFile;
      playerFile.processPlayer(id);

      let gameInfo = jsonfile.readFileSync('./gamefiles/game/data/game_data_info.json','utf8')

      _.forEach(gameInfo.gameIds, (player, index) => {
        Logger.i('Player id: ',player.id)
        Logger.e('Socket id: ',id)
        if(player.id == id){
            !fs.existsSync(this.playerFolder+player.number+"/") ? fs.mkdirSync(this.playerFolder+player.number+"/") : null;


            this.playerInfo = jsonfile.readFileSync(this.playerFolder+player.number+"/"+id+'_.json')
            Logger.i('Found Player!',this.playerInfo)
            let message = this.userMessages(1, this.playerInfo)
            this.chatMessages.push(message)
            this.io.emit('chat-data', {messages:this.chatMessages})
            Logger.i('Players Total: ',this.players)
            return false
        }
      })


      Logger.i('Socket Id: ==> ',id)








      let cMessages = this.chatMessages;
      let io = this.io;
      let playerInfo = this.playerInfo;
      let userDisconnect = this.userDisconnect;


      let gameLoop = new GameLoop;
      gameLoop.mainLoop(socket, gameInfo);

      socket.on('update hp', (data) => {
        playerInfo.stats.hp = data.newhp
        Logger.w('Update HP: ',data)
        jsonfile.writeFileSync(this.playerFolder+playerInfo.number+"/"+id+'_.json', playerInfo)
      });

      socket.on('update name', (data) => {
        playerInfo.name = data.newname
        Logger.w('Update name: ',data)
        jsonfile.writeFileSync(this.playerFolder+playerInfo.number+"/"+id+'_.json', playerInfo)
      });

      socket.on('retrieve room data',(data) =>{
          getRoomData(data, socket, gameInfo);
      })

      socket.on('move', (data) =>{
          Logger.w('Data: ',data)
          updateMoveData(data, socket, gameInfo)
          this.data.push(`is moving on board.. to pos: ${playerInfo.located.posX+=data.dir[0]},${playerInfo.located.posY+=data.dir[1]}`)
          let message = this.userMessages(3, playerInfo, this.data)

          this.chatMessages.push(message)
          this.io.emit('chat-data', {messages:this.chatMessages})

      })


      socket.on('chat', (data) =>{
          Logger.i('Chat Data recieved: ',data)
          this.data = data;
          let message = this.userMessages(3, playerInfo, data)
          this.chatMessages.push(message);
          this.io.emit('chat-data', {messages:this.chatMessages})
      })

      // User disconnected
      let userMessages = this.userMessages
      socket.on('disconnect', function(){
        // Logger.e('Disconnect Chat Messages...', cMessages)
        let message = userMessages(2, playerInfo)
        Logger.e('User disconnected ',message)
        cMessages.push(message)
        io.emit('chat-data', {messages:cMessages})

        Logger.w("User has disconnected: ",socket.id);
            _.forEach(gameInfo.gameIds, (value, key) =>{
                Logger.i('Value, Key ',value,key);
                if(value.id === socket.id){
                    Logger.i('Removing Player, ',value,key);
                    gameInfo.gameIds.splice(key,1);
                    jsonfile.writeFileSync('./gamefiles/game/data/game_data_info.json', gameInfo)
                    return false;
                }
            })
          });

    })
}

}

export default CreateSocket
