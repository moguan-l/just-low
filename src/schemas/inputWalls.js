/**
 * Created by liqingjie on 16/1/25.
 */
var types = require('./core/type');
var mongoose = require('mongoose');
var inputWalls_schema = new mongoose.Schema({
    name: {type: types.string},
    create_time: {type: types.string}
});

module.exports = inputWalls_schema;