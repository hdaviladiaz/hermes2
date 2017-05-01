var userService = require('../custom_modules/user.js');
var getFlightAction = require('../actions/get-flights_action.js');
var searchFlightService = require('../services/searchFlightService.js');

var execute = function (request) {
    // if (searchFlightService.isStoredData()) {
    //     var event =getFlightAction.createEventRequest("cheaper-flights",request.result.parameters);
    //     return event;
    // }
    var numberOfFlights = request.result.parameters.numberOfFlights || request.customParameters.numberOfFlights || 1;
    var text = searchFlightService.getCheaperFlights(numberOfFlights);
    return {
        text: text
    }
}

exports.execute = execute;