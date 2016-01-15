/**
 * Created by liqingjie on 16/1/13.
 */
var mongoose = require('mongoose');
var inputs_schema = require('../schemas/inputs');
var inputs = mongoose.model('jl_inputs', inputs_schema);

module.exports = inputs;