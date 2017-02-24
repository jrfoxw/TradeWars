import _ from 'lodash';

class create_player_dungeon{
    constructor(){
        map_grid_data = {};
        map_grid_loc = [8,8];
        grid_data = {};
        room_value = 99;
    }

    create_room_raw = (show=true, min_size=7, max_size=16) => {

        room_value +=1;
        let sizexy = _.random(min_size, max_size);
        let width = sizexy;
        let height = sizexy;
        let grid = [[_.range(0,width)],[_.range(0,height)]];
        gridx = grid[0].length();
        gridy = grid[1].length();

        console.log(`Grid Size: grid:${grid}  X:${gridx}, Y:${gridy}`);




    }


}
