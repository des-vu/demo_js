var express = require('express');
var router = express.Router();

router.get('/pro', function(req, res) {
    res.send('产品接口');
})

module.exports = router;