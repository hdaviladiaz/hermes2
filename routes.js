var router = require('express').Router();
var bodyParser = require('body-parser');
var action_manager = require("./actions/action_manager.js");
var searchFlightService = require('./services/searchFlightService.js');
module.exports = function(app){

  app.use(bodyParser.json());

  app.get('/', function (request, response) {
    response.end('Wellcome to HERMES Assistant API');
  });

  app.post('/', function (request, response) {
    action_manager.processRequest(request.body, response);
  });

  app.get('/flights', function (request, response) {
    flights = searchFlightService.searchFlights('a','b','c');
    response.send(flights);
  });


}
