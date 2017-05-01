
var createResponse = function (options) {
    var result = {
        speech: options.text,
        displayText: options.text,
        data: {},
        contextOut: [],
        source: "",
        followupEvent: {},
        context:{}
    }
    if (options.event) {
        result.followupEvent = {
            name: options.event.name,
            data: options.event.data
        }
    }
    return result;
}
exports.createResponse = createResponse;