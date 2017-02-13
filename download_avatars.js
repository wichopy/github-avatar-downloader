var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var GITHUB_USER = "wichopy";
  var GITHUB_TOKEN = "38bd41f9ffdc491052c1eb573eae69d754dade9c";
  var options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };
  //console.log(options.url);
  // var options = {
  //   url: `https://api.github.com/repos/${repoOwner}/${repoName}}/contributors`,
  //   //'wichopy': '38bd41f9ffdc491052c1eb573eae69d754dade9c',
  //   //json: true
  // };
  // var output = "";
  request.get(options, function (e, r, data) {
    //console.log(data);
    //output = data;
    //cb(data);
    if (!e && r.statusCode === 200) {
      var githubJSON = JSON.parse(data); //!!this is an array full of objects!
      for (var users of githubJSON) { //!!use of not in. 
        cb(null, users.avatar_url);
        //console.log(users.avatar_url)
      }
    }
  }); // Note 1
  // .on('error', function (err) { // Note 2
  //   throw err;
  // })
  // .on('response', function (response) { // Note 3

  //   console.log('Response Status Code: ', response.statusCode);
  //   console.log('Response message', response.statusMessage);
  //   console.log('Content Type', response.headers['content-type']);
  //   //cb(response);
  // })
  // .on('data', function (data) {
  //   output += data;
  //   //console.log(output);
  // });
  //console.log(output);
  //.pipe(cb(output)); // Note 4
}

getRepoContributors("jquery", "jquery", function (err, result) {
  //console.log("Errors:", err);
  //console.log("This is what we got:")
  console.log("Result:", result);
});