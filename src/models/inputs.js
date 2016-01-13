/**
 * Created by liqingjie on 16/1/13.
 */
var mongoose = require('mongoose');
var input_schema = require('../schemas/inputs');
var inputs = mongoose.model('jl_users', input_schema);

module.exports = inputs;