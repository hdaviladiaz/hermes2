var searchFlightService = require('../services/searchFlightService.js');
var action_manager = require('../actions/action_manager.js');

var execute = function (request) {
    var parameters = request.result.parameters;
    var action = parameters.action;
    var result = action_manager.executeModule(action, request);
    return result;
}

var createEventRequest = function (actionName, parameters) {
    var event = {
        name: "flight-user-info",
        data: { "action": actionName }
    };
    if (parameters && parameters.name)
        event.data.name = parameters.name;
    if (parameters && parameters.lastname)
        event.data.lastname = parameters.lastname;
    if (parameters && parameters.passport)
        event.data.passport = parameters.passport;
    return {
        event: event
    }
}

exports.createEventRequest=createEventRequest;
exports.execute = execute;