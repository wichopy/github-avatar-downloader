var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

const glob_starredProjects = {}; //STORE THE PROJECT COUNT IN THIS OBJECT

var countStarred = function countStartedProjects(JSONObj) { //CALLBACK FUNCTION for iterating through starred project lists.
  //console.log(JSONObj);
  for (var project of JSONObj) {
    if (!(glob_starredProjects[project.full_name])) {
      console.log("Didn't exist, add to global object" + project.full_name);
      glob_starredProjects[project['full_name']] = 1;
    } else {
      console.log("exists in object, add to counter");
      glob_starredProjects[project['full_name']] += 1;
    }

  }
  console.log(glob_starredProjects);
};

var getContStarredList = function getContStarredList(user, cb) {
  var GITHUB_USER = process.env.GITHUB_USER;
  var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  var options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/users/${user}/starred`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request.get(options, function (e, r, data) {
    //console.log(options.url);
    //console.log(data);
    if (e) {
      console.log("Something went wrong, check your owner and repo.");
    }
    if (!e && r.statusCode === 200) {
      var starredList = JSON.parse(data); //!!this is an array full of objects!
      console.log(`Retreived starred repo list for:`);
      //console.log(glob_starredProjects);
      return cb(starredList);
    }
  });
};


//END of getContStarredList


// function getRepoContributors(repoOwner, repoName, getStarredList, printTopFive) {
//   var GITHUB_USER = process.env.GITHUB_USER;
//   var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

//   var options = {
//     url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
//     headers: {
//       'User-Agent': 'request'
//     }

//   };
//   request.get(options, function (e, r, data) {
//     console.log(options.url);
//     //console.log(data);
//     if (e) {
//       //console.log(data);
//       console.log("Something went wrong, check your owner and repo.");
//     }

//     if (!e && r.statusCode === 200) {
//       var userList = [];
//       //console.log(data);
//       if (JSON.parse(data).message == "Not Found") {
//         //console.log(data);
//       }
//       var githubJSON = JSON.parse(data); //!!this is an array full of objects!
//       for (var users of githubJSON) { //!!use of not in. 
//         userList.push(users.login);
//       }
//       // console.log(`Retreived final Repolist: `)
//       // console.log(repoList);
//       // return repoList;
//     }
//   });
// } //END of getRepoContributors

// // var printTopFive = function printTopFive (){

// // };//END of printTopFive


// //Need 2 arguments from the user, am owner and a repo.
// var input = process.argv.slice(2);
// if (input.length !== 2) {
//   console.log("We can't process this request. Please pass in github [owner] and [repo] in order to run avatar download. \n ie: node download_avatars.js jquery jquery ")
// } else {
//   getRepoContributors(input[0], input[1], getContStarredList);
//   //console.log(getRepoContributors);
// }