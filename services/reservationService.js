var reservationGestor = require('../gestor/reservationGestor.js');


var getReservation = function (passport) {
  return reservationGestor.getReservation(passport);
}
exports.getReservation = getReservation;