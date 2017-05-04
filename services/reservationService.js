var reservationGestor = require('../gestor/reservationGestor.js');


var getReservation = function (passport) {
  var reservation = reservationGestor.getReservation(passport);
  var text = "Dou you want a specific seat?";
  if (!reservation || reservation.length == 0) {
    text = "You dont have any flight to check in.";
  }
  return text;
}

var book = function (seat) {
  seat = seat || "11B";
  return "Your flight was checked in. Seat " + seat
}

exports.book = book;
exports.getReservation = getReservation;