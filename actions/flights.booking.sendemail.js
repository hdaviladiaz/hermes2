
var execute = function (request) {
    var parameters = request.result.parameters;
    var email = parameters.email;
    return {
        text: "Ok, email was sended to " + email
    }
}

exports.execute = execute;