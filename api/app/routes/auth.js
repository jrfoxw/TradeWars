import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

// return if user has registered
router.get('/:id', (req, res, next) => {

    const { id } = req.params;
    console.log('Does user exists? ',id);

    User.query({
        where:{id: id}
    }).fetch().then((user) => {
        res.json({success:'User is registered!',user:user});
            }).catch((err) => {
        res.send({error: err});
    });
});


//Authorize User
router.post('/', (req, res) => {
    console.log('Waiting for Auth...', req.params);
    console.log('Request for Auth..., ', req.body);

    const {username, password} = req.body;
    User.query({
        where: { user_name: username }
    }).fetch().then(user =>
    {
        if (bcrypt.compareSync(password, user.get( 'password_digest' ))) {
            // add token
            const token = jwt.sign({
                id: user.get('id'),
                username: user.get( 'user_name' ),
                avatar: user.get('user_avatar'),
                email: user.get('user_email')
            }, config.jwtSecret);

            res.status(200).json({ token })

        } else {
            res.status(401).json( {errors: { error: 'Invalid Credentials' } })
        }
    }).catch(err =>{ res.status(401)
        .json({ msg: 'Invalid Credentials', error: err })})
});


router.put('/:id',(req, res) =>{
    const { id } = req.params;
    const { username, avatar, password, email} = req.body;

    console.log('Update Params: ',req.params);
    console.log('Update information: ',req.body);

    User.forge({ 'id':id })
        .fetch()
        .then((user) =>{
            console.log('Username: ',user.get('user_name'));
        user.save({
            user_name: username || user.get('user_name'),
            user_avatar: avatar || user.get('user_avatar'),
            user_email:  email  || user.get('user_email'),

        },{patch: true}).then((response) =>{
            console.log('Response: ',response);
            res.send({msg: 'User updated ', user: user})
        }).catch((error) =>{

             res.status(401).json({ error: 'Failed: ',errors:error});
        })
    }).catch((err) =>{
        res.status(500).json({msg:'Failed with 500..', error: err })
    });
});

// Remove User from DB
router.delete('/:id',(req,res) =>{

    const { id } = req.params;


    User.forge({id: id})
        .fetch({require: true})
        .then((user) => {
            console.log("Found user for removal!");
            user.destroy()
        })
        .then((result) =>{ res.send({msg:'Success!'})
            })
            .catch((err) =>{ res.send({error:'User not found'})
            })
        .catch((error) =>{
            res.sendStatus(401).json({ error: error })
        })

});

module.exports = router;