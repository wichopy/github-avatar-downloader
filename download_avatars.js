var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

var downloadImageByURL = function downloadImageByURL(url, filepath) {
  fs.stat("./downloads", (err, stats) => {
    if (err) {
      console.log("no downloads folder, please create.");
    }
    if (stats.isDirectory()) {
      console.log(`Downloading avatar for Github user: ${filepath}`);
      request.get(url)
        .on('error', function (err) {
          console.log('Error with ${url}: ${err}');
        })
        .pipe(fs.createWriteStream(`${filepath}`));
    }
  });
};

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = process.env.GITHUB_USER;
  var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  var options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }

  };
  request.get(options, function (e, r, data) {
    //console.log(options.url);
    //console.log(data);
    if (e) {
      //console.log(data);
      console.log("Something went wrong, check your owner and repo.");
    }

    if (!e && r.statusCode === 200) {
      //console.log(data);
      if (JSON.parse(data).message == "Not Found") {
        //console.log(data);
      }
      var githubJSON = JSON.parse(data); //!!this is an array full of objects!
      for (var users of githubJSON) { //!!use of not in. 
        cb(users.avatar_url, `./downloads/${users.login}`); //NEED to have a downloads folder 
      }
    }
  });
}

//Need 2 arguments from the user, am owner and a repo.
var input = process.argv.slice(2);
if (input.length !== 2) {
  console.log("We can't process this request. Please pass in github [owner] and [repo] in order to run avatar download. \n ie: node download_avatars.js jquery jquery ")
} else {
  getRepoContributors(input[0], input[1], downloadImageByURL);
}