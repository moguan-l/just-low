/**
 * Created by pc on 2015/10/9.
 */
var types = require('./core/type');
var mongoose = require('mongoose');
var user_schema = new mongoose.Schema({
    id: {type: types.number},
    name: {type: types.string},
    age: {type: types.number}
});

module.exports = user_schema;