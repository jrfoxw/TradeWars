/**
 * Created by PY-DEV on 2/23/2017.
 */

// Surfaces
import wall from './wallcorner32x32.jpg';
import floor from './pixelfloor2specked32x32.jpg';
import hidden from './hidden_square_gray_border_32x32.jpg';
import remains from './pixel_floor2_bones_32x32.jpg';

// Effects
import hit from './hit_splatter_32x32.png';

// Items
import goldChest from './chest_gold_32x32.jpg'

// Npc
import npc from './Dwarven_Warrior_SM.jpg'

// Creatures
import goblin_base from './goblin_base_32x32.jpg'
import snake_base from './snake_base_32x32.jpg'
import snake2_base from './snake2_base_32x32.png'
import rat_base from './rat_base_32x32.jpg'
import wolf_base from './wolf_base_32x32.jpg'

const DungeonImages = {

        wall:       wall,
        floor:      floor,
        hidden:     hidden,
        remains:    remains,
        hit:        hit,
        npc:        npc,
        goldChest:  goldChest,
        goblin:     goblin_base,
        snake:      snake_base,
        snake2:     snake2_base,
        rat:        rat_base,
        wolf:       wolf_base
   };

export default DungeonImages;