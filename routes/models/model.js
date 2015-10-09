/**
 * Created by pc on 2015/10/9.
 */

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'userapp');
var user_schema = require('../../models/test.js').user_schema;
var user = db.model('users', user_schema);
var express = require('express');
var router = express.Router();

router.get('/user/list', function(req, res, next) {
    user.find({}, 'name', function(error, users) {
        res.json(users);
    });
});

router.get('/user/create', function(req, res, next) {
    user.find({}, 'name', function(error, users) {
        res.json(users);
    });
});

module.exports = router;