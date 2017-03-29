/**
 * Created by PY-DEV on 3/3/2017.
 */
import express from 'express';
import socketIO from 'socket.io' ;
import http from 'http'
import DrawMap from './drawMap'
import RoomBuilder from './roomBuilder'
import Logger from 'color-logger';
import fs from 'graceful-fs';
import {encode, decode} from 'node-base64-image';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import moment from 'moment';
import filehound from 'filehound';
import PlayerFile from './builders/setupPlayerFile'
import GameFiles from '../gamefiles/GameFiles'
import DrawPNG from './builders/DrawPNG'



 const makeSocket = () => {
  // let newMap = new DrawMap;
  let newRoom = new RoomBuilder;
  // const roomType = newMap.createRandomRoom();
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server);


  const playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
  const mapFolder = './gamefiles/map/dungeon/';
  const roomFolder = './gamefiles/map/'
  const dungeonFolder = './gamefiles/map/dungeon/dungeon_grid_data.json'
  let playerIds = [];

  let roomData = [];
  let playerNum = 99;
  let isConnected = false;
  let spawn = [[5,2],[7,2],[6,1],[6,3]];
  let spawnPoint = 0;
  let dir = [0,0];

  let gameInfo = "";
  let playerInfo = "";



  server.listen(3005);

      // create logs..
      const writeToLog = (data,logName) => {
     if(fs.existsSync('./logs/'+logName+'.txt')){
       fs.appendFileSync('./logs/'+logName+'.txt',"\n"+data)
     }else{
       fs.writeFileSync('./logs/'+logName+'.txt',data)
     }

   };

        /**
         * CONNECT SOCKET
         *
         *
         */
        io.on(('connection'), (socket) => {
            isConnected = true;
            socket.status = isConnected;

            //broadcast User connecting..
            socket.broadcast.emit('user connected','System: A user has connected.');

            // Create and process player file/ Game file;
            let id = socket.id
            let playerFile = new PlayerFile;
            playerFile.processPlayer(id)

            // gameInfo = jsonfile.readFileSync('./gamefiles/game/data/game_data_info.json','utf8')
            gameInfo = gameFiles.gameJSON
            Logger.e('GameInfo data: ',gameInfo)
            _.forEach(gameInfo.gameIds, (player, index) => {
              Logger.e('Player Data: ',player)
              Logger.e('Socket id: ',id)
              if(player.id == id){
                  playerInfo = jsonfile.readFileSync(playerFolder+player.id+'_.json')
                  console.log('Found Player!',playerInfo)
              }
            })



            // Limit to 4 players...
            if (playerNum == 103){
              socket.emit('status',{msg:"User limit reached..."})
              Logger.e('User Limit reached...!')
            }else{
              playerNum += 1
            }


            // Write socket.id_.JSON to players folder
            // Logger.i('Json Player File Created... ');
            Logger.w('Socket Connected');
            Logger.i('Total Players: ',gameInfo.gameIds.length);


            // Add all players ids to (sockets) to roomData.
            // build room..
            // roomData.playersIDs = gameInfo.gameIds;
            // roomData.playerInfo = gameInfo.thisPlayer;

            //newMap.buildRoom(roomData);
            // console.log('RD: ',roomData);

            // let newMap = new DrawMap;
            // newMap.buildRoom(newMap.createPreBuiltRoom())

            // Test socket id..
            socket.on('socketid', (data) => {
                console.log("socket id: " ,data)
            });


            socket.on('retrieve room data', (data) =>{
              console.log('Retrieve map data.. ',data)
              let ndata = jsonfile.readFileSync(dungeonFolder,'utf8')
               _.forEach(ndata, (value, index)=>{
                //  console.log(value,index, data.room);

                if(value.grid.id == data.room){
                  // newRoom = new RoomBuilder;
                  console.log('make-socket  - New Room: ',value.grid.room)

                  gameInfo.room = value.grid.room

                  // Logger.w("Room Data: ",gameInfo)

                  newRoom = new DrawPNG(gameInfo, gameInfo.gameIds)
                  // newRoom.createPng(gameInfo)
                  console.log('Room Folder = ',roomFolder)
                  fs.readFile('./gamefiles/map/dungeon/game_map.png', function (err, buf) {
                        socket.emit('loop', {data: buf.toString('base64'), roomData});
                  })
                }
              })
           })

           // Main dungeon map.
            fs.readFile('./gamefiles/map/dungeon_map.png', function (err, buf) {
                        socket.emit('map data', {data: buf.toString('base64'), msg:"connecting map... standby..."});


                    });



            /**
            MOVE PLAYER
            **/
            socket.on('move', (data) =>{
              // newMap = new DrawMap;
            //   roomData = newMap.createPreBuiltRoom();

              // Redundant check for players folder
              if(fs.existsSync(playerFolder+socket.id+'_.json')){

                  Logger.i(data.msg, data);

                  let playerObject = jsonfile.readFileSync(playerFolder+socket.id+'_.json','utf8');
                  console.log("Player obj: ",playerObject)
                  let playerLoc = playerObject.located;

                  // Stop player from moving if a wall or object is encountered.
                  // TODO: Add collision check..
                  console.log('Rooms: ',gameInfo.room)
                  console.log('Coords: ',playerLoc)
                  console.log('Room: ',gameInfo.room[playerLoc.posX][playerLoc.posY])

                  let formerTile = [playerLoc.posX,playerLoc.posY]
                  let roomTile = gameInfo.room[playerLoc.posX += data.dir[0]][playerLoc.posY += data.dir[1]]
                  switch(roomTile){

                        case 0: // floor
                            // playerObject.located.posX += data.dir[0];
                            // playerObject.located.posY += data.dir[1];
                            jsonfile.writeFileSync(playerFolder+socket.id+'_.json',playerObject);
                            gameInfo.room[playerObject.located.posX][playerObject.located.posY] = playerObject.number
                            gameInfo.room[formerTile[0]][formerTile[1]] = 0
                            playerObject.located.posX += data.dir[0]
                            playerObject.located.posY += data.dir[1]
                            // writeToLog(Logger.i('Json File Update... ',obj.player.loc),'moveLog');
                            break;
                        case 1: // wall
                            writeToLog(Logger.i('Ran into a wall.. data not updated. ',playerLoc),'moveLog');
                            socket.emit('hit wall',{msg:"hit wall sound.."})
                            break;
                        case 2 || 3 || 4 || 5: // door
                            writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                            socket.emit('door encounter',{msg:"hit door"})
                            break;
                        case 3:
                            writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                            socket.emit('door encounter',{msg:"hit door"})
                            break;
                        case 4:
                            writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                            socket.emit('door encounter',{msg:"hit door"})
                            break;
                        case 5:
                            writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                            socket.emit('door encounter',{msg:"hit door"})
                            break;
                        default: // unkown tile..
                            writeToLog(Logger.e('Tile not recognized...',playerLoc),'moveLog');
                            break
                  }





              }else{

                jsonfile.writeFileSync(playerFolder+socket.id+'_.json',gameInfo.thisPlayer);
                Logger.i('Json Player File Created... ',gameInfo.thisPlayer)
              }

                // fs.writeFileSync()



              // let newMap = new DrawMap;
              // let roomData = newMap.createPreBuiltRoom();
              // roomData.playersIDs = {playerIds};
              // newMap.buildRoom(roomData);

            });


            socket.on('reset', (data) =>{
              // let newMap = new DrawMap;
              // newMap.buildRoom(newMap.createPreBuiltRoom());
              Logger.d('Reseting..');
              setTimeout(() =>{
                let tdata = encode('./static/images/lmap.png',{string:true,local:true}, (edata)=>{
                    Logger.v('encoding..',edata);
                    socket.emit('reset complete', {data: edata.path});
                });
                Logger.v('encoded..',tdata)


              },2000);
          });

            socket.emit('test', {data: './static/images/lmap.png'});
            Logger.w('Data sent..');
            socket.on('test2', (data) =>{
                Logger.w('Data returned.. ',data);
                Logger.w("ID: ",socket.id);
            });


            /*
             *
             * Game Loop
              */
            // Update map and return player data..

            if(socket.status && gameInfo.gameIds !== []){
                Logger.i('Socket Status: ',socket.status);
                console.log('PlayerIds Length in Loop ',playerIds.length);

                let loop = setInterval(() => {
                    // Check if any players are even connected...
                    if(playerIds.length === 0)
                        clearInterval(loop);

                    new DrawPNG(gameInfo, playerInfo)
                    // let newRoom = new RoomBuilder;
                    // newRoom.createPng(gameInfo)
                    // let roomData = roomType;

                    // roomData.playersIDs = {playerIds};
                    // roomData.playerData = playerInfo.playerData;

                    // Logger.w('Socket Room Data: ',roomData.room[0])
                    // newRoom.createPng({random:false})

                    // jsonfile.readFile('./public/images/data.json', 'utf8', function(err, playerData){
                    fs.readFile(mapFolder+'game_map.png', function (err, buf) {
                        // socket.playerName = playerInfo.playerData.name;
                        socket.emit('loop', {data: buf.toString('base64'), roomData});


                    });

                }, 300);
            }else{
                clearInterval(loop)
            }

            // User disconnected
            socket.on('disconnect', function(){
                isConnected = false;
                Logger.w("User has disconnected: ",socket.id);
                _.forEach(playerIds, (value, key) =>{
                    Logger.i('Value, Key ',value,key);
                    if(value.player.id === socket.id){
                        Logger.i('Removing Player, ',value,key);
                        playerIds.splice(key,1);
                        return false;

                    }

                })



            })
        });


    };

    // sendData(data) {
    //     this.io.on(('connection'), (socket) =>
    //     {
    //         socket.emit('test', {data: data});
    //         console.log('Data sent..');
    //         socket.on('test2', (data) =>{
    //             console.log('Data returned.. ',data);
    //             console.log("ID: ",socket.id);
    //         })
    //     })
    // }


export default makeSocket;
