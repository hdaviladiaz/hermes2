var data = {}
var set = function (key, value) {
    this.data[key] = value;
}
var get=function(key){
    return this.data[key];
}
exports.get=get;
exports.set=set;
exports.data=data;