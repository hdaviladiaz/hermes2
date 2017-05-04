var reservationGestor = require('../gestor/reservationGestor.js');


var getReservation = function(origin, destination, date, passport){
  return reservationGestor.getReservation(origin, destination, date, passport);
}
