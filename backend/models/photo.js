const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const photoSchema = new Schema({
  albumId:{
    type: Number,
    required: true
  },
  id:{
    type: Number,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  thumbnail:{
    type: String,
    required: true
  },
  created:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Photo', photoSchema)
