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
      //var relTime = humanize.relativeTime(moment("2017-05-19T13:15:00").unix());
      var relTime = humanize.relativeTime(moment(flight.datetime.utc).unix());
      if (getLocale().toLowerCase() == "es") {
        relTime = relTime.replace("just now","ahora mismo");
        relTime = relTime.replace("now","ahora mismo");
        relTime = relTime.replace("second","segundo");
        relTime = relTime.replace("minute","minuto");
        relTime = relTime.replace("hour","hora");
        relTime = relTime.replace("day","día");
        relTime = relTime.replace("in about an","1");
        relTime = relTime.replace("in about a","1");
        relTime = relTime.replace("in ","en ");
      }
      text += __('flights.takeoff') + relTime;
    }
  }
  
  return text;
}

exports.getStatus = getStatus;