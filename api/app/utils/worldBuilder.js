/**
 * Creates a random map with various locations.
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

let Image = Canvas.Image;


class BuildWorld{
        constructor(){
            this.sizeX = 64;
            this.sizeY = 64;
            this.room_number = 100;
            this.world = 0;
            this.mapFolder = './gamefiles/map/world';



        }


        buildWorldMap(){

            let worldMapArray = _.fill(Array(260), '.');
            let worldMap = _.chunk(worldMapArray, 20);

            console.log('World Map.. \n',worldMap);

            this.world = worldMap;
            this.addRooms(this.world)
        }

        addRooms(world){
            let room_number = 100

            _.forEach(world, function(value,key){
                _.forEach(value, function(ival, ikey){
                    if(_.random(1,100) > 70){
                        world[key][ikey] = room_number;
                        room_number +=1;
                    }
                })
            })

            _.forEach(world, function(val, key){
                // console.log(key,val)
            })
            let game_map_temp = `game_map_temp_${_.random(1000,9000)}.json`
            jsonfile.writeFileSync(this.mapFolder+game_map_temp, world);
        }
    }

export default BuildWorld;