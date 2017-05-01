var loadActionModule = function (moduleName) {
    try {
        var module = require("../actions/" + moduleName + "_action.js");
        return module;
    } catch (exeption) {
        return false;
    }
}
exports.loadActionModule = loadActionModule;