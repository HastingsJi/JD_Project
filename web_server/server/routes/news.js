var express = require('express');
var rpc_client = require('../rpc_client/rpc_client');
var router = express.Router();

/* GET news list. */
router.get('/source/:source/pageNum/:pageNum', function(req, res, next) {
	console.log('Fetching news...');
	source = req.params['source'];
	page_num = req.params['pageNum'];
  
	rpc_client.getNewsSummariesForUser(source, page_num, function(response) {
	  res.json(response);
	});
});

router.get('/source/:source', function(req, res, next) {
	console.log('Fetching news...');
	source = req.params['source'];
	// page_num = req.params['pageNum'];
  
	rpc_client.getNumofNews(source, function(response) {
	  res.json(response);
	});
});

module.exports = router;
