var router = require('express').Router();
var i18n = require('./i18n');
var bodyParser = require('body-parser');
var action_manager = require("./actions/action_manager.js");
var searchFlightService = require('./services/searchFlightService.js');
module.exports = function(app){

  app.use(i18n);
  app.use(bodyParser.json());

  app.get('/', function (request, response) {
    response.end('Wellcome to HERMES Assistant API ' + response.__('Hello i18n'));
  });

  app.post('/', function (request, response) {
    setLocale(response, request.body.lang, true);
    //setLocale(response, 'request.body.lang', true);
    action_manager.processRequest(request.body, response);
  });

  app.get('/flights', function (request, response) {
    flights = searchFlightService.searchFlights('a','b','c');
    response.send(flights);
  });


}
