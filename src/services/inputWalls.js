/**
 * Created by liqingjie on 16/1/25.
 */
var inputWalls = require('../models/inputWalls');
var inputs = require('../models/inputs');

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

var _deleteInputWall = function(data, callback) {
    inputs.remove({
        wall_id: data._id
    }, function(err) {
        if(!err) {
            inputWalls.remove(data, callback);
        } else {
            console.error('删除文字墙中的文字失败');
            callback(err);
        }
    });
};

exports.getInputWalls = _getInputWalls;
exports.getInputWallByName = _getInputWallByName;
exports.addInputWall = _addInputWall;
exports.deleteInputWall = _deleteInputWall;