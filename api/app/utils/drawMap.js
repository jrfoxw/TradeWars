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
            this.wall.src = fs.readFileSync('./public/images/surfaces/wallcorner32x32.jpg');
            this.player = new Image();
            // this.player.src = fs.readFileSync('./public/images/_AVATAR__sm.jpg');
            this.doorR = new Image();
            this.doorR.src = fs.readFileSync('./public/images/surfaces/door_r_32x32.png');
            this.hidden = new Image();
            this.hidden.src = fs.readFileSync('./public/images/surfaces/hidden_square_32x32.jpg');


            this.sizexy = 0;
            this.sizeGridX = 32;
            this.sizeGridY = 32;
            this.spacer = this.sizeGridX + 1;
            this.rows = 0;
            this.cols = 0;
            this.playerLoc = [0,0];
            this.pData = [2,2];


            this.playerFolder = './players/_'+moment().format("MMYY")+'/';
            this.mapFolder = './public/images/map/';
            this.player_100 ={img:"",src:""};
            this.player_101 ={img:"",src:""};
            this.player_102 ={img:"",src:""};
            this.player_103 ={img:"",src:""} ;
            this.playerArray = [this.player_100,
                                this.player_101,
                                this.player_102,
                                this.player_103]


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

        let room = [
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
        let rows = room[0].length;
        let cols = room.length;
        this.playerLoc = [Math.round(cols/2), Math.round(rows/2)];
        //TODO: Set player JSON to starting location..
        // Logger.w("Current Player Location", this.playerLoc)

        this.writeToLog(Logger.v('Prebuild Room Complete...'),'roomLog');

        return {room:room, playerLoc:{posX:this.playerLoc[0],posY:this.playerLoc[1]}};

    };
   //
   //
   // static createRandomRoom()
   //  {
   //      let roomBuilder = _.fill(Array(32), 0);
   //
   //      console.log('Initial Room', roomBuilder);
   //
   //      let room = _.chunk(roomBuilder, 6);
   //
   //      console.log('Room chunked.. ', room);
   //
   //      return room;
   //  };


   buildRoom(roomData){

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



       let v = Logger.w("Player Info ",roomData.playersIDs);
       this.writeToLog(v, 'roomLog');

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
       let rWall = _.fill(Array(rows), 1);

       room[0] = rWall;
       room[cols] = rWall;



       // create vertical walls
       _.forEach((room), (value, col) => {
           _.forEach((value), (tileValue, row) => {
               if (row === 0 || row === value.length - 1 && tileValue === 0) {
                   room[col][row] = 1;
               }
           })
       });

       /*
       *   Cycle through players and place on board..
       *
       */


       const setImage = (image) => {


           this.bitmap = new createjs.Bitmap(image);
           this.bitmap.x = this.sizeGridX;
           this.bitmap.y = this.sizeGridY;

           stage.addChild(this.bitmap);
           this.sizeGridX += this.spacer;


           return this.bitmap;
       };



        let playerFolder = this.playerFolder;
       _.forEach(players, function(value,key){
        //  console.log('Players: ',key,value)
          _.forEach(value, function(val, key){
              Logger.e('Player: ', val, key);
              playerInfo = jsonfile.readFileSync(playerFolder+val.player.id+"_.json",'utf8');
              let p = playerInfo.player.loc;
              room[p.posX][p.posY] = playerInfo.playerData.number;




              console.log('Room: Player Added..',room)



          });
          console.log('SOME PLAYER DATA: ',playerInfo)

       });








       _.forEach((room), (value, key) => {
           _.forEach((value), (ivalue, ikey) => {
               switch (ivalue) {
                   case 0:
                       this.bitmap = setImage(this.floor);
                       // this.sizeGridX += this.spacer;
                       break;
                   case 1:
                       this.bitmap = setImage(this.wall);
                       // this.sizeGridX += this.spacer;
                       break;
                   case 2:
                       this.bitmap = setImage(this.doorR);
                       // this.sizeGridX += this.spacer;
                       break;
                   case 100:
                       let player_100 = new Image();
                       _.forEach(roomData.playerIds, (value, key) =>{
                           Logger.i('Player ID Value: ',value);
                           if(value.player.number === 100) {
                               player_100.src = value.player.avatar;
                               this.bitmap = setImage(player_100);

                           }
                        });

                       // this.sizeGridX += this.spacer;
                       break;
                   case 101:
                       let player_101 = new Image();
                       _.forEach(roomData.playerIds, (value, key) => {
                           Logger.i('Player ID Value: ',value);
                           if (value.player.number === 101) {
                               player_101.src = value.player.avatar;
                               this.bitmap = setImage(player_101);

                           }
                       });
                       // this.sizeGridX += this.spacer;
                       break;
                   case 99:
                       this.bitmap = setImage(this.hidden);
                       // this.sizeGridX += this.spacer;
                       break;
                   default:
                       Logger.e('Error with image placement..',ivalue);
                       break;
               }
           });

           this.sizeGridY += this.spacer;
           this.sizeGridX = this.spacer;
       });




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

      v = Logger.d('Map Drawn..');
      this.writeToLog(v, 'roomLog');

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
