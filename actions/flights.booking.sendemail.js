var sendEmail = require('../custom_modules/send_email.js');
var fs = require('fs');

var execute = function (request) {
    var parameters = request.result.parameters;
    var context = request.result.contexts[0].parameters;

    var email = parameters.email;
    email = email.replace(" at ", "@");

    var path = process.cwd();
    var buffer = fs.readFileSync(path + "//actions//sendEmailTemplate.html");
    var template = buffer.toString();
    var message = template.replace("{{name}}", context.name + " " + context.lastname)
        .replace("{{departure}}", "2015-05-15 04:30")
        .replace("{{arrival}}", "2015-05-15 06:30")
        .replace("{{duration}}", "2h")
        .replace("{{fligthId}}", "LT03F300")
        .replace("{{passport}}", "1234007");
    sendEmail.sendEmail(email, "Reserve Information", message);
    return {
        text: "Ok, email was sent to " + email
    }
}

exports.execute = execute;

