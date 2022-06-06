const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const Plant = mongoose.model('Plant', schema);

module.exports = Plant;