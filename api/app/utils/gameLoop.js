import DrawPNG from './builders/DrawPNG'
import jsonfile from 'jsonfile'
import Logger from 'color-logger'
import moment from 'moment'
import fs from 'graceful-fs'
import _ from 'lodash'

class GameLoop{
  constructor(){
    this.mapFolder = './gamefiles/map/dungeon/';
    this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
    this.scaleRatio = ["0.6", "0.7", "0.8", "0.9"];

    // this.scaledImagesData = {"map_0.6":"","map_0.7":"","map_0.8":"","map_0.9":""}


  }

  mainLoop(socket, gameInfo){
    // let gameInfo = jsonfile.readFileSync('./gamefiles/game/data/game_data_info.json','utf8')



    if(gameInfo.gameIds !== []){
        Logger.i('Socket Status: ',socket.connected);
        console.log('Total players in loop ',gameInfo.gameIds.length);
        this.playerInfo = "";
        this.loop = setInterval(() => {
            // Check if any players are even connected...
            if(gameInfo.gameIds.length === 0){
                Logger.e('Empty Ids, ending loop..')
                clearInterval(this.loop);
              }
            _.forEach(gameInfo.gameIds, (player, index) => {
                this.playerInfo = jsonfile.readFileSync(this.playerFolder+player.number+"/"+player.id+"_.json",'utf8')
                // console.log('Player Info.. ',this.playerInfo)
                // Logger.v('Reading player data from JSON... ',player.number)
                new DrawPNG(gameInfo, this.playerInfo)
                socket.emit('playerInfo', {player:this.playerInfo})
                let tempImage = fs.readFileSync(this.mapFolder+'game_map.png');
                socket.emit('move', {image:  tempImage.toString('base64')})
            })
            // let newRoom = new RoomBuilder;
            // newRoom.createPng(gameInfo)
            // let roomData = roomType;

            // roomData.playersIDs = {playerIds};
            // roomData.playerData = playerInfo.playerData;

            // Logger.w('Socket Room Data: ',roomData.room[0])
            // newRoom.createPng({random:false})

            // jsonfile.readFile('./public/images/data.json', 'utf8', function(err, playerData){

              let scaledImagesData = {}
            _.forEach(this.scaleRatio, (ratio, key) => {
              fs.readFile(`./gamefiles/map/dungeon_map_scaled_${ratio}.png`, function (err, buf){
                // console.log('Buffer: ',buf)
                let buffer = buf.toString('base64');
                scaledImagesData[`map_${ratio}`] = buffer;

              })

             })
            // fs.readFile('./gamefiles/map/dungeon_map_scaled_0.7.png', function (err, buf){
            //   this.scaledImagesData."map_0.7" = buf.toString('base64');
            // })
            //
            // fs.readFile('./gamefiles/map/dungeon_map_scaled_0.9.png', function (err, buf){
            //   this.scaledImagesData."map_0.9" = buf.toString('base64');
            // })
            //




            fs.readFile(this.mapFolder+'game_map.png', function (err, buf) {
                // Logger.v('Returning map Data.. ', this.playerInfo);
                // socket.playerName = playerInfo.playerData.name;
                socket.emit('loop', {room: buf.toString('base64'), map: scaledImagesData});
              })
                // Logger.v('Returning map Data.. ');
                // socket.playerName = playerInfo.playerData.name;
                // socket.emit('loop', {room: buf.toString('base64')});
            // });

        }, 300);
    }else{
        clearInterval(this.loop)
    }
  }
}

export default GameLoop;
