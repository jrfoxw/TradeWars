const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
//   res.send('Test Data..')
  res.render('map', { title: 'Map Data' });
});


module.exports = router;
