var express = require('express');
var path = require('path');
const fs = require('fs')

var cookieParser = require('cookie-parser');
var logger = require('morgan');

module.exports = (app) => {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // app.use(logger('dev'));
  // create a write stream (in append mode) 
  var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
  // setup the logger 
  app.use(logger('combined', {stream: accessLogStream}));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  return app;
}