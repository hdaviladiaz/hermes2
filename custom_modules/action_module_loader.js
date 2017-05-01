var loadActionModule = function (moduleName) {
    try {
        var module = require("../actions/" + moduleName + ".js");
        return module;
    } catch (exeption) {
        return false;
    }
}
exports.loadActionModule = loadActionModule;