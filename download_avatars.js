var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  //var output;
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };
  // var options = {
  //   url: `https://api.github.com/repos/${repoOwner}/${repoName}}/contributors`,
  //   //'wichopy': '38bd41f9ffdc491052c1eb573eae69d754dade9c',
  //   //json: true
  // };
  request.get(options, function (e, r, data) {
      //console.log(data);
      //output = data;

    }) // Note 1
    .on('error', function (err) { // Note 2
      throw err;
    })
    .on('response', function (response) { // Note 3

      console.log('Response Status Code: ', response.statusCode);
      console.log('Response message', response.statusMessage);
      console.log('Content Type', response.headers['content-type']);

    })
    //.pipe(cb(output)); // Note 4
}

getRepoContributors("jquery", "jquery", function (err, result) {
  //console.log("Errors:", err);
  //console.log("This is what we got:")
  //console.log("Result:", result);
});