var userService = require('../custom_modules/user.js');
var userInformation = require('../actions/user-information_action.js');
var searchFlightService = require('../services/searchFlightService.js');

var execute = function (request) {
    var index = request.result.parameters.index;
    var text = searchFlightService.moreFlights(index);

    return {
        text: text
    }
}

exports.execute = execute;