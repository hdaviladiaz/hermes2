var _ = require('underscore');
var humanize = require('humanize');
var moment = require('moment');
var searchFlightGestor = require('../gestor/searchFlightGestor.js');

var searchFlights = function (origin, destination, date) {
  var momentDate = moment(date, "YYYY-MM-DD");
  var flight = searchFlightGestor.searchFlights(origin, destination, date, 1, 2);
  var text = "There are no flights.";
  if (!flight || !flight.trips || flight.trips.length == 0) {
    return text
  }
  text = " I found in LATAM " + flight.pagination.count + " flights for "
    + humanize.naturalDay(momentDate.unix()) + " from " + origin + " to " + destination + ". ";
  _.each(flight.trips, function (trip, index) {
    text += humanize.ordinal(index + 1) + " for " + trip.price + " " + flight.currency + ". ";
  })
  return text;
}


var moreFlights = function (origin, destination, date, page) {
  page = parseInt(page);
  var flight = searchFlightGestor.searchFlights(origin, destination, date, page + 1, 2);
  text = "There are no more flights.";
  if (flight.trips && flight.trips.length > 0) {
    page = page + 1;
    text = "";
    _.each(flight.trips, function (trip, index) {
      text += humanize.ordinal(index + 1 + (flight.pagination.page - 1) * 2) + " for " + trip.price + " " + flight.currency + ". ";
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
  text = "There are no previous flights.";
  if (flight.trips && flight.trips.length > 0 && page > 1) {
    page = page - 1;
    text = "";
    _.each(flight.trips, function (trip, index) {
      text += humanize.ordinal(index + 1 + (flight.pagination.page - 1) * 2) + " for " + trip.price + " " + flight.currency + ". ";
    })
  }
  return {
    text: text,
    page: page
  };
}
var specificFlights = function (origin, destination, date, numbers) {
  var flight = searchFlightGestor.searchFlights(origin, destination, date, 1);
  text = "The flights do not exists.";
  if (flight.trips && flight.trips.length > 0) {
    text = "";
    _.each(flight.trips, function (trip, index) {
      if (numbers.indexOf(index + 1) >= 0) {
        text += humanize.ordinal(index + 1) + " for " + trip.price + " " + flight.currency + ". ";
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
  text = "The cheapest flight " + /*humanize.naturalDay(momentDate.unix()) + */" has a cost of "
    + flights.trips[0].price + " " + flights.currency + ".";
  return text;
}

var getFlightTime = function (origin, destination, date, page, numbers) {
  var text = "";
  var flight = searchFlightGestor.getFlightTime(origin, destination, date, page, numbers);
  if (flight.trips.length == 1) {
    text += "The flight leaves at " + flight.trips[0].departure.time
      + " and arrives at " + flight.trips[0].arrival.time + ". ";
  } else {
    _.each(flight.trips, function (trip, index) {
      text += "The " + humanize.ordinal(index + 1) + " option leaves at " + trip.departure.time
        + " and arrives at " + trip.arrival.time + ". ";
    })

  }

  return text;
}

var bookFlight = function (from, to, date, numbers, name, lastname, passport) {
  var book = searchFlightGestor.bookFlight(from, to, date, numbers, name, lastname, passport);
  if (!book) {
    return "What flight do you want to reserve?";
  }
  return "The flight from " + origin + " to " + destination + " with flight id " + book.flightId + " was reserved. ";
}

exports.bookFlight = bookFlight;
exports.specificFlights = specificFlights;
exports.previousFlights = previousFlights;
exports.getFlightTime = getFlightTime;
exports.searchFlights = searchFlights;
exports.moreFlights = moreFlights;
exports.getCheaperFlights = getCheaperFlights;