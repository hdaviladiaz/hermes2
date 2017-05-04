var searchFlightService = require('../services/searchFlightService.js');
var flightUserInfo = require('../actions/flights.info.js')

var execute = function (request) {

    var parameters = request.result.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var numbers = parameters.numbers;

    var name = parameters.name;
    var lastname = parameters.lastname;
    var passport = parameters.passport;
    
    if (!name || !lastname || !passport) {
        var event = flightUserInfo.createEventRequest("flights.booking", parameters);
        return event;
    }
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