var statusFlightGestor = require('../gestor/statusFlightGestor.js');
var i18n = require('../i18n');

var getStatus = function (airlineCode, flightNumber, date) {
  var flight = statusFlightGestor.statusFlightHttpRequest(airlineCode, flightNumber, date);
  var text = "";
  if (flight == null) {
    text = __('flights.notfound');
  } else {
    text = __('flights.flightis') + flight.status;
    if (flight.datetime != null) {
      var mins = (Date.parse(flight.datetime.local) - Date.now()) / 60000;
      text += __('flights.takeoff') + Math.round(mins, 0) + __('minutes');
    }
  }
  
  return text;
}

exports.getStatus = getStatus;