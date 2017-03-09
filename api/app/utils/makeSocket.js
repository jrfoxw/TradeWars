/**
 * Created by PY-DEV on 3/3/2017.
 */
import express from 'express';
import socketIO from 'socket.io' ;
import http from 'http'
import DrawMap from './drawMap'
import Logger from 'color-logger';
import fs from 'graceful-fs';
import {encode, decode} from 'node-base64-image';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import moment from 'moment';
import filehound from 'filehound';



 const makeSocket = () => {


  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server);
  const playerFolder = './players/_'+moment().format("MMYY")+'/';
  let playerIds = [];
  let newMap = new DrawMap;
  let roomData = newMap.createPreBuiltRoom();
  let playerNum = 100;
  let isConnected = false;
  let spawn = [[5,2],[7,2],[6,1],[6,3]];
  let spawnPoint = 0;

  let dir = [0,0];
  let playerInfo = {
    socket:{id:10},
    avatar:null,
    player:{
      loc:{posX:4,posY:4},
      hp:_.random(10,40)
    },
    inventory:['knife','shield','bread']

    };

  server.listen(3006);


        let data = "TEST";
        io.on(('connection'), (socket) => {
            isConnected = true;
            socket.status = isConnected;


          //broadcast User connecting..
            socket.broadcast.emit('user connected','System: A user has connected.');

          // add socket to playerIds
            playerInfo.socket.id = socket.id;

            if(!fs.existsSync(playerFolder))
                fs.mkdirSync(playerFolder);

            // find user avatar and assign to user info
            const pfiles = filehound.create()
                .paths('./public/avatars/player_'+playerNum)
                .match('_AVATAR__0*.*')
                .ext('jpg')
                .findSync();

            playerInfo.avatar = "./"+pfiles;


            playerIds.push({
                player:
                 {
                     id:socket.id,
                     number:playerNum,
                     name:"Bob_"+_.random(1000,100000),
                     avatar:playerInfo.avatar
                 }
            });

            playerInfo.playerData = {
                id:socket.id,
                number:playerNum,
                name:"Bob_"+_.random(1000,100000),
                spawn: spawn[spawnPoint]
            };


            playerInfo.player.loc.posX = spawn[spawnPoint][0];
            playerInfo.player.loc.posY = spawn[spawnPoint][1];

            jsonfile.writeFileSync(playerFolder+socket.id+'_.json',playerInfo);
            socket.playerNum = playerNum;
            spawnPoint+=1;

            // create temp player folder

                // Async
                // pfiles.then((files) => {
                //   playerInfo.avatar = files;
                //   jsonfile.writeFileSync(playerFolder+socket.id+'_.json',playerInfo);
                //   console.log('Pfiles: ',files)
                // }).catch((error) =>{ Logger.e('Something went wrong..',error) });

            // Limit to 4 players...
            playerNum > 103 ? playerNum = 100: playerNum+=1;


            // Write socket.id_.JSON to players folder


            Logger.i('Json Player File Created... ',playerInfo,playerFolder);
            Logger.w('Socket Connected');
            Logger.i('Total Players: ',playerIds.length,{playerIds});


            // Add all players ids to (sockets) to roomData.
            // build room..
            roomData.playersIDs = {playerIds};

            newMap.buildRoom(roomData);
            console.log('RD: ',roomData);

            // let newMap = new DrawMap;
            // newMap.buildRoom(newMap.createPreBuiltRoom())

            socket.on('socketid', (data) => {
                console.log(data)
            });



            /**
            MOVE PLAYER
            **/
            socket.on('move', (data) =>{
              newMap = new DrawMap;
              roomData = newMap.createPreBuiltRoom();
              Logger.i('Room Data: ',roomData);




              // Redundant check for players folder
              if(fs.existsSync(playerFolder+socket.id+'_.json')){

                  Logger.i(data.msg, data);

                  let obj = jsonfile.readFileSync(playerFolder+socket.id+'_.json','utf8');
                  let loc = obj.player.loc;

                  // Stop player from moving if a wall or object is encountered.
                  // TODO: Add collision check..
                  if(roomData.room[loc.posX += data.dir[0]][loc.posY += data.dir[1]] == 1){
                    Logger.i('Ran into a wall.. data not updated. ',loc)
                  }else{
                    // If all is clear, update player location..
                    jsonfile.writeFileSync(playerFolder+socket.id+'_.json',obj);
                    obj.player.loc.posX += data.dir[0];
                    obj.player.loc.posY += data.dir[1];
                    Logger.i('Json File Update... ',obj.player.loc)

                  }

              }else{

                jsonfile.writeFileSync(playerFolder+socket.id+'_.json',playerInfo);
                Logger.i('Json Player File Created... ',playerInfo)
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

            if(socket.status && playerIds !== []){
                console.log('Socket Status: ',socket.status);
                console.log('PlayerIds Length in Loop ',playerIds.length);

                let loop = setInterval(() => {
                    if(playerIds.length === 0)
                        clearInterval(loop);
                    let newMap = new DrawMap;
                    let roomData = newMap.createPreBuiltRoom();

                    roomData.playersIDs = {playerIds};
                    roomData.playerData = playerInfo.playerData;

                    // Logger.w('Socket Room Data: ',roomData.room[0])
                    newMap.buildRoom(roomData);

                    // jsonfile.readFile('./public/images/data.json', 'utf8', function(err, playerData){
                    fs.readFile('./public/images/map/game_map.png', function (err, buf) {
                        socket.playerName = playerInfo.playerData.name;
                        socket.emit('loop', {data: buf.toString('base64'), roomData});


                    });

                }, 500);
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
