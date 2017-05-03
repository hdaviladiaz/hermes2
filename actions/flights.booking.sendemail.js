var searchFlightService = require('../services/searchFlightService.js');


var execute = function (request) {
    var parameters = request.result.contexts[0].parameters;
    var email = parameters.email;
    return {
        text: "Ok, email was sended to " + email
    }
}

exports.execute = execute;