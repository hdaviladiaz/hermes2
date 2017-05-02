var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var result = searchFlightService.moreFlights(from, to, date, parameters.page);
    parameters.page = result.page;
    parameters.numbers=[];
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