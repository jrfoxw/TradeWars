/**
 * Created by jrfoxw on 2/13/17.
 */
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import _ from 'lodash';

let router = express.Router();
// Create new user functions

router.get('/', (req, res, next) => {
   console.log('Getting SignUp');
    new User().fetchAll()
        .then(user => res.send(user.toJSON()))
        .catch(err => res.status(500).json({ error: err }))
        });

router.post('/', (req, res) => {
    console.log('Waiting for user SignUp...');
    console.log('User sign up info, ', req.body.user);

    const {username, avatar, password} = req.body.user;
    const password_digest = bcrypt.hashSync(password, 10);

    // TODO: Remove and replace with real email info
    // TODO: Add Validation

    const email = "no email"+_.random(10,404040);

    console.log('password_digest: ', password_digest);

    new User({
        user_name:username,
        user_email:email,
        user_avatar:avatar,
        password_digest:password_digest
    }, {hasTimestamps: true}).save()
        .then(user => res.json({success: true}))
        .catch(err => res.status(500).json({error: err.detail} ));


});

// router.post('/', function(req,res){
//    console.log('Response: ',res);
//    console.log('Request: ',req.body)


// });

module.exports = router;