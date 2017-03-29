import express from 'express';
import path from 'path' ;
import favicon from 'serve-favicon' ;
import logger from 'morgan' ;
import cookieParser from 'cookie-parser' ;
import bodyParser from 'body-parser' ;
import http from 'http'
import socketIO from 'socket.io' ;
import cors from 'cors' ;
import Canvas from 'canvas';
import Logger from 'color-logger'
import fs from 'graceful-fs'
import jsonfile from 'jsonfile'
import 'node-easel';
import moment from 'moment';


import knex from 'knex' ;
import pg from 'knex';

import index from './routes/index' ;
import users from './routes/users' ;
import login from './routes/auth' ;
import signup from './routes/signup' ;
import players from './routes/players';
import dungeon from './routes/dungeon';
import map from './routes/map';

import DrawMap from  './utils/drawMap';
import RoomBuilder from './utils/roomBuilder';
import DungeonBuilder from './utils/dungeonBuilder';
import Builder from './utils/builders/builder';

import pAvatar from './utils/processAvatar';


let playerFolder = './gamefiles/players/_'+moment().format("MMYY")+'/';
let gameInfo = {
  numberPlayers:0,
  usersArray:[],
  random:false,
  room:[],
  gameIds:[]

};
// initialize game_data_info
if(!fs.existsSync('./gamefiles/game/data/game_data_info.json')){
  jsonfile.writeFileSync('./gamefiles/game/data/game_data_info.json',gameInfo)
}

if(!fs.existsSync(playerFolder)){
  fs.mkdirSync(playerFolder)
}




let nDungeon = new DungeonBuilder;
nDungeon.buildWorldMap();

Logger.i('Loading Builder...')
let builder = new Builder;
builder.createDungeon();



// let nWorld = new BuildWorld;
// nWorld.buildWorldMap();

// let cMap = new MapBuilder;
// cMap.createPng();

// let newMap = new DrawMap;


import Sock from './utils/createSocket'
let sock = new Sock;
sock.playerSocket();

const app = express();


// let avatar = new pAvatar;
// avatar.process('Elven_Ranger_SM.jpg','./public/images','_AVATAR_')
// avatar.process('Halfling_Rogue_SM.jpg','./public/images','_AVATAR_')
// avatar.process('Human_Valkryie_SM.jpg','./public/images','_AVATAR_')
// avatar.process('Dwarven_Warrior_SM.jpg','./public/images','_AVATAR_')




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/gamefiles',express.static(path.join(__dirname, 'gamefiles')));

// test data
app.use('/', index);
app.use('/map', map);
app.use('/api/users', users);
app.use('/api/auth', login);
app.use('/api/signup', signup);
app.use('/api/dungeon', dungeon);
// app.use('/api/players', players);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// let v = new pAvatar;
// v.proccess('Dwarven_Warrior_SM.jpg','./public/images',"_AVATAR_")


module.exports = app;
