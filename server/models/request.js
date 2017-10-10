const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: String,
  checked: { type: Boolean },
});

module.exports = mongoose.model('Request', requestSchema);