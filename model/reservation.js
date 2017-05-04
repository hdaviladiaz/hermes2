
function Reservations (origin, destination, date, passport) {
  var options = [];
  for (var i = 0; i < 2; i++) {
    var duration = 60 + (i * 20);
    options.push({
      "flightId": "LT" + (i + 1) + "F" + (i + 1) * 100,
      "passport": passport,
      "price": 500 + i * 50,
      "class": i % 2 == 0 ? "first" : "tourist",
      "seat": "1B",
      "duration": duration,
      "departure": {
        "date": moment(date, patternFormat).add(0, 'days').format(),
        "time":i % 2 == 0 ? "04:30" : "15:00" ,
        "airport": origin + " airport"
      },
      "arrival": {
        "date": moment(date, patternFormat).add(0, 'days').format(),
        "time": i % 2 == 0 ? "06:30" : "17:00",
        "airport": destination + " airport"
      }
    });
    return options;
}


module.exports = Reservations
