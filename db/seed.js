const mongoose = require('mongoose')
const pics = require('../data/photos.json')

mongoose.connect('mongodb://localhost:27017/jsonplaceholder', {
  useMongoClient: true
})

const db = mongoose.connection;

const seed = entries => db.collection('photos').insert(entries)

seed(pics)

mongoose.disconnect()

module.exports = seed
