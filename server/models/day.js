const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  date: String
});

module.exports = mongoose.model('day', daySchema);