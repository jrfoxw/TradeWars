import express from 'express';
import fs from 'graceful-fs';
import jsonfile from 'jsonfile';
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

    let image = fs.readFileSync('./gamefiles/map/dungeon/game_map.png')
      let pics = {pic: './gamefiles/map/dungeon/game_map.png'}
      res.send(pics);


});


module.exports = router;
