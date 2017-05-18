var statusFlightService = require('../services/statusFlightService.js');
var moment = require('moment');

var execute = function (request) {
    var date = moment(moment().add(1, "days"), "YYYY-MM-DD").format();
    var text = statusFlightService.getStatus("LA", "1449", date);
    return {
        text: text
    }
}

exports.execute = execute;