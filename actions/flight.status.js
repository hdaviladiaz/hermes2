var statusFlightService = require('../services/statusFlightService.js');
var moment = require('moment');

var execute = function (request) {
    date = moment(moment().add(0, "minutes"), "YYYY-MM-DD").format();
    var text = statusFlightService.getStatus("LA", "1451", date);
    return {
        text: text
    }
}

exports.execute = execute;