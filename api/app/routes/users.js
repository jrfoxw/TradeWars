const express = require('express');
const router = express.Router();
import User from '../models/user'
import Player from '../models/player'
import bcrypt from 'bcrypt';

// Have Many Players


/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log('Getting All Users');
    new User().fetchAll()
        .then(user => res.send(user.toJSON()))
        .catch(err => res.status(500).json({ error: err }))
});


// router.get('/user/:id', function(req, res){
//     res.send(`User: ${res.params.id} `)
// });



router.post('/players', (req, res) => {
    console.log('PARAMS: ',req.body);
    console.log('Finding users players');
    const { user_id, password } = req.body;

    console.log("U-ID: ",user_id);

    Player.query({ where:{ user_id: user_id }
    }).fetch()
        .then( player => {
            if (bcrypt.compareSync(password, player.get('password_digest'))) {

                new Player().where({user_id: user_id}).fetchAll()
                    .then(user => res.send(user.toJSON()))
                    .catch(err => res.status(500).json({error: err}))
            } else {
                console.log(`Password failed: ${password} <=> ${player.get('password_digest')}`)
            }
        }).catch(( error ) =>{
            res.status(500).json({ error: err })
    })

});

router.post('/create', (req, res) => {
    console.log('PARAMS: ',req.body);
    console.log('Creating new player');
    const { user_id,
            player_name,
            player_class,
            player_avatar,
            player_att,
            player_def,
            player_hp,
            player_mp,
            player_inv,
            player_bio

            } = req.body;

    console.log("U-ID: ",user_id);

    Player.forge({
        user_id: user_id,
        player_name : player_name,
        player_class : player_class,
        player_level: 1,
        player_avatar : player_avatar,
        player_att : player_att,
        player_def : player_def,
        player_hp : player_hp,
        player_mp : player_mp,
        player_inv : player_inv,
        player_bio : player_bio,
        player_quests: {'quest':'001'},
        password_digest: '$2a$10$tHolxEnfszdpZ5dN.tdHmuvEG2zw.DhEipiQzzDqNjT1U1TW6aLnC'


    },{hasTimestamps:true}).save()
        .then( player => res.send(player.toJSON()))
        .catch( error => res.status(500).json({ error: error }));

});


module.exports = router;
