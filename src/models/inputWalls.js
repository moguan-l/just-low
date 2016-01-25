/**
 * Created by liqingjie on 16/1/25.
 */
var mongoose = require('mongoose');
var inputWalls_schema = require('../schemas/inputWalls');
var inputWalls = mongoose.model('jl_input_walls', inputWalls_schema);

module.exports = inputWalls;