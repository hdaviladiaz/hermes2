var Flight = require('../model/flight.js');
var FlightRequest = require('../model/flightRequest.js');
var _ = require('underscore');

var storedData = new FlightRequest();
var searchFlights = function (origin, destination, date, page, limit) {
    var result = new Flight(origin, destination, date, page, limit);
    storedData.page = page;
    storedData.date = date;
    storedData.to = destination;
    storedData.from = origin;
    storedData.trips = result.trips;
    return result;
}

var moreFlights = function (index) {
    var flightsResult = {};
    if (index) {
        flightsResult = this.searchFlights(storedData.to, storedData.from, storedData.date, 1);
        if (flightsResult && flightsResult.trips.length >= index) {
            var flight = flightsResult.trips[index - 1];
            flightsResult.trips = [];
            flightsResult.trips.push(flight);
        } else {
            flightsResult.trips = [];
        }
    } else {
        flightsResult = this.searchFlights(storedData.to, storedData.from, storedData.date, storedData.page + 1, 2);
    }

    if (flightsResult && flightsResult.trips && flightsResult.trips.length > 0) {
        storedData.page = storedData.page + 1;
        storedData.trips = flightsResult.trips;
    }
    return flightsResult;
}

var getFlightTime = function (index) {
    var flightsResult = {};
    if (index) {
        flightsResult = this.searchFlights(storedData.to, storedData.from, storedData.date, 1);
        if (flightsResult && flightsResult.trips.length >= index) {
            var flight = flightsResult.trips[index - 1];
            flightsResult.trips = [];
            flightsResult.trips.push(flight);
        } else {
            flightsResult.trips = [];
        }
    } else {
        flightsResult = storedData;
    }
    return flightsResult;
}

var getCheaperFlights = function (numberOfFlights) {
    var flights = this.searchFlights(storedData.to, storedData.from, storedData.date, 1);
    flights.trips = _.sortBy(flights.trips, function (trip) { return trip.price; })
    flights.trips = _.first(flights.trips, numberOfFlights);
    storedData.trips = flights.trips;
    return flights;
}
var isStoredData = function () {
    return storedData && storedData.hasState();
}

exports.getFlightTime = getFlightTime;
exports.isStoredData = isStoredData;
exports.getCheaperFlights = getCheaperFlights;
exports.moreFlights = moreFlights;
exports.searchFlights = searchFlights;

