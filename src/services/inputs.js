/**
 * Created by liqingjie on 16/1/13.
 */
var inputs = require('../models/inputs');

var _getInputs = function(callback) {
    inputs.find()
        .exec(typeof callback == 'function' ? callback : null);
};

var _addInput = function(data, callback) {
    var input = new inputs(data);
    input.save(callback);
};

var _updateInput = function(data, callback) {
    inputs.update({_id: data._id}, data, {multi: true}, callback);
};

var _deleteInput = function(data, callback) {
    inputs.remove(data, callback);
};

exports.getInputs = _getInputs;
exports.addInput = _addInput;
exports.updateInput = _updateInput;
exports.deleteInput = _deleteInput;