
function Reservations() {
  var options = [];
  for (var i = 0; i < 1; i++) {
    var duration = 60 + (i * 20);
    options.push({
      "flightId": "LT" + (i + 1) + "F" + (i + 1) * 100,
      "passport": "L001234",
      "price": 500 + i * 50,
      "class": i % 2 == 0 ? "first" : "tourist",
      "duration": "2h",
      "departure": {
        "date": "2015-10-05",
        "time": i % 2 == 0 ? "04:30" : "15:00"
      },
      "arrival": {
        "date": "2015-10-05",
        "time": i % 2 == 0 ? "06:30" : "17:00"
      }
    });
    return options;
  }
}


  module.exports = Reservations
