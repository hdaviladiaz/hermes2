var _ = require('underscore');

function FlightRequest() {
    this.page = undefined;
    this.from = undefined;
    this.to = undefined;
    this.date = undefined;
    this.flights = [];
    this.hasState = function () {
        var values = _.values(this)
        return !_.contains(values, undefined)
    }
}


module.exports = FlightRequest