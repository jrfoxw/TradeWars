import fs from 'graceful-fs'
import jsonfile from 'jsonfile'
import Logger from 'color-logger'
import _ from 'lodash'


class setupGameFile{
  constructor(){
    this.player = "",
    this.gameFolder = './gamefiles/game/data/',

    this.gameInfo = {
      numberPlayers:0,
      usersArray:[],
      random:false,
      room: [],
      gameIds:[]

    };
  }

  createGameFile(player){
      let roomFolder = jsonfile.readFileSync('./gamefiles/map/dungeon/dungeon_grid_data.json','utf8')
      let roomDefault = _.find(roomFolder, function(room) { return room.grid.id == 100 })

      // Logger.w('Room Default info.. ',roomDefault.grid.room)
      this.gameInfo.room = roomDefault.grid.room;

      // Logger.w('Current Game Info, ',this.gameInfo)

      let nPlayer = {
          id:player.socket,
          number: player.number,
          name:player.name, // TODO: change to player name in future.
          avatar:player.avatar,
          location:{posX:player.located.posX, posY:player.located.posY}
      }



      // file should always exist but just in case do a redundant check..
      if(fs.existsSync(this.gameFolder+"game_data_info.json")){
          jsonfile.writeFileSync(this.gameFolder+"game_data_info.json", this.gameInfo);
          this.recordData(player, nPlayer);
        }else{
          Logger.e('Game data file not found... creating..')
          jsonfile.writeFileSync(this.gameFolder+"game_data_info.json", this.gameInfo);
          this.recordData(player, nPlayer);
        }

    }

    // save data to game_data_info
    recordData(player, nPlayer){
      this.gameInfo = jsonfile.readFileSync(this.gameFolder+"game_data_info.json",'utf8')
      let gameids = this.gameInfo.gameIds;
      // check if user number already exists...
      let hasUser = _.find(gameids, function (p) { return p.number == player.number})
      if(hasUser === undefined && this.gameInfo.numberPlayers < 4){
          this.gameInfo.numberPlayers +=1
          Logger.w('User not found.. creating new user: ',player.number)
          this.gameInfo.gameIds.push( nPlayer );
          jsonfile.writeFileSync(this.gameFolder+"game_data_info.json", this.gameInfo);
        }

      this.gameInfo = jsonfile.readFileSync(this.gameFolder+"game_data_info.json",'utf8')
      // Logger.i('Final Game Info.. ',this.gameInfo)
    }
}

export default setupGameFile
