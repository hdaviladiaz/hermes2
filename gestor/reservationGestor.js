var Reservations = require('../model/reservation.js');

var getReservation = function(origin, destination, date, passport){
  return new Reservations(origin, destination, date, passport)
}
