const config = require('config');
const mongoose = require('mongoose');

const app = require('./app');

const port = config.get('app.port');
const url = config.get('app.url');
const env = config.get('app.env');

/* Connect to Mongo Atlas */
mongoose.connect(config.get('mongodb.url'), {
  autoIndex: true,
  dbName: 'nursery',
  maxPoolSize: 10
}).then((value) => {
  console.log('Mongodb is connected...\n')
}).catch(err => {
  console.log(err);
})

app.listen(port, () => {
  console.log(`Application is running on ${env} env at ${url}:${port}.`);
})

