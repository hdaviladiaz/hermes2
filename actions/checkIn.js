var searchFlightService = require('../services/searchFlightService.js');
var flightUserInfo = require('../actions/flights.info.js')

var execute = function (request) {

    var parameters = request.result.parameters;
    var passport=parameters.passport;
    return {
        text:"Dou you want a specific seat?"
    }
    
}

exports.execute = execute;