/**
 * Created by liqingjie on 16/1/13.
 */
var inputs = require('../models/inputs');

var _getInputs = function(callback) {
    inputs.find()
        .exec(typeof callback == 'function' ? callback : null);
};

var _addInput = function(data, callback) {
    inputs.create(data, callback);
};

exports.getInputs = _getInputs;
exports.addInput = _addInput;