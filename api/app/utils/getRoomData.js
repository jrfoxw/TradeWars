import jsonfile from 'jsonfile';
import _ from 'lodash';
import fs from 'graceful-fs';
import DrawPNG from './builders/DrawPNG';



const getRoomData = (data, socket, gameInfo) => {
  console.log('Retrieve map data.. ',data)

  let ndata = jsonfile.readFileSync("./gamefiles/map/dungeon/dungeon_grid_data.json",'utf8')
   _.forEach(ndata, (value, index)=>{
    //  console.log(value,index, data.room);

    if(value.grid.id == data.room){
      // newRoom = new RoomBuilder;
      console.log('make-socket  - New Room: ',value.grid.room)

      gameInfo.room = value.grid.room
      jsonfile.writeFileSync('./gamefiles/game/data/game_data_info.json', gameInfo)

      // Logger.w("Room Data: ",gameInfo)

      let newRoom = new DrawPNG(gameInfo, gameInfo.gameIds)
      // newRoom.createPng(gameInfo)
      // console.log('Room Folder = ',roomFolder)
      fs.readFile('./gamefiles/map/dungeon/game_map.png', function (err, buf) {
            socket.emit('loop', {data: buf.toString('base64'), gameInfo});
      })
    }
  })
}
export default getRoomData;
