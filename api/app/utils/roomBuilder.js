/**
 *  Builds map and returns png file
 * 
 * 
 * 
 */


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
import MapImages from './mapImages';
let Image = Canvas.Image;




class CreateMap{
    constructor(){

        this.gImages = new MapImages;
        
        this.mapFolder = './gamefiles/map/dungeon/';
        this.roomFolder = './gamefiles/map/dungeon/rooms/'
        this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
        this.roomObjectsCoords = [];
        this.sizeGridX = 32;
        this.sizeGridY = 32;
        this.spacer = this.sizeGridX + 1;
        this.playerLoc = [0,0];
        
    }

    createRandomRoom(roomId)
    {
        let roomBuilder = _.fill(Array(_.random(63,120)), 0);

        // console.log('Initial Room', roomBuilder);

        let room = _.chunk(roomBuilder, _.random(6,12));

        for(let x = 0; x < _.random(10,roomBuilder.length-10); x++){
                
            let room_row = [_.random(0,room.length-1)]
            let room_col = [_.random(0,room[room_row].length-1)]
            // Logger.w('Room[room_row][room_col] == ',room_row, room_col)
            if(room[room_row][room_col] == 0)
                room[room_row][room_col] = 6
        }


        console.log('MB Room chunked.. ', room,roomBuilder.length,room.length);

        // TODO: Clear folder /rooms/ when recreating map.  
        jsonfile.writeFileSync(this.roomFolder+`game_map_${roomId}.json`, room);

        return {room:room};
    };


    createPng(roomData){

    this.bitmap = 0;    
    if(roomData.random == true)
      roomData.room = this.createRandomRoom()
    let room = roomData.room;
    Logger.w(' roomBuilder 87 - RoomData: ',roomData.thisPlayer.located)
    
    roomData.room[roomData.thisPlayer.located.posX][roomData.thisPlayer.located.posY] = roomData.thisPlayer.number
   

    let Stage = new createjs.Stage;
    let Graphics = new createjs.Graphics;
    let c = new Canvas(680, 680);
    let ctx = c.getContext('2d');
    let g = new createjs.Graphics();
    let stage = new createjs.Stage(c);


    const setImage = (image, src="", gridLoc=[0,0]) => {


           this.bitmap = new createjs.Bitmap(image);
           this.bitmap.x = this.sizeGridX;
           this.bitmap.y = this.sizeGridY;
           
           let locx = this.bitmap.x
           let locy = this.bitmap.y
           
           let locxy = locx+"_"+locy
           let tloc = {locxy:{posX:locx,posY:locy,tile:src,gridLoc:gridLoc}}
           this.roomObjectsCoords.push(tloc);
          //  Logger.i('Pushing object.. ',tloc)


           stage.addChild(this.bitmap);
           this.sizeGridX += this.spacer;


           return this.bitmap;
       };

         _.forEach((room), (value, key) => {
            // console.log('roomBuilder 117 = Room: ',room)
            //  console.log('Key, Value',key, value)
           _.forEach((value), (ivalue, ikey) => {
               switch (ivalue) {
                   case 0:
                       this.bitmap = setImage(this.gImages.floor,"floor",[key,ikey]);
                       break;
                   case 1:
                       this.bitmap = setImage(this.gImages.wall,"wall",[key,ikey]);
                       break;
                   case 2:
                       this.bitmap = setImage(this.gImages.doorR,"door right",[key,ikey]);
                       break;
                   case 3:
                       this.bitmap = setImage(this.gImages.doorL,"door left",[key,ikey]);
                       break;
                   case 4:
                        this.bitmap = setImage(this.gImages.doorN,"door north",[key,ikey]);
                        break;
                   case 5:
                       this.bitmap = setImage(this.gImages.doorS,"door south",[key,ikey]);
                       break;
                   case 6:
                       this.bitmap = setImage(this.gImages.hidden,'empty square',[key,ikey]);
                       break;
                   case 100:
                          //  Logger.i('Player ID Value: ',value, key);
                          //  Logger.i('Number: ',value.player.number);
                           if(roomData.thisPlayer.number == 100) {
                              //  Logger.i('Player Avatar 100: ',value.player.avatar);
                               let player_100 = new Image();
                               player_100.src = roomData.thisPlayer.avatar;
                               this.bitmap = setImage(player_100,player_100.src,[key,ikey]);
                           }
                        
                       break;
                   case 101:

                       _.forEach(roomData.gameIds, (value, key) => {
                           let player_101 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (value.player.number === 101) {
                               player_101.src = value.player.avatar;
                               this.bitmap = setImage(player_101,player_101.src,[key,ikey]);

                           }
                       });
                       break;
                   case 102:

                       _.forEach(roomData.gameIds, (value, key) => {
                           let player_102 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (value.player.number === 102) {
                               player_102.src = value.player.avatar;
                               this.bitmap = setImage(player_102,player_102.src,[key,ikey]);

                           }
                       });

                       break;
                   case 103:

                       _.forEach(roomData.gameIds, (value, key) => {
                           let player_103 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (value.player.number === 103) {
                               player_103.src = value.player.avatar;
                               this.bitmap = setImage(player_103,player_103.src,[key,ikey]);

                           }
                       });
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
            this.bitmap = new createjs.Bitmap(this.gImages.gold_coin);
            this.bitmap.x = 66;
            this.bitmap.y = 230;
            this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:"coin",gridLoc:[0,0]});
            stage.addChild(this.bitmap);

            this.bitmap = new createjs.Bitmap(this.gImages.gold_coin);
            this.bitmap.x = 165;
            this.bitmap.y = 296;
            this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:"coin",gridLoc:[8,4]});
            stage.addChild(this.bitmap);

    
            // stage.addChild(square);
            stage.update();

            let game_map = `game_map_${_.random(1000,9000)}.png`

            if(fs.existsSync(this.mapFolder+game_map)){
                fs.unlinkSync(this.mapFolder+game_map);
                fs.writeFileSync(this.mapFolder+game_map, c.toBuffer());
                fs.writeFileSync(this.roomFolder+"game_map.png", c.toBuffer());
            }else{
                fs.writeFileSync(this.mapFolder+game_map, c.toBuffer());
                fs.writeFileSync(this.roomFolder+"game_map.png", c.toBuffer());
            }




            createjs.Ticker.halt();

}


}

export default CreateMap;