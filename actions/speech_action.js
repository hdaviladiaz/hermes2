var user_service = require('../custom_modules/user.js');
var action_manager = require('../actions/action_manager.js');
var execute = function (request) {
    return {
        text: request.customParameters || request.result.parameters  || "Ok"
    }
}


exports.execute = execute;
