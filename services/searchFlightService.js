var _ = require('underscore');
var humanize = require('humanize');
var moment = require('moment');
var searchFlightGestor = require('../gestor/searchFlightGestor.js');

var searchFlights = function (origin, destination, date) {
  var momentDate = moment(date, "YYYY-MM-DD");
  var flight = searchFlightGestor.searchFlights(origin, destination, date, 1, 2);
  var text = "There are no more flights.";
  if (!flight || !flight.trips || flight.trips.length == 0) {
    return text
  }
  text = " I found in LATAM " + flight.pagination.count + " flights for "
    + humanize.naturalDay(momentDate.unix()) + " from " + origin + " to " + destination + ". ";
  _.each(flight.trips, function (trip, index) {
    text += humanize.ordinal(index + 1) + " for " + trip.price + " " + flight.currency + ".";
  })
  return text;
}


var moreFlights = function (index) {

  var text = "I have no options saved. Please give me the travel information.";
  if (!searchFlightGestor.isStoredData())
    return text;
  var flight = searchFlightGestor.moreFlights(index);
  text = "";
  if (index) {
    if (flight.trips.length > 0)
      text += humanize.ordinal(index) + " for " + flight.trips[0].price + " " + flight.currency + ".";
    else
      text += "This fligth does not exist."
  }
  else {
    _.each(flight.trips, function (trip, index) {
      text += humanize.ordinal(index + 1 + (flight.pagination.page - 1) * 2) + " for " + trip.price + " " + flight.currency + ".";
    })
  }

  return text;
}

var getCheaperFlights = function (numberOfFlights) {
  var flights = searchFlightGestor.getCheaperFlights(numberOfFlights);
  var text = "I have no options saved. Please give me the travel information.";
  if (!searchFlightGestor.isStoredData()) {
    return text;
  }
  if (numberOfFlights == 1) {
    var momentDate = moment(flights.trips[0].departure.date, "YYYY-MM-DD");
    text = "The cheapest flight for " + humanize.naturalDay(momentDate.unix()) + " has a cost of "
      + flights.trips[0].price + " " + flights.currency + ".";
  }
  else {
    var momentDate = moment(flights.trips[0].departure.date, "YYYY-MM-DD");
    text = "The cheapest flights for " + humanize.naturalDay(momentDate.unix()) + " are: ";
    _.each(flights.trips, function (trip, index) {
      text += humanize.ordinal(index + 1) + " for " + trip.price + " " + flights.currency + ".";
    })
  }
  return text;
}

var getFlightTime = function (index) {

  var text = "I have no options saved. Please give me the travel information.";
  if (!searchFlightGestor.isStoredData())
    return text;
  var flight = searchFlightGestor.getFlightTime(index);
  text = "";
  if (index) {
    if (flight.trips.length > 0)
      text += "The " + humanize.ordinal(index) + " option leaves at " + flight.trips[0].departure.time
        + " and arrives at " + flight.trips[0].arrival.time;
    else
      text += "This fligth does not exist."
  }
  else {
    if (flight.trips.length == 1) {
      text += "The flight leaves at " + flight.trips[0].departure.time
        + " and arrives at " + flight.trips[0].arrival.time + ". ";
    } else {
      _.each(flight.trips, function (trip, index) {
        text += "The " + humanize.ordinal(index + 1) + " option leaves at " + trip.departure.time
          + " and arrives at " + trip.arrival.time + ". ";
      })
    }
  }

  return text;
}

exports.getFlightTime = getFlightTime;
exports.searchFlights = searchFlights;
exports.moreFlights = moreFlights;
exports.getCheaperFlights = getCheaperFlights;