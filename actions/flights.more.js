var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.parameters || request.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var result = searchFlightService.searchFlights(from, to, date);
    parameters.page = result.page;
    return {
        text: result.text,
        context: [{
            name: "flight",
            parameters: parameters
        }]
    }
}

exports.execute = execute;