var router = require('express').Router();
var i18n = require('./i18n');
var bodyParser = require('body-parser');
var action_manager = require("./actions/action_manager.js");
var searchFlightService = require('./services/searchFlightService.js');
var path = require('path');
var url = require('url');

module.exports = function(app){

  app.use(i18n);
  app.use(bodyParser.json());

  app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/preview.html'));
  });
  app.get('/preview_files/*', function (request, response) {
    var url_parts = url.parse(request.url, true);
    response.sendFile(path.join(__dirname + url_parts.path));
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
