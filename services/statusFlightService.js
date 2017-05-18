var statusFlightGestor = require('../gestor/statusFlightGestor.js');
var i18n = require('../i18n');
var humanize = require('humanize');
var moment = require('moment');

var getStatus = function (airlineCode, flightNumber, date) {
  var flight = statusFlightGestor.statusFlightHttpRequest(airlineCode, flightNumber, date);
  var text = "";
  if (flight == null) {
    text = __('flights.notfound');
  } else {
    text = __('flights.flightis') + flight.status;
    if (flight.datetime != null) {
      var relTime = humanize.relativeTime(moment(flight.datetime.local).unix());
      console.log(moment(flight.datetime.local).unix());
      text += __('flights.takeoff') + relTime;
    }
  }
  
  return text;
}

exports.getStatus = getStatus;