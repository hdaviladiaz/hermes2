var userService = require('../custom_modules/user.js');
var userInformation = require('../actions/user-information_action.js');
var execute = function (request) {
    var informationFields = request.result.parameters.informationFields;
    var user = userService.getCurrentUser();
    var text = "I don't have your information yet.";
    if (user) {
        text = "";
        if (informationFields && informationFields.length > 0) {
            for (var i in informationFields) {
                var field = informationFields[i];
                field=field.replace(" ","");
                if (user[field])
                    text += "Your " + field + " is " + user[field] + ".";
            }
        }
        else {
            text += "Here are your personal information.";
            text += "Your name is " + user.name + " " + user.lastname;
            text += " and your passport is " + user.passport + ".";
        }
    }
    return {
        text: text
    };
}

exports.execute = execute;