import express from 'express';
import path from 'path' ;
import favicon from 'serve-favicon' ;
import logger from 'morgan' ;
import cookieParser from 'cookie-parser' ;
import bodyParser from 'body-parser' ;
import socketIO from 'socket.io' ;
import cors from 'cors' ;

import knex from 'knex' ;
import pg from 'knex';

import index from './routes/index' ;
import users from './routes/users' ;
import login from './routes/auth' ;
import signup from './routes/signup' ;
import players from './routes/players';
import dungeon from './routes/dungeon';



const app = express();

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
app.use(express.static(path.join(__dirname, 'public')));

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

module.exports = app;
