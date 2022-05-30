const config = require('config');

const app = require('./app');

const port = config.get('app.port');
const url = config.get('app.url');
const env = config.get('app.env');
app.listen(port, () => {
  console.log(`Application is running on ${env} env at ${url}:${port}. \n`);
})

