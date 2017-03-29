import jsonfile from 'jsonfile';
import Logger from 'color-logger';
import fs from 'graceful-fs';
import _ from 'lodash';
import moment from 'moment';

// builders
import RoomBuilder from '../../utils/roomBuilder';
import DungeonBuilder from '../../utils/dungeonBuilder';
import GameFolders from '../../gamefiles/GameFiles';


/**
 * Takes JSON data created by dungeonBuilder and gives each
 * numbered room a layout through roomBuilder.
*/

class Builder {
  constructor(){


    this.dungeonGrid = []

    /*
      Room Values:
        0-9 : Reserved
        10 = TopWall
        11 = LeftWall
        12 = BottomWall
        13 = RightWall
        14 = Wall Corners
        15 - 19 : Reserved
        20 = store counter 1
        21 = store counter 2
        22 = room jars
        23 = bookshelf
        24 = storage chest
        22-29 : Reserved furniture
        30 = door west
        31 = door east
        32 = door north
        33 = door south
        40 - 60 : Reserved Creatures
        61 - 80 : Reserved NPC's
        // misc
        90 = floor
        99 = Empty spacer



    */
    this.room_store = [
                [99,99,99,99,99,99,99,99,99,99,99,99,99],
                [99,14,10,10,10,10,10,10,10,10,10,14,99],
                [99,11,22,22,90,90,90,90,90,90,90,13,99],
                [99,11,90,90,90,90,90,90,90,90,90,13,99],
                [99,11,90,90,90,90,90,90,90,90,90,13,99],
                [99,11,90,90,90,90,90,21,90,90,90,13,99],
                [99,30,90,90,90,90,90,20,90,90,90,13,99],
                [99,11,90,90,90,90,90,90,90,90,90,13,99],
                [99,11,90,90,90,90,90,90,90,90,90,13,99],
                [99,11,90,90,90,90,90,90,90,90,90,13,99],
                [99,11,22,90,90,90,90,90,90,90,90,13,99],
                [99,14,12,12,12,12,12,12,12,12,12,14,99],
                [99,99,99,99,99,99,99,99,99,99,99,99,99]

       ]
  }


  createDungeon(){
    // let newDungeon = new DungeonBuilder;
    Logger.i("Building Rooms..")
    this.addRooms();
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


      // console.log('MB Room chunked.. ', room,roomBuilder.length,room.length);




      return room;
  };


  // Build rooms for dungeon
  addRooms(){
    Logger.i("Processing Rooms...")
    let gameFolders = new GameFolders;
// TODO: Clear folder /rooms/ when recreating map.
    let dungeonJSON = jsonfile.readFileSync('./gamefiles/map/game_map_layout_dungeon.json')
    Logger.i('DungeonJSON Length Check.. ',dungeonJSON.length)

    _.forEach(dungeonJSON, (row_index, row)=> {
      _.forEach(row_index, (col_index, col)=> {
        // Logger.i(`DungeonJSON X:${row} Y:${col} = ROOM: ${dungeonJSON[row][col]}`)
        if(dungeonJSON[row][col] !== " " && dungeonJSON[row][col] != 100){

          let room = this.createRandomRoom(dungeonJSON[row][col]);
          this.dungeonGrid.push({grid:{id:dungeonJSON[row][col], room}})
          jsonfile.writeFileSync(gameFolders.roomFolder+`game_map_${dungeonJSON[row][col]}.json`, room);
        }else
          if(dungeonJSON[row][col] == 100){
            Logger.i('Creating Start Room..')
            let room = this.room_store
            this.dungeonGrid.push({grid:{id:dungeonJSON[row][col], room}})
            jsonfile.writeFileSync(gameFolders.roomFolder+`game_map_${dungeonJSON[row][col]}.json`, room);
        }
      })
    })



    // console.log("Dungeon Json.. ",dungeonJSON);
    // console.log("Grid layout: ",this.dungeonGrid);
    // _.forEach(this.dungeonGrid, (value, index) => {
      // console.log("Room Layout: ",value.grid.room, index)
      jsonfile.writeFileSync(gameFolders.dungeonFolder+"dungeon_grid_data.json", this.dungeonGrid)
    // })
  }

   storeBuilder(){



    }

}

export default Builder;
