/**
 * Created by pc on 2015/10/9.
 */
var mongoose = require('mongoose');

exports.user_schema = new mongoose.Schema({
    id: 'string',
    name: 'string'
});