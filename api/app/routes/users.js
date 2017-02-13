const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:id', (req, res) => {
  res.send(`Searching for id ${req.params.id}`);
}).then((res) =>{
    // Return user here.
    res.send({ msg:`User found! ${req.params.id}` })
}).catch((err) =>{
    res.send({error:err, msg:'No such user..'});
});

router.post('/user/', (req, res) =>{
  res.send(`Creating User.. ${req.body}`)
}).then((res) =>{
  // Save user here after validating
}).catch((err) =>{
  // Something went wrong..
});



module.exports = router;
