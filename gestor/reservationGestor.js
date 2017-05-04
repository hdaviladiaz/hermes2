var Reservations = require('../model/reservation.js');
var _ = require('underscore');

var getReservation = function (passport) {
  var reservations = new Reservations();
  return _.find(reservations, function (reservation) { return reservation.passport == passport; });
}

exports.getReservation = getReservation;
