var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.contexts[0].parameters;
    var from = parameters.from;
    var to = parameters.to;
    var date = parameters.date;
    var page = parameters.page;
    var numbers = parameters.numbers;
    var text = searchFlightService.getFlightTime(from, to, date,page,numbers);
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