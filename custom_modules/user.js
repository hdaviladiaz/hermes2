var data_store = require("../custom_modules/data_store.js");

var getCurrentUser = function () {
    return data_store.get("current_user_data");
}
var updateCurrentUser = function (user) {
    data_store.set("current_user_data", user);
}
var getMemberFamily = function (relationship) {
    var user = this.getCurrentUser();
    if (!user) return null;
    return user[relationship];
}

var setMemberFamily = function (relationship, member) {
    var user = this.getCurrentUser();
    if (!user) return;
    user[relationship] = member;
}

exports.getCurrentUser=getCurrentUser;
exports.updateCurrentUser=updateCurrentUser;
exports.getMemberFamily=getMemberFamily;
exports.setMemberFamily=setMemberFamily;