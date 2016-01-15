/**
 * Created by pc on 2015/10/9.
 */
var types = require('./core/type');
var mongoose = require('mongoose');
var users_schema = new mongoose.Schema({
    name: {type: types.string},
    age: {type: types.number}
});

module.exports = users_schema;