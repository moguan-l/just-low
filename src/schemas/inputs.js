/**
 * Created by liqingjie on 16/1/13.
 */
var types = require('./core/type');
var mongoose = require('mongoose');
var input_schema = new mongoose.Schema({
    id: {type: types.number},
    text: {type: types.string},
    style: {type: types.string},
    create_time: {type: types.string}
});

module.exports = input_schema;