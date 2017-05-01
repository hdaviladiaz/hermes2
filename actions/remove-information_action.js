var userService = require('../custom_modules/user.js');
var userInformation = require('../actions/user-information_action.js');
var execute = function (request) {
    var informationFields = request.result.parameters.informationFields;
    var user = userService.getCurrentUser();
    if (user) {
        if (informationFields && informationFields.length > 0) {
            for (var i in informationFields) {
                var field = informationFields[i];
                user[field] = null;
            }
        } else {
            userService.updateCurrentUser({});
        }

    }
    var eventRequest = userInformation.createEventRequest("speech", "OK, information was updated");
    return eventRequest;
}

exports.execute = execute;