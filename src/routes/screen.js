/**
 * Created by LQJ on 2015/10/9.
 */
var express = require('express');
var router = express.Router();

router.get(/^\/$|^\/index/, function(req, res) {
    var users = require('../services/users');
    users.getUsersOnPages({
        pageIndex: 2,
        pageSize: 10
    }, function(err, data) {
        res.render('index', {users: data});
    });
});

module.exports = router;