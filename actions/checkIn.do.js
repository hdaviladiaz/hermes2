var searchFlightService = require('../services/searchFlightService.js');
var flightUserInfo = require('../actions/flights.info.js')

var execute = function (request) {

    var parameters = request.result.parameters;
    var seat = parameters.seat || "11B";
    return {
        text: "Your flight was checked in. Seat " + seat
    }

}

exports.execute = execute;