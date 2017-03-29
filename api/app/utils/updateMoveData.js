import jsonfile from 'jsonfile';
import _ from 'lodash';
import fs from 'graceful-fs';
import DrawPNG from './builders/DrawPNG';
import Logger from 'color-logger';
import moment from 'moment';



const updateMoveData = (data, socket, gameInfo) => {

  let player = _.find(gameInfo.gameIds, (p) =>{return p.id == socket.id })

  let playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/'+player.number+'/';

  if(fs.existsSync(playerFolder+socket.id+'_.json')){

      Logger.i(data.msg, data);

      let playerObject = jsonfile.readFileSync(playerFolder+socket.id+'_.json','utf8');
      console.log("Player obj: \n",playerObject)
      let playerLoc = playerObject.located;

      // Stop player from moving if a wall or object is encountered.
      // TODO: Add collision check..
      console.log('Room: ',gameInfo.room)
      console.log('Coords: ',playerLoc)


      let formerTile = [playerLoc.posX,playerLoc.posY]
      let roomTile = gameInfo.room[playerLoc.posX + data.dir[0]][playerLoc.posY + data.dir[1]]
      switch(roomTile){

            case 90: // floor
                // playerObject.located.posX += data.dir[0];
                // playerObject.located.posY += data.dir[1];
                playerObject.located.posX += data.dir[0]
                playerObject.located.posY += data.dir[1]
                jsonfile.writeFileSync(playerFolder+socket.id+'_.json',playerObject);
                gameInfo.room[formerTile[0]][formerTile[1]] = 90
                gameInfo.room[playerObject.located.posX][playerObject.located.posY] = playerObject.number
                _.forEach(gameInfo.gameIds, (target, index) => {
                  if(target.id == socket.id){
                    gameInfo.gameIds[index].location = {posX: playerObject.located.posX , posY: playerObject.located.posY}
                    jsonfile.writeFileSync('./gamefiles/game/data/game_data_info.json', gameInfo)
                  }
                })
                jsonfile.writeFileSync(playerFolder+socket.id+"_.json", playerObject)
                Logger.i('Json File Update... ',playerObject.located);
                break;
            case 10 || 11 || 12 || 13: // wall
                (Logger.i('Ran into a wall.. data not updated. ',playerLoc),'moveLog');
                socket.emit('hit wall',{msg:"hit wall sound.."})
                break;
            case 2 || 3 || 4 || 5: // door
                // writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                socket.emit('door encounter',{msg:"hit door"})
                break;
            case 3:
                // writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                socket.emit('door encounter',{msg:"hit door"})
                break;
            case 4:
                // writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                socket.emit('door encounter',{msg:"hit door"})
                break;
            case 5:
                // writeToLog(Logger.i('Door encounter',playerLoc),'moveLog');
                socket.emit('door encounter',{msg:"hit door"})
                break;
            default: // unkown tile..
                // writeToLog(Logger.e('Tile not recognized...',playerLoc),'moveLog');
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

}



export default updateMoveData;
