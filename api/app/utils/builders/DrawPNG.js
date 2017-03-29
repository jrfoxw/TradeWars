import 'node-easel';
import Canvas from 'canvas';
import fs from 'graceful-fs';
import _ from 'lodash';
import moment from 'moment';
import winston from 'winston';
import Logger from 'color-logger';
// import makeSocket from './makeSocket';
import Jimp from 'jimp';
import jsonfile from 'jsonfile';
import MapImages from '../mapImages';

let Image = Canvas.Image;




class DrawPNG{
        constructor(gameData, playerInfo){


        this.mapFolder = './gamefiles/map/dungeon/';
        this.roomFolder = './gamefiles/map/'
        this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';

        this.roomObjectsCoords = [];
        this.sizeGridX = 30;
        this.sizeGridY = 30;
        this.spacer = this.sizeGridX +1;
        this.playerLoc = [0,0]


        this.gImages = new MapImages;
        this.roomTiles = [
                          { id:10,   name:'wall top',      src:this.store_walls },
                          { id:11,   name:'wall left',     src:this.store_walls },
                          { id:12,   name:'wall bottom',   src:this.store_walls },
                          { id:13,   name:'wall right',    src:this.store_walls },
                          { id:14,   name:'wall corners',  src:this.store_corner },
                          { id:90,   name:'floor',         src:this.store_floor },
                        ]

        // let roomNum = 0;
        // if(gameData.roomNum != undefined){
        //   roomNum = gameData.roomNum;
        // }


        let room = gameData.room;
        // let playerLoc = playerInfo.located;
        this.players = gameData.gameIds;
        this.player = playerInfo
        // let rows = room[0].length;
        // let cols = room.length;



        // Easeljs setup image builder;

        this.bitmap = 0;


        let Stage = new createjs.Stage;
        let Shape = new createjs.Shape;
        let Graphics = new createjs.Graphics;

        let c = new Canvas(700, 700);
        let ctx = c.getContext('2d');
        let g = new createjs.Graphics();

        let stage = new createjs.Stage(c);


       /*
       *   Cycle through players in play..
       *   and add thisPlayer.avatar to map.
       *
       */



       /**
        * Returns a bitmap after setting position on Canvas
        * and pushing tile data to roomObjectCoords
        *
        * @param {string} image - Image binary(file)
          @param {string} desc   - brief text description of tile
          @param {Array} gridLoc - location on 2D-Grid [x,y]
          @returns {Object}
        */


       const setImage = (image, desc="", gridLoc=[0,0], user=false, bx, by) => {

          this.bitmap = new createjs.Bitmap(image);
          if(user){
            this.bitmap.x = bx;
            this.bitmap.y = by;
          }else{
            this.bitmap.x =  this.sizeGridX;
            this.bitmap.y =  this.sizeGridY;
          }

           this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:desc,gridLoc:gridLoc})

           stage.addChild(this.bitmap);
           if(this.sizeGridX !== 64){
             this.sizeGridX += this.spacer;
           }else{
             this.sizeGridX += this.spacer-5;
           }
           return this.bitmap;
       };


        /*
       *   Cycle through players in play..
       *   and add thisPlayer.avatar to map.
       *
       */

      //  Logger.i('Game Data: ',gameData)
      // console.log('DrawPNG Game Data: \n',gameData)
      // console.log('DrawPNG Room Data: \n',room)

      if(fs.existsSync(this.mapFolder+'game_map.png'))
          fs.unlinkSync(this.mapFolder+'game_map.png');

        let playerFolder = this.playerFolder;
       _.forEach(this.players, (player, index) => {
        //  console.log('Players: ',key,value)
              let borderTextX = 500
              let borderTextY = 40
              // Logger.w('Player: ', player.number);
              playerInfo = jsonfile.readFileSync(playerFolder+player.number+"/"+player.id+"_.json",'utf8');
              let p = playerInfo.located;
              // Logger.w('Player Location: ',p)
              gameData.room[p.posX][p.posY] = playerInfo.number;
              let goldText = new createjs.Text(`Gold: $${playerInfo.gold}`,'15px Helvetica','#dec626')
              let hpText = new createjs.Text(`HP: ${playerInfo.stats.hp} / ${playerInfo.stats.hp}`,'15px Helvetica','#f52015')

              let equipped = new createjs.Text(`Equipped`,'17px Arial','#FFF')
              let equipHandR = new createjs.Text(`Right: ${playerInfo.backpack.weapons}`,'15px Helvetica','#78bfe2')
              let equipHandL = new createjs.Text(`Left: ${playerInfo.backpack.armor}`,'15px Helvetica','#78bfe2')


              goldText.x = borderTextX
              goldText.y = borderTextY
              hpText.x = borderTextX
              hpText.y = borderTextY + 20
              equipped.x = borderTextX+5
              equipped.y = borderTextY + 45
              equipHandR.x = borderTextX+20
              equipHandR.y = borderTextY + 65
              equipHandL.x = borderTextX+20
              equipHandL.y = borderTextY + 85



              stage.addChild(equipped)
              stage.addChild(equipHandR)
              stage.addChild(equipHandL)
              stage.addChild(goldText)
              stage.addChild(hpText)

            });


              // console.log('Room: Player Added..',room)




          // console.log('SOME PLAYER DATA: ',playerInfo)




      //  Logger.w('Drawing Map...')
       _.forEach((room), (value, key) => {
           _.forEach((value), (ivalue, ikey) => {
               switch (ivalue) {
                   case 90:
                       this.bitmap = setImage(this.gImages.store_floor,"store_floor",[key,ikey]);
                       break;
                   case 10:
                       this.bitmap = setImage(this.gImages.store_walls,"wall",[key,ikey]);
                       break;
                   case 11:
                       this.bitmap = setImage(this.gImages.store_walls,"wall",[key,ikey]);
                       break;
                   case 12:
                       this.bitmap = setImage(this.gImages.store_walls,"wall",[key,ikey]);
                       break;
                   case 13:
                       this.bitmap = setImage(this.gImages.store_east_walls,"wall",[key,ikey]);
                       break;
                   case 14:
                       this.bitmap = setImage(this.gImages.store_corner,"corner",[key,ikey]);
                       break
                   case 22:
                       this.bitmap = setImage(this.gImages.dark_jar,"jar",[key,ikey]);
                       break;
                   case 31:
                       this.bitmap = setImage(this.gImages.doorR,"door right",[key,ikey]);
                       break;
                   case 30:
                       this.bitmap = setImage(this.gImages.store_door_left,"door left",[key,ikey]);
                       break;
                   case 32:
                        this.bitmap = setImage(this.gImages.doorN,"door north",[key,ikey]);
                        break;
                   case 33:
                       this.bitmap = setImage(this.gImages.doorS,"door south",[key,ikey]);
                       break;
                   case 20:
                       this.bitmap = setImage(this.gImages.store_counter_bottom,"counter",[key,ikey]);
                       break;
                   case 21:
                       this.bitmap = setImage(this.gImages.store_counter_top,"counter",[key,ikey]);
                       break;
                   case 100:

                       _.forEach(gameData.gameIds, (player, key) =>{
                          //  Logger.i('Player ID Value: ',player, key);
                          //  Logger.i('Number: ',player.number);
                           if(player.number == 100) {
                              // Logger.w('Player Avatar 100: ',player.avatar);
                               let player_100 = new Image();
                               player_100.src = player.avatar;
                               this.bitmap = setImage(player_100,player_100.src,[key,ikey]);

                           }
                        });
                       break;
                   case 101:

                       _.forEach(gameData.gameIds, (player, key) => {
                           let player_101 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (player.number === 101) {
                               player_101.src = player.avatar;
                               this.bitmap = setImage(player_101,player_101.src,[key,ikey]);

                           }
                       });
                       break;
                   case 102:

                       _.forEach(gameData.gameIds, (player, key) => {
                           let player_102 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (player.number === 102) {
                               player_102.src = player.avatar;
                               this.bitmap = setImage(player_102,player_102.src,[key,ikey]);

                           }
                       });

                       break;
                   case 103:

                       _.forEach(gameData.playersIDs.playerIds, (player, key) => {
                           let player_103 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (player.number === 103) {
                               player_103.src = player.avatar;
                               this.bitmap = setImage(player_103,player_103.src,[key,ikey]);

                           }
                       });
                       break;
                   case 99:
                       this.bitmap = setImage(this.gImages.hidden,'empty square',[key,ikey]);
                       break;
                   default:
                       Logger.e('Error with image placement..',ivalue);
                       break;
               }


           });

           this.sizeGridY += this.spacer;
           this.sizeGridX = this.spacer;

           // this.bitmap = setImage(this.gold_coin);

       });


       // Overlays
       this.bitmap = setImage(this.gImages.jar_cracked,'jars',[4,3],true,123,154);
      //  this.bitmap.x = 123;
      //  this.bitmap.y = 154;
      //  this.roomObjectsCoords.push({posX:123,posY:154,tile:"coin",gridLoc:[4,3]});
      //  stage.addChild(this.bitmap);
       //
      //  this.bitmap = new createjs.Bitmap(this.gImages.gold_coin);
      //  this.bitmap.x = 165;
      //  this.bitmap.y = 296;
      //  this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:"coin",gridLoc:[8,4]});
      //  stage.addChild(this.bitmap);


      //  Logger.w('Room Objects: ',this.roomObjectsCoords);

      //  stage.addChild(square);



       stage.update();



      fs.writeFileSync(this.mapFolder+'game_map.png', c.toBuffer());
      jsonfile.writeFileSync(this.mapFolder+'room_map_coords.json',this.roomObjectsCoords);




      createjs.Ticker.halt();

      // v = Logger.d('Map Drawn..');
      // this.writeToLog(v, 'roomLog');

   }
}

   export default DrawPNG;
