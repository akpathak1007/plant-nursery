const express = require('express');
const config = require('config');
const morgan = require('morgan');


const { DEV } = require("./constants/app-constants");
const { _404 } = require("./constants/http-constants");
const { grasp, errorResHandler, error } = require("./utility/response-utility");

/* Router imports */
const adminRouter = require("./routes/admin-routes");
const publicRouter = require('./routes/public-routes');

const app = express();
const env = config.get('app.env');

app.use(express.json());
if (env == DEV) {
  app.use(morgan('dev'))
}

app.use("/api/admin", adminRouter);
app.use('/api/public', publicRouter);

app.all(
  "*",
  grasp(async (req, res, next) => {
    error("No route found", _404);
  })
);
app.use(errorResHandler)

module.exports = app;

