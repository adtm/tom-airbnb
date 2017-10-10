const RequestModel = require('../models/request');
const requestJSON = require('../data/requests.json');

function createDefaultRequests(req, res) {
  requestJSON.requests.map(request => {
    RequestModel
      .create(request)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  });
}

function getRequests(req, res) {
  RequestModel
    .find()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
}

module.exports = {
  createDefaultRequests,
  getRequests
}