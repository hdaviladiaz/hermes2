var statusFlightGestor = require('../gestor/statusFlightGestor.js');
var i18n = require('../i18n');

var getStatus = function (airlineCode, flightNumber, date) {
  var flight = statusFlightGestor.statusFlightHttpRequest(airlineCode, flightNumber, date);
  console.log(flight);
  var text = "";
  if (flight == null) {
    text = __('flights.notfound');
  } else {
    text = __('flights.flightis') + flight.status;
    if (flight.datetime != null) {
      var mins = (Date.now - Date.parse(flight.datetime)) / 60000;
      text += __('flights.takeoff') + mins + __('minutes');
    }
  }
  
  return text;
}

exports.getStatus = getStatus;
