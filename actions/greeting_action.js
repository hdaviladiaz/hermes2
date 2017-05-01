var userService = require('../custom_modules/user.js');
var userInformation = require('../actions/user-information_action.js');
var execute = function (request) {
    var user = userService.getCurrentUser();
    if (!user) {
        var eventRequest = userInformation.createEventRequest("greeting");
        return eventRequest;
    }
    return {
        text: "Hello " + user.name + " " + user.lastname+". What can I do for you.",
    }
}

exports.execute = execute;