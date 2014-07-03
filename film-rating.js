#!/usr/bin/env node

// Check args
if (process.argv.length < 3) {
  console.error('Please enter a movie title');
  process.exit(1);
}

var http = require('http');

// Get all the args into a single search term (start at argv index 2)
var searchTerm = process.argv.slice(2).join('+');

// The options for the HTTP request
var options = {
  host: 'www.omdbapi.com',
  path: '/?t=' + searchTerm,
  method: 'GET'
};

http.request(options, function(response) {
  // This is what the returned JSON will be stored in
  var jsonStr = '';

  // Append each chunk to make up the entire JSON
  response.on('data', function(chunk) {
    jsonStr += chunk;
  });

  // Parse the received JSON string and print the film title and rating
  response.on('end', function() {
    var jsonObj = JSON.parse(jsonStr);
    console.log(jsonObj.Title + ': ' + jsonObj.imdbRating);
  });
}).end();
