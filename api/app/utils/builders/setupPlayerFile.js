import fs from 'graceful-fs';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import moment from 'moment';
import filehound from 'filehound';
import Logger from 'color-logger';
import GameData from './setupGameFile';

class setupPlayerFile{
    constructor(){
      this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
      this.dungeonFolder = './gamefiles/map/dungeon/temp_data.json'
      this.gameFolder = './gamefiles/game/data/'
      this.playerNum = 1;
      this.spawn = [[5,3],[7,2],[6,1],[6,3]];
      this.spawnPoint = 0;

      this.playerInfoJson = {
          name:"",
          number: 100,
          socket:{id:0},
          avatar:null,
          located:{},
          stats:{hp:_.random(10,40),xp:0,att:1,def:1,mag:20},
          gold: 100,
          backpack:{weapons:['small-knife'],armor:['small-buckler'],items:['bread'],potions:['light heal']},
          spawn:{posx:5,posy:3}
        }
    }


   processPlayer(socket){

    // redundant check for file
    if(fs.existsSync(this.gameFolder)){
      Logger.i('Found Game Data')
      gameData = jsonfile.readFileSync(this.gameFolder+'game_data_info.json')
      Logger.i(`Number Players: ${gameData.numberPlayers} Player Number: ${this.playerInfoJson.number}`)
      this.playerInfoJson.number = gameData.numberPlayers + this.playerInfoJson.number;
      Logger.i('Updated player number .. ',this.playerInfoJson.number)
    }


    // if player does not have an established profile create a folder..
    if(!fs.existsSync(this.playerFolder+this.playerInfoJson.number+"/")){
      Logger.e('Directory not found, ',this.playerFolder+this.playerInfoJson.number)
        fs.mkdirSync(this.playerFolder+this.playerInfoJson.number+"/");
      }

    // find user avatar and assign to user profile SYNC

    const pfiles = filehound.create()
        .paths('./public/avatars/player_'+this.playerInfoJson.number)
        .match('_AVATAR__0*.*')
        .ext('jpg')
        .findSync();

    // add player avatar to profile
    this.playerInfoJson.avatar = "./"+pfiles;
    Logger.w('Socket id: <===',socket)
    this.playerInfoJson.socket = socket
    this.playerInfoJson.name = "Bob_"+_.random(1000,9000);

     // add player id to playerInfo that includes spawn point.
    this.playerInfoJson.spawn = this.spawn[this.spawnPoint]

    this.playerInfoJson.located.posX = this.spawn[this.spawnPoint][0];
    this.playerInfoJson.located.posY = this.spawn[this.spawnPoint][1];

    // write player data to temp JSON file.
    jsonfile.writeFileSync(this.playerFolder+"/"+this.playerInfoJson.number+"/"+socket+'_.json',this.playerInfoJson);

    // add to player number current limit 4..
    this.spawnPoint+=1;
    Logger.i('Player Info JSON: ',this.playerInfoJson);



    // write game info file.
    // jsonfile.writeFileSync(this.gameFolder+"game_data_info.json", this.gameInfo);
    // let gInfo = jsonfile.readFileSync(this.gameFolder+"game_data_info.json",'utf8')

      Logger.i('Json Player File Created... ');
      let gameData = new GameData;
      gameData.createGameFile(this.playerInfoJson);
   }
}

export default setupPlayerFile;
