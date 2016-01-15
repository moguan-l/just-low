/**
 * Created by liqingjie on 16/1/13.
 */
var types = require('./core/type');
var mongoose = require('mongoose');
var inputs_schema = new mongoose.Schema({
    text: {type: types.string},
    style: {type: types.string},
    create_time: {type: types.string}
});

module.exports = inputs_schema;