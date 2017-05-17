var _ = require('underscore');

var statusFlight = function (airlineCode, flightNumber, date) {
    var Client = require('node-rest-client').Client;
    var client = new Client();
    client.get("https://www.latam.com/ws/api/flight-status/1.1/rest/airline-code/" + airlineCode + "/flight-number/" + flightNumber + "/standar-time-condition/SCHEDULE/departure-date/" + date + "/language/EN/country/US", function (data, response) {
        if (data.data != null) {
            var flights = data.data.flights;
            if (flights && flights.length != 0) {
                var legs = flights[0].legs;
                if (legs && legs.length != 0) {
                    var obj = legs[0];
                    var result = {status: obj.descriptionStatusCode, datetime: null};
                    if (obj.ontime == 'ontime' && obj.departure != null && obj.departure.blockOff != null && obj.departure.blockOff.scheduleDateTime != null){
                        result.datetime = obj.departure.blockOff.scheduleDateTime;
                    }
                    return result;
                }
            }
        }
        return null;
    });
}

var statusFlightHttpRequest = function (airlineCode, flightNumber, date) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.latam.com/ws/api/flight-status/1.1/rest/airline-code/" + airlineCode + "/flight-number/" + flightNumber + "/standar-time-condition/SCHEDULE/departure-date/" + date + "/language/EN/country/US", false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    var response = JSON.parse(xhr.responseText);
    console.log(response);
    return null;
}

exports.statusFlightHttpRequest = statusFlightHttpRequest;
exports.statusFlight = statusFlight;

