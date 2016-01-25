/**
 * Created by liqingjie on 16/1/25.
 */
var inputWalls = require('../models/inputWalls');

var _getInputWalls = function(callback) {
    inputWalls.find()
        .exec(typeof callback == 'function' ? callback : null);
};

var _getInputWallByName = function(data, callback) {
    inputWalls.findOne({name: data}, callback);
};

var _addInputWall = function(data, callback) {
    var inputWall = new inputWalls(data);
    inputWall.save(callback);
};

exports.getInputWalls = _getInputWalls;
exports.getInputWallByName = _getInputWallByName;
exports.addInputWall = _addInputWall;