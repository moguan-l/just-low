/**
 * Created by liqingjie on 15/12/18.
 */
var _extendObj = function() {
    var args = arguments;
    if(args.length < 2) return;
    var temp = cloneObj(args[0]);
    for(var n = 1; n < args.length; n++) {
        for(var i in args[n]) {
            temp[i] = args[n][i];
        }
    }
    return temp;
};

exports.extendObj = _extendObj;

function cloneObj(oldObj) {
    if(typeof(oldObj) != 'object' || oldObj == null) return oldObj;
    var newObj = Object();
    for(var i in oldObj)
        newObj[i] = cloneObj(oldObj[i]);
    return newObj;
}