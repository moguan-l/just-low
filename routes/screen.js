/**
 * Created by pc on 2015/10/9.
 */
var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    res.render('screen/test', {title: 'test'});
});

module.exports = router;