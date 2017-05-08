var reservationService = require('../services/reservationService.js');

var execute = function (request) {

    var parameters = request.result.parameters;
    var passport = parameters.passport;
    var reservation = reservationService.getReservation(passport.join(''));
    return {
        text: reservation
    }

}

exports.execute = execute;