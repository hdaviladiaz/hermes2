var chai = require('chai');
var expect = chai.expect;
var moment = require('moment');
var patternFormat = 'YYYY-MM-DD';
var searchFlightService = require('../../../services/searchFlightService.js');

var expectedOrigin = 'Quito';
var expectedDestination = 'Guayaquil';
var expectedDepartureDate = moment('2018-01-22',patternFormat).format();

describe('Flight service searching', function() {
   it('should change dates of the trips with near suggested dates in the JSON response', function() {
    var text = searchFlightService.searchFlights(expectedOrigin, expectedDestination, expectedDepartureDate)
    expect(text).to.be.a('string');
  });
});
