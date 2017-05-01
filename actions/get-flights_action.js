var userService = require('../custom_modules/user.js');
var userInformation = require('../actions/user-information_action.js');
var searchFlightService = require('../services/searchFlightService.js');
var action_manager = require('../actions/action_manager.js');

var execute = function (request) {
    var today = new Date();
    var todayStr = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    var from = request.result.parameters.from || request.customParameters.from;
    var to = request.result.parameters.to || request.customParameters.to;
    var date = request.result.parameters.date || request.customParameters.date || todayStr;
    var text = searchFlightService.searchFlights(from, to, date);
    if (request.result.parameters.parameters) {
        var parameters = JSON.parse(request.result.parameters.parameters);
        request.customParameters = parameters;
        var result = action_manager.executeModule(request.result.parameters.action, request);
        return result;
    }
    return {
        text: text
    }
}

var createEventRequest = function (actionName, parameters) {
    var event = {
        name: "get-flights",
        data: { "action": actionName }
    };
    if (parameters) {
        event.data.parameters = JSON.stringify(parameters);
    }
    return {
        event: event
    }
}

exports.createEventRequest = createEventRequest;
exports.execute = execute;
