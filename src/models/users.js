/**
 * Created by pc on 2015/10/9.
 */
var mongoose = require('mongoose');
var users_schema = require('../schemas/users');
var users = mongoose.model('jl_users', users_schema);

module.exports = users;