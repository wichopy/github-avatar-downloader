var request = require('request');
var fs = require('fs');

var downloadImageByURL = function downloadImageByURL(url, filepath) {
  console.log(`Downloading avatar for Github user: ${filepath}`);
  request.get(url)
    .on('error', function (err) {
      console.log('Error with ${url}: ${err}');
    })
    .pipe(fs.createWriteStream(`${filepath}`));
};

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "wichopy";
  var GITHUB_TOKEN = "38bd41f9ffdc491052c1eb573eae69d754dade9c";
  var options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request.get(options, function (e, r, data) {
    if (!e && r.statusCode === 200) {
      var githubJSON = JSON.parse(data); //!!this is an array full of objects!
      for (var users of githubJSON) { //!!use of not in. 
        cb(users.avatar_url, `./downloads/${users.login}`);
      }
    }
  });
}
//Need 2 arguments from the user, am owner and a repo.

var input = process.argv.slice(2);
if (input.length !== 2) {
  console.log("We can't process this request. Please pass in owner and repo in order to run avatar download.")
} else {
  getRepoContributors(input[0], input[1], downloadImageByURL);
}