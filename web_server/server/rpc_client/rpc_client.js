var jayson = require('jayson');

// create a client
var client = jayson.client.http({
  hostname: 'localhost',
  port: 4040
});

// Test Rpc method
function getOneNews(source, page_num, callback) {
    client.request('getOneNews', [source, page_num], function(err, response) {
      if(err) throw err;
      console.log(response);
      callback(response.result);
    });
  };

module.exports = {
    getOneNews : getOneNews,
};