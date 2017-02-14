var q = require('bluebird');
var rp = require('request-promise');
var fs = require('fs');
var dotenv = require('dotenv').config();
var promises = [];
var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// var repoName = 'jquery';
// var repoOwner = 'jquery';

//Need 2 arguments from the user, am owner and a repo.
var input = process.argv.slice(2);
if (input.length !== 2) {
  console.log("We can't process this request. Please pass in github [owner] and [repo] in order to run avatar download. \n ie: node download_avatars.js jquery jquery ")
} else {
  var options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${input[0]}/${input[1]}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };
  rp(options).then(function (data) {
    var contributorList = JSON.parse(data); //!!this is an array full of objects!
    getStarredList(contributorList);
  });
}
var getStarredList = function (contributorList) {
  var i = 0;
  var parsedProjects = {};
  for (var login of contributorList) {
    var userOptions = {
      url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/users/${login.login}/starred`,
      headers: {
        'User-Agent': 'request'
      }
    };

    rp(userOptions).then(function (data) {
      i += 1;
      var starredList = JSON.parse(data); //!!this is an array full of objects!
      for (var projects of starredList) {
        //console.log(projects.full_name);
        //console.log(!parsedProjects.hasOwnProperty(projects.full_name));
        if (!(parsedProjects.hasOwnProperty(projects.full_name))) {
          //console.log("in true");
          parsedProjects[projects.full_name] = 1;
          //parsedProjects[projects.full_name].count = 1;
          //parsedProjects[projects.full_name].userid = login.login;

        } else {
          //console.log("in false");
          parsedProjects[projects.full_name] += 1;

        }
      }
      if (i === contributorList.length) {
        var sortable = [];
        for (var repos in parsedProjects) {
          sortable.push([repos, parsedProjects[repos]]); //push to array for sorting purposes.
        }
        sortable.sort(function (a, b) {
          return b[1] - a[1];
        });
        console.log(sortable.slice(0, 5)); // grab top 5!
      }
      //return starredList;
    });
  }
};