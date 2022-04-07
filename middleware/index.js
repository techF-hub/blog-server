var express = require('express');
var path = require('path');

const logger = require('./logger');
var cookieParser = require('cookie-parser');

module.exports = (app) => {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  logger(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  return app;
}