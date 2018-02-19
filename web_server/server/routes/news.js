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


router.get('/keyword/:keyword/startdate/:startdate/enddate/:enddate', function(req, res, next) {
	console.log('Fetching news...');
	keyword = req.params['keyword'];
	startdate = req.params['startdate'];
	enddate = req.params['enddate'];
	
	rpc_client.getInterestingNewsInRange(keyword, startdate, enddate, function(response) {
	  res.json(response);
	});
});

module.exports = router;
