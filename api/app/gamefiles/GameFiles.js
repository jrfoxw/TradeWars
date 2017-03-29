import jsonfile from 'jsonfile';
import Logger from 'color-logger';
import fs from 'graceful-fs';
import _ from 'lodash';
import moment from 'moment';

class gameFolders{
  constructor(){
      this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
      this.gameFolder = './gamefiles/game/data/game_data_info.json'
      this.dungeonMapTempFolder = "./gamefiles/map/game_map_layout_dungeon.json"
      this.dungeonFolder = "./gamefiles/map/dungeon/"
      this.roomFolder = "./gamefiles/map/dungeon/rooms/"
      this.mapFolder = './gamefiles/map/dungeon/';




      // Json Read File
      if(fs.existsSync(this.gameFolder))
          this.gameJSON = jsonfile.readFileSync(this.gameFolder,'utf8')
          Logger.i('Game JSON Created... ');

      if(fs.existsSync(this.dungeonJSON))
        this.dungeonJSON = jsonfile.readFileSync(this.dungeonMapTempFolder,'utf8');
        Logger.i('Dungeon JSON Created..')

    }
}

export default gameFolders
