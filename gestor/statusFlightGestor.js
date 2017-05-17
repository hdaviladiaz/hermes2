var _ = require('underscore');

var statusFlightHttpRequest = function (airlineCode, flightNumber, date) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.latam.com/ws/api/flight-status/1.1/rest/airline-code/" + airlineCode + "/flight-number/" + flightNumber + "/standar-time-condition/SCHEDULE/departure-date/" + date + "/language/EN/country/US", false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    var response = JSON.parse(xhr.responseText);
    if (response.data != null) {
        var flights = response.data.flights;
        if (flights && flights.length != 0) {
            var legs = flights[0].legs;
            if (legs && legs.length != 0) {
                var obj = legs[0];
                var result = {status: obj.descriptionStatusCode, datetime: null};
                if (obj.flightStatus == 'ontime' && obj.departure != null && obj.departure.blockOff != null && obj.departure.blockOff.scheduleDateTime != null){
                    result.datetime = obj.departure.blockOff.scheduleDateTime;
                }
                return result;
            }
        }
    }
    return null;
}

exports.statusFlightHttpRequest = statusFlightHttpRequest;