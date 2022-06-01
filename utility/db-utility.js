const config = require('config');
const mongoose = require('mongoose');

exports.mongodb = () => {
  try {
    await mongoose.connect(config.get('mongodb.url'), {
      autoIndex: true,
      dbName: nursery
    });
    console.log('Mongo atlas is connected. \n')
  } catch (err) {
    console.log(err);
  }
}