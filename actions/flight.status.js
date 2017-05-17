var statusFlightService = require('../services/statusFlightService.js');


var execute = function (request) {
    var parameters = request.result.parameters || request.contexts[0].parameters;
    var airlineCode = parameters.airlineCode;
    var flightNumber = parameters.flightNumber;
    var date = parameters.date;
    var text = statusFlightService.getStatus(airlineCode, flightNumber, date);
    //parameters.numbers = [1];
    return {
        text: text
    }
}

exports.execute = execute;