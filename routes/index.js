
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/new', function(req, res){
	res.redirect('/chats/new');
});

module.exports = router;
