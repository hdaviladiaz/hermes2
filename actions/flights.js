var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.parameters || request.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var text = searchFlightService.searchFlights(from, to, date);
    parameters.page = 10;
    return {
        text: text,
        context: [{
            name:"flight",
            parameters:parameters
        }]
    }
}

exports.execute = execute;