var jayson = require('jayson');

// create a client
var client = jayson.client.http({
  hostname: 'localhost',
  port: 4040
});

// Test Rpc method
function getNewsSummariesForUser(source, page_num, callback) {
    client.request('getNewsSummariesForUser', [source, page_num], function(err, response) {
      if(err) throw err;
      console.log(response);
      callback(response.result);
    });
  };

function getNumofNews(source, callback) {
    client.request('getNumofNews', [source], function(err, response) {
      if(err) throw err;
      console.log(response);
      console.log(response.result);
      callback(response.result);
    });
  };

module.exports = {
    getNewsSummariesForUser : getNewsSummariesForUser,
    getNumofNews: getNumofNews
};