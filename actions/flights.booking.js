var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var numbers = parameters.numbers;

    var name = request.result.parameters.name;
    var lastname = request.result.parameters.lastname;
    var passport = request.result.parameters.passport;

    var result = searchFlightService.bookFlight(from, to, date, numbers, name, lastname, passport);
    return {
        text: result.text,
        context: [{
            name: "flight",
            parameters: parameters
        }, {
            name: "flights-followup",
            parameters: parameters
        }]
    }
}

exports.execute = execute;