var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.parameters || request.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var text = searchFlightService.getCheaperFlights(from, to, date);
    return {
        text: text,
        context: [{
            name: "flight",
            parameters: parameters
        },
        {
            name: "flights-followup",
            parameters: parameters
        }]
    }
}

exports.execute = execute;