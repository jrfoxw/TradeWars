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
import 'node-easel';


import knex from 'knex' ;
import pg from 'knex';

import index from './routes/index' ;
import users from './routes/users' ;
import login from './routes/auth' ;
import signup from './routes/signup' ;
import players from './routes/players';
import dungeon from './routes/dungeon';

import DrawMap from  './utils/drawMap';
import pAvatar from './utils/processAvatar';

let newMap = new DrawMap;


import sock from './utils/makeSocket'
sock();
const app = express();


// let avatar = new pAvatar;
// avatar.process('Elven_Ranger_SM.jpg','./public/images','_AVATAR_')
// avatar.process('Halfling_Rogue_SM.jpg','./public/images','_AVATAR_')
// avatar.process('Human_Valkryie_SM.jpg','./public/images','_AVATAR_')
// avatar.process('Dwarven_Warrior_SM.jpg','./public/images','_AVATAR_')


// let room = newMap.createPreBuiltRoom();
// Logger.v("Room from App: ",room.length);
// newMap.buildRoom(room);












// const server = http.createServer(app);
// const io = socketIO(server);
// server.listen(3005);


// io.on(('connection'), (socket)=>{
//   console.log('Socket Connected');
//   socket.emit('senddata', {data:"testing"});
//   socket.on('socketid', (data)=>{
//     console.log(data)
//   });
//
//
//
// });




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
app.use('/static',express.static(path.join(__dirname, 'public')));

// test data
app.use('/', index);
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
