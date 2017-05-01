var moment = require('moment');
var patternFormat = 'YYYY-MM-DD';
var _ = require('underscore');

function Flight(origin, destination, date, page, limit) {
  page = page || 1;
  limit = limit || 10;
  var flights = ramdonFlights(origin, destination, date, page, limit);
  this.airline = 'LATAM';
  this.from = origin || '';
  this.to = destination || '';
  this.requestedDate = date || '';
  this.currency = 'USD';
  this.trips = flights.elements;
  this.pagination = {
    page: page,
    limit: limit,
    count: flights.count,
    pageCount: Math.ceil(flights.count / limit),
  };
}

var ramdonFlights = function (origin, destination, date, page, limit) {
  var numberTrips = 10;
  var options = [];
  for (var i = 0; i < numberTrips; i++) {
    var duration = 60 + (i * 20);
    options.push({
      "flightId": "LT" + (i + 1) + "F" + (i + 1) * 100,
      "price": 500 + i * 50,
      "class": i % 2 == 0 ? "first" : "tourist",
      "duration": duration,
      "layovers": [],
      "departure": {
        "date": moment(date, patternFormat).add(0, 'days').format(),
        "time": moment(date, patternFormat).add(i, 'minutes').format('HH:mm'),
        "airport": origin + " airport"
      },
      "arrival": {
        "date": moment(date, patternFormat).add(0, 'days').format(),
        "time": moment(date, patternFormat).add(i + duration, 'minutes').format('HH:mm'),
        "airport": destination + " airport"
      }
    })
  }

  return {
    count: options.length,
    elements: options.slice((page - 1) * limit, ((page - 1) * limit)+limit)
  };
}

module.exports = Flight
