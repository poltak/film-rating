var http = require('http');

// Get all the args into a single search term (start at argv index 2)
var searchTerm = "";
process.argv.slice(2).forEach(function(term) {
  searchTerm += term;
});


// Send request to OMDb API
var options = {
  host: 'www.omdbapi.com',
  path: '/?t=' + searchTerm,
  method: 'GET'
};

http.request(options, function(response) {
  // This is what the returned JSON will be stored in
  var jsonstr = '';

  // Append each chunk to make up the entire JSON
  response.on('data', function(chunk) {
    jsonstr += chunk;
  });

  response.on('end', function() {
    console.log(jsonstr);
  });
}).end();

