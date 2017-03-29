/**
 * Created by PY-DEV on 2/27/2017.
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

let Image = Canvas.Image;
// let sock =  new makeSocket();



class DrawMap{
        constructor(){



            this.floor = new Image();
            this.floor.src = fs.readFileSync('./public/images/surfaces/pixelfloor2specked32x32.jpg');
            this.wall = new Image();
            this.wall.src = fs.readFileSync('./public/images/surfaces/hollow_wall_32x32.png');
            this.player = new Image();
            // this.player.src = fs.readFileSync('./public/images/_AVATAR__sm.jpg');
            this.doorR = new Image();
            this.doorR.src = fs.readFileSync('./public/images/surfaces/door_r_32x32.png');
            this.doorL = new Image();
            this.doorL.src = fs.readFileSync('./public/images/surfaces/door_l_32x32.png');
            this.doorN = new Image();
            this.doorN.src = fs.readFileSync('./public/images/surfaces/door_t_32x32.png');
            this.doorS = new Image();
            this.doorS.src = fs.readFileSync('./public/images/surfaces/door_b_32x32.png');
            this.hidden = new Image();
            this.hidden.src = fs.readFileSync('./public/images/surfaces/blank_32x32.png');
            this.gold_coin = new Image();
            this.gold_coin.src = fs.readFileSync('./public/images/items/coin_float_32x32.png');


            this.sizexy = 0;
            this.sizeGridX = 32;
            this.sizeGridY = 32;
            this.spacer = this.sizeGridX + 1;
            this.rows = 0;
            this.cols = 0;
            this.playerLoc = [0,0];
            this.pData = [2,2];
            this.roomObjectsCoords = [];


            this.playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
            this.mapFolder = './gamefiles/map/';



        }


   // Game Logs
   writeToLog(data,logName){
     if(fs.existsSync('./logs/'+logName+'.txt')){
       fs.appendFileSync('./logs/'+logName+'.txt',"\n"+data)
     }else{
       fs.writeFileSync('./logs/'+logName+'.txt',data)
     }

   }


   // For testing/Debug
   createPreBuiltRoom(){

        let room1 = [

             [1,1,1,1,1,1,1,1,1,0,1],
             [1,1,1,99,1,1,1,1,1,99,1],
             [1,0,1,1,1,1,0,1,1,0,1],
             [1,0,0,0,0,0,0,1,1,0,1],
             [1,0,0,0,0,0,0,1,1,0,1,1],
             [1,0,0,0,0,0,0,0,0,0,2],
             [1,0,99,0,0,0,1,1,1,1,1],
             [1,0,0,0,0,0,1],
             [1,0,0,0,0,0,1],
             [1,0,0,0,0,0,1]
        ];

       let room2 = [

               [99,99,99,99,99,99,99,99,99,99],
               [99,99,99,99,99,99,99,99,99,99],
               [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
               [1,0,0,0,0,0,0,0,0,0,0,1,1,1],
               [1,0,0,0,0,0,0,0,0,0,0,1,1,1],
               [4,0,0,0,0,0,0,0,0,1,1,1,1,1],
               [1,0,0,0,0,0,0,0,0,0,1,1,1,1],
               [1,1,1,0,0,0,0,0,0,0,0,0,0,1],
               [99,99,1,0,0,0,1,1,1,1,1,1,1],
               [99,99,1,1,3,1,1]
       ];

       let room = [

                [1,9,9,9,9,4,9,9,9,9,1],
                [9,0,0,0,0,0,0,0,0,0,9],
                [9,0,0,0,0,0,0,0,0,0,9],
                [9,0,0,0,0,0,0,0,0,0,9],
                [3,0,0,0,1,0,1,0,0,0,2],
                [9,0,0,0,0,1,0,0,0,0,9],
                [9,0,0,0,1,0,1,0,0,0,9],
                [9,0,0,0,0,0,0,0,0,0,9],
                [9,0,0,0,0,0,0,0,0,0,9],
                [1,9,9,9,9,5,9,9,9,9,1],

       ]

       



        let rows = room[0].length;
        let cols = room.length;
        this.playerLoc = [Math.round(cols/2), Math.round(rows/2)];
        //TODO: Set player JSON to starting location..
        // Logger.w("Current Player Location", this.playerLoc)

        this.writeToLog(Logger.v('Prebuild Room Complete...'),'roomLog');

        return {room:room, playerLoc:{posX:this.playerLoc[0],posY:this.playerLoc[1]}};

    };



   createRandomRoom()
    {
        let roomBuilder = _.fill(Array(_.random(63,120)), 0);

        // console.log('Initial Room', roomBuilder);

        let room = _.chunk(roomBuilder, _.random(6,12));

        // console.log('Room chunked.. ', room,roomBuilder.length,room.length);

        jsonfile.writeFileSync(this.mapFolder+'game_map.json', room);

        return {room:room, playerLoc:{PosX:this.playerLoc[0], posY:this.playerLoc[1]}};
    };


   buildRoom(roomData){
       let roomNum = 0;
       if(roomData.roomNum != undefined){
         roomNum = roomData.roomNum;
       } 
       let room = roomData.room;
       let playerLoc = roomData.playerLoc;
       let players = roomData.playersIDs;
       let playerInfo = {
         socket:{id:10},
         avatar:null,
         player:{
           loc:{posX:4,posY:4},
           hp:_.random(10,40)
         },
         inventory:['knife','shield','bread']

         };



      //  let v = Logger.w("Player Info ",roomData.playersIDs);
      //  this.writeToLog(v, 'roomLog');

      //  Logger.w('RoomData info: ',roomData)

       // Easeljs setup image builder;
       this.sizexy = room.length;
       this.bitmap = 0;
       let rows = room[0].length;
       let cols = room.length;

       let Stage = new createjs.Stage;
       let Shape = new createjs.Shape;
       let Graphics = new createjs.Graphics;

       let c = new Canvas(680, 680);
       let ctx = c.getContext('2d');
       let g = new createjs.Graphics();


      //  g.setStrokeStyle(2)
      //   .beginStroke("#44653B")
      //   .drawRect(140,140,140,140);

       let square = new createjs.Shape(g);

	     square.x = 100;
	     square.y = 100;

       let stage = new createjs.Stage(c);


       // Create arrays of 2 dimensional room
       // _.fill((8), [0,0,0,0,0,0,0,0]);

       // r-l walls
    //    let rWall = _.fill(Array(rows), 1);

    //    room[0] = rWall;
    //    room[cols] = rWall;



       // create vertical walls
    //    _.forEach((room), (value, col) => {
    //        _.forEach((value), (tileValue, row) => {
    //            if (row === 0 || row === value.length - 1 && tileValue === 0) {
    //                room[col][row] = 1;
    //            }
    //        })
    //    });

       /*
       *   Cycle through players and place on board..
       *
       */


       const setImage = (image, src="", gridLoc=[0,0]) => {


           this.bitmap = new createjs.Bitmap(image);
           this.bitmap.x = this.sizeGridX;
           this.bitmap.y = this.sizeGridY;

           this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:src,gridLoc:gridLoc});


           stage.addChild(this.bitmap);
           this.sizeGridX += this.spacer;


           return this.bitmap;
       };



        let playerFolder = this.playerFolder;
       _.forEach(players, function(value,key){
        //  console.log('Players: ',key,value)
          _.forEach(value, function(val, key){
              // Logger.e('Player: ', val, key);
              playerInfo = jsonfile.readFileSync(playerFolder+val.player.id+"_.json",'utf8');
              let p = playerInfo.player.loc;
              room[p.posX][p.posY] = playerInfo.playerData.number;




              // console.log('Room: Player Added..',room)



          });
          // console.log('SOME PLAYER DATA: ',playerInfo)

       });








       _.forEach((room), (value, key) => {
           _.forEach((value), (ivalue, ikey) => {
               switch (ivalue) {
                   case 0:
                       this.bitmap = setImage(this.floor,"floor",[key,ikey]);
                       break;
                   case 1:
                       this.bitmap = setImage(this.wall,"wall",[key,ikey]);
                       break;
                   case 2:
                       this.bitmap = setImage(this.doorR,"door right",[key,ikey]);
                       break;
                   case 3:
                       this.bitmap = setImage(this.doorL,"door left",[key,ikey]);
                       break;
                   case 4:
                        this.bitmap = setImage(this.doorN,"door north",[key,ikey]);
                        break;
                   case 5:
                       this.bitmap = setImage(this.doorS,"door south",[key,ikey]);
                       break;

                   case 20:
                       this.bitmap = setImage(this.gold_coin,"gold coin",[key,ikey]);
                       break;
                   case 100:

                       _.forEach(roomData.playersIDs.playerIds, (value, key) =>{
                          //  Logger.i('Player ID Value: ',value, key);
                          //  Logger.i('Number: ',value.player.number);
                           if(value.player.number === 100) {
                              //  Logger.i('Player Avatar 100: ',value.player.avatar);
                               let player_100 = new Image();
                               player_100.src = value.player.avatar;
                               this.bitmap = setImage(player_100,player_100.src,[key,ikey]);

                           }
                        });
                       break;
                   case 101:

                       _.forEach(roomData.playersIDs.playerIds, (value, key) => {
                           let player_101 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (value.player.number === 101) {
                               player_101.src = value.player.avatar;
                               this.bitmap = setImage(player_101,player_101.src,[key,ikey]);

                           }
                       });
                       break;
                   case 102:

                       _.forEach(roomData.playersIDs.playerIds, (value, key) => {
                           let player_102 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (value.player.number === 102) {
                               player_102.src = value.player.avatar;
                               this.bitmap = setImage(player_102,player_102.src,[key,ikey]);

                           }
                       });

                       break;
                   case 103:

                       _.forEach(roomData.playersIDs.playerIds, (value, key) => {
                           let player_103 = new Image();
                          //  Logger.i('Player ID Value: ',value);
                           if (value.player.number === 103) {
                               player_103.src = value.player.avatar;
                               this.bitmap = setImage(player_103,player_103.src,[key,ikey]);

                           }
                       });
                       break;
                   case 9:
                       this.bitmap = setImage(this.hidden,'empty square',[key,ikey]);
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



       this.bitmap = new createjs.Bitmap(this.gold_coin);
       this.bitmap.x = 66;
       this.bitmap.y = 230;
       this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:"coin",gridLoc:[0,0]});
       stage.addChild(this.bitmap);

       this.bitmap = new createjs.Bitmap(this.gold_coin);
       this.bitmap.x = 165;
       this.bitmap.y = 296;
       this.roomObjectsCoords.push({posX:this.bitmap.x,posY:this.bitmap.y,tile:"coin",gridLoc:[8,4]});
       stage.addChild(this.bitmap);


      //  Logger.w('Room Objects: ',this.roomObjectsCoords);

       stage.addChild(square);
       stage.update();

      //  let sock = new makeSocket();

      //  fs.writeFileSync('./public/images/map/map.png', c.toBuffer(), function () {
      //
      //      Logger.d('File written..')
       //
      //  });

      if(fs.existsSync(this.mapFolder+'game_map.png')){
        fs.unlinkSync(this.mapFolder+'game_map.png');
        fs.writeFileSync(this.mapFolder+'game_map.png', c.toBuffer());
      }else{
        fs.writeFileSync(this.mapFolder+'game_map.png', c.toBuffer());
      }
      // playerObj = jsonfile.readFileSync('./public/images/data.json','utf8')

      createjs.Ticker.halt();

      // v = Logger.d('Map Drawn..');
      // this.writeToLog(v, 'roomLog');

   };

    writeImage() {




    };




  //
  //       // Set player
  //
  //       let grid_center = [Math.round(gridx/2), Math.round(gridy/2)];
  //
  //       // this.room[grid_center[0]][grid_center[1]] = this.player_avatar;
  //
  //
  //       // place gold
  //       // this.placeGold();
  //
  //       // set player position and map into state
  //       // this.setState({player:{px:grid_center[0], py:grid_center[1]}});
  //       // this.setState({room:room});
  //       // console.log('Room State', this.room[2][5]);
  //
  //   };



    // create_room_raw();



    // placeGold(){
    //     // Randomly place gold
    //     for(let goldDeposits = 0; goldDeposits<_.random(2,5); goldDeposits++){
    //         let posX = _.random(1,this.gridx-2);
    //         let posY = _.random(1,this.gridy-2);
    //
    //         console.log('PosX, PosY ',posX,posY);
    //         this.room[Math.round(posX)][Math.round(posY)] =
    //             <Image name="gold"
    //                    key={"gold"+shortU.uuid()}
    //                    src={Images.hidden}
    //                    width="32"
    //                    height="32"
    //                    inline
    //             />
    //     }

    // }




}

export default DrawMap;
