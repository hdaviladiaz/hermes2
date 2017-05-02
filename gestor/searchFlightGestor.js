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

var getFlightTime = function (origin, destination, date, page, numbers) {
    var flightsResult = {};
    if (numbers && numbers.length > 0) {
        flightsResult = this.searchFlights(origin, destination, date, 1);
        var flights = [];
        _.each(flightsResult.trips, function (trip, index) {
            if (numbers.indexOf(index + 1) >= 0) {
                flights.push(trip);
            }
        })
        flightsResult.trips = flights;
    }
    else {
        flightsResult = this.searchFlights(origin, destination, date, page, 2);
    }
    return flightsResult;
}

var getCheaperFlights = function (from, to, date) {
    var flights = this.searchFlights(to, from, date, 1);
    flights.trips = _.sortBy(flights.trips, function (trip) { return trip.price; })
    flights.trips = _.first(flights.trips, 1);
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

