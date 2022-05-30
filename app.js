const express = require('express');
const config = require('config');
const morgan = require('morgan');

const { DEV } = require('./constants/app-constants');
const { grasp, errorResHandler, error } = require('./utility/response-utility');

const app = express();
const env = config.get('app.env');

app.use(express.json());
if (env == DEV) {
  app.use(morgan('dev'))
}
app.all('*', grasp(async(req, res, next)=>{
  error('No route found', _404)
}))
app.use(errorResHandler)


module.exports = app;

