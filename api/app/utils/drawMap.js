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
import makeSocket from './makeSocket';
import Jimp from 'jimp';

let Image = Canvas.Image;
let sock =  new makeSocket();



class DrawMap{
        constructor(){

            // this.c = new Canvas(980, 580);
            // this.ctx = this.c.getContext('2d');
            // this.g = new createjs.Graphics();
            //
            // this.Stage = new createjs.Stage;
            // // this.Shape = new createjs.Shape;
            // this.Graphics = new createjs.Graphics;
            //
            // this.circle = new createjs.Shape(this.g);
            // this.square = new createjs.Shape(this.g);



            this.floor = new Image();
            this.floor.src = fs.readFileSync('./public/images/surfaces/pixelfloor2specked32x32.jpg');
            this.wall = new Image();
            this.wall.src = fs.readFileSync('./public/images/surfaces/wallcorner32x32.jpg');
            this.player = new Image();
            this.player.src = fs.readFileSync('./public/images/_AVATAR__sm.jpg');
            this.doorR = new Image();
            this.doorR.src = fs.readFileSync('./public/images/surfaces/door_r_32x32.png');


            this.sizexy = 0;
            this.sizeGridX = 32;
            this.sizeGridY = 32;
            this.spacer = this.sizeGridX + 1;
            this.rows = 0;
            this.cols = 0;
            this.playerLoc = [0,0]


        }



   createPreBuiltRoom(){

        let room = [
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,1,0],
                 [0,0,0,0,0,0,0,1,1,1],
                 [0,0,0,0,0,0,0,0,0,2],
                 [0,0,0,0,0,0,0,1,1,1],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]
        ];

        return room;

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


   buildRoom(room, player){




       this.sizexy = room.length;
       this.bitmap = 0;
       let rows = room[0].length;
       let cols = room.length;

       let Stage = new createjs.Stage;
       let Shape = new createjs.Shape;
       let Graphics = new createjs.Graphics;

       let c = new Canvas(980, 580);
       let ctx = c.getContext('2d');
       let g = new createjs.Graphics();


      //  g.setStrokeStyle(2)
      //   .beginStroke("#44653B")
      //   .drawRect(140,140,140,140);

       let square = new createjs.Shape(g);

	     square.x = 100;
	     square.y = 100;

       let stage = new createjs.Stage(c);
       stage.addChild(square);
       stage.update();


       fs.writeFile('./public/images/zmap.png', c.toBuffer(), function () {
           createjs.Ticker.halt();
           sock.sendData('./static/images/zmap.png');
       });


       // Create arrays of 2 dimensional room
       // _.fill((8), [0,0,0,0,0,0,0,0]);
       let rWall = _.fill(Array(rows), 1);



       let playerLoc = [Math.round(_.random(2, cols-2)), Math.round(_.random(2, rows-2))];

       console.log('Data recieved... ',player);

       room[0] = rWall;
       room[cols] = rWall;

      //  setTimeout(() =>{


      //  },1000)


       console.log('Horz walls set: ', room, playerLoc);


       // create vertical walls
       _.forEach((room), (value, col) => {
           _.forEach((value), (tileValue, row) => {
               if (row === 0 || row === value.length - 1 && tileValue === 0) {
                   room[col][row] = 1;
               }
           })
       });

       room[playerLoc[0]][playerLoc[1]] = 5;


       const setImage = (image) => {


               this.bitmap = new createjs.Bitmap(image);
               this.bitmap.x = this.sizeGridX;
               this.bitmap.y = this.sizeGridY;

               stage.addChild(this.bitmap);



           return this.bitmap;
       };


       console.log("Empty Room: \n", room);


       _.forEach((room), (value, key) => {
           _.forEach((value), (ivalue, ikey) => {
               switch (ivalue) {
                   case 0:
                       this.bitmap = setImage(this.floor);
                       this.sizeGridX += this.spacer;
                       break;
                   case 1:
                       this.bitmap = setImage(this.wall);
                       this.sizeGridX += this.spacer;
                       break;
                   case 2:
                       this.bitmap = setImage(this.doorR);
                       this.sizeGridX += this.spacer;
                       break;
                   case 5:
                       this.bitmap = setImage(this.player);
                       this.sizeGridX += this.spacer;
                       break;
                   default:
                       console.log('Error with image placement..');
                       break;
               }
           });

           this.sizeGridY += this.spacer;
           this.sizeGridX = this.spacer;
       });




       stage.addChild(square);
       stage.update();


       fs.writeFile('./public/images/lmap.png', c.toBuffer(), function () {
           createjs.Ticker.halt();
           sock.sendData('./static/images/lmap.png');

       });
       console.log('Map Drawn..')

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
