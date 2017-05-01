var user_service = require('../custom_modules/user.js');
var action_manager = require('../actions/action_manager.js');
var execute = function (request) {
    var action = request.result.parameters.action;
    var user = {
        name: request.result.parameters.name,
        lastname: request.result.parameters.lastname,
        passport: request.result.parameters.passport,
    }
    user_service.updateCurrentUser(user);
    if (request.result.parameters.parameters) {
        var parameters = JSON.parse(request.result.parameters.parameters);
        request.customParameters = parameters;
    }
    var result = action_manager.executeModule(action, request);
    return result;
}

var createEventRequest = function (actionName, parameters) {
    var event = {
        name: "get-user-information",
        data: { "action": actionName }
    };
    if(parameters){
        event.data.parameters= JSON.stringify(parameters);
    }
    var user = user_service.getCurrentUser();
    if (user && user.name)
        event.data.name = user.name;
    if (user && user.lastname)
        event.data.lastname = user.lastname;
    if (user && user.passport)
        event.data.passport = user.passport;
    return {
        event: event
    }
}

exports.execute = execute;
exports.createEventRequest = createEventRequest;