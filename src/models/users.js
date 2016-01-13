/**
 * Created by pc on 2015/10/9.
 */
var mongoose = require('mongoose');
var user_schema = require('../schemas/users');
var users = mongoose.model('jl_users', user_schema);

module.exports = users;