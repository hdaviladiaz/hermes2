var reservationGestor = require('../gestor/reservationGestor.js');
var i18n = require('../i18n');

var getReservation = function (passport) {
  var reservation = reservationGestor.getReservation(passport);
  var text = __('reserve.questions.seat');
  if (!reservation || reservation.length == 0) {
    text = __('reserve.no_check_in');
  }
  return text;
}

var book = function (seat) {
  seat = seat || "11B";
  return " " +__('reserve.success_check_in') + " " + seat;
}

exports.book = book;
exports.getReservation = getReservation;
