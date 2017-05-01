var chai = require('chai');
var expect = chai.expect;
var moment = require('moment');
var patternFormat = 'YYYY-MM-DD';
var searchFlightGestor = require('../../../gestor/searchFlightGestor.js');
var Flight = require('../../../model/flight.js');

var defaultOrigin = 'UIO';
var defaultDestination = 'MAD';
var defaultDepartureDate = moment('2017-01-05', patternFormat).format();
var expectedOrigin = 'Quito';
var expectedDestination = 'Guayaquil';
var expectedDepartureDate = moment('2018-01-22', patternFormat).format();
var expectedFlights;

beforeEach(function () {
  expectedFlights = new Flight(defaultOrigin, defaultDestination, defaultDepartureDate);
});

describe('Flight gestor searching', function () {
  it('should change origin city in the JSON response', function () {
    var flights = searchFlightGestor.searchFlights(expectedOrigin, defaultDestination, defaultDepartureDate);
    expectedFlights.from = expectedOrigin;
    expect(flights.from).to.equal(expectedFlights.from);
  });

  it('should change destiny city in the JSON response', function () {
    var flights = searchFlightGestor.searchFlights(defaultOrigin, expectedDestination, defaultDepartureDate);
    expectedFlights.to = expectedDestination;
    expect(flights.to).to.equal(expectedFlights.to);
  });

  it('should change requested date in the JSON response', function () {
    var flights = searchFlightGestor.searchFlights(defaultOrigin, defaultDestination, expectedDepartureDate);
    expectedFlights.requestedDate = expectedDepartureDate;
    expect(flights.requestedDate).to.equal(expectedFlights.requestedDate);
  });

  it('should change dates of the trips with near suggested dates in the JSON response', function () {
    var flights = searchFlightGestor.searchFlights(defaultOrigin, defaultDestination, expectedDepartureDate);
    expectedFlights.trips = expectedFlights.trips.map(function (x, index) {
      var duration = 60 + (index * 20);
      x.flightId = "LT" + (index + 1) + "F" + (index + 1) * 100,
        x.price = 500 + index * 50,
        x.class = index % 2 == 0 ? "first" : "tourist",
        x.duration = duration,
        x.layovers = [],
        x.departure = {
          "date": moment(expectedDepartureDate, patternFormat).add(0, 'days').format(),
          "time": moment(expectedDepartureDate, patternFormat).add(index, 'minutes').format('HH:mm'),
          "airport": defaultOrigin + " airport"
        },
        x.arrival = {
          "date": moment(expectedDepartureDate, patternFormat).add(0, 'days').format(),
          "time": moment(expectedDepartureDate, patternFormat).add(index + duration, 'minutes').format('HH:mm'),
          "airport": defaultDestination + " airport"
        }
      return x;
    });
    expect(expectedFlights.trips).to.deep.include.members(flights.trips);
  });

  it('should return pagination parameter', function () {
    var page = 1;
    var limit = 2;
    var flights = searchFlightGestor.searchFlights(defaultOrigin, defaultDestination, defaultDepartureDate, page, limit);
    var expectedPagination = {
      page: page,
      limit: limit,
      count: 10,
      pageCount: 5
    }
    expect(flights.pagination).to.deep.equal(expectedPagination);
  });

  it('should return paginated results by pagination parameter', function () {
    var page = 1;
    var limit = 2;
    var flights = searchFlightGestor.searchFlights(defaultOrigin, defaultDestination, defaultDepartureDate, page, limit);
    expect(flights.trips).to.have.lengthOf(limit);
  });

  it('should return cheaper flights', function () {
    var numberOfFlights=1;
    var cheaperFlights = searchFlightGestor.getCheaperFlights(numberOfFlights);
    expect(cheaperFlights.trips).to.have.lengthOf(numberOfFlights);
  });

  it('should return second flights', function () {
    var index=2;
    var secondFlight = searchFlightGestor.moreFlights(index);
    console.log(secondFlight);
    expect(secondFlight.trips).to.have.lengthOf(1);
  });

});
