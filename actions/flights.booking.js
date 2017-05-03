var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var numbers = parameters.numbers;
    if (!numbers || numbers.length != 1) {
        var event = searchFlightService.createEventRequest("flights.booking", parameters);
        return {
            event: event
        }
    }
    var name = request.result.parameters.name;
    var lastname = request.result.parameters.lastname;
    var passport = request.result.parameters.passport;

    var result = searchFlightService.bookFlight(from, to, date, numbers, name, lastname, passport);
    var response = {
        text: result.text,
    }
    if (!response.booked) {
        response.context = [{
            name: "flight",
            parameters: parameters
        }, {
            name: "flights-followup",
            parameters: parameters
        }]
    }
    return response;
}

exports.execute = execute;