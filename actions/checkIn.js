var reservationService = require('../services/reservationService.js');

var execute = function (request) {

    var parameters = request.result.parameters;
    var passport = parameters.passport;
    console.log("passport=",passport);
    var reservation = reservationService.getReservation(passport.join(''));
    var text = "Dou you want a specific seat?";
    if (!reservation || reservation.length == 0) {
        text = "You dont have any flight to check in.";
    }
    return {
        text: text
    }

}

exports.execute = execute;