const express = require('express');
const router = express.Router();

// Have Many Players


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/user/:id', function(req, res){
    res.send(`User: ${res.params.id} `)
});


router.post('/user/', function (req, res){
   res.send(`Creating User.. ${req.body}`)
 });
    // .then((res) =>{
  // Save user here after validating
// }).catch((err) =>{
  // Something went wrong..
// });



module.exports = router;
