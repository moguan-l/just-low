/**
 * Created by LQJ on 2015/10/9.
 */
var express = require('express');
var router = express.Router();

router.get(/^\/$|^\/index/, function(req, res) {
    var users = require('../services/users');
    users.getUsersOnPages({
        pageIndex: 0,
        pageSize: 10
    }, function(err, data) {
        res.render('index', {users: data});
    });
});

router.get('users/search', function(req, res) {
    var users = require('../services/users');
    users.getUsersOnPages({
        pageIndex: 0,
        pageSize: 10
    }, function(err, data) {
        res.json(data);
    });
});

module.exports = router;