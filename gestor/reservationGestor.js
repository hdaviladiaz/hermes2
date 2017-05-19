var Reservations = require('../model/reservation.js');
var _ = require('underscore');

var getReservation = function (passport, date) {
  var reservations = new Reservations(date);
  return _.find(reservations, function (reservation) { return reservation.passport.toLowerCase() == passport.toLowerCase(); });
}

exports.getReservation = getReservation;
