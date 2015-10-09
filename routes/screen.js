/**
 * Created by LQJ on 2015/10/9.
 */
var express = require('express');
var router = express.Router();

router.get(/^\/$|^\/index/, function(req, res, next) {
    res.render('index');
});
router.get('/test', function(req, res, next) {
    res.render('test');
});

module.exports = router;