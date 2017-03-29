/**
 * Creates a random dungeon complete with rooms and exits.
 *
 *
 *
 *
 */

import 'node-easel';
import Canvas from 'canvas';
import fs from 'graceful-fs';
import _ from 'lodash';
import moment from 'moment';
import Logger from 'color-logger';
import jsonfile from 'jsonfile';
import GameImages from './mapImages';

let Image = Canvas.Image;
class BuildWorld{
        constructor(){
            this.sizeX = 64;
            this.sizeY = 64;
            this.room_number = 100;
            this.world = 0;
            this.mapFolder = './gamefiles/map/';
            this.gImages = new GameImages;
            this.scaledImages = {0.6:"", 0.7:"", 0.8:"", 0.9:""}
            this.scaleRatio = [0.6, 0.7, 0.8, 0.9]
            this.mapObjectCoords = []
            this.playerLocationWorld = 100;
            this.emptyTile = ' '

        }


        buildWorldMap(){

            let worldMapArray = _.fill(Array(400), this.emptyTile);
            let worldMap = _.chunk(worldMapArray, 20);

            // console.log('World Map.. \n',worldMap);

            this.world = worldMap;
            this.addRooms(this.world)
        }

        addRooms(world){

            let bitmap = 0;
            let text = "";
            let text2 = "";


            let tileSizeX = 32;
            let tileSizeY = 32;
            let spacer = tileSizeX+1;

            let Stage = new createjs.Stage;
            let Graphics = new createjs.Graphics;
            let c = new Canvas(980, 980);
            let ctx = c.getContext('2d');
            let g = new createjs.Graphics();
            let stage = new createjs.Stage(c);


            let room_number = 100
            let worldCenterX = Math.round(world.length/2)-1
            let worldCenterY = Math.round(world[0].length/2)-1

            let gridBorders = {north:2, south:world.length-2, west:2, east:world[0].length-2}

            world[worldCenterX][worldCenterY] = 100
            let rooms = [{room_number:{room:100,x:worldCenterX,y:worldCenterY,exits:[]}}]


            const setImage = (image, src="", gridLoc=[0,0], room, locator) =>{


                bitmap = new createjs.Bitmap(image);
                text = new createjs.Text(`${room}`,'15px Helvetica','#FFF')
                text2 = new createjs.Text(`${room}`,'16px Helvetica','#000')

                if(src != "locator"){
                  bitmap.x = tileSizeX;
                  bitmap.y = tileSizeY;
                }else{
                  bitmap.x = locator.posX;
                  bitmap.y = locator.posY;
                }

                text2.x = tileSizeX+5
                text2.y = tileSizeY+5
                text.x = tileSizeX+5;
                text.y = tileSizeY+5;

                if(src != 'empty'){
                  this.mapObjectCoords.push({room:room, posX:bitmap.x,posY:bitmap.y,tile:src,gridLoc:gridLoc});
                  console.log("Map Objects.. ",this.mapObjectCoords)
                  let game_map_coords = 'game_map_layout_coords.json'
                  jsonfile.writeFileSync(this.mapFolder+game_map_coords, this.mapObjectCoords);
                }

                stage.addChild(bitmap);
                stage.addChild(text2)
                stage.addChild(text);
                tileSizeX += spacer;


                return bitmap;
            };

            // create random placement of sections on map
            Logger.i('Creating New Dungeon... Standby...')

            for(let x = 0; x<75; x++){
              let placement = _.random(1,4)

                switch(placement){

                  case 1:
                      // West
                      if(worldCenterY+1 < gridBorders.east && world[worldCenterX][worldCenterY+1] === this.emptyTile)

                      // if(world[worldCenterX][worldCenterY+1] == this.emptyTile)
                        {
                          Logger.w(world[worldCenterX][worldCenterY+1],worldCenterX,worldCenterY+1 )
                          world[worldCenterX][worldCenterY+1] = room_number+=1
                          worldCenterY +=1
                          rooms.push({room_number:{room:room_number,x:worldCenterX,y:worldCenterY,exits:[]}})
                        }
                      break;
                  case 2:

                      if(worldCenterY-1 > gridBorders.west && world[worldCenterX][worldCenterY-1] === this.emptyTile )
                          {
                            Logger.w(world[worldCenterX][worldCenterY-1],worldCenterX-1,worldCenterY )
                            world[worldCenterX][worldCenterY-1] = room_number+=1
                            worldCenterY -=1
                            rooms.push({room_number:{room:room_number,x:worldCenterX,y:worldCenterY,exits:[]}})
                          }
                      break;
                  case 3:

                      if(worldCenterX+1 < gridBorders.south && world[worldCenterX+1][worldCenterY] === this.emptyTile)
                        {
                          Logger.w(world[worldCenterX+1][worldCenterY],worldCenterX+1,worldCenterY )
                          world[worldCenterX+1][worldCenterY] = room_number+=1
                          worldCenterX +=1
                          rooms.push({room_number:{room:room_number,x:worldCenterX,y:worldCenterY,exits:[]}})
                        }
                      break;
                  case 4:

                      if(worldCenterX-1 > gridBorders.north && world[worldCenterX-1][worldCenterY] === this.emptyTile)
                        {
                          Logger.w(world[worldCenterX-1][worldCenterY],worldCenterX-1,worldCenterY )
                          world[worldCenterX-1][worldCenterY] = room_number+=1
                          worldCenterX -=1
                          rooms.push({room_number:{room:room_number,x:worldCenterX,y:worldCenterY,exits:[]}})
                        }
                      break;
                  default:
                      console.log('Huh??')
                }
            }

            // _.forEach(world, function(value,row_index){
            //     _.forEach(value, function(ival, col_index){
            //         if(_.random(1,100) > 70){
            //             world[row_index][col_index] = room_number;
            //             room_number +=1;
            //         }
            //     })
            // })

            // _.forEach(world, function(val, row_index){
            //     // console.log(row_index,val)
            // })
            let gImages = new GameImages;
            let game_map_temp = `game_map_layout_dungeon.json`

            jsonfile.writeFileSync(this.mapFolder+game_map_temp, world);


            // process map tiles to png
            _.forEach(world, function(value, row){
              _.forEach(value, function(ivalue, col){

                if(world[row][col] >= 100){
                  let land = [
                      [gImages.dungeon,'dungeon'],
                      [gImages.forest,'forest'],
                      [gImages.desert,'desert'],
                      [gImages.grass1, 'grass1'],
                      [gImages.grass2, 'grass2']
                  ]
                  let choice = _.random(0,4)
                  bitmap == setImage(land[choice][0],land[choice][1],[row,col], world[row][col])
                }else{
                  bitmap == setImage(gImages.hidden,'empty',[row,col], world[row][col])

                }

              })

              tileSizeY += spacer;
              tileSizeX = spacer;
            })

            // check for connecting rooms..
            const coords = [[+1,0,"S"],[-1,0,"N"],[0,+1,"E"],[0,-1,"W"]]
            let connections = []
            let emptyTile = this.emptyTile
            _.forEach(world, function(row, row_index){
              Logger.i(`World: row_index:${row_index} value:${row}`)

              _.forEach(row, function(col, col_index){
                if(world[row_index][col_index] !== emptyTile && world[row_index][col_index] !== undefined){
                  Logger.v(`Room: ${col}` )

                  _.forEach(coords, function(coord, crow_index){

                    Logger.w(`room: ${world[row_index][col_index]} coord: ${coord}, row_index: ${crow_index}`)

                    if(world[row_index+coord[0]][col_index+coord[1]] > 0 && world[row_index+coord[0]][col_index+coord[1]] < world.length-1) {
                      let roomT = world[row_index+coord[0]][col_index+coord[1]]

                      if(roomT !== emptyTile && roomT !== undefined){


                        Logger.e(`${coord[0]}-${coord[1]} Room Found! ${roomT} at ${row_index+coord[0]},${col_index+coord[1]}`)
                        _.forEach(rooms, function (room, index){
                            if(room.room_number.room == world[row_index][col_index] && roomT !== emptyTile && roomT !== undefined){
                                let dir = {dir:coord[2],room:roomT}
                                room.room_number.exits.push(dir)
                            }
                        })
                      }
                    }
                    })
                }
                // bitmap == setImage(hidden,'empty',[row_index,col_index],'000')
              })


            })
            // _.forEach(rooms,function(room, row_index){
            //     Logger.i('room.. row_index',room,row_index)
            //     _.forEach(coords, function(value, row_index){
            //         Logger.w(`Coord: row_index:${row_index} value:${value}`)
            //         let fromRoom = rooms[row_index]
            //         Logger.v('fromRoom: ',rooms[row_index].room_number.room)
                    // let fromRoomX = fromRoom.room_number.x + value[0]
                    // let fromRoomY = fromRoom.room_number.y + value[1]
                    // if( world[fromRoomX][fromRoomY] !== '.'){
                    //         rooms[row_index].room_number.exits.push(value)
                    //
                    // }
            //     })
            // })

            // Logger.w(rooms)
            // Logger.i(mapObjectCoords)



            let titleText = new createjs.Text(`World Map`,'35px Helvetica','#FFF')
            titleText.x = 600
            titleText.y = 700
            stage.addChild(titleText)

            let mapObjects = jsonfile.readFileSync('./gamefiles/map/game_map_layout_coords.json','utf8')
            let currentRoom = _.find(mapObjects, (object) =>{
                return object.room == this.playerLocationWorld;
            })
            setImage(gImages.locator_overlay,'locator',[currentRoom.gridLoc[0],currentRoom.gridLoc[1]],this.playerLocationWorld,currentRoom)

            stage.update();
            if(fs.existsSync(this.mapFolder+'dungeon_map.png')){
                fs.unlinkSync(this.mapFolder+'dungeon_map.png');
                fs.writeFileSync(this.mapFolder+'dungeon_map.png', c.toBuffer());

            }else{
                fs.writeFileSync(this.mapFolder+'dungeon_map.png', c.toBuffer());
            }




            _.forEach(this.scaleRatio,(value, key) => {
              // create scaled version of full map..
              c = new Canvas(450, 450);
              ctx = c.getContext('2d');
              g = new createjs.Graphics();
              stage = new createjs.Stage(c);

              let scaleImage = new Image();
              scaleImage.src = fs.readFileSync(this.mapFolder+'dungeon_map.png');
              scaleImage.onload = () => {
                let scaleMap = new createjs.Bitmap(scaleImage);
                scaleMap.cache(0,0,scaleImage.width, scaleImage.height, value);

                let scaledMap = new createjs.Bitmap(scaleMap.cacheCanvas);
                stage.addChild(scaledMap);

              }

              scaleImage.onload()
              stage.update();
              fs.writeFileSync(`${this.mapFolder}dungeon_map_scaled_${value}.png`, c.toBuffer());
          });






            createjs.Ticker.halt();
            Logger.i('Dungeon Map Completed..')
        }

    }

export default BuildWorld;
