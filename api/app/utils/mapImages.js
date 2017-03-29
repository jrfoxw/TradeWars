import fs from 'graceful-fs';
import Canvas from 'canvas';

class mapImages{
  constructor(){
    let Image = Canvas.Image;


    // dungeons
    this.floor = new Image();
    this.floor.src = fs.readFileSync('./public/images/surfaces/dungeon_floor_32x32.png');
    this.floor2 = new Image();
    this.floor2.src = fs.readFileSync('./public/images/surfaces/dungeon_floor2_32x32.jpg')
    this.floor3 = new Image();
    this.floor3.src = fs.readFileSync('./public/images/surfaces/dungeon_floor3_bones_32x32.jpg')
    this.wall = new Image();
    this.wall.src = fs.readFileSync('./public/images/surfaces/hollow_wall_32x32.png');
    this.wall_corner = new Image();
    this.wall_corner = fs.readFileSync('./public/images/surfaces/wall_corner_32x32.jpg');
    this.player = new Image();
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

    // store
    this.store_walls = new Image();
    this.store_walls.src = fs.readFileSync('./public/images/surfaces/stores/store_walls_7_32x32.png');
    this.store_east_walls = new Image();
    this.store_east_walls.src = fs.readFileSync('./public/images/surfaces/stores/store_walls_7_32x32.png');
    this.store_corner = new Image();
    this.store_corner.src = fs.readFileSync('./public/images/surfaces/hollow_wall_32x32.png');
    this.store_floor = new Image();
    this.store_floor.src = fs.readFileSync('./public/images/surfaces/stores/store_floor_raised_32x32.png')
    this.store_front = new Image();
    this.store_front.src = fs.readFileSync('./public/images/surfaces/stores/store_front_vertical_32x32.png')
    this.store_door_left = new Image();
    this.store_door_left.src = fs.readFileSync('./public/images/surfaces/stores/store_door_left_v2_32x32.png')
    this.store_counter_top = new Image();
    this.store_counter_top.src = fs.readFileSync('./public/images/surfaces/stores/store_counter_top_side_32x32.png')
    this.store_counter_bottom = new Image();
    this.store_counter_bottom.src = fs.readFileSync('./public/images/surfaces/stores/store_counter_bottom_side_32x32.png')


    // items
    this.gold_coin = new Image();
    this.gold_coin.src = fs.readFileSync('./public/images/items/coin_float_32x32.png');
    this.dark_jar = new Image();
    this.dark_jar.src = fs.readFileSync('./public/images/items/room_jars_32x32.png');
    this.dark_jar_shadow = new Image();
    this.dark_jar_shadow.src = fs.readFileSync('./public/images/items/room_jars_shadow_left_32x32.png')
    this.jar_cracked = new Image();
    this.jar_cracked.src = fs.readFileSync('./public/images/items/cracked_jar_32x32.png')

    // overmap
    this.grass1 = new Image();
    this.grass1.src = fs.readFileSync('./public/images/surfaces/overmap/map_grass_32x32.png');
    this.grass2 = new Image();
    this.grass2.src = fs.readFileSync('./public/images/surfaces/overmap/map_grass2_32x32.png');
    this.desert = new Image();
    this.desert.src = fs.readFileSync('./public/images/surfaces/overmap/map_desert_2_32x32.png');
    this.dungeon = new Image();
    this.dungeon.src = fs.readFileSync('./public/images/surfaces/overmap/map_mountains_32x32.png');
    this.forest = new Image();
    this.forest.src = fs.readFileSync('./public/images/surfaces/overmap/map_forest_32x32.png');
    this.locator_overlay = new Image();
    this.locator_overlay.src = fs.readFileSync('./public/images/surfaces/overmap/locator_overlay_32x32.png');

    // shared
    this.hidden = new Image();
    this.hidden.src = fs.readFileSync('./public/images/surfaces/blank_32x32.png');

  }
}

export default mapImages;
