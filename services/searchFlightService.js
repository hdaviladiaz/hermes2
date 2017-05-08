var _ = require('underscore');
var humanize = require('humanize');
var moment = require('moment');
var searchFlightGestor = require('../gestor/searchFlightGestor.js');
var i18n = require('../i18n');

var searchFlights = function (origin, destination, date) {
  var momentDate = moment(date, "YYYY-MM-DD");
  var flight = searchFlightGestor.searchFlights(origin, destination, date, 1, 2);
  var text = __('flights.empty');
  if (!flight || !flight.trips || flight.trips.length == 0) {
    return text
  }
  text = __('flights.found') + " " + flight.pagination.count + " " + __('flights.flights') + " " + __('prepositions.for_a') + " "
    + translateDay(humanize.naturalDay(momentDate.unix())) + " " + __('prepositions.from') + " " + origin + " " + __('prepositions.to') + " " + destination + ". ";
  _.each(flight.trips, function (trip, index) {
    text += __('prepositions.the_a') + " " + __('prepositions.option') + " " + (index + 1) + " " + __('prepositions.cost') + " " + trip.price + " " + flight.currency + ". ";
  })
  return text;
}

var moreFlights = function (origin, destination, date, page) {
  page = parseInt(page);
  var flight = searchFlightGestor.searchFlights(origin, destination, date, page + 1, 2);
  var text = __('flights.nomore');
  if (flight.trips && flight.trips.length > 0) {
    page = page + 1;
    text = "";
    _.each(flight.trips, function (trip, index) {
      text += __('prepositions.the_a') + " " + __('prepositions.option') + " " + (index + 1 + (flight.pagination.page - 1) * 2) + " " + __('prepositions.for') + " " + trip.price + " " + flight.currency + ". ";
    })
  }
  return {
    text: text,
    page: page
  };
}

var previousFlights = function (origin, destination, date, page) {
  page = parseInt(page);
  var flight = searchFlightGestor.searchFlights(origin, destination, date, page - 1, 2);
  text = __('flights.noprevious');
  if (flight.trips && flight.trips.length > 0 && page > 1) {
    page = page - 1;
    text = "";
    _.each(flight.trips, function (trip, index) {
      text += __('prepositions.the_a') + " " + __('prepositions.option') + " " + (index + 1 + (flight.pagination.page - 1) * 2) + " " + __('prepositions.for') + " " + trip.price + " " + flight.currency + ". ";
    })
  }
  return {
    text: text,
    page: page
  };
}
var specificFlights = function (origin, destination, date, numbers) {
  var flight = searchFlightGestor.searchFlights(origin, destination, date, 1);
  text = __('flights.notexists');
  if (flight.trips && flight.trips.length > 0) {
    text = "";
    _.each(flight.trips, function (trip, index) {
      if (numbers.indexOf(index + 1) >= 0) {
        text += __('prepositions.the_a') + " " + __('prepositions.option') + " " + (index + 1) + " " + __('prepositions.for') + " " + trip.price + " " + flight.currency + ". ";
      }
    })
  } else {
    numbers = [];
  }
  return {
    text: text,
    numbers: numbers
  };
}

var getCheaperFlights = function (origin, destination, date) {
  var flights = searchFlightGestor.getCheaperFlights(origin, destination, date);
  var text = "";
  var momentDate = moment(flights.trips[0].departure.date, "YYYY-MM-DD");
  text = __('flights.cheapest') + " " + __('phrases.has_a_cost_of') + " "
    + flights.trips[0].price + " " + flights.currency + ". " + __('prepositions.that') +  " " + __('flights.leaves_at') + " "
    + flights.trips[0].departure.time + " " + __('flights.arrives_and') + " " + flights.trips[0].arrival.time + ". ";
  return text;
}

var getFlightTime = function (origin, destination, date, page, numbers) {
  var text = "";
  var flight = searchFlightGestor.getFlightTime(origin, destination, date, page, numbers);
  if (flight.trips.length == 1) {
    text +=  __('prepositions.the') + " " + __('flights.flight') + " "  + __('flights.takes_off_at') + " " + flight.trips[0].departure.time
      + " " + __('flights.arrives_and') + " " + flight.trips[0].arrival.time + ". ";
  } else {
    _.each(flight.trips, function (trip, index) {
      text += __('prepositions.the_a') + " " + __('prepositions.option') + " " + (index + 1) + " " + __('flights.leaves_at') + " " + trip.departure.time
        + " " + __('flights.arrives_and') + " " + trip.arrival.time + ". ";
    })

  }

  return text;
}

var bookFlight = function (from, to, date, numbers, name, lastname, passport) {
  var book = searchFlightGestor.bookFlight(from, to, date, numbers, name, lastname, passport);
  var text = __('reserve.question');
  if (book) {
    text = __('prepositions.the') + " " + __('flights.flight') + " " + __('prepositions.from') + " " + from + " " + __('prepositions.to') + " "
      + to + __('prepositions.with') + " " + __('flights.flight') + " " + __('prepositions.id') + " " + book.flightId + " " + __('reserve.was_reserved')
      + ". " + __('reserve.question.email');
  }
  return {
    text: text,
    booked: book
  }

}

function translateDay(day){
   return __(day) ? __(day) : day;
}

exports.bookFlight = bookFlight;
exports.specificFlights = specificFlights;
exports.previousFlights = previousFlights;
exports.getFlightTime = getFlightTime;
exports.searchFlights = searchFlights;
exports.moreFlights = moreFlights;
exports.getCheaperFlights = getCheaperFlights;
