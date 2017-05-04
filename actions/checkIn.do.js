var reservationService = require('../services/reservationService.js');

var execute = function (request) {
    var parameters = request.result.parameters;
    var result = reservationService.book(parameters.seat);
    return {
        text: result
    }

}

exports.execute = execute;